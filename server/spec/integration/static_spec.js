const axios = require('axios');
const server = require('../../build/server');

const base = 'http://localhost:4000/';

describe('routes : static', () => {

  describe('GET /', () => {
    it('should return a status code 200 and contain listelot', (done) => {
      axios.get(base)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data).toBe('Hello ListeLot!');
        done();
      })
      .catch(err => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  // END OF TEST SUITE
});