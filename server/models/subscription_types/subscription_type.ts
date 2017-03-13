export class SubscriptionType {

  public static readonly FULL_SHARE = "Full share";
  public static readonly HALF_SHARE = "Half share";

  constructor(private _description: string, private _id?: number) { }

  public get description(): string {
    return this._description;
  }

  public get id(): number {
    return this._id;
  }

  public static getFullShare(): Promise<SubscriptionType> {
    return SubscriptionType.find(SubscriptionType.FULL_SHARE);
  }

  public static getHalfShare(): Promise<SubscriptionType> {
    return SubscriptionType.find(SubscriptionType.HALF_SHARE);
  }

  public static getById(id: number): Promise<SubscriptionType> {
    return (<any>global).knex('subscription_types')
      .where({ subscription_type_id: id })
      .returning('*')
      .then(subscriptionTypes => {
        let subscriptionType = subscriptionTypes[0];
        return new SubscriptionType(subscriptionType.description, subscriptionType.subscription_type_id);
      });
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
