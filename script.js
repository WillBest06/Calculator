const numBTNs = document.querySelectorAll('.numBTN');
const acBTN = document.querySelector('.acBTN');
const fullEquation = document.querySelector('#fullEquation');
const currentOperation = document.querySelector('#currentOperation');
const operatorBTNs = document.querySelectorAll('.operatorBTN');
const equalsBTN = document.querySelector('.equalsBTN');
const percentageBTN = document.querySelector('#percentageBTN');
const backspaceBTN = document.querySelector('#backspaceBTN');

let operator;
let operand1;
let operand2;

function addNumberToDisplay(button) {
    if (fullEquation.value != '' && fullEquation.value.includes('=')) {
        fullEquation.value = '';
        currentOperation.value = '';
    }

    currentOperation.value += button.textContent;
}

function setOperator(button) {
    if (currentOperation.value === '') return;

    fullEquation.value = '';

    if (operator === undefined && operand1 === undefined) {
        operand1 = Number(currentOperation.value);
        fullEquation.value += operand1;
        operator = button.textContent;
        fullEquation.value += operator;
        currentOperation.value = '';
    }
}

function AC() {
    fullEquation.value = '';
    currentOperation.value = '';
    operator = undefined;
    operand1 = undefined;
    operand2 = undefined;
}

function operate() {
    if (operator === undefined) return currentOperation.value;

    operand2 = Number(currentOperation.value);
    fullEquation.value += (operand2 + '=');

    if (isNaN(operand1) || isNaN(operand2)) {
        operator = undefined;
        operand1 = undefined;
        operand2 = undefined;
        return currentOperation.value;
    }

    if (operator === undefined) return;

    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
    }
}

function numAsPercentage() {
    fullEquation.value = `${currentOperation.value} as a decimal = `;
    currentOperation.value = Number(currentOperation.value) / 100;
}

function backspace() {
    currentOperation.value = currentOperation.value.slice(0, currentOperation.value.length - 1); // excludes the last char in str

    if (currentOperation.value === '') {
        fullEquation.value = '';
    }
}

numBTNs.forEach((button) => 
    button.addEventListener('click', () => addNumberToDisplay(button))
);

operatorBTNs.forEach((button) => 
    button.addEventListener('click', () => setOperator(button)) 
);

acBTN.addEventListener('click', () => AC());

percentageBTN.addEventListener('click', () => numAsPercentage());

equalsBTN.addEventListener('click', () => {
    currentOperation.value = operate(operator);
    operator = undefined;
    operand1 = undefined;
    operand2 = undefined;
})

backspaceBTN.addEventListener('click', () => backspace());