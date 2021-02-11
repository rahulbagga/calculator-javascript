const number = document.querySelectorAll(".num");
const previousOutputText = document.querySelector("#previousOutput");
const currentOutputText = document.querySelector("#currentOutput");
const pi = Math.PI.toFixed(8);
const operation = document.querySelectorAll(".basicSymbols, .symbols, pi");
const btnEquals = document.querySelector(".btnEquals");
const btnDEL = document.querySelector(".btnDEL");
const btnAC = document.querySelector(".btnAC");


class Calculator {
    constructor(previousOutput, currentOutput) {
        this.previousOutputText = previousOutputText;
        this.currentOutputText = currentOutputText;
        this.valueHolder;
        this.screenClear();
    }

    screenClear() {
        this.currentOutput = '';
        this.previousOutput = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOutput = this.currentOutput.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOutput.includes(".")) return;
        this.currentOutput = this.currentOutput.toString() + number.toString();
    }

    selectOperation(operation) {
        if (operation === "") return;
        if (operation === "π" && this.currentOutput !== '') {
            this.previousOutput = this.currentOutput;
            this.currentOutput = (pi * parseFloat(this.currentOutput)).toFixed(8);
            this.operation = undefined;
            return;
        }
        if (operation === "π" && this.previousOutput === '') {
            this.currentOutput = pi;
            this.operation = undefined;
            return;
        }
        if (this.previousOutput !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOutput = this.currentOutput;
        this.currentOutput = "";

    }

    calculate() {
        let compute;
        const previous = parseFloat(this.previousOutput);
        const current = parseFloat(this.currentOutput);
        if (isNaN(current)) return;
        if (isNaN(previous)) return;
        switch (this.operation) {
            case "+":
                compute = previous + current;
                break;
            case "-":
                compute = previous - current;
                break;
            case 'x':
                compute = previous * current;
                break;
            case '÷':
                compute = previous / current;
                break;
            case 'Sin':
                compute = Math.sin(current);
                break;
            case 'Cos':
                compute = Math.cos(current);
                break;
            case 'Tan':
                compute = Math.tan(current);
                break;
            case '√':
                compute = Math.sqrt(current);
                break;
            case 'exp':
                compute = Math.exp(current);
                break;
            case 'log':
                compute = Math.log(current);
                break;
            case '%':
                compute = (previous / 100) * current;
                break;
            default:
                return;
        }
        this.currentOutput = compute;
        this.operation = undefined;
        this.previousOutput = "";

    }

    updateDisplay() {
        this.currentOutputText.innerText = this.currentOutput;
        this.previousOutputText.innerText = this.previousOutput;
        if (this.operation === "Sin") {
            this.currentOutputText.innerText = `Sin( ${this.currentOutput}`;
            this.valueHolder = `Sin( ${this.currentOutput}`;
            this.previousOutputText.innerText = "";
            return;
        }
        if (this.operation === "Cos") {
            this.currentOutputText.innerText = `Cos( ${this.currentOutput}`;
            this.valueHolder = `Cos( ${this.currentOutput}`;
            this.previousOutputText.innerText = "";
            return;
        }
        if (this.operation === "Tan") {
            this.currentOutputText.innerText = `Tan( ${this.currentOutput}`;
            this.valueHolder = `Tan( ${this.currentOutput}`;
            this.previousOutputText.innerText = "";
            return;
        }
        if (this.operation === "e") {
            this.currentOutputText.innerText = `exp( ${this.currentOutput}`;
            this.valueHolder = `exp( ${this.currentOutput}`;
            this.previousOutputText.innerText = "";
            return;
        }
        if (this.operation === "log") {
            this.currentOutputText.innerText = `log( ${this.currentOutput}`;
            this.valueHolder = `log( ${this.currentOutput}`;
            this.previousOutputText.innerText = "";
            return;
        }
        if (this.operation === ")") {
            if (this.previousOutput === "") return;
            this.currentOutputText.innerText = `${this.valueHolder} ${this.currentOutput} )`;
            this.currentOutput = this.valueHolder.split("(")[1].split(")")[0];
            this.operation = this.valueHolder.split("(")[0];
            this.previousOutputText.innerText = `${this.operation}`;
            return;
        }
        if (this.operation === "%") {
            this.currentOutputText.innerText = `${this.previousOutput} % ${this.currentOutput}`;
            return;
        }
        if (this.operation === "√") {
            this.currentOutputText.innerText = `${this.operation} ${this.currentOutput}`;
            return;
        }
        if (this.operation != null) {
            this.previousOutputText.innerText = `${this.previousOutput} ${this.operation}`;
        } else {
            this.previousOutputText.innerText = "";
        }
    }
}


let calculator = new Calculator(previousOutputText, currentOutputText);

operation.forEach(function (operation) {
    operation.addEventListener("click", () => {
        calculator.selectOperation(operation.innerText);
        calculator.updateDisplay();
    })
});

number.forEach(function (current) {
    current.addEventListener("click", () => {
        calculator.appendNumber(current.innerText);
        calculator.updateDisplay();
    })
});

btnDEL.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

btnEquals.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});
btnAC.addEventListener("click", () => {
    calculator.screenClear();
    calculator.updateDisplay();
});