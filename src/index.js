//document.body.innerHTML = 'The new body!'
let isCapsLockActive = false; 
let language = 'english';
const body = document.body;
const alphabet = 'abcdefghijklmnopqrstuvwxyzйцукенгшўзхфывапролджэячсмітьбю';

let textarea = document.createElement('textarea');
textarea.className = 'textarea';
body.append(textarea);


const keyboard = document.createElement('div');
keyboard.className = 'container';

//zero keyboard row
const zeroRowValues = '`1234567890-=';
const zeroRow = document.createElement('div');
zeroRow.className = 'row';
const zeroRowElements = createKeys(zeroRowValues); 
insertKeys(zeroRow, zeroRowElements);
const backspace = createSpecialKey('Backspace', 'backspace', 'Backspace');
//backspace.dataset.eventCode = 'Backspace';
zeroRow.insertAdjacentElement('beforeend', backspace);

//first keyboard row
const firstRowValues = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
const firstRow = document.createElement('div');
firstRow.className = 'row';
const firstRowElements = createKeys(firstRowValues); ////////////////////////////////////////////////////////////////////////////////////
insertKeys(firstRow, firstRowElements);
const tab = createSpecialKey('Tab', 'tab', 'Tab');
// tab.dataset.eventCode = 'Tab';
firstRow.insertAdjacentElement('afterbegin', tab);
const del = createSpecialKey('Del', 'del', 'Delete');
// del.dataset.eventCode = 'Delete';
firstRow.insertAdjacentElement('beforeend', del);

//second keyboard row
const secondRowValues = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''];
const secondRow = document.createElement('div');
secondRow.className = 'row';
insertKeys(secondRow, createKeys(secondRowValues));
const capsLock = createSpecialKey('Caps Lock', 'caps-lock')
secondRow.insertAdjacentElement('afterbegin', capsLock);
secondRow.insertAdjacentElement('beforeend', createSpecialKey('Enter', 'enter', 'Enter'));
//third keyboard row
const thirdRowValues = 'zxcvbnm,./';
const thirdRow = document.createElement('div');
thirdRow.className = 'row';
insertKeys(thirdRow, createKeysEl(thirdRowValues));
thirdRow.insertAdjacentElement('afterbegin', createSpecialKey('Shift', 'shift', 'ShiftLeft'));
thirdRow.insertAdjacentElement('beforeend', createSpecialKey('Shift', 'shift', 'ShiftRight'));
//fourth keyboard row
const fourthRow = document.createElement('div');
fourthRow.className = 'row';
insertKeys(fourthRow, createKeysEl(' ', 'space'));
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

//create header of the page
const header = document.createElement('header');
const heading = document.createElement('h2');
heading.textContent = 'Virtual Keyboard';
heading.className = 'name';
header.insertAdjacentElement('afterbegin', heading);
body.insertAdjacentElement('afterbegin', header);
//Change language

let allSimpleElements = document.querySelectorAll('.simple-key');
//let allElements = document.querySelectorAll('.key');
let allSpecialElements = document.querySelectorAll('.special-key');
//console.log(allElements);

function createKeysEl(string, additionalClass) {
    const symbols = string.split('');
    let createdElements = [];
    for(let i = 0; i < symbols.length; i++) {
        const element = document.createElement('div');
        element.classList.add('key', 'simple-key');
        //element.className = 'key';
        if(additionalClass) element.classList.add(`${additionalClass}`);
        element.textContent = symbols[i];
        createdElements.push(element);
    }
    return createdElements;
}
function createKeys(array) {
    let createdElements = [];
    for(let i = 0; i < array.length; i++) {
        const element = document.createElement('div');
        // element.className = 'key';
        element.classList.add('key', 'simple-key');
        element.textContent = array[i];
        createdElements.push(element);
    }
    return createdElements;
}

function insertKeys(parent, children) {
    for(let i = 0; i < children.length; i++) {
        parent.insertAdjacentElement('beforeend', children[i]);
    }
}

function createSpecialKey(value, elementClass, eventCode) {
    const element = document.createElement('span');
    element.classList.add('key', 'special-key', `${elementClass}`);
    element.textContent = value;   
    element.dataset.eventCode = eventCode;
    return element;
}

function changeElementLanguage(elements, valueStr) {
    const valueArray = valueStr.split('');
    for(let i = 0; i < elements.length; i++) {
        elements[i].textContent = valueArray[i];
    }
}

function changeLettersCase(elements, register) {
    for(let i = 0; i < elements.length; i++) {
        if(alphabet.includes(elements[i].textContent.toLowerCase())){
            if(register === 'upper'){
                const value = elements[i].textContent.toUpperCase();
                elements[i].textContent = value;
            } else {
                const value = elements[i].textContent.toLowerCase();
                elements[i].textContent = value;
            }
        }
    }
}

function addEventCodeProperty(elements) {
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm';
    const digits = '0123456789';
    const specialSymbols = ['`', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/', ' '];
    const specialSymbolsNames = ['Backquote', 'Minus', 'Equal', 'BracketLeft', 'BracketRight', 
                                    'Backslash', 'Semicolon', 'Quote', 'Comma', 'Period', 'Slash', 'Space'];
    const specialSymbolsMap = createMap(specialSymbols, specialSymbolsNames);
    for(const element of elements) {
        if(alphabet.includes(element.textContent)) {
            element.dataset.eventCode = `Key${element.textContent.toUpperCase()}`;
        } else if(digits.includes(element.textContent)) {
            element.dataset.eventCode = `Digit${element.textContent.toUpperCase()}`;
        } else if(specialSymbolsMap.has(element.textContent)) {
            const value = specialSymbolsMap.get(element.textContent);
            element.dataset.eventCode = value;
        }
    }
}
function createMap(elements, elementNames) {
    let map = new Map();
    for (let i = 0; i < elements.length; i++) {
        map.set(elements[i], elementNames[i]);
    }
    return map;
}
addEventCodeProperty(allSimpleElements); ///////////////////////////////////
console.log(allSimpleElements);


// Event listener (don't neeed it now)

document.addEventListener('keydown', function(event) {

    for(let elem of allSimpleElements){
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.add('active');
            textarea.textContent += event.key;
        }   
    }
    for(let elem of allSpecialElements){
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.add('active');
            //textarea.textContent += event.key;
        }   
    }
    //if(activeElement) activeElement.classList.add('active');
    // for(element of allElements) {
    //     if()
    // }
    // input elements on textarea

    //if (event.altKey && (event.ctrlKey || event.metaKey)) {
    if(event.shiftKey && event.ctrlKey) {
      if(language === 'english') {
        changeElementLanguage(firstRowElements, 'йцукенгшўзх\'\\');
        language = 'belarusian';
      } else if(language === 'belarusian') {
        changeElementLanguage(firstRowElements, 'qwertyuiop[]\\');
        language = 'english';
      }
    }
    else if(event.code === 'CapsLock') {
        if(isCapsLockActive){
            changeLettersCase(allSimpleElements, 'lower');
            capsLock.classList.remove('active');
            isCapsLockActive = false;
        } else {
            changeLettersCase(allSimpleElements, 'upper');
            capsLock.classList.add('active');
            isCapsLockActive = true;
        }
    }
    else if(event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        changeLettersCase(allSimpleElements, 'upper');
    } //else {
    //     console.log(event.code);
    //     textarea.textContent += event.key;
    // }
});

document.addEventListener('keyup', function(event){
    //console.log(event.code);
    if(event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        changeLettersCase(firstRowElements, 'lower');
    }
    for(let elem of allSimpleElements){
        //console.log(elem);
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.remove('active');
        }   
    }
    for(let elem of allSpecialElements){
        if(elem.dataset.eventCode && elem.dataset.eventCode === event.code) {
            elem.classList.remove('active');
            //textarea.textContent += event.key;
        }   
    }
})