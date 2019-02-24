import React, {SFC} from 'react';
import {LocationDescriptor} from 'history';
import uriTemplates, {URITemplate} from 'uri-templates';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import {Link as RouterLink, NavLink as RouterNavLink} from 'react-router-dom';

export interface LinkProps {
    refresh?: boolean;
    external?: boolean;
    to?: string | LocationDescriptor;
    activeClassName?: string;
}

export const Link: SFC<LinkProps> = ({refresh, external, to, activeClassName, ...props}) => {
    if (external) {
        return <a href={to as string} target="_blank" rel="noopener noreferrer" {...props} />;
    }

    if (refresh) {
        return <a href={to as string} {...props} />;
    }

    if (activeClassName) {
        return <RouterNavLink to={to as LocationDescriptor} {...props} activeClassName={activeClassName} />;
    }

    return <RouterLink to={to as LocationDescriptor} {...props} />;
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

export const ExternalLink: SFC<LinkProps> = props => <Link external {...props} />;

export const HyperLink: SFC<LinkProps> = props => <Link refresh {...props} />;

export const createLink = (urlTemplate: URITemplate, defaults = {}) => {
    const template = typeof urlTemplate === 'string' ? uriTemplates(urlTemplate) : urlTemplate;

    if (!template.varNames.length) {
        const to = template.toString();
        const FixedLink: SFC<LinkProps> = props => <Link to={to} {...defaults} {...props} />;
        return FixedLink;
    }

    const TemplateLink: SFC<LinkProps> = props => {
        const to = template.fill(props as {[key: string]: string});
        const passDownProps = omit(props, template.varNames);
        return <Link to={to} {...defaults} {...passDownProps} />;
    };

    return TemplateLink;
};
