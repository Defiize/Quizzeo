// Extern import
import axios from 'axios';
import {expect} from "chai";
import sinon from "sinon";

// Intern import
import {getCountriesData} from "../src/countriesData.js"; // Remplacez par le chemin correct de votre fichier

describe('getCountriesData', () => {
    it('should fetch countries data successfully', async () => {
        const responseData = [{ country: 'Country1' }, { country: 'Country2' }];
        const axiosStub = sinon.stub(axios, 'get').resolves({ data: responseData });

        const result = await getCountriesData();

        expect(result).to.deep.equal(responseData);
        expect(axiosStub.calledWith('https://restcountries.com/v3.1/all')).to.be.true;
        // Don't forget to restore the stub after testing
        axios.get.restore();
    });

    it('should handle errors during data retrieval', async () => {
        const errorMessage = 'Failed to fetch data';
        const consoleErrorStub = sinon.stub(console, 'error');
        const axiosStub = sinon.stub(axios, 'get').rejects(new Error(errorMessage));

        const result = await getCountriesData();

        expect(result).to.deep.equal([]);
        expect(consoleErrorStub.calledWith(
            'Erreur lors de la récupération des données des pays:',
            errorMessage
        )).to.be.true;

        // Don't forget to restore the stub after testing
        axios.get.restore();
        consoleErrorStub.restore();
    });
});
