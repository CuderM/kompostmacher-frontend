export function configureFakeBackend() {
  const timeOfLatency = 0;

  let defaultUsers = [
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

  let routesToFake = [];

  const urlToFake = (url) => {
    return routesToFake.some((u) => url.includes(u));
  };

  // monkey patch fetch to setup fake backend
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      console.log('fetch');
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
        console.log('HandleRoute');
        const { method } = opts;
        switch (true) {
          /*case url.endsWith('/users/login') && method === 'POST':
            return getUserByUsernameAndPassword();*/

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

      // function getUsers() {
      //   return ok(users, { 'content-type': 'application/json' });
      // }

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

        return ok(user, { 'content-type': 'application/json' });
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
      function ok(body, headers) {
        resolve({
          ok: true,
          text: () => Promise.resolve(body),
          json: () => Promise.resolve(body),
          headers,
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
