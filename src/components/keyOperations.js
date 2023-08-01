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
    
    return;
}

export { createKeys, createSpecialKey, insertKeys };