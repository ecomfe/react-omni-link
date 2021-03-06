# react-omni-link

A universal link component for react and react-router, this library encapsulates `<a>` element from DOM and `<NavLink>` component from `react-router`, also it allows you to create any link component from url template.

## Link

The basic component is the `Link` named export, it receives props:

- `{string} to`: The target URL of link.
- `{boolean} external`: Set `target="_blank"` to `<a>` element, this also adds `rel="noopener noreferrer"` prop.
- `{boolean} refresh`: Use simple `<a>` element instead of react-router's `<Link>` component, which will lead a refresh of page when clicked.
- `{string} activeClassName`: The same as react-router's `<NavLink>` component, when this prop is provided a non empty value, `<NavLink>` is used instead of `<Link>`.

Other props will be passed down to `<a>` element or `<Link>` component.

## Shortcut

This package also exports two components to fix the `external` or `refresh` prop:

```javascript
export const ExternalLink = props => <Link external {...props} />;

export const HyperLink = props => <Link refresh {...props} />;
```

## Template Link

The `createLink` named export is a function to create a unversal `<Link>` component from a url template:

```javascript
{Component} createLink({string | UriTemplate} urlTeamplte, {Object} [defaults])
```

The `urlTemplate` parameter can be either a string or a template object generated by [uri-templates](https://www.npmjs.com/package/uri-templates) package, the basic usage can be:

```javascript
import {createLink} from 'react-omni-link';

// Without any prop
const UserListLink = createLink('/users');

// Inline prop to url
const UserProfileLink = createLink('/users/{username}');

// Inline prop without url encoding
const DocumentViewLink = createLink('/documents/{+path}');

// Expand object prop to query string
const DocumentEditLink = createLink('/documents/{+path}/edit{?params*}');

// Default some props
const AdminConsoleLink = createLink('/console', {external: true});
```

See [uri-templates](https://www.npmjs.com/package/uri-templates) pacakge for details template syntax.
