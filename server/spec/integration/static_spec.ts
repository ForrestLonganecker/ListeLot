export {}

const axios = require('axios');
const server = require('../../src/server');

const base = 'http://localhost:4000/';

interface Res {
  status: number,
  data: string
}

describe('routes : static', () => {

  describe('GET /', () => {
    it('should return a status code 200 and contain listelot', (done) => {
      axios.get(base)
      .then((res: Res) => {
        expect(res.status).toBe(200);
        expect(res.data).toBe('Hello ListeLot!');
        done();
      })
      .catch((err: string) => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  // END OF TEST SUITE
});