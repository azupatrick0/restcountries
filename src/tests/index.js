import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('RestCountries Test Suite', () => {
  describe('GET countries/fetch - fetch a unique country', () => {
    it('should return status code 200 on fetching a unique country', async () => {
      const res = await chai.request(app)
        .get('/api/v1/countries/fetch?name=united');
      
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      res.body.data.should.have.property('message');
      res.body.data.should.have.property('countries');
      res.body.data.message.should.equal('Countries returned successfully');
      res.body.data.countries.length.should.be.gt(0);
      res.body.data.countries[0].name.should.equal('United States Minor Outlying Islands');
    });
  });
});
