// ПОСЛЕ РЕФАКТОРИНГА
import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './get_refs';
import countryRender from './markups.js/oneCountryRender';
import renderCountriesList from './markups.js/renderCountryList';

const DEBOUNCE_DELAY = 300;
// рефы (вынесены отдельным файлом)
const refs = getRefs();
// слушатель на инпут
refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY) );
// ф-я поиска страны при вводе в инпут*******************************************
function onSearch() {
// значение, что вводим в инпут
const inputValue = refs.inputSearch.value;
        // если в инпуте пустая строка, то удаляем разметку 
      if (inputValue.trim() === '') {
          refs.cardInfoCountry.innerHTML = '';
          refs.countryList.innerHTML = '';
          return
      } 
    // Вызов ф-ии запроса данных с сервера***************************************
    fetchCountries(inputValue.trim())
        .then(country => {
            
        if (country.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
        refs.countryList.innerHTML = '';   
        refs.cardInfoCountry.innerHTML = '';
        }

        else if (country.length >= 2 && country.length < 10) {
             const renderCountries = renderCountriesList(country); 
             refs.cardInfoCountry.innerHTML = '';
             refs.countryList.insertAdjacentHTML("beforeend", renderCountries);
        }    
        else  {
            const renderingCountry = countryRender(country);
            refs.countryList.innerHTML = '';
            refs.cardInfoCountry.innerHTML = renderingCountry;
        }
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');  
            refs.countryList.innerHTML = '';  
            refs.cardInfoCountry.innerHTML = '';
        });  
}




// БАЗОВАЯ ВЕРСИЯ БЕЗ РЕФАКТОРИНГА И СОЗДАНИЯ ДОП.ФАЙЛОВ==========================================
// import './css/styles.css';
// import fetchCountries from './fetchCountries';
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const DEBOUNCE_DELAY = 300;

// const refs = {
//     cardInfoCountry: document.querySelector('.country-info'),
//     countryList: document.querySelector('.country-list'),
//     inputSearch: document.querySelector('#search-box'),
// }
// // слушатель на инпут
// refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY) );

// // ф-я поиска страны при вводе в инпут
// function onSearch(evt) {
//     evt.preventDefault();
// // значение, что вводим в инпут
//     const inputValue = refs.inputSearch.value;
//         // если в инпуте пустая строка, то удаляем разметку 
//       if (inputValue.trim() === '') {
//           refs.cardInfoCountry.innerHTML = '';
//           refs.countryList.innerHTML = '';
//           return
//       } 
//     // Вызов ф-ии запроса данных с сервера
//     fetchCountries(inputValue.trim())
//         .then(country => {
//             if (country.length > 10) {
//                 Notify.info('Too many matches found. Please enter a more specific name.')
//              refs.countryList.innerHTML = '';   
//              refs.cardInfoCountry.innerHTML = '';
//             }

//             else if (country.length >= 2 && country.length < 10) {
//                 const markupList = country
//                     .reduce((acc, {flags: { svg }, name: { official },})=>  {
//                         return acc + `<li class="country_item">
//       <img src=${svg} alt="flag_list" width="40" height="30"></img>
//       <h2 class="country_name_list">${official}</h2>
//       </li>`
//                     }, '')
//                 refs.countryList.innerHTML = markupList;   
//                 refs.cardInfoCountry.innerHTML = '';
//             }   
//             else {
//             return country
//                 .map(({
//                     flags: { svg },
//                     name: { official },
//                     capital,
//                     population,
//                     languages }) => {
//                    refs.countryList.innerHTML = '';
//                    refs.cardInfoCountry.innerHTML =
//                        `<div class="wrapper">
//                         <img src=${svg} alt="flag of country" width="40" height="30"></img>
//                 <h2 class="country_name">${official}</h2> </div>
//                 <p class="country_capital">
//                 <span class="row_name">Capital:</span> <span class="description_value">${capital}</span>
//                 </p>
//                 <p class="country_population">
//                  <span class="row_name">Population:</span> <span class="description_value">${population}</span>
//                 </p>
//                 <p class="country_language">
//                 <span class="row_name">Languages:</span> <span class="description_value">${Object.values(languages)}</span>
//                  </p>`  
//                 }) }
//         })
//         .catch(error => {
//             Notify.failure('Oops, there is no country with that name');
//         });
// }

   


        






