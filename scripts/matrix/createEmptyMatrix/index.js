define('createEmptyMatrix', [], function () {
    return function (n, m) {
        let matrix = new Array(n);
        // n fill
        for (let i = 0; i < n; i++) {
            // m fill
            matrix[i] = new Array(m);
        }
        return matrix;
    }
});
