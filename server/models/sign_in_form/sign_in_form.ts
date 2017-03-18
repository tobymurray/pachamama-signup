import { CryptoUtils } from '../../utils/cryptoUtils';
import { SignInFormData } from './sign_in_form_data';
import { User } from './../users/user';

export class SignInForm {

  public submit(form: SignInFormData): Promise<[User]> {
    if (!form.email) return Promise.reject("Email cannot be empty");
    if (!form.password) return Promise.reject("Password cannot be empty");

    let trimmed_email = form.email.trim();
    let trimmed_password = form.password.trim();

    if (!trimmed_email) return Promise.reject("Email cannot be empty");
    if (!trimmed_password) return Promise.reject("Password cannot be empty");

    return User.get(form.email)
      .then(user => {
        return CryptoUtils.encryptPassword(trimmed_password)
          .then(encryptedPassword => {
            if (CryptoUtils.passwordMatches(trimmed_password, encryptedPassword)) {
              return user;
            } else {
              return Promise.reject("Username or password was incorrect");
            }
          });
      });
  }

}
