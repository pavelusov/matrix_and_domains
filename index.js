"use strict";
window.onload = function (ev) {
    let isValidForm = false;
    let n = 3;
    let m = 3;
    let btnCreateMatrix = document.querySelector('.js-btn-create-matrix');
    let matrixForm = document.getElementById('matrixForm');

    // Навешиваем слушатель на форму
    matrixForm.addEventListener('input', validate);

    let size = n * m;

// ** AUTO FILL **

// create array[size]
// создаем последовательность значений размерно нашей будущей матрицы
    const allElementsMatrix = new Array(size);
    let lengthAllElements = allElementsMatrix.length;


// -- Заполняем матрицу с вероятностью заполнения единицами
// вероятность заполнения матрицы единицами
    let percentOne;

    if (percentOne > 0.01 && percentOne < 0.99) {

        // кол-во единиц в массиве
        let lengthOnes = Math.round(size * percentOne);
        let sortConcentration = lengthOnes;

        // fill values in allElementsMatrix
        // заполняем "последовательность" сначала 1-ми, потом 0-ми
        while(lengthAllElements--) {
            if (lengthOnes > 0 ) {
                allElementsMatrix[lengthAllElements] = 1;
                lengthOnes--;
                continue;
            }
            allElementsMatrix[lengthAllElements] = 0;
        }
        // распределяем еденицы по последовательности
        for (let i = 0; i < sortConcentration; i++) {
            allElementsMatrix.sort(function (a, b) {
                return Math.random() - 0.5;
            });
        }

        let autoMatrixWithProbability = createEmptyMatrix();

        fillMatrix(autoMatrixWithProbability, allElementsMatrix);
        console.log(autoMatrixWithProbability)
    }

// -- Заполняем матрицу рандомными значениями

    if (typeof percentOne === 'undefined') {

        let autoMatrix = createEmptyMatrix();
        fillMatrix(autoMatrix);
        console.log(autoMatrix);
    }



// MANUAL FILL
// make matrix

    function fillMatrix(matrix, sequenceValues) {
        if (!matrix.length && !sequenceValues.length ) {
            return;
        }

        let n = matrix.length;
        let m = matrix[0].length;

        if (sequenceValues) {
            (function () {
                let sequence = sequenceValues.slice(0);
                // если размерность матрицы и длина элементов совпадают
                if (n*m === sequenceValues.length) {
                    forRecursion(matrix, n, m, sequence);
                }
            })();
        }

        forRecursion(matrix, n, m);

        function forRecursion(array, n, m, values) {
            if (n === 0) {
                return;
            }
            let index = array.length - n;
            for (let i = 0; i < m; i++) {
                array[index][i] = values ? values.shift() : random(0, 1);
            }

            function random(min, max) {
                let rand = min - 0.5 + Math.random() * (max - min + 1);
                return Math.abs(Math.round(rand));
            }

            return forRecursion(array, n - 1, m, values)
        }
    }

    function createEmptyMatrix() {
        let matrix = new Array(n);
        // n fill
        for (let i = 0; i < n; i++) {
            // m fill
            matrix[i] = new Array(m);
        }
        return matrix;
    }
};

class Input {
    constructor(e) {
        this.target = e;
        this.value = e.value;
        this.data = e.dataset;
        this.errorElement = e.nextElementSibling;
    }

    getAttr(key) {
        return this.data[key];
    }

    getValueRange(attrValue, attrErr) {
        const value = this.getAttr(attrValue);
        const error = `${this.getAttr(attrErr)} ${value}`;
        return {value, error};
    }

    get min() {
        return this.getValueRange('min', 'errorMin');
    }
    get max() {
        return this.getValueRange('max', 'errorMax');
    }

    showError(text) {
        this.errorElement.innerText = text;
        this.target.classList.add('hasError');
    }
    hideError() {
        this.target.classList.remove('hasError');
        this.errorElement.innerText = '';
    }
    validate(getText) {
        let text = getText(this);
        if (typeof text !== 'string') {
            this.hideError();
            return;
        }
        this.showError(text);
    }
}

// Validation
function validate(event) {
    event.stopPropagation();

    const inp = new Input(event.target);
    inp.validate(getTextError);

    function getTextError(instance) {

        const patternInt = /^[1-9]\d*/;
        const patternIntZero = /^0$/;
        const patternFloat = /^0\.\d+/;
        const patternFloatZeroDot = /^0\.?$/;
        const patternIsFloat = /^0\.\d?/;
        const patternFloatZeroDotZero = /^0\.0$/;
        let valueInt = -1;

        const isFloat = patternIsFloat.test(instance.min.value);

        // empty value
        if (instance.value === "") {
            return;
        }

        // 0
        if (!isFloat && patternIntZero.test(instance.value)) {
            return instance.min.error;
        }

        // 0. or 0.0
        if (isFloat && (patternFloatZeroDot.test(instance.value) || patternFloatZeroDotZero.test(instance.value))) {
            return;
        }

        // int
        if (patternInt.test(instance.value)) {
            valueInt =  patternInt.exec(instance.value)[0];
            valueInt = parseInt(valueInt);
        }

        // float
        if (isFloat && patternFloat.test(instance.value)) {
            console.log('float');
            valueInt =  patternFloat.exec(instance.value)[0];
            valueInt = parseFloat(valueInt);
        }

        // return text error
        if (valueInt < instance.min.value) {
            return instance.min.error;
        }

        if (valueInt > instance.max.value) {
            return instance.max.error;
        }
    }
}
