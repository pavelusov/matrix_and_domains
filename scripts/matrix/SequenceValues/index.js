define('SequenceValues', [], function () {
    return class SequenceValues {
        constructor(sizeMatrix, percentOfUnits) {
            this._items = new Array(sizeMatrix);
            this._numberOfUnits = Math.round(sizeMatrix * percentOfUnits);
            this._sortConcentration = sizeMatrix - this._numberOfUnits;
            this._emptyItemCount = this._items.length;
            this._unitsCount = this._numberOfUnits;
        }
        
        fill() {
            // заполняем "последовательность" сначала 1-ми, потом 0-ми
            while(this._emptyItemCount--){
                if (this._unitsCount > 0) {
                    this._items[this._emptyItemCount] = 1;
                    this._unitsCount--;
                    continue;
                }
                this._items[this._emptyItemCount] = 0;
            }
        }
        sort() {
            // распределяем единицы по последовательности
            for (let i = 0; i < this._sortConcentration; i++) {
                this._items.sort((a, b) => {
                    return Math.random() - 0.5;
                });
            }
        }
        get values() {
            if (this._emptyItemCount === -1) {
                return this._items;
            }
            this.fill();
            this.sort();
            return this._items;
        }
    };
});
