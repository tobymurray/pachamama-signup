const test = require('blue-tape');
const mockKnex = require('mock-knex');

import { CryptoUtils } from '../../utils/cryptoUtils';
import { User } from '../users/user';
import { Database } from '../../config/db';
if (!(<any>global).knex) {
  (<any>global).knex = mockKnex.mock(Database.get());
}


const firstName = 'firstName';
const lastName = 'lastName';
const phoneNumber = '613-555-5555';
const email = 'email@email.com';
const plaintextPassword = 'password';
const fakeEncryptedPassword = 'encryptedPassword'

test('User', d => {

  d.test('is constructable without ID', t => {
    t.doesNotThrow(() => {
      new User(firstName, lastName, phoneNumber, email, plaintextPassword);
    });
    t.end();
  });

  d.test('is constructable with ID', t => {
    t.doesNotThrow(() => {
      new User(firstName, lastName, phoneNumber, email, plaintextPassword, 1);
    });
    t.end();
  });
  d.end();

});

test('User#add', d => {

  d.test('adds a user', t => {
    let tracker = mockKnex.getTracker();

    tracker.install();

    tracker.once('query', (query) => {
      query.response([
        {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          email: email,
          password: fakeEncryptedPassword,
        }
      ]);
    });

    return User.add(firstName, lastName, phoneNumber, email, 'password')
      .then((user: User) => {
        t.equal(user.firstName, firstName);
        t.equal(user.lastName, lastName);
        t.equal(user.phoneNumber, phoneNumber);
        t.equal(user.email, email);
        t.equal(user.password, fakeEncryptedPassword);
        t.pass();
      }).catch(error => {
        t.fail(error);
      });
  });

  d.test('fails to add a user on database error', t => {
    let tracker = mockKnex.getTracker();

    tracker.install();

    tracker.once('query', (query) => {
      query.reject("Fake database error");
    });

    return User.add(firstName, lastName, phoneNumber, email, 'password')
      .then((user: User) => {
        t.fail();
      }).catch(error => {
        t.pass();
      });
  });
  d.end();

});

test('User#get', d => {

  d.test('returns user when email matches', t => {
    let tracker = mockKnex.getTracker();

    tracker.install();

    tracker.once('query', (query) => {
      query.response([
        {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          email: email,
          password: fakeEncryptedPassword,
        }
      ]);
    });

    return User.get(email)
      .then((user: User) => {
        t.equal(user.firstName, firstName);
        t.equal(user.lastName, lastName);
        t.equal(user.phoneNumber, phoneNumber);
        t.equal(user.email, email);
        t.equal(user.password, fakeEncryptedPassword);
        t.pass();
      }).catch(error => {
        t.fail(error);
      });
  });

  d.test('returns null when email does not match', t => {
    let tracker = mockKnex.getTracker();

    tracker.install();

    tracker.once('query', (query) => {
      query.response([]);
    });

    return User.get(email)
      .then((user: User) => {
        t.equal(user, null);
        t.pass();
      }).catch(error => {
        t.fail(error);
      });
  });

  d.test('throws if email matches multiple users', t => {
    let tracker = mockKnex.getTracker();

    tracker.install();

    tracker.once('query', (query) => {
      query.response([{}, {}]);
    });

    return User.get(email)
      .then((user: User) => {
        t.fail();
      }).catch(error => {
        t.pass(error);
      });
  });
  d.end();

});
