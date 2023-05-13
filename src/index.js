import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './api';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
refs = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const inputValue = event.target.value.trim();

  if (inputValue === '') {
    Notiflix.Notify.info('Введіть назву країни');
  } else {
    fetchCountries(inputValue)
      // .then(countries => console.log(countries))
      .then(countries => renderByConditions(countries))
      .catch(error => {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
        // alert ("Oops, there is no country with that name")
      });
  }
  if (inputValue === '') {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
  }
}
function renderByConditions(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
  } else if (countries.length > 2 && countries.length < 10) {
    refs.countryInfo.innerHTML = '';
    renderNameCountries(countries);
  } else if (countries.length === 1) {
    renderNameCountries(countries);
    renderInfoAboutCountry(countries);
  }
}

function renderNameCountries(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li class="list-country"><img class="flag-img" src = "${flags.svg}"/><h2 class="country-title">${name.official}</h2></li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function renderInfoAboutCountry(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      const countryLanguage = Object.values(languages)
      return `<p><span class="span">Capital: </span>${capital}</p><p><span class="span">Population:</span> ${population}</p><p><span class="span">Languages:</span> ${countryLanguage}</p>`;
    })
    .join('');
  // console.log(markup)
  refs.countryInfo.innerHTML = markup;
}

// function renderInfoAboutCountry(countries) {
//   const markup = countries
//     .map(({ name, capital, population, flags, languages }) => {
//       return `<li class="list"><img class="flag-img" src = "${flags.svg}"/><h2 class="country">${name.official}<h3 class="country-capital">${capital}<p>${population}<p>${languages['']}</p></p></h3></h2></li>`;
//     })
//     .join('');
//   // console.log(markup)
//   refs.countryInfo.innerHTML = markup;
// }
// function renderNameCountries(countries) {
//   const markup = countries
//     .map(({ name, flags }) => {
//       return `<li class="list"><img class="flag-img" src = "${flags.svg}"/><h2 class="country">${name.official}</h2></li>`;
//     })
//     .join('');
//   refs.countryList.innerHTML = markup;
// }
