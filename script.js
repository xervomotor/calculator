const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const screen = document.querySelector('.screen');

// define some state variables
let currentInput = '';
let storedNum = null;
let currentOperator = null;
let operationDone = false;

numberBtns.forEach( btn => 
    btn.addEventListener('click', () => appendInput(btn.textContent)) 
    );
operatorBtns.forEach( btn => 
    btn.addEventListener('click', () => appendOperator(btn.textContent))
    )
equalsBtn.addEventListener('click', showResult);
clearBtn.addEventListener('click', clearScreen);

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function operate(x, y, operator) {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '×':
            return multiply(x, y);
        case '÷':
            if (y === 0) {
                return null 
            } else {
                return divide(x, y);
            }
        default: 
            return null;
    }
}

function appendInput(input) {
    screen.textContent += input;
    currentInput += input;
}

function appendOperator(input) {
    if (!screen.textContent) return;
    const lastChar = screen.textContent.slice(-1);
    if (isOperator(lastChar)) {
        screen.textContent = screen.textContent.slice(0, -1) + input;
        currentOperator = input;
    } else if (!currentOperator) {
        storedNum = parseFloat(currentInput);
        currentInput = '';
        screen.textContent += input;
        currentOperator = input;
    }
}

function showResult() {
    if (storedNum !== null && currentOperator && currentInput) {
        let result = operate(storedNum, parseFloat(currentInput), currentOperator);
        screen.textContent = result.toString();
        resetValues();
    } 
}

function resetValues() {
    currentInput = '';
    storedNum = null;
    currentOperator = null;
}

function clearScreen() {
    screen.textContent = '';
    resetValues();
}

function isOperator(input) {
    return ['+', '-', '×', '÷'].includes(input);
}