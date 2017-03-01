export class Address {
  constructor(private line_1: string, private line_2: string, private line_3: string,
    private city: string, private postal_code: string, private province: string, private country: string, private _id?: number) {
  }

  get id(): number {
    return this._id;
  }

  static add(line_1: string, line_2: string, line_3: string, city: string,
    postal_code: string, province: string, country: string) {
    let now = new Date();
    return (<any>global).knex('addresses').insert(
      {
        line_1: line_1,
        line_2: line_2,
        line_3: line_3,
        city: city,
        postal_code: postal_code,
        province: province,
        country: country,
        created_at: now,
        updated_at: now
      }
    ).returning('*')
      .then(addresses => {
        let address = addresses[0];
        return new Address(address.line_1, address.line_2, address.line_3,
          address.city, address.postal_code, address.province, address.country, address.address_id);
      });
  }
}
