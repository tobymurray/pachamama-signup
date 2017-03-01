export class Subscription {
  constructor(private userId: number, private subscriptionTypeId: number,
    private pickUpLocationId: number, private startDate: Date,
    private endDate: Date, private _id?: number) { }

  get id(): number {
    return this._id;
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
        return new Subscription(subscription.user_id, subscription.subscription_type_id, subscription.start_date, subscription.end_date, subscription.subscription_id);
      });
  }
}
