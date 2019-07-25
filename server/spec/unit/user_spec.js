const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;

describe('User', () => {

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

  describe('#create()', () => {

    it('should create a User object with valid email and password', (done) => {
      User.create({
        email: 'some@email.com',
        password: '123456'
      })
      .then((user) => {
        expect(user.email).toBe('some@email.com');
        expect(user.id).toBe(2);
        done();
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should no create a User object with duplicate email address', (done) => {
      User.create({
        email: 'test@email.com',
        password: '123456'
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.msg).toContain('unique constraint violation');
        done();
      });
    });
    
    // END CREATE USER TEST
  });
  
  describe('#destroy()', () => {

    it('should destroy user data for user with given id', (done) => {
      User.destroy({where: {id: this.user.id}})
      .then(() => {
        User.findByPk(this.user.id)
        .then((user) => {
          expect(user).toBeNull();
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

    // END DESTROY USER TEST
  });

// END OF USER UNIT SPEC
});