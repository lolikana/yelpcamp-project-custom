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
const errorAlertMsg = document.getElementById('error-alert');
const errorAlertBtn = document.querySelector('button[data-dismiss-target="#error-alert"]');
errorAlertBtn?.addEventListener('click', () => {
    const options = {
        transition: 'transition-opacity',
        duration: 200,
        timing: 'ease-out'
    };
    if (errorAlertMsg == null)
        return;
    const dismiss = new Dismiss(errorAlertMsg, options);
    dismiss.hide();
});
const slider = () => {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');
    let currSlide = 0;
    const maxSlide = slides.length;
    const createDots = function () {
        slides.forEach((_, i) => {
            dotContainer?.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };
    const activatedDot = (slide) => {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));
        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            ?.classList.add('dots__dot--active');
    };
    const goToSlide = (slide) => {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`;
        });
    };
    const nextSlide = () => {
        if (currSlide === maxSlide - 1) {
            currSlide = 0;
        }
        else {
            currSlide++;
        }
        goToSlide(currSlide);
        activatedDot(currSlide);
    };
    const prevSlide = () => {
        if (currSlide === 0) {
            currSlide = maxSlide - 1;
        }
        else {
            currSlide--;
        }
        goToSlide(currSlide);
        activatedDot(currSlide);
    };
    const init = () => {
        goToSlide(0);
        createDots();
        activatedDot(0);
    };
    init();
    btnRight?.addEventListener('click', nextSlide);
    btnLeft?.addEventListener('click', prevSlide);
    document.addEventListener('keydown', function (e) {
        e.key === 'ArrowLeft' && prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });
    dotContainer?.addEventListener('click', function (e) {
        const target = e.target;
        if (target.classList.contains('dots__dot') !== null) {
            const { slide } = target.dataset;
            goToSlide(slide);
            activatedDot(slide);
        }
    });
};
slider();
//# sourceMappingURL=index.js.map