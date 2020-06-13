import dotenv from 'dotenv';

dotenv.config();

class Countries {
  static async fetchUniqueCountry(_req, res) {
    return res.status(200).json({
      status: 200,
      data: {
        message: 'Country returned successfully',
        countries: []
      }
    });
  }
}

export default Countries;
