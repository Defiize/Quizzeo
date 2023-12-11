import axios from 'axios';
import stringSimilarity from 'string-similarity'; // Modification pour importer stringSimilarity en tant que module ES6


    // Récupération des données des pays depuis l'API restcountries.com
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

