export function configureFakeBackend() {
  const timeOfLatency = 1000;

  let defaultUsers = [
    {
      _id: '5fce46cc305c2d245480a74d',
      username: 'Debbie@chat.app',
      password: 12345,
      age: 29,
      state: 'online',
      firstname: 'Shaffer',
      lastname: 'Henry',
      gender: 'male',
    },
    {
      _id: '5fce46cc5ce207bffd2c464c',
      username: 'Tammy@chat.app',
      password: 12345,
      age: 52,
      state: 'online',
      firstname: 'Jeannie',
      lastname: 'Grant',
      gender: 'female',
    },
    {
      _id: '5fce46cccd54e2c4c0d7a823',
      username: 'Haley@chat.app',
      password: 12345,
      age: 49,
      state: 'offline',
      firstname: 'Maryann',
      lastname: 'Valentine',
      gender: 'female',
    },
    {
      _id: '5fce46ccd5bc01bcc58eddff',
      username: 'Henrietta@chat.app',
      password: 12345,
      age: 22,
      state: 'online',
      firstname: 'Sharpe',
      lastname: 'Stark',
      gender: 'male',
    },
    {
      _id: '5fce46cc15bc32f1ecf33861',
      username: 'Hudson@chat.app',
      password: 12345,
      age: 57,
      state: 'offline',
      firstname: 'Pratt',
      lastname: 'Schmidt',
      gender: 'male',
    },
    {
      _id: '5fce46ccec79e10fc8d2169f',
      username: 'Katelyn@chat.app',
      password: 12345,
      age: 23,
      state: 'offline',
      firstname: 'Wells',
      lastname: 'Noel',
      gender: 'male',
    },
    {
      _id: '5fce46ccb1f1f58f8ebf29cd',
      username: 'Flossie@chat.app',
      password: 12345,
      age: 35,
      state: 'online',
      firstname: 'Lucy',
      lastname: 'Bell',
      gender: 'female',
    },
    {
      _id: '5fce46ccbcf604e0928f6659',
      username: 'Kendra@chat.app',
      password: 12345,
      age: 51,
      state: 'offline',
      firstname: 'Edith',
      lastname: 'Mclean',
      gender: 'female',
    },
    {
      _id: '5fce46ccf4f27b02c72f5489',
      username: 'Franklin@chat.app',
      password: 12345,
      age: 42,
      state: 'offline',
      firstname: 'Kristi',
      lastname: 'Salazar',
      gender: 'female',
    },
    {
      _id: '5fce46cc87843db743cea878',
      username: 'Hays@chat.app',
      password: 12345,
      age: 23,
      state: 'online',
      firstname: 'June',
      lastname: 'Guerrero',
      gender: 'female',
    },
  ];
  let users = JSON.parse(localStorage.getItem('users')) || defaultUsers;

  let routesToFake = [/*'api/users'*/];

  const urlToFake = (url) => {
    return routesToFake.some((u) => url.includes(u));
  };

  // monkey patch fetch to setup fake backend
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // fakebackend umbauen
      // zuerst muss man die URL auswerten und dann kann man entscheiden ob man realFetch durchzieht oder auf
      // das fake-backend durchgeht
      // (auf einen fixen API-Point abfragen!)
      if (urlToFake(url)) {
        console.log(`fake fetch for: ${url} ${JSON.stringify(opts)}`);
        // wrap in timeout to simulate server api call
        setTimeout(handleRoute, timeOfLatency);
      } else {
        console.log(`realFetch fetch for: ${url} ${opts}`);
        realFetch(url, opts)
          .then((response) => resolve(response))
          .catch((error) => reject(400, error));
      }

      function handleRoute() {
        const { method } = opts;
        switch (true) {
          case url.endsWith('/users') && method === 'GET':
            return getUsers();
          case url.match(/\/users\/+/) && method === 'GET':
            return getUserById();
          case url.endsWith('/users') && method === 'POST':
            return createUser();
          case url.match(/\/users\/+/) && method === 'PATCH':
            return updateUser();
          case url.match('/usersinit') && method === 'PATCH':
            return setDefaultUsers();
          case url.match(/\/users\/+/) && method === 'DELETE':
            return deleteUser();
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(400, error));
        }
      }

      // route functions

      function getUsers() {
        return ok(users);
      }

      function setDefaultUsers() {
        users = defaultUsers;
        localStorage.setItem('users', JSON.stringify(users));
        console.log('default users set again ...');

        return ok();
      }

      function getUserById() {
        let lookupId = getIdFromUrl();
        let user = users.find((x) => x._id === lookupId);
        if (!user) return error(404, `user with ${lookupId} not found`);

        return ok(user);
      }

      function createUser() {
        const user = body();

        // turn this on later
        if (users.find((x) => x.username === user.username)) {
          return error(
            400,
            `User with the username ${user.username} already exists`,
          );
        }

        // assign user _id and a few other properties then save
        user._id = createObjectId();
        user.dateCreated = new Date().toISOString();
        delete user.confirmPassword;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return ok();
      }

      function updateUser() {
        let lookupId = getIdFromUrl();
        let user = users.find((x) => x._id === lookupId);
        if (!user) return error(404, `user with ${lookupId} not found`);

        let params = body();

        // only update password if included
        if (!params.password) {
          delete params.password;
        }
        // don't save confirm password
        delete params.confirmPassword;

        // update and save user
        Object.assign(user, params);
        localStorage.setItem('users', JSON.stringify(users));

        return ok();
      }

      function deleteUser() {
        users = users.filter((x) => x._id !== getIdFromUrl());
        localStorage.setItem('users', JSON.stringify(users));

        return ok();
      }

      // helper functions
      function ok(body) {
        resolve({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(body)),
        });
      }

      function error(httpStatus, message) {
        let status = httpStatus || 400;
        resolve({
          status: status,
          text: () => Promise.resolve(JSON.stringify({ message })),
        });
      }

      function getIdFromUrl() {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
      }

      function body() {
        return opts.body && JSON.parse(opts.body);
      }

      function createObjectId() {
        //throw new Error(
        //  'newUserId not implemented. can not create new user in fakeBackend',
        //);

        var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
        return (
          timestamp +
          'xxxxxxxxxxxxxxxx'
            .replace(/[x]/g, function () {
              return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase()
        );
      }
    });
  };
}
