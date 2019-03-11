import {MemoryRouter as Router} from 'react-router';
import URITemplate from 'uri-templates';
import {createLink, ExternalLink, HyperLink, Link} from '../src';
import {create} from 'react-test-renderer';

test('should create a link by URITemplate', () => {
    const template = new URITemplate('/users/{username}');
    const TemplateLink = createLink(template);

    const component = create(
        <Router>
            <TemplateLink username="admin" />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

test('should create a link by string', () => {
    const UserListLink = createLink('/users');
    const component = create(
        <Router>
            <UserListLink />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

test('should create a link by string with params', () => {
    const UserProfileLink = createLink('/users/{username}');
    const component = create(
        <Router>
            <UserProfileLink username="admin" />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

test('should create a external link by string', () => {
    const AdminConsoleLink = createLink('/console', {external: true});

    const component = create(
        <Router>
            <AdminConsoleLink />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

test('should create a link by string without encoding', () => {
    const DocumentViewLink = createLink('/documents/{+path}');
    const component = create(
        <Router>
            <DocumentViewLink path="path/to/file?query=1" />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

test('should create a link by string with query', () => {
    const DocumentEditLink = createLink('/documents/{+path}/edit{?params*}');
    const query = {a: '1', b: ['2', '3']};
    const component = create(
        <Router>
            <DocumentEditLink path="path/to/file" query={query} />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

test('should create a external link by shortcut', () => {
    const component = create(
        <Router>
            <ExternalLink to="/users" />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

test('should create a refresh link by shortcut', () => {
    const component = create(
        <Router>
            <HyperLink to="/users" />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

test('should create a actived nav link', () => {
    const component = create(
        <Router initialEntries={['/users']}>
            <Link to="/users" activeClassName="active" />
        </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
});
