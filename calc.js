const displayCurrent = document.getElementById('current');
const displayPrevious = document.getElementById('previous');
const buttons = Array.from(document.querySelectorAll('button'));

let currentOperand = '';
let previousOperand = '';
let operator = '';

const updateDisplay = () => {
    displayCurrent.textContent = currentOperand;
    if (operator) {
        displayPrevious.textContent = `${previousOperand} ${operator}`;
    } else {
        displayPrevious.textContent = '';
    }
};

const appendNumber = (number) => {
    if (number === ',' && !currentOperand.includes(',')) {
        currentOperand += number;
    } else if (number !== ',') {
        currentOperand += number;
    }
    updateDisplay();
};

const setOperator = (op) => {
    if (currentOperand === '' && op !== '+/-') return;
    if (operator && currentOperand) {
        calculate();
    }
    previousOperand = currentOperand;
    currentOperand = '';
    operator = op;
    updateDisplay();
};

const calculate = () => {
    let result;
    const prev = parseFloat(previousOperand.replace(',', '.'));
    const current = parseFloat(currentOperand.replace(',', '.'));
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'X':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    currentOperand = result.toString().replace('.', ',');
    operator = '';
    previousOperand = '';
    updateDisplay();
};

const toggleSign = () => {
    if (currentOperand) {
        currentOperand = (parseFloat(currentOperand.replace(',', '.')) * -1).toString().replace('.', ',');
        updateDisplay();
    }
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'C') {
            currentOperand = '';
            previousOperand = '';
            operator = '';
            updateDisplay();
        } else if (button.textContent === 'CE') {
            currentOperand = '';
            updateDisplay();
        } else if (button.classList.contains('operator')) {
            if (button.textContent === '=') {
                calculate();
            } else {
                setOperator(button.textContent);
            }
        } else if (button.textContent === '+/-') {
            toggleSign();
        } else {
            appendNumber(button.textContent);
        }
    });
});
