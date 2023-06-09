//variables
let isCapsLockActive = false; 
let language = 'english';
const body = document.body;
const alphabet = 'abcdefghijklmnopqrstuvwxyzйцукенгшўзхфывапролджэячсмітьбюё';
const specialEnglishKeys = '`1234567890-=[]\\;\',./';
const specialEnglishKeysWithShift = '~!@#$%^&*()_+{}|:"<>?';

//create header of the page
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

//zero keyboard row
const zeroRowValues = '`1234567890-=';
const zeroRowValuesBel = 'ё1234567890-=';
const zeroRow = document.createElement('div');
zeroRow.className = 'row';
const zeroRowElements = createKeys(zeroRowValues); 
insertKeys(zeroRow, zeroRowElements);
const backspace = createSpecialKey('Backspace', 'backspace', 'Backspace');
zeroRow.insertAdjacentElement('beforeend', backspace);

//first keyboard row
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

//second keyboard row
const secondRowValues = 'asdfghjkl;\'';
const secondRowValuesBel = 'фывапролджэ';
const secondRow = document.createElement('div');
secondRow.className = 'row';
const secondRowElements = createKeys(secondRowValues);
insertKeys(secondRow, secondRowElements);
const capsLock = createSpecialKey('Caps Lock', 'caps-lock')
secondRow.insertAdjacentElement('afterbegin', capsLock);
secondRow.insertAdjacentElement('beforeend', createSpecialKey('Enter', 'enter', 'Enter'));
//third keyboard row
const thirdRowValues = 'zxcvbnm,./';
const thirdRowValuesBel = 'ячсмітьбю.';
const thirdRow = document.createElement('div');
thirdRow.className = 'row';
const thirdRowElements = createKeys(thirdRowValues);
insertKeys(thirdRow, thirdRowElements);
thirdRow.insertAdjacentElement('afterbegin', createSpecialKey('Shift', 'shift', 'ShiftLeft'));
thirdRow.insertAdjacentElement('beforeend', createSpecialKey('Shift', 'shift', 'ShiftRight'));
//fourth keyboard row
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

//insert rows into keyboard
keyboard.insertAdjacentElement('beforeend', zeroRow);
keyboard.insertAdjacentElement('beforeend', firstRow);
keyboard.insertAdjacentElement('beforeend', secondRow);
keyboard.insertAdjacentElement('beforeend', thirdRow);
keyboard.insertAdjacentElement('beforeend', fourthRow);

body.insertAdjacentElement('beforeend', keyboard);

//Change language
let langShortcut = document.createElement('p');
langShortcut.textContent = 'A keyboard shortcut for switching a language: Ctrl + Shift';
body.insertAdjacentElement('beforeend', langShortcut);

const allSimpleElements = document.querySelectorAll('.simple-key');
const allSpecialElements = document.querySelectorAll('.special-key');
const allElements = document.querySelectorAll('.key');
addEventCodeProperty(allSimpleElements);

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

function changeElementLanguage(elements, valueStr) {
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

document.addEventListener('keydown', function(event) {
    //Display active keyboard element
    for(const elem of allSimpleElements) {
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.add('active');
            textarea.textContent += event.key;
        }   
    }
    for(const elem of allSpecialElements) {
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.add('active');
        }   
    }
    //if (event.altKey && (event.ctrlKey || event.metaKey)) {
    if(event.altKey || event.code === 'Space') {
        event.preventDefault();
    }
    if(event.code === 'Tab') {
        event.preventDefault();
        textarea.textContent += '    ';
    }
    if(event.code === 'Enter') {
        textarea.textContent += '\n';
    }
    if(event.code === 'Backspace') {
        event.preventDefault();
        textarea.textContent = textarea.textContent.slice(0, -1);
    }
    if(event.code === 'ArrowUp') {
        event.preventDefault();
        textarea.textContent += '\u23F6';
    }
    if(event.code === 'ArrowDown') {
        event.preventDefault();
        textarea.textContent += '\u23F7';
    }
    if(event.code === 'ArrowLeft') {
        event.preventDefault();
        textarea.textContent += '\u23F4';
    }
    if(event.code === 'ArrowRight') {
        event.preventDefault();
        textarea.textContent += '\u23F5';
    }
    if(event.shiftKey && event.ctrlKey) {
      if(language === 'english') {
        changeElementLanguage(zeroRowElements, zeroRowValuesBel);
        changeElementLanguage(firstRowElements, firstRowValuesBel);
        changeElementLanguage(secondRowElements, secondRowValuesBel);
        changeElementLanguage(thirdRowElements, thirdRowValuesBel);
        changeElementLanguage(zeroRowElements, zeroRowValuesBel);
        language = 'belarusian';
      } else if(language === 'belarusian') {
        changeElementLanguage(zeroRowElements, zeroRowValues);
        changeElementLanguage(firstRowElements, firstRowValues);
        changeElementLanguage(secondRowElements, secondRowValues);
        changeElementLanguage(thirdRowElements, thirdRowValues);
        changeElementLanguage(zeroRowElements, zeroRowValues);
        language = 'english';
      }
    }
    if(event.code === 'CapsLock') {
        if(isCapsLockActive) {
            changeLettersCase(allSimpleElements, 'lower');
            capsLock.classList.remove('active');
            isCapsLockActive = false;
        } else {
            changeLettersCase(allSimpleElements, 'upper');
            capsLock.classList.add('active');
            isCapsLockActive = true;
        }
    }
    if(event.shiftKey) {
        const array = specialEnglishKeys.split('');
        const shiftedArray = specialEnglishKeysWithShift.split('');
        for(let key of allSimpleElements) {
            if(alphabet.includes(key.textContent)) {
                key.textContent = key.textContent.toUpperCase();
            } else if(specialEnglishKeys.includes(key.textContent)) {
                key.textContent = shiftedArray[array.indexOf(key.textContent)];
            }
        }
    }
});

document.addEventListener('keyup', function(event) {
    for(let elem of allElements){
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.remove('active');
        }   
    }
    if(event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        const array = specialEnglishKeys.split('');
        const shiftedArray = specialEnglishKeysWithShift.split('');
        for(let key of allSimpleElements) {
            if(alphabet.includes(key.textContent.toLowerCase())) {
                key.textContent = key.textContent.toLowerCase();
            } else if(specialEnglishKeysWithShift.includes(key.textContent)) {
                key.textContent = array[shiftedArray.indexOf(key.textContent)];
            }
        }
    }
});