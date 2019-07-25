const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const List = require('../../src/db/models').List;

describe('List', () => {

  beforeEach((done) => {
    this.user;
    this.list;

    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: 'test@email.com',
        password: '123456'
      })
      .then((user) => {
        this.user = user;
        List.create({
          title: 'Test list',
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
      .catch((err) =>{
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

    it('should create a List object with the speficied userId', (done) => {
      List.create({
        title: 'Second list',
        userId: this.user.id
      })
      .then((list) => {
        expect(list.title).toBe('Second list');
        expect(list.userId).toBe(1);
        done();
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not create a List without a userId', (done) => {
      List.create({
        title: 'some title'
      })
      .then((list) => {
        expect(list).toBe(undefined);
        done();
      })
      .catch((err) => {
        expect(err.message).toContain('List.userId cannot be null');
        done();
      });
    });

    it('should not create a List without a title', (done) => {
      List.create({
        userId: this.user.id
      })
      .then((list) => {
        expect(list).toBe(undefined);
        done();
      })
      .catch((err) => {
        expect(err.message).toContain('List.title cannot be null');
        done();
      });
    });

    // END LIST CREATE TEST
  });

// END OF LIST USER SPEC
});