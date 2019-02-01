import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";

import {Link, ExternalLink, HyperLink, createLink} from '../index';

test('passing external prop to <Link>', () => {
    const link = renderer
        .create(<Link external to="http://www.facebook.com">Facebook</Link>)
        .toJSON();
    expect(link).toMatchSnapshot();
});


test('passing refresh prop to <Link>', () => {
    const link = renderer
        .create(<Link refresh to="http://www.facebook.com">Facebook</Link>)
        .toJSON();
    expect(link).toMatchSnapshot();
});


test('passing activeClassName prop to <Link>', () => {
    const link = renderer
        .create(
            <BrowserRouter>
                <div>
                    <Link activeClassName="active" to="/">Home</Link>
                </div>
            </BrowserRouter>
        )
        .toJSON();
    expect(link).toMatchSnapshot();
});

test('<ExternalLink>', () => {
    const link = renderer
        .create(<ExternalLink to="http://www.facebook.com">Facebook</ExternalLink>)
        .toJSON();
    expect(link).toMatchSnapshot();
});

test('<HyperLink>', () => {
    const link = renderer
        .create(<HyperLink to="http://www.facebook.com">Facebook</HyperLink>)
        .toJSON();
    expect(link).toMatchSnapshot();
});

test('react-router using <Link>', () => {
    const link = renderer
        .create(
            <BrowserRouter>
                <div>
                    <Link to="/">Home</Link>
                </div>
            </BrowserRouter>
        )
        .toJSON();
    expect(link).toMatchSnapshot();
});

test('createLink', () => {
    const MyLink = createLink('/users');
    const link = renderer
        .create(
            <BrowserRouter>
                <div>
                    <MyLink>Home</MyLink>
                </div>
            </BrowserRouter>
        )
        .toJSON();
    expect(link).toMatchSnapshot();
})

test('createLink with template', () => {
    const MyLink = createLink('/users/{id}');
    const link = renderer
        .create(
            <BrowserRouter>
                <div>
                    <MyLink id={1}>Home</MyLink>
                </div>
            </BrowserRouter>
        )
        .toJSON();
    expect(link).toMatchSnapshot();
})
