const numBTNs = document.querySelectorAll('.numBTN');
const acBTN = document.querySelector('.acBTN');
const display = document.querySelector('.inputBox');
const operatorBTNs = document.querySelectorAll('.operatorBTN');
const equalsBTN = document.querySelector('.equalsBTN');
const percentageBTN = document.querySelector('#percentageBTN');

let operator;
let arr;

function addToDisplay(button) {
    display.value += button.textContent;
}

numBTNs.forEach(button => {
    button.addEventListener('click', function (e) {
        addToDisplay(e.target);    
    })
})

operatorBTNs.forEach(button => {
    button.addEventListener('click', function (e) {
        if (operator === undefined) {
            operator = button.textContent;
            addToDisplay(e.target)
        }
    })
})

acBTN.addEventListener('click', function (e) {
    resetCalc(display);
})

percentageBTN.addEventListener('click', function (e) {
    
})


equalsBTN.addEventListener('click', function (e) {
    arr = splitEquationIntoArr(display.value, operator);
    display.value = operate(operator, arr);
    operator = undefined;
    arr = undefined;
})

function resetCalc (display) {
    display.value = '';
    operator = undefined;
    arr = undefined;
}

function operate(operator, arr) {
    const operand1 = Number(arr[0]);
    const operand2 = Number(arr[1]);
    console.log(operand1, operand2);
    
    if (isNaN(operand1) || isNaN(operand2)) {
        operator = undefined;
        arr = undefined;
        return display.value;
    }

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

function splitEquationIntoArr (string, operator) {
    let arr = string.split(operator)

    arr.forEach(element => {
        element = Number(element)
    });

    return arr;
}

function hasOperator (string) {
    const arrOfOps = ['+', '-', '*', '/'];

    for (let char in string) {
        if (char in arrOfOps) return true;
    }

    return false;
}

function numAsPercentage (num) {
    return num / 100;
}