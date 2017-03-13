export class PickUpLocation {

  constructor(private addressId: number, private description: string, private _id?: number) { }

  get id(): number {
    return this._id;
  }

  static getById(id: number): Promise<PickUpLocation> {
    return (<any>global).knex('pick_up_locations')
      .where({ pick_up_location_id: id })
      .returning('*')
      .then(pickUpLocations => {
        let pickUpLocation = pickUpLocations[0];
        return new PickUpLocation(pickUpLocation.address_id, pickUpLocation.description, pickUpLocation.pick_up_location_id);
      });
  }

  static get(description: string): Promise<PickUpLocation> {
    return (<any>global).knex('pick_up_locations')
      .where({ description: description })
      .returning('*')
      .then(pickUpLocations => {
        let pickUpLocation = pickUpLocations[0];
        return new PickUpLocation(pickUpLocation.address_id, pickUpLocation.description, pickUpLocation.pick_up_location_id);
      });
  }
}
