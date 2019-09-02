export {}

const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const List = require('../../src/db/models').List;

interface ThisContext {
  user: User,
  list: List
}

interface User {
  id: number
}

interface List {
  title: string,
  userId: number,
  id: number
}

interface Err {
  message: string
}

interface Res {

}

describe('List', () => {

  beforeEach(function(this: ThisContext, done){
    this.user;
    this.list;

    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: 'test@email.com',
        password: '123456'
      })
      .then((user: User) => {
        this.user = user;
        List.create({
          title: 'Test list',
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
      .catch((err: string) =>{
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

    it('should create a List object with the speficied userId', function(this: ThisContext, done){
      List.create({
        title: 'Second list',
        userId: this.user.id
      })
      .then((list: List) => {
        expect(list.title).toBe('Second list');
        expect(list.userId).toBe(1);
        done();
      })
      .catch((err: Err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not create a List without a userId', (done) => {
      List.create({
        title: 'some title'
      })
      .then((list: List) => {
        expect(list).toBeUndefined();
        done();
      })
      .catch((err: Err) => {
        expect(err.message).toContain('List.userId cannot be null');
        done();
      });
    });

    it('should not create a List without a title', function(this: ThisContext, done){
      List.create({
        userId: this.user.id
      })
      .then((list: List) => {
        expect(list).toBeUndefined();
        done();
      })
      .catch((err: Err) => {
        expect(err.message).toContain('List.title cannot be null');
        done();
      });
    });

    // END LIST CREATE TEST
  });

  describe('#destroy()', () => {

    it('should destroy the list with associated list.id', function(this: ThisContext, done){
      List.findOne({where: {userId: this.user.id}})
      .then((list: List) => {
        expect(list.title).toBe('Test list');
        List.destroy({where: {id: list.id}})
        .then((res: Res) => {
          expect(res).toBe(1);
          List.findOne({where: {userId: this.user.id}})
          .then((deletedList: List) => {
            expect(deletedList).toBeNull();
            done();
          })
          .catch((err: Err) => {
            expect(err).toBeNull();
          });
        })
        .catch((err: Err) => {
          expect(err).toBeNull();
        });
      })
      .catch((err: Err) => {
        expect(err).toBeNull();
      });
    });

    // END LIST DESTROY TEST
  });

  describe('#update()', () => {

    it('should update the title of the list with associated userId', function(this: ThisContext, done){
      List.update({
        title: 'updated title'
      }, {where: {id: this.list.id}})
      .then(() => {
        // update does not return useful data
        List.findByPk(this.list.id)
        .then((list: List) => {
          expect(list.title).toBe('updated title');
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

    // END LIST UPDATE TEST
  });

// END OF LIST USER SPEC
});