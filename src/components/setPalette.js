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

function setPalette(palette) {
    if(!palette || palette === 'basic') {  
        document.documentElement.style.setProperty('--key-color', keyColor);
        document.documentElement.style.setProperty('--special-key-color', specialKeyColor);
        document.documentElement.style.setProperty('--active-color', activeColor);
        document.documentElement.style.setProperty('--key-text-color', keyTextColor);
    } else if(palette === 'custom') {
        document.documentElement.style.setProperty('--key-color', customKeyColor);
        document.documentElement.style.setProperty('--special-key-color', customSpecialKeyColor);
        document.documentElement.style.setProperty('--active-color', customActiveColor);
        document.documentElement.style.setProperty('--key-text-color', customKeyTextColor);
        localStorage.setItem('palette', 'custom');
    }
    
    return;
}

export { setPalette };