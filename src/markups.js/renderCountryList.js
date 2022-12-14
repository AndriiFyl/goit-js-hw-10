export default function renderCountriesList(country) {
    
    return country
    .map(({flags: { svg }, name: { official } }) => {        
        return `<li class="country_item">
      <img src=${svg} alt="flag_list" width="40" height="30"></img>
      <h2 class="country_name_list">${official}</h2>
      </li>`   
    })
    .join('');
}

