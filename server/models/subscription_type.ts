export class SubscriptionType {

  public static readonly FULL_SHARE = "Full share";
  public static readonly HALF_SHARE = "Half share";

  constructor(private description: string, private _id?: number) { }

  public get id(): number {
    return this._id;
  }

  public static getFullShare(): Promise<SubscriptionType> {
    return SubscriptionType.find(SubscriptionType.FULL_SHARE);
  }

  public static getHalfShare(): Promise<SubscriptionType> {
    return SubscriptionType.find(SubscriptionType.HALF_SHARE);
  }

  private static find(description: string): Promise<SubscriptionType> {
    return (<any>global).knex('subscription_types')
      .where({ description: description })
      .returning('*')
      .then(subscriptionTypes => {
        let subscriptionType = subscriptionTypes[0];
        return new SubscriptionType(subscriptionType.description, subscriptionType.subscription_type_id);
      });
  }
}
