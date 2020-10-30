const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountryByName(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}`).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

export default { fetchCountryByName };
