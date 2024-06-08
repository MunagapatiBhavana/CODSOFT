document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const operationSelect = document.getElementById('operation-select');
    let displayValue = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = displayValue;
    }

    function handleButtonPress(value) {
        if (!isNaN(value)) {
            if (waitingForSecondOperand) {
                displayValue = value;
                waitingForSecondOperand = false;
            } else {
                displayValue = displayValue === '0' ? value : displayValue + value;
            }
        } else if (value === '.') {
            if (!displayValue.includes('.')) {
                displayValue += '.';
            }
        } else if (value === 'C') {
            displayValue = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
        } else if (value === '=') {
            if (firstOperand !== null && operator !== null) {
                displayValue = String(performCalculation(firstOperand, operator, parseFloat(displayValue)));
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
            }
        } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(value)) {
            displayValue = String(performUnaryCalculation(value, parseFloat(displayValue)));
        } else if (value === '^') {
            if (firstOperand === null) {
                firstOperand = parseFloat(displayValue);
                operator = value;
                waitingForSecondOperand = true;
            }
        } else {
            if (firstOperand === null) {
                firstOperand = parseFloat(displayValue);
            } else if (operator) {
                const result = performCalculation(firstOperand, operator, parseFloat(displayValue));
                displayValue = String(result);
                firstOperand = result;
            }
            operator = value;
            waitingForSecondOperand = true;
        }
        updateDisplay();
    }

    function performCalculation(first, operator, second) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            case '^':
                return Math.pow(first, second);
            default:
                return second;
        }
    }

    function performUnaryCalculation(operator, value) {
        switch (operator) {
            case 'sin':
                return Math.sin(value);
            case 'cos':
                return Math.cos(value);
            case 'tan':
                return Math.tan(value);
            case 'log':
                return Math.log10(value);
            case 'ln':
                return Math.log(value);
            case 'sqrt':
                return Math.sqrt(value);
            default:
                return value;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonPress(button.dataset.value);
        });
    });

    operationSelect.addEventListener('change', () => {
        window.location.hash = '#calculator';
    });
});
