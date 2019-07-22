const axios = require('axios');
const server = require('../../src/server');

const authHelpers = require('../../src/helpers/auth');
const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const base = 'http://localhost:4000/users/';

describe('routes: users', () => {


  beforeEach((done) => {
    this.user;
    this.token

    sequelize.sync({force: true})
    .then(() => {

      let data = {
        email: 'test@email.com',
        password: '123456'
      };

      // create a token from test data
      this.token = authHelpers.createToken(data.email);

      axios.post(`${base}create`, data)
      .then(() => {

        User.findOne({where: {email: 'test@email.com'}})
        .then((user) => {
          this.user = user;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    })
    .catch((err) => {
      console.log(err);
      done();
    });

    // END BEFORE EACH
  });

  describe('POST /users/create', () => {

    it('should create a user with the specified email and password', (done) => {
      let data = {
        email: 'some@email.com',
        password: '123456'
      };

      axios.post(`${base}create`, data)
      .then(() => {
        User.findOne({where: {email: 'some@email.com'}})
        .then((user) => {
          expect(user.email).toBe('some@email.com');
          expect(user.id).toBe(2);
          done();
        })
        .catch((err) => {
          expect(err).toBeNull();
          done();
        });
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not create a user with a duplicate email', (done) => {
      let data = {
        email: 'test@email.com',
        password: '123456'
      };

      axios.post(`${base}create`, data)
      .then((res) => {
        expect(res.data).toBe('email already in use');
        expect(res.statusCode).toBe(400);
        expect(res.data.email).toBeNull();
        done();
      })
      .catch((err) => {
        expect(err.isAxiosError).toBeTruthy();
        done();
      });
    });

    // END USER CREATE SPEC
  });

  describe('POST /users/login', () => {
    it('should return a jwt token upon successful authentication', (done) => {
      let data = {
        email: 'test@email.com',
        password: '123456'
      };

      axios.post(`${base}login`, data)
      .then((res) => {
        let token = authHelpers.authenticated(res.data);
        expect(token.email).toBe('test@email.com');
        done();
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    // END USER LOGIN SPEC
  });

  describe('GET /users/authenticated', () => {
    it('should authenticate requests that contain the token in the authbearer header', (done) => {
      // set axios default header to contain the token
      axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`}
      axios.get(`${base}authenticate`)
      .then((res) => {
        let token = authHelpers.authenticated(res.data);
        expect(token.email).toBe('test@email.com');
        // remove the default headers from the req
        delete axios.defaults.headers.common['Authorization'];
        done();
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not authenticate requests that are missing a token', (done) => {
      // no axios headers provided
      axios.get(`${base}authenticate`)
      .then((res) => {
        // expect nothing to happen here
        expect(res).toBeNull();
        done();
      })
      .catch((err) => {
        // how to access res.values from the {err}
        expect(err.request.res.statusCode).toBe(400);
        expect(err.isAxiosError).toBeTruthy();
        done();
      });
    });

    // END USER AUTHENTICATED SPEC
  });


  // END USER INTEGRATION SPEC
});