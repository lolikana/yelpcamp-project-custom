const navMenuTarget = document.getElementById('navbar__solid-bg');
const burgerTrigger = document.getElementById('burger__btn');
// const navbarMenuList = document.getElementById('navbar__list');
const navLink = document.querySelectorAll('[aria-current]');

const url = document.URL.slice(21);

for (let i = 0; i < navLink.length; i++) {
  if (navLink[i].getAttribute('href') === url) {
    navLink[i].classList.add('current-page');
  }
}

// END Create nav bar list

// START display/hide burder menu
burgerTrigger?.addEventListener('click', () => {
  if (burgerTrigger.getAttribute('aria-expanded') === 'false') {
    burgerTrigger.setAttribute('aria-expanded', 'true');
    navMenuTarget?.classList.remove('hidden');
    navMenuTarget?.classList.add('block');
  } else {
    burgerTrigger.setAttribute('aria-expanded', 'false');
    navMenuTarget?.classList.remove('block');
    navMenuTarget?.classList.add('hidden');
  }
});

window.addEventListener('resize', (_e: UIEvent) => {
  if (
    window.innerWidth > 767 &&
    burgerTrigger?.getAttribute('aria-expanded') === 'true'
  ) {
    burgerTrigger?.setAttribute('aria-expanded', 'false');
    navMenuTarget?.classList.remove('block');
    navMenuTarget?.classList.add('hidden');
  }
});
// END Burder menu

// START Validation form
const validationForms = document.querySelectorAll('.validated-form');

const inputs = document.getElementsByTagName('input');
const textAreaInput = document.getElementsByClassName('textarea-input');

Array.from(inputs).forEach((input: HTMLInputElement) => {
  const inputError = document.querySelector(`[for="${input.id}"] + span.error`);
  input?.addEventListener('input', (_event: any) => {
    if (input.validity.valid && inputError !== null) {
      inputError.textContent = '';
      input.classList.add('error');
    }
    if (!input.validity.valid && inputError !== null) {
      showError(input, inputError);
    }
  });
});

Array.from(textAreaInput).forEach((textarea: any) => {
  const inputError = document.querySelector(
    `[for="${textarea.id}"] + span.error`
  );
  textarea?.addEventListener('input', (_event: any) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (textarea.validity.valid && inputError !== null) {
      inputError.textContent = '';
      textarea.classList.add('error');
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!textarea.validity.valid && inputError !== null) {
      showError(textarea, inputError);
    }
  });
});

Array.from(textAreaInput).forEach((textarea: any) => {
  const inputError = document.querySelector(
    `[name="review[${textarea.id}]"] + span.error`
  );
  textarea?.addEventListener('input', (_event: any) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (textarea.validity.valid && inputError !== null) {
      inputError.textContent = '';
      textarea.classList.add('error');
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!textarea.validity.valid && inputError !== null) {
      showError(textarea, inputError);
    }
  });
});

Array.from(validationForms).forEach((form: any) => {
  form.addEventListener('submit', (event: any) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!form.checkValidity()) {
      Array.from(inputs).forEach((input: HTMLInputElement) => {
        const inputError = document.querySelector(
          `[for="${input.id}"] + span.error`
        );
        if (inputError !== null) {
          showError(input, inputError);
        }
      });
      Array.from(textAreaInput).forEach((textarea: any) => {
        const inputError = document.querySelector(
          `[for="${textarea.id}"] + span.error`
        );
        if (inputError !== null) {
          showError(textarea, inputError);
        }
      });
      Array.from(textAreaInput).forEach((textarea: any) => {
        const inputError = document.querySelector(
          `[name="review[${textarea.id}]"] + span.error`
        );
        if (inputError !== null) {
          showError(textarea, inputError);
        }
      });
      event.preventDefault();
    }
  });
});

const showError = (
  input: HTMLInputElement | HTMLTextAreaElement,
  inputError: Element
): void => {
  if (input.validity.valueMissing) {
    inputError.textContent = `You need to enter ${input.id}`;
  }
  if (input.validity.typeMismatch) {
    inputError.textContent = 'Entered value needs to be correct';
  }
  inputError.classList.add('active');
};
// END Validation form

// START Character count of textarea
const reviewTextarea = document.querySelector('[aria-limit-textarea]');
const limitCharacter = reviewTextarea?.getAttribute('maxlength');
const countCurr = document.getElementById('count-current');
const countMax = document.getElementById('count-maximum');

if (countMax != null && limitCharacter != null) {
  countMax.textContent = limitCharacter;
}

reviewTextarea?.addEventListener('input', (e: any) => {
  if (countCurr != null) countCurr.textContent = e.target.value.length;
});
// END Character count of textarea

// START range slide custom
const rangeRating = document.querySelector('#range-rating') as HTMLInputElement;
const outputRangeRating = document.querySelector('.range-output');

const rangeRatingOutput = (size: number): void => {
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
  rangeRating.oninput = (e: any) => {
    rangeRatingOutput(e.target.value);
  };
}
// END range slide custom

// START close flash message
const Default = {
  triggerEl: null,
  transition: 'transition-opacity',
  duration: 300,
  timing: 'ease-out'
};

class Dismiss {
  _targetEl: HTMLElement;
  _options: any;
  constructor(targetEl: HTMLElement, options: any) {
    this._targetEl = targetEl;
    this._options = { ...Default, ...options };
  }

  hide(): void {
    this._targetEl.classList.add(
      this._options.transition,
      `duration-${this._options.duration}`,
      this._options.timing,
      'opacity-0'
    );
    setTimeout(() => {
      this._targetEl.classList.add('hidden');
    }, this._options.duration);
  }
}

const successAlertMsg = document.getElementById('success-alert');
const successAlertBtn = document.querySelector(
  'button[data-dismiss-target="#success-alert"]'
);

successAlertBtn?.addEventListener('click', () => {
  // options object
  const options = {
    transition: 'transition-opacity',
    duration: 200,
    timing: 'ease-out'
  };

  if (successAlertMsg == null) return;

  const dismiss = new Dismiss(successAlertMsg, options);
  dismiss.hide();
});

const errorAlertMsg = document.getElementById('error-alert');
const errorAlertBtn = document.querySelector(
  'button[data-dismiss-target="#error-alert"]'
);

errorAlertBtn?.addEventListener('click', () => {
  // options object
  const options = {
    transition: 'transition-opacity',
    duration: 200,
    timing: 'ease-out'
  };

  if (errorAlertMsg == null) return;

  const dismiss = new Dismiss(errorAlertMsg, options);
  dismiss.hide();
});
// END close flash message
