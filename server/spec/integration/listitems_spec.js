const axios = require('axios');
const server = require('../../src/server');

const authHelpers = require('../../src/helpers/auth');
const sequelize = require('../../src/db/models/index').sequelize;
const List = require('../../src/db/models').List;
const ListItem = require('../../src/db/models').ListItem;
const User = require('../../src/db/models').User;
const base = 'http://localhost:4000/listItems/';

const addToken = (token) => {
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
};

const removeToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};

describe('routes: listItems', () => {

  beforeEach((done) => {
    this.user;
    this.token;
    this.list;
    this.listItem;

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

          ListItem.create({
            text: 'list item test text',
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

  describe('POST /listItems/create', () => {
  
    it('should create a listItem associated with the list', (done) => {
      let data = {
        text: 'second list item',
        listId: this.list.id
      };

      // add token to req
      addToken(this.token);

      axios.post(`${base}create`, data)
      .then((res) => {
        removeToken(this.token);
        expect(res.data.isComplete).toBeFalsy();
        expect(res.data.text).toBe('second list item');
        expect(res.data.id).toBe(2)
        expect(res.data.listId).toBe(1)
        done();
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    // END CREATE LIST ITEM SPEC
  });

  describe('POST /listItems/delete', () => {

    it('should delete the listItem with the specified id', (done) => {
      let data = {
        listItemId: this.listItem.id,
        listId: this.listItem.listId
      };

      addToken(this.token);
      axios.post(`${base}delete`, data)
      .then((res) => {
        removeToken();
        expect(res.status).toBe(200);
        ListItem.findByPk(this.listItem.id)
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

    it('should not delete the listItem when not authenticated', (done) => {
      let data = {
        listItemId: this.listItem.id,
        listId: this.listItem.listId
      };

      axios.post(`${base}delete`, data)
      .then(() => {
        ListItem.findByPk(this.listItem.id)
        .then((listItem) => {
          // list item should not be deleted
          expect(listItem.text).toBe('list item test text');
          done();
        })
        .catch((err) => {
          expect(err.request.res.statusMessage).toBe('error while authenticating');
          done();
        });
      })
      .catch((err) => {
        expect(err.request.res.statusMessage).toBe('error while authenticating');
        done();
      });
    });

    // END DELETE LIST ITEM SPEC
  });

  describe('POST /listItems/update', () => {

    it('should update the text of the specified listItem', (done) => {
      let data = {
        updatedText: 'updated text',
        listItemId: this.listItem.id,
        listId: this.listItem.listId
      };

      addToken(this.token);
      axios.post(`${base}update`, data)
      .then((res) => {
        removeToken();
        expect(res.data.text).toBe('updated text');
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not update the specified listItem if not authenticated', (done) => {
      let data = {
        updatedText: 'updated text',
        listItemId: this.listItem.id,
        listId: this.listItem.listId
      };

      axios.post(`${base}update`, data)
      .then((res) => {
        // expect errors
        expect(res).toBeNull();
        done();
      })
      .catch((err) => {
        expect(err.request.res.statusMessage).toBe('error while authenticating');
        done();
      });
    });

    // END UPDATE LIST ITEMS TEST
  });

  describe('POST /listItems/completed', () => {

    it('should change isComplete for the selected list item', (done) => {
      let data = {
        completed: true,
        listItemId: this.listItem.id,
        listId: this.listItem.listId
      };

      addToken(this.token);
      axios.post(`${base}completed`, data)
      .then((res) => {
        removeToken();
        expect(res.status).toBe(200);
        ListItem.findByPk(this.listItem.id)
        .then((listItem) => {
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

    it('should not change isComplete if not authenticated', (done) => {
      let data = {
        completed: true,
        listItemId: this.listItem.id,
        listId: this.listItem.listId
      };

      axios.post(`${base}completed`, data)
      .then((res) => {
        // expect errors
        expect(res).toBeNull();
        done();
      })
      .catch((err) => {
        expect(err.request.res.statusMessage).toBe('error while authenticating');
        done();
      });
    });

    // END COMPLETED LIST ITEMS TEST
  });

  describe('POST /listItems/activeList', () => {

    it('should return an array of list items for the selected list', (done) => {
      let data = {
        listId: this.list.id
      };

      // add another item to the list
      ListItem.create({
        text: 'second test list item',
        listId: this.list.id
      })
      .then(() => {
        addToken(this.token);
        axios.post(`${base}activeList`, data)
        .then((res) => {
          removeToken();
          expect(res.data[0].text).toBe('list item test text');
          expect(res.data[1].text).toBe('second test list item');
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

    it('should not return items if not authenticated', (done) => {
      let data = {
        listId: this.listId
      };

      axios.post(`${base}activeList`, data)
      .then((res) => {
        expect(res).toBeNull();
        done();
      })
      .catch((err) => {
        expect(err.request.res.statusMessage).toBe('error while authenticating');
        done();
      });
    });

    // END GET ACTIVE LIST TEST
  });

  // END LIST ITEMS INTEGRATION SPEC
});