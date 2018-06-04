define('fillMatrix', [], function () {
    return function (matrix, sequenceValues) {
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
});
