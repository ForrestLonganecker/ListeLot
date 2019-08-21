const sequelize = require('../../build/db/models/index').sequelize;
const User = require('../../build/db/models').User;
const List = require('../../build/db/models').List;
const ListItem = require('../../build/db/models').ListItem;

describe('ListItem', () => {
  
  beforeEach((done) => {
    this.user;
    this.list;
    this.listItem;

    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: 'test@email.com',
        password: '123'
      })
      .then((user) => {
        this.user = user;

        List.create({
          title: 'Test title',
          userId: this.user.id
        })
        .then((list) => {
          this.list = list;

          ListItem.create({
            text: 'list item test',
            listId: this.list.id
          })
          .then((listItem) => {
            this.listItem = listItem;
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
    })
    .catch((err) => {
      console.log(err);
      done();
    });

    // END BEFORE EACH
  });

  describe('#create()', () => {
    
    it('should create a ListItem with the associated text and listId', (done) => {
      ListItem.create({
        text: 'second test list item',
        listId: this.list.id
      })
      .then((listItem) => {
        expect(listItem.id).toBe(2);
        expect(listItem.text).toBe('second test list item');
        expect(listItem.listId).toBe(this.list.id);
        expect(listItem.isComplete).toBeFalsy();
        done();
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not create a ListItem without associated listId', (done) => {
      ListItem.create({
        text: 'second test list item',
      })
      .then((listItem) => {
        // expect errors
        done();
      })
      .catch((err) => {
        expect(err.message).toContain('listId cannot be null');
        done();
      });
    });

    // END CREATE LIST ITEM TEST
  });

  describe('#destroy()', () => {

    it('should destroy the ListItem with the specified ID', (done) => {
      ListItem.destroy({where: {id: this.listItem.id}})
      .then((res) => {
        // res = number of modified rows in the table
        expect(res).toBe(1);

        ListItem.findByPk(this.listItem.id)
        .then((listItem) => {
          expect(listItem).toBeNull();
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

    // END DESTROY LIST ITEM TEST
  });

  describe('#update()', () => {

    it('should update the ListItem with the specified ID', (done) => {
      ListItem.update({
        text: 'updated text',
        isComplete: true
      }, {where: {id: this.listItem.id}})
      .then((res) => {
        // res = number of modified rows in the table
        expect(res[0]).toBe(1);

        ListItem.findByPk(this.listItem.id)
        .then((listItem) => {
          expect(listItem.text).toBe('updated text');
          expect(listItem.isComplete).toBeTruthy();
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

    // END UPDATE LIST ITEM TEST
  });
  
  // END LIST ITEM UNIT SPEC
});