define('Input', [], function () {
    return class Input {
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
        get notNumber() {
            const error = this.getAttr('errorNotNumber');
            return {error};
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
                return true;
            }
            this.showError(text);
            return false;
        }
    }
});
