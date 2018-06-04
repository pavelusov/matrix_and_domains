define('validate', ['Input'], function (Input) {
    return function (event) {
        event.stopPropagation();
        let form = event.currentTarget;
        let buttons = form.querySelectorAll('.js-btn-create-matrix');

        const inp = new Input(event.target);
        let isValid = inp.validate(getTextError);
        if (!isValid) {
            for (let btn of buttons) {
                btn.setAttribute('disabled', 'disabled');
            }
        } else {
            for (let btn of buttons) {
                btn.removeAttribute('disabled');
            }
        }

        function getTextError(instance) {

            const patternInt = /^[1-9]\d*/;
            const patternIntZero = /^0$/;
            const patternFloat = /^0\.\d+/;
            const patternFloatZeroDot = /^0\.?$/;
            const patternIsFloat = /^0\.\d?/;
            const patternFloatZeroDotZero = /^0\.0$/;
            const patternLetters = /[а-яА-Яa-zA-Z]/;
            let valueInt = -1;

            const isFloat = patternIsFloat.test(instance.min.value);

            // empty value
            if (instance.value === "") {
                return;
            }

            // letters
            if (patternLetters.test(instance.value)) {
                return instance.notNumber.error;
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
});
