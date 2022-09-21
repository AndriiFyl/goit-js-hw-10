export default function countryRender(country) {
    return country
    .map(({
        flags: { svg }, name: { official }, capital, population, languages }) => {
            return `<div class="wrapper">
                 <img src=${svg} alt="flag of country" width="40" height="30"></img>
                <h2 class="country_name">${official}</h2> </div>
                <p class="country_capital">
                <span class="row_name">Capital:</span> <span class="description_value">${capital}</span>
                </p>
                <p class="country_population">
                 <span class="row_name">Population:</span> <span class="description_value">${population}</span>
                </p>
                <p class="country_language">
                <span class="row_name">Languages:</span> <span class="description_value">${Object.values(languages)}</span>
                 </p>`
    })
    .join('')
}


// Запись без деструктуризации========================================
// export default function countryRender(country) {
//     return country 
//     .map((country ) => {
//             return `<div class="wrapper">
//                  <img src=${country.flags.svg} alt="flag of country" width="40" height="30"></img>
//                 <h2 class="country_name">${country.name}</h2> </div>
//                 <p class="country_capital">
//                 <span class="row_name">Capital:</span> <span class="description_value">${country.capital}</span>
//                 </p>
//                 <p class="country_population">
//                  <span class="row_name">Population:</span> <span class="description_value">${country.population}</span>
//                 </p>
//                 <p class="country_language">
//                 <span class="row_name">Languages:</span> <span class="description_value">${Object.values(country.languages)}</span>
//                  </p>`
//     })
//     .join('')
// }