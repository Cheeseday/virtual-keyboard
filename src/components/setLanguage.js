const zeroRowValues = '`1234567890-=';
const zeroRowValuesBel = 'ё1234567890-=';
const firstRowValues = 'qwertyuiop[]\\';
const firstRowValuesBel = 'йцукенгшўзх\'\\';
const secondRowValues = 'asdfghjkl;\'';
const secondRowValuesBel = 'фывапролджэ';
const thirdRowValues = 'zxcvbnm,./';
const thirdRowValuesBel = 'ячсмітьбю.';

function setLanguage(language) {
    const [zeroRow, firstRow, secondRow, thirdRow] = document.querySelectorAll('.row');
    const zeroRowElements = zeroRow.querySelectorAll('.simple-key');
    const firstRowElements = firstRow.querySelectorAll('.simple-key');
    const secondRowElements = secondRow.querySelectorAll('.simple-key');
    const thirdRowElements = thirdRow.querySelectorAll('.simple-key');

    if(!language || language === 'english') {
        changeLanguage(zeroRowElements, zeroRowValues);
        changeLanguage(firstRowElements, firstRowValues);
        changeLanguage(secondRowElements, secondRowValues);
        changeLanguage(thirdRowElements, thirdRowValues);
    } else if(language === 'belarusian') {
        changeLanguage(zeroRowElements, zeroRowValuesBel);
        changeLanguage(firstRowElements, firstRowValuesBel);
        changeLanguage(secondRowElements, secondRowValuesBel);
        changeLanguage(thirdRowElements, thirdRowValuesBel);
    }

    return;
}

function changeLanguage(elements, valueStr) {
    const valueArray = valueStr.split('');
    for(let i = 0; i < elements.length; i++) {
        elements[i].textContent = valueArray[i];
    }

    return;
}

export { setLanguage, zeroRowValues, firstRowValues, secondRowValues, thirdRowValues };