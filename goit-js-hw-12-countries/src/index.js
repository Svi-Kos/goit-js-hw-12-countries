import debounce from 'lodash.debounce';
import './styles.css';
import countryTpl from './templates/country-card.hbs';
import countryListTpl from './templates/list-of-countries.hbs';
import API from './js/fetchCountries';
import getRefs from './js/refs';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(event) {
  const form = event.target;
  const searchQuery = form.value;

  API.fetchCountryByName(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError);
  // .finally(() => (form.value = ''));
}

function renderCountryCard(country) {
  const markup = countryTpl(...country);
  const listOfCountries = countryListTpl(country);

  if (country.length === 1) {
    refs.cardContainer.innerHTML = markup;
  } else if (country.length > 10) {
    alert('Too many matches found. Please enter a more specific query!');
  } else {
    refs.cardContainer.innerHTML = listOfCountries;
  }
}

function onFetchError(error) {
  alert('There is no such country');
}
