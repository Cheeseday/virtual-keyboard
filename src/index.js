import { setPalette } from './components/setPalette';
import { addEventCodeProperty } from './components/addEventCodeProperty';
import { shiftKeyboard, unshiftKeyboard, deleteHandler, backspaceHandler, capsHandler,insertSymbol, moveCursor } from './components/handlers';
import { createKeys, createSpecialKey, insertKeys } from './components/keyOperations';
import { setLanguage, zeroRowValues, firstRowValues, secondRowValues, thirdRowValues } from './components/setLanguage';

let isCapsLockActive = false; 
const body = document.body;

const header = document.createElement('header');
const heading = document.createElement('h2');
heading.textContent = 'Virtual Keyboard';
heading.className = 'heading';
header.insertAdjacentElement('afterbegin', heading);
body.insertAdjacentElement('afterbegin', header);

let textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.cols = 94;
textarea.rows = 18; 
body.append(textarea);

const keyboard = document.createElement('div');
keyboard.className = 'container';

//Zero keyboard row
const zeroRow = document.createElement('div');
zeroRow.className = 'row';
const zeroRowElements = createKeys(zeroRowValues); 
insertKeys(zeroRow, zeroRowElements);
const backspace = createSpecialKey('Backspace', 'backspace', 'Backspace');
zeroRow.insertAdjacentElement('beforeend', backspace);

//First keyboard row
const firstRow = document.createElement('div');
firstRow.className = 'row';
const firstRowElements = createKeys(firstRowValues);
insertKeys(firstRow, firstRowElements);
const tab = createSpecialKey('Tab', 'tab', 'Tab');
firstRow.insertAdjacentElement('afterbegin', tab);
const del = createSpecialKey('Del', 'del', 'Delete');
firstRow.insertAdjacentElement('beforeend', del);

//Second keyboard row
const secondRow = document.createElement('div');
secondRow.className = 'row';
const secondRowElements = createKeys(secondRowValues);
insertKeys(secondRow, secondRowElements);
const capsLock = createSpecialKey('Caps Lock', 'caps-lock', 'CapsLock');
secondRow.insertAdjacentElement('afterbegin', capsLock);
secondRow.insertAdjacentElement('beforeend', createSpecialKey('Enter', 'enter', 'Enter'));

//Third keyboard row
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

setLanguage(localStorage.getItem('language'));

setPalette(localStorage.getItem('palette'));

function specialKeysInteraction(eventCode) {
    switch(eventCode) {
        case 'Tab':
            insertSymbol(textarea, '    ');
            break;
        case 'Space':
            insertSymbol(textarea, ' ');
            break;
        case 'Enter':
            insertSymbol(textarea, '\n');
            break;
        case 'Backspace':
            backspaceHandler(textarea);
            break;
        case 'Delete':
            deleteHandler(textarea);
            break;
        case 'ArrowUp':
            insertSymbol(textarea, '\u23F6');
            break;
        case 'ArrowDown':
            insertSymbol(textarea, '\u23F7');
            break;
        case 'ArrowLeft':
            moveCursor(textarea, 'left');
            break;
        case 'ArrowRight':
            moveCursor(textarea, 'right');
            break;
        case 'CapsLock':
            capsHandler(allSimpleElements, isCapsLockActive);
            isCapsLockActive = !isCapsLockActive;
            break;
        case 'ShiftLeft':
        case 'ShiftRight':    
            shiftKeyboard(allSimpleElements);
            break; 
        default: ''; 
    }
}

document.addEventListener('keydown', function(event) {
    event.preventDefault();
    //Display active keyboard element
    for(const elem of allSimpleElements) {
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.add('active');
            insertSymbol(textarea, elem.innerText);
        }   
    }
    for(const elem of allSpecialElements) {
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.add('active');
        }   
    }
    //if (event.altKey && (event.ctrlKey || event.metaKey)) {}
    specialKeysInteraction(event.code);
    //Change palette colors
    if(event.ctrlKey && event.shiftKey) {
        if(localStorage.getItem('palette') === 'basic') {
            setPalette('custom');
            localStorage.setItem('palette', 'custom');
        } else {
            setPalette('basic');
            localStorage.setItem('palette', 'basic');
        }
    }
    //Switch keyboard language
    if(event.shiftKey && event.altKey) {
        if(localStorage.getItem('language') === 'english' || localStorage.getItem('language') === undefined) {
            localStorage.setItem('language', 'belarusian');
            setLanguage(localStorage.getItem('language'));
        } else if(localStorage.getItem('language') === 'belarusian') {
            localStorage.setItem('language', 'english');
            setLanguage(localStorage.getItem('language'));
        }
    }
});

document.addEventListener('keyup', function(event) {
    for(const elem of allElements){
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code && elem.dataset.eventCode !== 'CapsLock') {
            elem.classList.remove('active');
        } 
        if(elem.dataset.eventCode === 'CapsLock' && isCapsLockActive === true) {
            elem.classList.add('activeCaps');
            elem.classList.add('active');
        } else if (elem.dataset.eventCode === 'CapsLock' && isCapsLockActive === false) {
            elem.classList.remove('activeCaps');
            elem.classList.remove('active');
        }
        if(event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            unshiftKeyboard(allSimpleElements);
        }
    }
});

document.addEventListener('pointerdown', function(event) {
    const target = event.target.dataset.eventCode;
    for(const elem of allSimpleElements) {
        if(elem.dataset.eventCode && elem.dataset.eventCode === target) {
            insertSymbol(textarea, elem.innerText);
        }   
    }
    specialKeysInteraction(target);
});

document.addEventListener('pointerup', function(event) {
    const target = event.target.dataset.eventCode;
    if(target === 'CapsLock' && isCapsLockActive === true) {
        event.target.classList.add('activeCaps');
    } else if (target === 'CapsLock' && isCapsLockActive === false) {
        event.target.classList.remove('activeCaps');
    }
    if(target === 'ShiftLeft' || target === 'ShiftRight') {
        unshiftKeyboard(allSimpleElements);
    }
});