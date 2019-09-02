export {}

const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;

interface ThisContext {
  user: User
}

interface User {
  email: string,
  id: number
}

interface Err {
  msg: string
}

describe('User', () => {

  beforeEach(function(this: ThisContext, done){
    this.user;
    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: 'test@email.com',
        password: '123456'
      })
      .then((user: User) => {
        this.user = user;
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

    // END BEFORE EACH
  });

  describe('#create()', () => {

    it('should create a User object with valid email and password', (done) => {
      User.create({
        email: 'some@email.com',
        password: '123456'
      })
      .then((user: User) => {
        expect(user.email).toBe('some@email.com');
        expect(user.id).toBe(2);
        done();
      })
      .catch((err: Err) => {
        expect(err).toBeNull();
        done();
      });
    });
    
    // END CREATE USER TEST
  });
  
  describe('#destroy()', () => {

    it('should destroy user data for user with given id', function(this: ThisContext, done){
      User.destroy({where: {id: this.user.id}})
      .then(() => {
        User.findByPk(this.user.id)
        .then((user: User) => {
          expect(user).toBeNull();
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

    // END DESTROY USER TEST
  });

// END OF USER UNIT SPEC
});