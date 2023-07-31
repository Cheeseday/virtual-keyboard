//Variables
let isCapsLockActive = false; 
const body = document.body;
const alphabet = 'abcdefghijklmnopqrstuvwxyzйцукенгшўзхфывапролджэячсмітьбюё';
const specialEnglishKeys = '`1234567890-=[]\\;\',./';
const specialEnglishKeysWithShift = '~!@#$%^&*()_+{}|:"<>?';

//Color palette
//Basic
const keyColor = '#394867';
const specialKeyColor = '#212A3E';
const activeColor = '#0E8388';
const keyTextColor = '#FFFFFF';
//Custom
const customKeyColor = '#9AC5F4';
const customSpecialKeyColor = '#A7ECEE';
const customActiveColor = '#FFEEBB';
const customKeyTextColor = '#000000';


const header = document.createElement('header');
const heading = document.createElement('h2');
heading.textContent = 'Virtual Keyboard';
heading.className = 'name';
header.insertAdjacentElement('afterbegin', heading);
body.insertAdjacentElement('afterbegin', header);

let textarea = document.createElement('textarea');
textarea.className = 'textarea';
body.append(textarea);

const keyboard = document.createElement('div');
keyboard.className = 'container';

//Zero keyboard row
const zeroRowValues = '`1234567890-=';
const zeroRowValuesBel = 'ё1234567890-=';
const zeroRow = document.createElement('div');
zeroRow.className = 'row';
const zeroRowElements = createKeys(zeroRowValues); 
insertKeys(zeroRow, zeroRowElements);
const backspace = createSpecialKey('Backspace', 'backspace', 'Backspace');
zeroRow.insertAdjacentElement('beforeend', backspace);

//First keyboard row
const firstRowValues = 'qwertyuiop[]\\';
const firstRowValuesBel = 'йцукенгшўзх\'\\';
const firstRow = document.createElement('div');
firstRow.className = 'row';
const firstRowElements = createKeys(firstRowValues);
insertKeys(firstRow, firstRowElements);
const tab = createSpecialKey('Tab', 'tab', 'Tab');
firstRow.insertAdjacentElement('afterbegin', tab);
const del = createSpecialKey('Del', 'del', 'Delete');
firstRow.insertAdjacentElement('beforeend', del);

//Second keyboard row
const secondRowValues = 'asdfghjkl;\'';
const secondRowValuesBel = 'фывапролджэ';
const secondRow = document.createElement('div');
secondRow.className = 'row';
const secondRowElements = createKeys(secondRowValues);
insertKeys(secondRow, secondRowElements);
const capsLock = createSpecialKey('Caps Lock', 'caps-lock', 'CapsLock');
secondRow.insertAdjacentElement('afterbegin', capsLock);
secondRow.insertAdjacentElement('beforeend', createSpecialKey('Enter', 'enter', 'Enter'));
//Third keyboard row
const thirdRowValues = 'zxcvbnm,./';
const thirdRowValuesBel = 'ячсмітьбю.';
const thirdRow = document.createElement('div');
thirdRow.className = 'row';
const thirdRowElements = createKeys(thirdRowValues);
insertKeys(thirdRow, thirdRowElements);
thirdRow.insertAdjacentElement('afterbegin', createSpecialKey('Shift', 'shift', 'ShiftLeft'));
thirdRow.insertAdjacentElement('beforeend', createSpecialKey('Shift', 'shift', 'ShiftRight'));
//Fourth keyboard row
const fourthRow = document.createElement('div');
fourthRow.className = 'row';
insertKeys(fourthRow, createKeys(' ', 'space'));
fourthRow.insertAdjacentElement('afterbegin', createSpecialKey('Alt', 'alt', 'AltLeft'));
fourthRow.insertAdjacentElement('afterbegin', createSpecialKey('Win', 'win', 'MetaLeft'));
fourthRow.insertAdjacentElement('afterbegin', createSpecialKey('Ctrl', 'ctrl', 'ControlLeft'));
fourthRow.insertAdjacentElement('beforeend', createSpecialKey('Alt', 'alt', 'AltRight'));
fourthRow.insertAdjacentElement('beforeend', createSpecialKey('Ctrl', 'ctrl', 'ControlRight'));
const pageUpDownBlock = document.createElement('div');
pageUpDownBlock.className = 'page-up-down';
pageUpDownBlock.insertAdjacentElement('afterbegin', createSpecialKey('\u23F6', 'pg-up', 'ArrowUp'));
pageUpDownBlock.insertAdjacentElement('beforeend', createSpecialKey('\u23F7', 'pg-down', 'ArrowDown'));
fourthRow.insertAdjacentElement('beforeend', createSpecialKey('\u23F4', 'pg-left', 'ArrowLeft'));
fourthRow.insertAdjacentElement('beforeend', pageUpDownBlock);
fourthRow.insertAdjacentElement('beforeend', createSpecialKey('\u23F5', 'pg-right', 'ArrowRight'));

//Insert rows into keyboard
keyboard.insertAdjacentElement('beforeend', zeroRow);
keyboard.insertAdjacentElement('beforeend', firstRow);
keyboard.insertAdjacentElement('beforeend', secondRow);
keyboard.insertAdjacentElement('beforeend', thirdRow);
keyboard.insertAdjacentElement('beforeend', fourthRow);

body.insertAdjacentElement('beforeend', keyboard);

//Change language
const langShortcut = document.createElement('p');
langShortcut.textContent = 'A keyboard shortcut for switching a language: Shift + Alt';
body.insertAdjacentElement('beforeend', langShortcut);
//Change palette
const colorPaletteShortcut = document.createElement('p');
colorPaletteShortcut.textContent = 'A keyboard shortcut for switching the color palette: Ctrl + Shift';
body.insertAdjacentElement('beforeend', colorPaletteShortcut);

//Keyboard for windows
const description = document.createElement('p');
description.textContent = 'Keyboard was created for OS Windows';
body.insertAdjacentElement('beforeend', description);

const allSimpleElements = document.querySelectorAll('.simple-key');
const allSpecialElements = document.querySelectorAll('.special-key');
const allElements = document.querySelectorAll('.key');

addEventCodeProperty(allSimpleElements);
//
setRememberLanguage(localStorage.getItem('language'));
setNewPalette(localStorage.getItem('palette'));

function createKeys(string, additionalClass) {
    const symbols = string.split('');
    let createdElements = [];
    for(let i = 0; i < symbols.length; i++) {
        const element = document.createElement('div');
        element.classList.add('key', 'simple-key');
        if(additionalClass) {
            element.classList.add(`${additionalClass}`);
        }
        element.textContent = symbols[i];
        createdElements.push(element);
    }
    return createdElements;
}

function createSpecialKey(value, elementClass, eventCode) {
    const element = document.createElement('span');
    element.classList.add('key', 'special-key', `${elementClass}`);
    element.textContent = value;   
    element.dataset.eventCode = eventCode;
    return element;
}

function insertKeys(parent, children) {
    for(let i = 0; i < children.length; i++) {
        parent.insertAdjacentElement('beforeend', children[i]);
    }
}

function changeLanguage(elements, valueStr) {
    const valueArray = valueStr.split('');
    for(let i = 0; i < elements.length; i++) {
        elements[i].textContent = valueArray[i];
    }
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
}

function addEventCodeProperty(elements) {
    const englishAlphabet = 'qwertyuiopasdfghjklzxcvbnm';
    const digits = '0123456789';
    const specialSymbols = ['`', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/', ' '];
    const specialSymbolsNames = ['Backquote', 'Minus', 'Equal', 'BracketLeft', 'BracketRight', 
                                    'Backslash', 'Semicolon', 'Quote', 'Comma', 'Period', 'Slash', 'Space'];
    const specialSymbolsMap = createMap(specialSymbols, specialSymbolsNames);
    for(const element of elements) {
        if(englishAlphabet.includes(element.textContent)) {
            const value = `Key${element.textContent.toUpperCase()}`;
            element.dataset.eventCode = value;
        } else if(digits.includes(element.textContent)) {
            const value = `Digit${element.textContent.toUpperCase()}`;
            element.dataset.eventCode = value;
        } else if(specialSymbolsMap.has(element.textContent)) {
            const value = specialSymbolsMap.get(element.textContent);
            element.dataset.eventCode = value;
        }
    }
}

function createMap(elements, elementNames) {
    const map = new Map();
    for (let i = 0; i < elements.length; i++) {
        map.set(elements[i], elementNames[i]);
    }
    return map;
}

function setNewPalette(palette) {
    if(!palette || palette === 'basic') {  
        document.documentElement.style.setProperty('--key-color', keyColor);
        document.documentElement.style.setProperty('--special-key-color', specialKeyColor);
        document.documentElement.style.setProperty('--active-color', activeColor);
        document.documentElement.style.setProperty('--key-text-color', keyTextColor);
        heading.style.setProperty('color', specialKeyColor);
    } else if(palette === 'custom') {
        document.documentElement.style.setProperty('--key-color', customKeyColor);
        document.documentElement.style.setProperty('--special-key-color', customSpecialKeyColor);
        document.documentElement.style.setProperty('--active-color', customActiveColor);
        document.documentElement.style.setProperty('--key-text-color', customKeyTextColor);
        heading.style.setProperty('color', customKeyColor);
        localStorage.setItem('palette', 'custom');
    }
}

function capsElements() {
    if(isCapsLockActive) {
        changeLettersCase(allSimpleElements, 'lower');
        capsLock.classList.remove('active');
        isCapsLockActive = false;
    } else {
        changeLettersCase(allSimpleElements, 'upper');
        isCapsLockActive = true;
    }
}

function shiftKeyboard() {
    const array = specialEnglishKeys.split('');
    const shiftedArray = specialEnglishKeysWithShift.split('');
    const specialForBelarusian = '\'.\\';
    for(let key of allSimpleElements) {
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
}

function unshiftKeyboard() {
    const array = specialEnglishKeys.split('');
    const shiftedArray = specialEnglishKeysWithShift.split('');
    const specialForBelarusian = '\',/';
    for(let key of allSimpleElements) {
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
}

function setRememberLanguage(language) {
    if(!language || language === 'english') {
        changeLanguage(zeroRowElements, zeroRowValues);
        changeLanguage(firstRowElements, firstRowValues);
        changeLanguage(secondRowElements, secondRowValues);
        changeLanguage(thirdRowElements, thirdRowValues);
        changeLanguage(zeroRowElements, zeroRowValues);
    } else if(language === 'belarusian') {
        changeLanguage(zeroRowElements, zeroRowValuesBel);
        changeLanguage(firstRowElements, firstRowValuesBel);
        changeLanguage(secondRowElements, secondRowValuesBel);
        changeLanguage(thirdRowElements, thirdRowValuesBel);
        changeLanguage(zeroRowElements, zeroRowValuesBel);
    }
}

document.addEventListener('keydown', function(event) {
    event.preventDefault();
    //Display active keyboard element
    for(const elem of allSimpleElements) {
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.add('active');
            textarea.textContent += elem.innerText;
        }   
    }
    for(const elem of allSpecialElements) {
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.add('active');
        }   
    }
    //if (event.altKey && (event.ctrlKey || event.metaKey)) {
    if(event.code === 'Space') {
        textarea.textContent += ' ';
    }
    if(event.code === 'Tab') {
        textarea.textContent += '    ';
    }
    if(event.code === 'Enter') {
        textarea.textContent += '\n';
    }
    if(event.code === 'Backspace') {
        textarea.textContent = textarea.textContent.slice(0, -1);
    }
    if(event.code === 'ArrowUp') {
        textarea.textContent += '\u23F6';
    }
    if(event.code === 'ArrowDown') {
        textarea.textContent += '\u23F7';
    }
    if(event.code === 'ArrowLeft') {
        textarea.textContent += '\u23F4';
    }
    if(event.code === 'ArrowRight') {
        textarea.textContent += '\u23F5';
    }
    if(event.code === 'CapsLock') {
        capsElements();
    }
    if(event.shiftKey) {
        shiftKeyboard();
    }
    //Change palette colors
    if(event.ctrlKey && event.shiftKey) {
        if(localStorage.getItem('palette') === 'basic') {
            setNewPalette('custom');
            localStorage.setItem('palette', 'custom');
        } else {
            setNewPalette('basic');
            localStorage.setItem('palette', 'basic');
        }
    }
    //Switch keyboard language
    if(event.shiftKey && event.altKey) {
        if(localStorage.getItem('language') === 'english' || localStorage.getItem('language') === undefined) {
            localStorage.setItem('language', 'belarusian');
            setRememberLanguage(localStorage.getItem('language'));
        } else if(localStorage.getItem('language') === 'belarusian') {
            localStorage.setItem('language', 'english');
            setRememberLanguage(localStorage.getItem('language'));
        }
    }
});

document.addEventListener('keyup', function(event) {
    for(let elem of allElements){
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code && elem.dataset.eventCode !== 'CapsLock') {
            elem.classList.remove('active');
        }   
    }
    if(event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        unshiftKeyboard();
    }
});

document.addEventListener('mousedown', function(event) {
    const target = event.target.dataset.eventCode;
    for(const elem of allSimpleElements) {
        if(elem.dataset.eventCode && elem.dataset.eventCode === target) {
            textarea.textContent += elem.innerText;
        }   
    }
    switch(target) {
        case 'Space':
            textarea.textContent += ' ';
            break;
        case 'Tab':
            textarea.textContent += '    ';
            break;
        case 'Enter':
            textarea.textContent += '\n';
            break;
        case 'Backspace':
            textarea.textContent = textarea.textContent.slice(0, -1);
            break;
        case 'ArrowUp':
            textarea.textContent += '\u23F6';
            break;
        case 'ArrowDown':
            textarea.textContent += '\u23F7';
            break;
        case 'ArrowLeft':
            textarea.textContent += '\u23F4';
            break;
        case 'ArrowRight':
            textarea.textContent += '\u23F5';
            break;
        case 'CapsLock':
            capsElements();
            break;
        case 'ShiftRight':
            shiftKeyboard();
            break; 
        case 'ShiftLeft':
            shiftKeyboard();
            break; 
        default: '';       
    }
});

document.addEventListener('mouseup', function(event) {
    const target = event.target.dataset.eventCode;
    if(target === 'CapsLock' && isCapsLockActive === true) {
        event.target.classList.add('activeCaps');
    } else if (target === 'CapsLock' && isCapsLockActive === false) {
        event.target.classList.remove('activeCaps');
    }
    if(target === 'ShiftLeft' || target === 'ShiftRight') {
        unshiftKeyboard();
    }
});