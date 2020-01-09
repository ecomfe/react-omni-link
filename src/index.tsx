import React, {FC} from 'react';
import uriTemplates, {URITemplate} from 'uri-templates';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import {Link as RouterLink, NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps} from 'react-router-dom';

export const Link: FC<LinkProps> = ({refresh, external, to, activeClassName, ...props}) => {
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

interface LinkProps<S = {}> extends RouterNavLinkProps<S>{
    to: string;
    refresh?: boolean;
    external?: boolean;
    activeClassName?: string;
}

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

export const ExternalLink: FC<Omit<LinkProps, 'external'>> = props => <Link external {...props} />;

export const HyperLink: FC<Omit<LinkProps, 'refresh'>> = props => <Link refresh {...props} />;

export const createLink = (urlTemplate: URITemplate | string, defaults: Omit<LinkProps, 'to'> = {}) => {
    const template = typeof urlTemplate === 'string' ? uriTemplates(urlTemplate) : urlTemplate;

    if (!template.varNames.length) {
        const to = template.toString();
        const FixedLink: FC<Omit<LinkProps, 'to'>> = props => <Link to={to} {...defaults} {...props} />;
        return FixedLink;
    }


    const TemplateLink: FC<any> = props => {
        const to = template.fill(props);
        const passDownProps = omit(props, template.varNames);
        return <Link to={to} {...defaults} {...passDownProps} />;
    };
    return TemplateLink;
};
