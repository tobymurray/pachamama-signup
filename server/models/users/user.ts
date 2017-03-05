import { CryptoUtils } from '../../utils/cryptoUtils';
import { Address } from '../address';

export class User {
  constructor(private _firstName: string, private _lastName: string,
    private _phoneNumber: string, private _email: string, private _password: string, private _id?: number) {
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get id(): number {
    return this._id;
  }

  addAddress(address: Address) {
    return (<any>global).knex('customers_addresses').insert(
      {
        user_id: this.id,
        address_id: address.id
      });
  }

  static add(firstName: string, lastName: string, phoneNumber: string,
    email: string, plaintextPassword: string) {
    return CryptoUtils.encryptPassword(plaintextPassword)
      .then(encryptedPassword => {
        let now = new Date();
        return (<any>global).knex('users').insert(
          {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            password: encryptedPassword,
            created_at: now,
            updated_at: now
          }).returning('*');
      }).then(users => {
        let user = users[0];
        return new User(user.first_name, user.last_name, user.phone_number, user.email, user.password, user.user_id);
      });
  }

  static get(email: string) {
    return (<any>global).knex('users').where({
      email: email
    }).then(users => {
      return new Promise(function (resolve, reject) {
        if (users.length === 0) {
          return resolve(null);
        }

        if (users.length > 1) {
          return reject("Found " + users.length + " users with email " + email);
        }

        let userData = users[0];
        resolve(new User(userData.first_name, userData.last_name, userData.phone_number, userData.email, userData.password));
      })
    });
  };
}