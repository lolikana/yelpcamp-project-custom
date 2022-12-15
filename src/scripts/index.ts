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
