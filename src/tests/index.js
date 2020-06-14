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

  describe('GET countries/search - search for countries by their names', () => {
    it('should search and return countries by their names', async () => {
      const res = await chai.request(app)
        .get('/api/v1/countries/search?query=united,malta');

        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.have.property('message');
        res.body.data.should.have.property('countries');
        res.body.data.message.should.equal('Countries that matches search term returned successfully');
        res.body.data.countries.length.should.be.gt(0);
        res.body.data.countries[1].name.should.equal('Malta');
    });
  });

  describe('GET slot/spin - get results of a spin', () => {
    it('should get results of a spin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/slot/spin');

        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.have.property('message');
        res.body.data.should.have.property('result');
        res.body.data.should.have.property('won');
        res.body.data.message.should.equal('result of this spin returned successfully');
        res.body.data.result.length.should.be.gt(0);
        res.body.data.won.should.be.gt(-1);
    });
  });
});
