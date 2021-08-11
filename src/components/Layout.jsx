import { node } from 'prop-types';
import React from 'react';

const layoutStyle = () => ({
    width  : '100vw',
    height : '100vh',
})

const Layout = ({ children }) => (
    <div css={layoutStyle()}>
        {children}
    </div>
);

Layout.propTypes = {
    children : node.isRequired,
};

export default Layout;