"use strict";
const navMenuTarget = document.getElementById('navbar__solid-bg');
const burgerTrigger = document.getElementById('burger__btn');
const navLink = document.querySelectorAll('[aria-current]');
const url = document.URL.slice(21);
for (let i = 0; i < navLink.length; i++) {
    if (navLink[i].getAttribute('href') === url) {
        navLink[i].classList.add('current-page');
    }
}
burgerTrigger?.addEventListener('click', () => {
    if (burgerTrigger.getAttribute('aria-expanded') === 'false') {
        burgerTrigger.setAttribute('aria-expanded', 'true');
        navMenuTarget?.classList.remove('hidden');
        navMenuTarget?.classList.add('block');
    }
    else {
        burgerTrigger.setAttribute('aria-expanded', 'false');
        navMenuTarget?.classList.remove('block');
        navMenuTarget?.classList.add('hidden');
    }
});
window.addEventListener('resize', (_e) => {
    if (window.innerWidth > 767 &&
        burgerTrigger?.getAttribute('aria-expanded') === 'true') {
        burgerTrigger?.setAttribute('aria-expanded', 'false');
        navMenuTarget?.classList.remove('block');
        navMenuTarget?.classList.add('hidden');
    }
});
const validationForms = document.querySelectorAll('.validated-form');
const inputs = document.getElementsByTagName('input');
const textAreaInput = document.getElementsByClassName('textarea-input');
Array.from(inputs).forEach((input) => {
    const inputError = document.querySelector(`[for="${input.id}"] + span.error`);
    input?.addEventListener('input', (_event) => {
        if (input.validity.valid && inputError !== null) {
            inputError.textContent = '';
            input.classList.add('error');
        }
        if (!input.validity.valid && inputError !== null) {
            showError(input, inputError);
        }
    });
});
Array.from(textAreaInput).forEach((textarea) => {
    const inputError = document.querySelector(`[for="${textarea.id}"] + span.error`);
    textarea?.addEventListener('input', (_event) => {
        if (textarea.validity.valid && inputError !== null) {
            inputError.textContent = '';
            textarea.classList.add('error');
        }
        if (!textarea.validity.valid && inputError !== null) {
            showError(textarea, inputError);
        }
    });
});
Array.from(textAreaInput).forEach((textarea) => {
    const inputError = document.querySelector(`[name="review[${textarea.id}]"] + span.error`);
    textarea?.addEventListener('input', (_event) => {
        if (textarea.validity.valid && inputError !== null) {
            inputError.textContent = '';
            textarea.classList.add('error');
        }
        if (!textarea.validity.valid && inputError !== null) {
            showError(textarea, inputError);
        }
    });
});
Array.from(validationForms).forEach((form) => {
    form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            Array.from(inputs).forEach((input) => {
                const inputError = document.querySelector(`[for="${input.id}"] + span.error`);
                if (inputError !== null) {
                    showError(input, inputError);
                }
            });
            Array.from(textAreaInput).forEach((textarea) => {
                const inputError = document.querySelector(`[for="${textarea.id}"] + span.error`);
                if (inputError !== null) {
                    showError(textarea, inputError);
                }
            });
            Array.from(textAreaInput).forEach((textarea) => {
                const inputError = document.querySelector(`[name="review[${textarea.id}]"] + span.error`);
                if (inputError !== null) {
                    showError(textarea, inputError);
                }
            });
            event.preventDefault();
        }
    });
});
const showError = (input, inputError) => {
    if (input.validity.valueMissing) {
        inputError.textContent = `You need to enter ${input.id}`;
    }
    if (input.validity.typeMismatch) {
        inputError.textContent = 'Entered value needs to be correct';
    }
    inputError.classList.add('active');
};
const reviewTextarea = document.querySelector('[aria-limit-textarea]');
const limitCharacter = reviewTextarea?.getAttribute('maxlength');
const countCurr = document.getElementById('count-current');
const countMax = document.getElementById('count-maximum');
if (countMax != null && limitCharacter != null) {
    countMax.textContent = limitCharacter;
}
reviewTextarea?.addEventListener('input', (e) => {
    if (countCurr != null)
        countCurr.textContent = e.target.value.length;
});
const rangeRating = document.querySelector('#range-rating');
const outputRangeRating = document.querySelector('.range-output');
const rangeRatingOutput = (size) => {
    if (outputRangeRating !== null) {
        outputRangeRating.textContent = '';
        for (let i = 1; i <= size; i++) {
            const span = document.createElement('span');
            span.innerHTML = ' ⭐️ ';
            outputRangeRating.appendChild(span);
        }
    }
};
if (rangeRating != null) {
    rangeRatingOutput(+rangeRating.value);
    rangeRating.oninput = (e) => {
        rangeRatingOutput(e.target.value);
    };
}
const Default = {
    triggerEl: null,
    transition: 'transition-opacity',
    duration: 300,
    timing: 'ease-out'
};
class Dismiss {
    _targetEl;
    _options;
    constructor(targetEl, options) {
        this._targetEl = targetEl;
        this._options = { ...Default, ...options };
    }
    hide() {
        this._targetEl.classList.add(this._options.transition, `duration-${this._options.duration}`, this._options.timing, 'opacity-0');
        setTimeout(() => {
            this._targetEl.classList.add('hidden');
        }, this._options.duration);
    }
}
const successAlertMsg = document.getElementById('success-alert');
const successAlertBtn = document.querySelector('button[data-dismiss-target="#success-alert"]');
successAlertBtn?.addEventListener('click', () => {
    const options = {
        transition: 'transition-opacity',
        duration: 200,
        timing: 'ease-out'
    };
    if (successAlertMsg == null)
        return;
    const dismiss = new Dismiss(successAlertMsg, options);
    dismiss.hide();
});
//# sourceMappingURL=index.js.map