const axios = require('axios');
const server = require('../../src/server');

const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const base = 'http://localhost:4000/users/';

describe('routes: users', () => {

  beforeEach((done) => {
    this.user;

    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: 'test@email.com',
        password: '123456'
      })
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

    // END BEFORE EACH
  });

  describe('POST /users/create', () => {

    it('should create a user with the specified email and password', (done) => {
      let data = {
        email: 'some@email.com',
        password: '123456'
      };

      axios.post(`${base}create`, data)
      .then((res) => {
        this.newUser = res.data;
        User.findByPk(this.newUser.id)
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

  // END USER INTEGRATION SPEC
});