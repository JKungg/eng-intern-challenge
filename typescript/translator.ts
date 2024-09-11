// Define Braille mappings for letters and numbers
const brailleToEnglish: { [key: string]: string } = {
    'O.....': 'a', 'O.O...': 'b', 'OO....': 'c', 'OO.O..': 'd', 'O..O..': 'e',
    'OOO...': 'f', 'OOOO..': 'g', 'O.OO..': 'h', '.OO...': 'i', '.OOO..': 'j',
    'O...O.': 'k', 'O.O.O.': 'l', 'OO..O.': 'm', 'OO.OO.': 'n', 'O..OO.': 'o',
    'OOO.O.': 'p', 'OOOOO.': 'q', 'O.OOO.': 'r', '.OO.O.': 's', '.OOOO.': 't',
    'O...OO': 'u', 'O.O.OO': 'v', '.OOO.O': 'w', 'OO..OO': 'x', 'OO.OOO': 'y',
    'O..OOO': 'z', '......': ' ' // Space
};

// Special characters and symbols
const capitalFollows = '..O...'; // Capitalization symbol
const numberFollows = 'O.OOOO'; // Number symbol

// Braille mappings for numbers (0-9), activated after the number follows symbol
const brailleNumbers: { [key: string]: string } = {
    'O.....': '1', 'O.O...': '2', 'OO....': '3', 'OO.O..': '4', 'O..O..': '5',
    'OOO...': '6', 'OOOO..': '7', 'O.OO..': '8', '.OO...': '9', '.OOO..': '0'
};

const englishToBraille: { [key: string]: string } = {
    'a': 'O.....', 'b': 'O.O...', 'c': 'OO....', 'd': 'OO.O..', 'e': 'O..O..',
    'f': 'OOO...', 'g': 'OOOO..', 'h': 'O.OO..', 'i': '.OO...', 'j': '.OOO..',
    'k': 'O...O.', 'l': 'O.O.O.', 'm': 'OO..O.', 'n': 'OO.OO.', 'o': 'O..OO.',
    'p': 'OOO.O.', 'q': 'OOOOO.', 'r': 'O.OOO.', 's': '.OO.O.', 't': '.OOOO.',
    'u': 'O...OO', 'v': 'O.O.OO', 'w': '.OOO.O', 'x': 'OO..OO', 'y': 'OO.OOO',
    'z': 'O..OOO', ' ': '......', '1': numberFollows + 'O.....', '2': numberFollows + 'O.O...',
    '3': numberFollows + 'OO....', '4': numberFollows + 'OO.O..', '5': numberFollows + 'O..O..',
    '6': numberFollows + 'OOO...', '7': numberFollows + 'OOOO..', '8': numberFollows + 'O.OO..',
    '9': numberFollows + '.OO...', '0': numberFollows + '.OOO..'
};

// Detect if the input is Braille or English
function isBraille(input: string): boolean {
    return /^[O\.]{6}(\s[O\.]{6})*$/.test(input);
}

// Function to translate Braille to English
function brailleToText(braille: string): string {
    let isNumber = false;
    let capitalizeNext = false;
    return braille.split(' ').map(code => {
        if (code === capitalFollows) {
            capitalizeNext = true; // Capitalize the next letter
            return '';
        }
        if (code === numberFollows) {
            isNumber = true; // Number mode, all following symbols are numbers
            return '';
        }
        if (isNumber) {
            isNumber = false; // Only for next character
            return brailleNumbers[code] || '';
        }
        let letter = brailleToEnglish[code] || '';
        if (capitalizeNext) {
            letter = letter.toUpperCase();
            capitalizeNext = false;
        }
        return letter;
    }).join('');
}

// Function to translate English to Braille
function textToBraille(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[A-Z]/.test(char)) {
            result += capitalFollows + ' ' + englishToBraille[char.toLowerCase()] + ' ';
        } else if (/[0-9]/.test(char)) {
            result += englishToBraille[char] + ' ';
        } else {
            result += (englishToBraille[char] || '') + ' ';
        }
    }
    return result.trim();
}

// Main function to handle the translation
function translate(input: string): string {
    if (isBraille(input)) {
        return brailleToText(input);
    } else {
        return textToBraille(input);
    }
}

// Capture input from command line arguments
const input = process.argv[2];
if (!input) {
    console.error("Please provide a string to translate.");
    process.exit(1);
}

// Output the translated result
console.log(translate(input));