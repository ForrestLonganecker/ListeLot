export {}

const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const List = require('../../src/db/models').List;
const ListItem = require('../../src/db/models').ListItem;

interface ThisContext {
  user: User,
  list: List,
  listItem: ListItem
}

interface User {
  id: number
}

interface ListItem {
  id: number,
  text: string,
  listId: number,
  isComplete: boolean
}

interface Err {
  message: string
}

interface Res {
  0: number
}

describe('ListItem', () => {
  
  beforeEach(function(this: ThisContext, done){
    this.user;
    this.list;
    this.listItem;

    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: 'test@email.com',
        password: '123'
      })
      .then((user: User) => {
        this.user = user;

        List.create({
          title: 'Test title',
          userId: this.user.id
        })
        .then((list: List) => {
          this.list = list;

          ListItem.create({
            text: 'list item test',
            listId: this.list.id
          })
          .then((listItem: ListItem) => {
            this.listItem = listItem;
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
    })
    .catch((err: string) => {
      console.log(err);
      done();
    });

    // END BEFORE EACH
  });

  describe('#create()', () => {
    
    it('should create a ListItem with the associated text and listId', function(this: ThisContext, done){
      ListItem.create({
        text: 'second test list item',
        listId: this.list.id
      })
      .then((listItem: ListItem) => {
        expect(listItem.id).toBe(2);
        expect(listItem.text).toBe('second test list item');
        expect(listItem.listId).toBe(this.list.id);
        expect(listItem.isComplete).toBeFalsy();
        done();
      })
      .catch((err: Err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not create a ListItem without associated listId', (done) => {
      ListItem.create({
        text: 'second test list item',
      })
      .then((listItem: ListItem) => {
        // expect errors
        expect(listItem).toBeNull();
        done();
      })
      .catch((err: Err) => {
        expect(err.message).toContain('listId cannot be null');
        done();
      });
    });

    // END CREATE LIST ITEM TEST
  });

  describe('#destroy()', () => {

    it('should destroy the ListItem with the specified ID', function(this: ThisContext, done){
      ListItem.destroy({where: {id: this.listItem.id}})
      .then((deletedRows: number) => {
        // res = number of modified rows in the table
        expect(deletedRows).toBe(1);

        ListItem.findByPk(this.listItem.id)
        .then((listItem: ListItem) => {
          expect(listItem).toBeNull();
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

    // END DESTROY LIST ITEM TEST
  });

  describe('#update()', () => {

    it('should update the ListItem with the specified ID', function(this: ThisContext, done){
      ListItem.update({
        text: 'updated text',
        isComplete: true
      }, {where: {id: this.listItem.id}})
      .then((res: Res) => {
        // res = number of modified rows in the table
        expect(res[0]).toBe(1);

        ListItem.findByPk(this.listItem.id)
        .then((listItem: ListItem) => {
          expect(listItem.text).toBe('updated text');
          expect(listItem.isComplete).toBeTruthy();
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

    // END UPDATE LIST ITEM TEST
  });
  
  // END LIST ITEM UNIT SPEC
});