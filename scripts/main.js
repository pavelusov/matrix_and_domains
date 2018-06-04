require.config({
    paths: {
        "Input": "input/index",
        "validate": "validate/index",
        "createEmptyMatrix": "matrix/createEmptyMatrix/index",
        "fillMatrix": "matrix/fillMatrix/index",
        "SequenceValues": "matrix/SequenceValues/index"
    }
});

require([
        'validate',
        'createEmptyMatrix',
        'fillMatrix',
        'SequenceValues'
    ],
    function (validate,
              createEmptyMatrix,
              fillMatrix,
              SequenceValues) {

        let n = 3;
        let m = 3;
        let sizeMatrix = n * m;
        let btnCreateMatrix = document.querySelector('.js-btn-create-matrix');
        let matrixForm = document.getElementById('matrixForm');

        // Навешиваем слушатель на форму
        matrixForm.addEventListener('input', validate);

        // ** AUTO FILL **

        // create array[size]
        // создаем последовательность значений размерно нашей будущей матрицы
        let percentOfUnits = 0.2;
        const sequence = new SequenceValues(sizeMatrix, percentOfUnits);

        // -- Заполняем матрицу с вероятностью заполнения единицами
        if (percentOfUnits > 0.01 && percentOfUnits < 0.99) {
            let autoMatrixWithProbability = createEmptyMatrix(n, m);
            fillMatrix(autoMatrixWithProbability, sequence.values);
        }

        // -- Заполняем матрицу рандомными значениями
        if (typeof percentOfUnits === 'undefined') {
            let autoMatrix = createEmptyMatrix(n, m);
            fillMatrix(autoMatrix);
        }

        // MANUAL FILL
        // make matrix
        const N = 6;
        const M = 5;

        let matrix = [ // 6 * 5
            [1,0,0,0,1,0],// N
            [1,1,0,0,0,1],
            [0,0,0,0,0,0],
            [0,0,0,0,0,1],
            [0,0,0,0,0,1]
        ];// M


        let numberBlock = 2;

        let abstractMatrix = [new Array(6),new Array(6),new Array(6),new Array(6),new Array(6)];

        let matrix1 = [
            [1,0,0,],
            [1,1,1,],
            [0,0,1,]
        ];
        calculateDomains(matrix);


        function calculateDomains(matrix) {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix.length; j++) {
                    if (matrix[i][j] === 1) {
                        matrix[i][j] = numberBlock;
                        isStartBlock(i,j,matrix);
                        numberBlock++;
                    }
                }
            }
        }

        function isStartBlock(i,j,matrix) {
            abstractMatrix[i][j] = numberBlock;
            if (j+1 < matrix.length && matrix[i][j+1]>0 && matrix[i][j+1]!== numberBlock) {
                matrix[i][j+1] = numberBlock;
            }
            if (j-1 >= 0 && matrix[i][j-1]>0 && matrix[i][j-1]!== numberBlock) {
                matrix[i][j-1] = numberBlock;
            }
            if (i+1 < matrix.length && matrix[i+1][j]>0 && matrix[i+1][j] !== numberBlock) {
                matrix[i+1][j] = numberBlock;
            }
            if (i-1 >= 0  && matrix[i-1][j]>0 && matrix[i-1][j] !== numberBlock) {
                matrix[i-1][j] = numberBlock;
            }

            // если данного числа есть соседи по горизонтали или вертикали вызываем метод isStartBlock для соседнего числа
            // (if this number has neighbors either horizontally or vertically isStartBlock call the number for the neighboring)
            if (j+1 < matrix.length && matrix[i][j+1] === numberBlock && abstractMatrix[i][j+1] !== numberBlock)
                isStartBlock(i, j + 1, matrix);
            if (i+1 < matrix.length && matrix[i+1][j] === numberBlock && abstractMatrix[i+1][j] !== numberBlock)
                isStartBlock(i + 1, j, matrix);
            if (j-1 > 0 && matrix[i][j-1] === numberBlock && abstractMatrix[i][j-1] !== numberBlock)
                isStartBlock(i, j - 1, matrix);
            if (i-1 > 0 && matrix[i-1][j] === numberBlock && abstractMatrix[i-1][j] !== numberBlock)
                isStartBlock(i - 1, j, matrix);

        }

        console.log(abstractMatrix, 'abstractMatrix');
        console.log(matrix, 'matrix');
    }
);
