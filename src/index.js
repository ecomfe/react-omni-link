import uriTemplates from 'uri-templates';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import {Link as RouterLink, NavLink as RouterNavLink} from 'react-router-dom';

export const Link = ({refresh, external, to, activeClassName, ...props}) => {
    if (external) {
        return <a href={to} target="_blank" rel="noopener noreferrer" {...props} />;
    }

    if (refresh) {
        return <a href={to} {...props} />;
    }

    if (activeClassName) {
        return <RouterNavLink to={to} {...props} activeClassName={activeClassName} />;
    }

    return <RouterLink to={to} {...props} />;
};

Link.propTypes = {
    to: PropTypes.string.isRequired,
    refresh: PropTypes.bool,
    external: PropTypes.bool,
    activeClassName: PropTypes.string,
};

Link.defaultProps = {
    refresh: false,
    external: false,
    activeClassName: '',
};

export const ExternalLink = props => <Link external {...props} />;

export const HyperLink = props => <Link refresh {...props} />;

export const createLink = (urlTemplate, defaults = {}) => {
    const template = typeof urlTemplate === 'string' ? uriTemplates(urlTemplate) : urlTemplate;

    if (!template.varNames.length) {
        const to = template.toString();
        const FixedLink = props => <Link to={to} {...defaults} {...props} />;
        return FixedLink;
    }


    const TemplateLink = props => {
        const to = template.fill(props);
        const passDownProps = omit(props, template.varNames);
        return <Link to={to} {...defaults} {...passDownProps} />;
    };
    return TemplateLink;
};
