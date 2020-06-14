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
}

export default Countries;

