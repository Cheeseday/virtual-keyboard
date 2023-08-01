const specialEnglishKeys = '`1234567890-=[]\\;\',./';
const specialEnglishKeysWithShift = '~!@#$%^&*()_+{}|:"<>?';
const alphabet = 'abcdefghijklmnopqrstuvwxyzйцукенгшўзхфывапролджэячсмітьбюё';

function shiftKeyboard(elements) {
    const array = specialEnglishKeys.split('');
    const shiftedArray = specialEnglishKeysWithShift.split('');
    const specialForBelarusian = '\'.\\';
    for(let key of elements) {
        if(localStorage.getItem('language') === 'belarusian' && specialForBelarusian.includes(key.textContent)) {
            if(key.textContent === '\'') key.textContent = '\'';
            if(key.textContent === '.') key.textContent = ',';
            if(key.textContent === '\\') key.textContent = '/';
        } else if(alphabet.includes(key.textContent)) {
            key.textContent = key.textContent.toUpperCase();
        } else if(specialEnglishKeys.includes(key.textContent)) {
            key.textContent = shiftedArray[array.indexOf(key.textContent)];
        }
    }

    return;
}

function unshiftKeyboard(elements) {
    const array = specialEnglishKeys.split('');
    const shiftedArray = specialEnglishKeysWithShift.split('');
    const specialForBelarusian = '\',/';
    for(let key of elements) {
        if(localStorage.getItem('language') === 'belarusian' && specialForBelarusian.includes(key.textContent)) {
            if(key.textContent === '\'') key.textContent = '\'';
            if(key.textContent === ',') key.textContent = '.';
            if(key.textContent === '/') key.textContent = '\\';
        } else if(alphabet.includes(key.textContent.toLowerCase())) {
            key.textContent = key.textContent.toLowerCase();
        } else if(specialEnglishKeysWithShift.includes(key.textContent)) {
            key.textContent = array[shiftedArray.indexOf(key.textContent)];
        }
    }

    return;
}

function deleteHandler(object) {
    const cursorPosition = object.selectionStart;
    if(cursorPosition === object.textContent.length) {
        return;
    }
    const prevString = object.textContent.substring(0, cursorPosition);
    const pastString = object.textContent.substring(cursorPosition + 1);
    object.textContent = prevString + pastString;
    object.selectionStart = cursorPosition;

    return;
}

function backspaceHandler(object) {
    const cursorPosition = object.selectionStart;
    if(cursorPosition === 0) {
        return;
    }
    const prevString = object.textContent.substring(0, cursorPosition - 1);
    const pastString = object.textContent.substring(cursorPosition);
    object.textContent = prevString + pastString;
    object.selectionStart = cursorPosition - 1;

    return;
}

function insertSymbol(object, symbol) {
    const cursorPosition = object.selectionStart;
    const prevString = object.textContent.substring(0, cursorPosition);
    const pastString = object.textContent.substring(cursorPosition);
    object.textContent = `${prevString}${symbol}${pastString}`;
    object.selectionStart = cursorPosition + symbol.length;

    return;
}

function moveCursor(object, side) {
    const cursorPosition = object.selectionStart;
    if(side === 'left') {
        object.selectionStart = cursorPosition - 1;
        object.selectionEnd = cursorPosition - 1;
    } else if(side === 'right') {
        object.selectionStart = cursorPosition + 1;
    }

    return;
}

function capsHandler(elements, isCapsLockActive) {
    if(isCapsLockActive) {
        changeLettersCase(elements, 'lower');
    } else {
        changeLettersCase(elements, 'upper');
    }

    return;
}

function changeLettersCase(elements, register) {
    for(let i = 0; i < elements.length; i++) {
        const hasElement = alphabet.includes(elements[i].textContent.toLowerCase());
        if(hasElement && register === 'upper'){
            const value = elements[i].textContent.toUpperCase();
            elements[i].textContent = value;
        } else if(hasElement && register === 'lower') {
            const value = elements[i].textContent.toLowerCase();
            elements[i].textContent = value;
        }
    }
    
    return;
}

export { shiftKeyboard, unshiftKeyboard, deleteHandler, backspaceHandler, moveCursor, insertSymbol, capsHandler };