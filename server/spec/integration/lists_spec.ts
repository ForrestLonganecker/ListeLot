export {}

const axios = require('axios');
const server = require('../../src/server');

const authHelpers = require('../../src/helpers/auth');
const sequelize = require('../../src/db/models/index').sequelize;
const List = require('../../src/db/models').List;
const User = require('../../src/db/models').User;
const base = 'http://localhost:4000/lists/';

interface ThisContext {
  user: User,
  token: Object,
  list: List
}

interface User {
  id: number
}

interface Res {
  data: Data,
  status: number
}

interface Data {
  email: string,
  title: string,
  userId: number
}

interface Err {
  isAxiosError: boolean,
  request: Req
}

interface Req {
  res: ErrRes
}

interface ErrRes {
  statusMessage: string,
  statusCode: number
}

interface ListsRes {
  data: Array<Data>
}


describe('routes: lists', () => {

  beforeEach(function(this: ThisContext, done){
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
      .then((user: User) => {
        this.user = user;

        List.create({
          title: 'test list',
          userId: this.user.id
        })
        .then((list: List) => {
          this.list = list;
          done();
        })
        .catch((err: string) => {
          console.log(err);
          done();
        });
      })
      .catch((err: string) => {
        console.log(err);
        done();
      });
    })
    .catch((err: string) => {
      console.log(err);
      done();
    });

    // END BEFORE EACH
  });

    describe('POST /lists/create', () => {

      it('should create a list with the associated user', function(this: ThisContext, done){
        let data = {
          title: 'second list'
        };

        // set the auth token in the header of the req
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
        axios.post(`${base}create`, data)
        .then((res: Res) => {
          expect(res.data.title).toBe('second list');
          // remove the default headers token
          delete axios.defaults.headers.common['Authorization'];
          done();
        })
        .catch((err: Err) => {
          expect(err).toBeNull();
          done();
        });
      });

      it('should not create a list without auth token', (done) => {
        let data = {
          title: 'second list'
        };

        axios.post(`${base}create`, data)
        .then((res: Res) => {
          // expect errors
          expect(res).toBeNull();
          done();
        })
        .catch((err: Err) => {
          expect(err.isAxiosError).toBeTruthy();
          expect(err.request.res.statusMessage).toBe('error while authenticating.');
          expect(err.request.res.statusCode).toBe(400);
          done();
        });
      });

      // END LIST CREATE TEST
    });

    describe('POST /lists/delete', () => {
      
      it('should delete the list if the requested user has access to it', function(this: ThisContext, done){
        let data = {
          listId: this.list.id
        };

        // add auth token
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
        axios.post(`${base}delete`, data)
        .then((res: Res) => {
          // remove auth token
          delete axios.defaults.headers.common['Authorization'];
          // successfull status code passed
          expect(res.status).toBe(200);
          List.findByPk(this.list.id)
          .then((list: List) => {
            expect(list).toBeNull();
            done();
          })
          .catch((err: Err) => {
            expect(err).toBeNull();
            done();
          });
        })
        .catch((err: Err) => {
          expect(err).toBeNull();
          done();
        });
      });

      it('should not delete a list if no auth is provided', function(this: ThisContext, done){
        let data = {
          listId: this.list.id
        };

        axios.post(`${base}delete`, data)
        .then(() => {
          List.findByPk(this.list.id)
          .then((list: List) => {
            // list should not be deleted
            expect(list.title).toBe('Test list');
            done();
          })
          .catch((err: Err) => {
            expect(err.request.res.statusMessage).toBe('error while authenticating.');
            done();
          });
        })
        .catch((err: Err) => {
          expect(err.request.res.statusMessage).toBe('error while authenticating.');
          done();
        });
      });

      // END DELETE LIST TEST
    });

    describe('POST /lists/update', () => {

      it('should update the specified list if the user owns it', function(this: ThisContext, done){
        let updateInfo = {
          updatedTitle: 'updated title',
          listId: this.list.id
        };

        axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
        axios.post(`${base}update`, updateInfo)
        .then((res: Res) => {
          delete axios.defaults.headers.common['Authorization'];

          expect(res.data.title).toBe('updated title');
          expect(res.status).toBe(200);
          done();
        })
        .catch((err: Err) => {
          expect(err).toBeNull();
          done();
        });
      });

      it('should not update the specified list if not authorized', function(this: ThisContext, done){
        let updateInfo = {
          updatedTitle: 'updated title',
          listId: this.list.id
        };

        axios.post(`${base}update`, updateInfo)
        .then((res: Res) => {
          // expect errors
          expect(res).toBeNull();
          done();
        })
        .catch((err: Err) => {
          expect(err.request.res.statusMessage).toBe('error when authenticating');
          done();
        });
      });

      // END UPDATE LIST TEST
    });

    describe('GET /lists', () => {
      
      it('should get all the lists for the authenticated user', function(this: ThisContext, done){
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
        axios.get(`${base}getAll`)
        .then((res: ListsRes) => {
          delete axios.defaults.headers.common['Authorization'];
          expect(res.data[0].title).toBe('test list');
          expect(res.data[0].userId).toBeUndefined();
          done();
        })
        .catch((err: Err) => {
          expect(err).toBeNull();
          done();
        });
      });

      it('should not get any lists for a non-authenticated user', (done) => {
        axios.get(`${base}getAll`)
        .then((res: Res) => {
          // expect errors
          expect(res).toBeNull();
          done();
        })
        .catch((err: Err) => {
          expect(err.request.res.statusMessage).toBe('error when authenticating');
          expect(err.isAxiosError).toBeTruthy();
          done();
        });
      });

      // END GET LISTS TEST
    });

  // END LIST INTEGRATION SPEC
});