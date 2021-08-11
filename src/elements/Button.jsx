import { func, node, object } from 'prop-types';
import React from 'react';
import colors from '../enums/colors';

const buttonStyle = extraCss => ({
    borderRadius : '3px',
    color        : colors.white,
    background   : colors.accent,
    border       : `1px solid ${colors.accent} !important`,
    transition   : 'all .2s ease-in-out',
    outline      : 'none',
    padding      : '.5rem 1rem',
    boxShadow    : 'none',
    fontSize     : '1rem',
    fontWeight   : 'bold',

    '&:hover' : {
        background : `${colors.white} !important`,
        color      : `${colors.accent} !important`,
        cursor     : 'pointer !important',
    },

    ...extraCss,
})

const Button = ({
    onClick,
    children,
    extraCss,
}) => (
    <button type="button" onClick={onClick} css={buttonStyle(extraCss)}>
        {children}
    </button>
);

Button.propTypes = {
    onClick  : func.isRequired,
    children : node.isRequired,
    extraCss : object,
};

Button.defaultProps = {
    extraCss : {},
}

export default Button;
