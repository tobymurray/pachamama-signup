export class Subscription {
  constructor(private userId: number, private subscriptionTypeId: number,
    private _pickUpLocationId: number, private startDate: Date,
    private endDate: Date, private _id?: number) { }

  get id(): number {
    return this._id;
  }

  get pickUpLocationId(): number {
    return this._pickUpLocationId;
  }

  static getForUser(userId: number): [Promise<Subscription>] {
    return (<any>global).knex('subscriptions').where({
      user_id: userId
    }).then(subscriptions => {
      if (subscriptions.length === 0) {
        return [];
      }

      return subscriptions.map(subscription => {
        return new Subscription(subscription.user_id, subscription.subscription_type_id, subscription.pick_up_location_id, subscription.start_date, subscription.end_date, subscription.subscription_id);
      });
    });
  }

  static add(userId: number, subscriptionTypeId: number, pickUpLocationId: number, startDate: Date, endDate: Date): Promise<Subscription> {
    let now = new Date();
    return (<any>global).knex('subscriptions').insert(
      {
        user_id: userId,
        subscription_type_id: subscriptionTypeId,
        pick_up_location_id: pickUpLocationId,
        start_date: startDate,
        end_date: endDate
      }
    ).returning('*')
      .then(subscriptions => {
        let subscription = subscriptions[0];
        return new Subscription(subscription.user_id, subscription.subscription_type_id, subscription.pick_up_location_id, subscription.start_date, subscription.end_date, subscription.subscription_id);
      });
  }
}
