import { Address } from './../address';
import { PickUpLocation } from './../pick_up_location';
import { SignUpFormData } from './sign_up_form_data';
import { Subscription } from './../subscription'
import { SubscriptionType } from './../subscription_types/subscription_type';
import { User } from './../users/user';

export class SignUpForm {

  public submit(form: SignUpFormData): Promise<[any, Subscription]> {
    return Promise.all([
      User.add(form.firstName, form.lastName, form.phone, form.email, form.password),
      Address.add(form.addressOne, form.addressTwo, '', form.city, form.postalCode, form.province, form.country),
      form.shareSize == 'halfShare' ? SubscriptionType.getHalfShare() : SubscriptionType.getFullShare(),
      PickUpLocation.get(form.pickUpLocation)
    ]).then(([user, address, subscriptionType, pickUpLocation]) => {
      let now = new Date();
      return Promise.all([
        user.addAddress(address),
        Subscription.add(user.id, subscriptionType.id, pickUpLocation.id, now, now)
      ]);
    })
  }

}