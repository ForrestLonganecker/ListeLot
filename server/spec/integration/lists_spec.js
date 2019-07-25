const axios = require('axios');
const server = require('../../src/server');

const authHelpers = require('../../src/helpers/auth');
const sequelize = require('../../src/db/models/index').sequelize;
const List = require('../../src/db/models').List;
const User = require('../../src/db/models').User;
const base = 'http://localhost:4000/lists/';

describe('routes: lists', () => {

  beforeEach((done) => {
    this.user;
    this.token;
    this.list;

    sequelize.sync({force: true})
    .then(() => {
      let userData = {
        email: 'test@email.com',
        password: '123456'
      };

      this.token = authHelpers.createToken(userData.email);

      User.create(userData)
      .then((user) => {
        this.user = user;

        List.create({
          title: 'test list',
          userId: this.user.id
        })
        .then((list) => {
          this.list = list;
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

    describe('POST /lists/create', () => {

      it('should create a list with the associated user', (done) => {
        let data = {
          title: 'second list'
        };

        // set the auth token in the header of the req
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
        axios.post(`${base}create`, data)
        .then((res) => {
          // console.log(res);
          expect(res.data.title).toBe('second list');
          // remove the default headers token
          delete axios.defaults.headers.common['Authorization'];
          done();
        })
        .catch((err) => {
          expect(err).toBeNull();
          done();
        });
      });

      it('should not create a list without auth token', (done) => {
        let data = {
          title: 'second list'
        };

        axios.post(`${base}create`, data)
        .then((res) => {
          // expect errors
          done();
        })
        .catch((err) => {
          expect(err.isAxiosError).toBeTruthy();
          expect(err.request.res.statusMessage).toBe('error while authenticating.');
          expect(err.request.res.statusCode).toBe(400);
          done();
        });
      });

      // END LIST CREATE TEST
    });

    describe('POST /lists/delete', () => {
      
      it('should delete the list if the requested user has access to it', (done) => {
        let data = {
          listId: this.list.id
        };

        // add auth token
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
        axios.post(`${base}delete`, data)
        .then((res) => {
          // remove auth token
          delete axios.defaults.headers.common['Authorization'];
          // successfull status code passed
          expect(res.status).toBe(200);
          List.findByPk(this.list.id)
          .then((list) => {
            expect(list).toBeNull();
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

      it('should not delete a list if no auth is provided', (done) => {
        let data = {
          listId: this.list.id
        };

        axios.post(`${base}delete`, data)
        .then(() => {
          List.findByPk(this.list.id)
          .then((list) => {
            // list should not be deleted
            expect(list.title).toBe('Test list');
            done();
          })
          .catch((err) => {
            console.log(err);
            expect(err.request.res.statusMessage).toBe('error while authenticating.');
            done();
          });
        })
        .catch((err) => {
          expect(err.request.res.statusMessage).toBe('error while authenticating.');
          done();
        });
      });

      // END DELETE LIST TEST
    });

    describe('POST /lists/update', () => {
      
      it('should update the specified list if the user owns it', (done) => {

      });

      // END UPDATE LIST TEST
    });

    describe('GET /lists', () => {
      
      it('should get all the lists for the authenticated user', (done) => {

      });

      // END GET LISTS TEST
    });

  // END LIST INTEGRATION SPEC
});