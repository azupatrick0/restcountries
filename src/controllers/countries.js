import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
class Countries {
  static async fetchUniqueCountry(req, res) {
    const name = req.query.name;

    if (!name) {
      return res.status(400).json({
        status: 400,
        data: {
          error: 'please enter country name'
        }
      });
    } else {
      const countries = await axios.get(`${process.env.API_URL}/name/${name}`);

      let returnedCountries = [];

      countries.data.map(country => {
        returnedCountries = [...returnedCountries, {
          name: country.name,
          flag: country.flag,
          region: country.region
        }]
      });

      return res.status(200).json({
        status: 200,
        data: {
          message: 'Countries returned successfully',
          countries: returnedCountries
        }
      });
    }
  }

  static async searchCountries(req, res) {
    const searchTerm = req.query.query;

    const truthy = (element) => element;

    if (!searchTerm || searchTerm.split(',').length < 1) {
      return res.status(400).json({
        status: 400,
        data: {
          error: 'please enter countries names seperated buy commas'
        }
      });
    } else {
      const countries = await axios.get(`${process.env.API_URL}/all`);

      const arrayOfSearchString = searchTerm.toLowerCase().split(',');

      const searchedCountries = countries && countries.data.filter(country => {
        const matchesSearchTerm = [
          arrayOfSearchString.some(
            (element) =>
              country.name.toLowerCase().match(new RegExp(element.toString().trim().split(' ').join(' '), 'g'))
          )
        ];
        return matchesSearchTerm.some(truthy);
      });

      let returnedCountries = [];

      searchedCountries && searchedCountries.map(country => {
        returnedCountries = [...returnedCountries, {
          name: country.name,
          flag: country.flag,
          region: country.region
        }]
      });

      return res.status(200).json({
        status: 200,
        data: {
          message: 'Countries that matches search term returned successfully',
          countries: returnedCountries
        }
      });
    }
  }
}

export default Countries;

