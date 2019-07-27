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
        console.log(err.message);
        expect(err).toBeNull();
        done();
      });
    });

    // END CREATE LIST ITEM SPEC
  });

  // describe('POST /listItems/delete', () => {


  //   // END DELETE LIST ITEM SPEC
  // });

  // END LIST ITEMS INTEGRATION SPEC
});