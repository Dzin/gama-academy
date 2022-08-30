// Global variables
let result, operator, stringNumber, equal;
const display = document.querySelector('#display');

// Handle click reset
const handleClickReset = () => {
    display.innerHTML = '';
    result = 0;
    operator = undefined;
    stringNumber = '';
    equal = false;
}

// Handle click clean
const handleClickClean = () => {
    if (stringNumber.length > 0) {
        stringNumber = '';
        display.innerHTML = stringNumber;
    }
}

// Handle click delete
const handleClickDel = () => {
    if (stringNumber.length > 0) {
        stringNumber = stringNumber.slice(0, stringNumber.length - 1);
        display.innerHTML = stringNumber;
    }
}

// Handle click negate
const handleClickNeg = () => {
    if (stringNumber.length > 0) {
        if (parseFloat(stringNumber) > 0) {
            stringNumber = '-' + stringNumber;
            display.innerHTML = stringNumber;
        } else {
            stringNumber = stringNumber.replace('-', '');
            display.innerHTML = stringNumber;
        }
    } else {
        if (equal) {
            result *= -1;
            display.innerHTML = result;
        }
    }
}

// Handle click input
const handleClickInput = (input) => {
    if (stringNumber.length === 0) {
        if (equal) {
            handleClickReset();
        } else {
            display.innerHTML = '';
        }
    }

    if (input === 0 && stringNumber.length === 0) {
        return;
    }

    if (input === '.') {
        if (stringNumber.includes('.')) {
            return;
        } else {
            if (stringNumber.length === 0) {
                display.innerHTML += '0';
                stringNumber += '0';
            }
        }
    }

    equal = false;
    display.innerHTML += input;
    stringNumber += input;
}

// Handle click operator
const handleClickOperator = (op) => {
    if (stringNumber.length > 0) {
        if (!equal) {
            if (operator === undefined) {
                result = parseFloat(stringNumber);
            } else {
                result = calculate(result, parseFloat(stringNumber), operator);
                display.innerHTML = result;
            }
        }
    }

    equal = false;
    stringNumber = '';
    operator = op;
}

// Handle click equal
const handleClickEqual = () => {
    if (stringNumber.length > 0 && operator !== undefined) {
        equal = true;
        result = calculate(result, parseFloat(stringNumber), operator);
        display.innerHTML = parseFloat(result.toFixed(7));
        stringNumber = '';
    }
}

// Basic math operations
const calculate = (n1, n2, op) => {
    switch (op) {
        case '+':
            return n1 + n2;

        case '-':
            return n1 - n2;

        case '*':
            return n1 * n2;

        case '/':
            return n1 / n2;
    }
}

