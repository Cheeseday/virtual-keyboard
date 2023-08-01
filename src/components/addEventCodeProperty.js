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

    return;
}

function createMap(elements, elementNames) {
    const map = new Map();
    for (let i = 0; i < elements.length; i++) {
        map.set(elements[i], elementNames[i]);
    }

    return map;
}

export { addEventCodeProperty };