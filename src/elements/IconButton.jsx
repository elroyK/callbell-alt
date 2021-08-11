import { func, string } from 'prop-types';
import React from 'react';
import colors from '../enums/colors';

const iconButtonStyle = () => ({
    padding        : '.1rem',
    margin         : 0,
    width          : 'auto',
    height         : 'auto',
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    border         : 0,
    background     : 'none',
    color          : colors.white,
    transition     : 'all .2s ease-in-out',

    img : {
        height : '1.5rem',
    },

    '&:hover' : {
        border     : 0,
        background : 'none',
        color      : colors.accent,
        cursor     : 'pointer',
    }
})

const IconButton = ({
    type,
    onClick,
}) => (
    <button type="button" css={iconButtonStyle()} onClick={onClick}>
        <i className={`fas fa-${type}`} />
    </button>
);

IconButton.propTypes = {
    type    : string.isRequired,
    onClick : func.isRequired,
}

export default IconButton;