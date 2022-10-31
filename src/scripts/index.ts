const navMenuTarget = document.getElementById('navbar__solid-bg');
const burgerTrigger = document.getElementById('burger__btn');
// const navbarMenuList = document.getElementById('navbar__list');
const navLink = document.querySelectorAll('[aria-current]');

// START Create nav bar list
// const navbarLink: string[][] = [
//   ['Homepage', '/'],
//   ['Campgrounds', '/campgrounds'],
//   ['Add', '/campgrounds/new']
// ];

// // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// navbarMenuList!.innerHTML = navbarLink
//   .map(
//     ([title, url]: string[]) =>
//       `   <li>
//       <a
//         href=${url}
//         class="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
//         aria-current="page"
//       >
//         ${title}
//       </a>
//       </li>`
//   )
// .join('');

const url = document.URL.slice(21);
console.log(url);
console.log(navLink);
for (let i = 0; i < navLink.length; i++) {
  console.log(navLink[i]);
  if (navLink[i].getAttribute('href') === url) {
    console.log(navLink[i].getAttribute('href') === url);
    console.log(navLink[i]);
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
