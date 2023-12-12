// Extern import
import axios from 'axios';
// -- Edit to import stringSimilarity as an ES6 module
import stringSimilarity from 'string-similarity'; 

// Intern import
// ...

    // Retrieving country data from the restcountries.com API
    async function getCountriesData() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données des pays:', error.message);
        return [];
    }
    }

 
    export {getCountriesData}

