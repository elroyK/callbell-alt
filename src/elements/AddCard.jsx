import { func, string } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import colors from '../enums/colors';
import methods from '../enums/methods';
import fetchTrelloAPI from '../utils/fetchTrelloAPI';
import Button from './Button';

const formStyle = () => ({
    height         : '2.2rem',
    display        : 'flex',
    alignItems     : 'flex-start',
    justifyContent : 'stretch',
    width          : '100%',
    marginTop      : '.5rem',

    '& > *' : {
        height : '100%',
    }
})

const inputStyle = () => ({
    padding      : '.5rem',
    paddingLeft  : '1rem',
    borderRadius : '3px 0 0 3px',
    fontSize     : '1rem',
    fontFamily   : 'OpenSans',
    background   : colors.white,
    border       : `1px solid ${colors.accent}`,
    borderRight  : 0,
    outline      : 'none',
    color        : colors.black,
    flexGrow     : '1',
})

const buttonStyle = () => ({
    borderRadius : '0 3px 3px 0',
})

const AddCard = ({ idList, callback }) => {
    const inputRef = useRef(null);

    const onSuccess = res => {
        console.log(res);
        inputRef.current.value = null;
        callback();
    }

    const onError = error => {
        console.log(error);
        inputRef.current.value = null;
    }

    const addToList = () => {
        const params = {
            idList,
            name : inputRef.current.value,
        };

        fetchTrelloAPI('/cards', methods.POST, params, onSuccess, onError);
    };

    useEffect(() => {
        inputRef.current.addEventListener("keyup", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                addToList();
            }
        });
    }, [inputRef]);

    return (
        <div css={formStyle()}>
            <input type="text" ref={inputRef} placeholder="Add a card" css={inputStyle()} />
            <Button type="button" onClick={addToList} extraCss={buttonStyle()}>
                +
            </Button>
        </div>
    )
};

AddCard.propTypes = {
    idList   : string.isRequired,
    callback : func.isRequired,
};

export default AddCard;