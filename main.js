// ----menu----
// 1.declare variables
// 2.contruct Calculator class
// 3.declare and addEventListener 



// variables declared
const outputPrevious = document.querySelector('[dataPreviousOperand]');
const outputCurrent = document.querySelector('[dataCurrentOperand]');
const deleteButton = document.querySelector('[dataDelete]');
const allClearButton = document.querySelector('[dataAllClear]');
const equalButton = document.querySelector('[dataEqual]');
const numberButton = document.querySelectorAll('[dataNumber]');
const operatorButton = document.querySelectorAll('[dataOperator]');

//contruct class calculator
class Calculator {
    constructor(outputCurrent, outputPrevious) {
        this.outputCurrent = outputCurrent;
        this.outputPrevious = outputPrevious;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.outputCurrentCalculator = '';
        this.outputPreviousCalculator = '';
        this.operator = undefined;
    }

    delete() {
        this.outputCurrentCalculator = this.outputCurrentCalculator.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.outputCurrentCalculator.includes('.')) return;
        this.outputCurrentCalculator = this.outputCurrentCalculator.toString() + number.toString();

    }

    chooseOperation(operator) {
        if(this.outputCurrentCalculator === '') return;
        if(this.outputPreviousCalculator !== '') {
            this.compute();
        }
        this.operator = operator;
        this.outputPreviousCalculator = this.outputCurrentCalculator;
        this.outputCurrentCalculator = '';

    }

    compute() {
        let computation;
        const prev = parseFloat(this.outputPreviousCalculator);
        const curr = parseFloat(this.outputCurrentCalculator);
        
        if(isNaN(prev) || isNaN(curr)) return;

        switch (this.operator) {
            case '+':
              computation = prev + curr;
              break
            case '-':
              computation = prev - curr;
              break
            case '*':
              computation = prev * curr;
              break
            case '÷':
              computation = prev / curr;
              break
            default:
              return
        }
          this.readyToReset = true;
          this.outputCurrentCalculator = computation; //toString??
          this.operator = undefined;
          this.outputPreviousCalculator = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits =  parseFloat(stringNumber.split('.')[0]);
        const decimalDigits =  stringNumber.split('.')[1];
        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = '';
        }else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else {
            return integerDisplay;
        }

    }

    updateDisplay() {
        this.outputCurrent.innerText = this.getDisplayNumber(this.outputCurrentCalculator);
        if(this.operator != null) {
            this.outputPrevious.innerText = `${this.getDisplayNumber(this.outputPreviousCalculator)} ${this.operator}`;
        }else {
            this.outputPrevious.innerText = '';
        }
    }
}

//declare calculator and add eventlistener
const calculator = new Calculator(outputCurrent, outputPrevious);

numberButton.forEach(button => {
    button.addEventListener('click', () => {

        if (calculator.outputPreviousCalculator === '' && calculator.outputCurrentCalculator !== '' && calculator.readyToReset) {
            calculator.readyToReset = false;
            calculator.outputCurrentCalculator = '';
        }

        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();                     

    })
});

operatorButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();

    })
});

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();                                  
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();                                  
    calculator.updateDisplay();
})