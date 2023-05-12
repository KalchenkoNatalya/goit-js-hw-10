const URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(query) {
    //   let params = [{ capital, population, flags, languages }];
    return fetch(`${URL}/${query}`).then(response => {
      if (!response) {
        throw new Error(error);
      }
      return response.json();
    });
  }


export  { fetchCountries };

// function getCountries(query) {
//     //   let params = [{ capital, population, flags, languages }];
//     return fetch(`${URL}/${query}`).then(response => {
//       if (!response) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });
//   }


// function getCountries(query) {
//     return fetch(`${URL}/${query}`).then(response => response.json());
//   }
  