import { func, string } from 'prop-types';
import React, {
 useCallback, useEffect, useRef, useState
} from 'react';
import colors from '../enums/colors';
import methods from '../enums/methods';
import fetchTrelloAPI from '../utils/fetchTrelloAPI';
import isEmptyStr from '../utils/isEmptryStr';
import hexToRgb from '../utils/hexToRgb';
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

const inputStyle = hasError => ({
    padding      : '.5rem',
    paddingLeft  : '1rem',
    borderRadius : '3px 0 0 3px',
    fontSize     : '1rem',
    fontFamily   : 'OpenSans',
    background   : colors.white,
    border       : '1px solid',
    borderColor  : hasError ? colors.error : colors.accent,
    borderRight  : 0,
    outline      : 'none',
    color        : colors.black,
    flexGrow     : '1',
})

const buttonStyle = () => ({
    borderRadius : '0 3px 3px 0',

    '&:disabled' : {
        background  : `rgba(${hexToRgb(colors.white)}, .4) !important`,
        borderColor : `rgba(${hexToRgb(colors.white)}, .4) !important`,
        color       : `${colors.white} !important`,
        cursor      : 'not-allowed !important',
    }
})

const AddCard = ({ idList, callback }) => {
    const inputRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [hasError, setHasError] = useState(false);

    const onSuccess = res => {
        console.log(res);
        inputRef.current.value = null;
        setIsButtonDisabled(true)
        callback();
    }

    const onError = error => {
        console.log(error);
        setHasError(true);
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

        setIsButtonDisabled(isEmptyStr(inputRef.current.value))
    }, [inputRef]);

    const checkInputVal = useCallback(() => {
        setIsButtonDisabled(isEmptyStr(inputRef.current.value))
    })

    return (
        <div css={formStyle()}>
            <input
                type="text"
                ref={inputRef}
                placeholder="Add a card"
                css={inputStyle(hasError)}
                onChange={checkInputVal}
                disabled={hasError}
            />
            <Button
                type="button"
                onClick={addToList}
                extraCss={buttonStyle()}
                disabled={isButtonDisabled}
            >
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