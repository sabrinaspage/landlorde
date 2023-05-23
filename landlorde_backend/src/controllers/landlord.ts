import ControllerApi from "./controller_api";

class LandlordController extends ControllerApi {
  async exists(landlordId: string) {
    return this.runQuery(
      "SELECT EXISTS ( SELECT * FROM landlord WHERE id = $1)",
      [landlordId]
    );
  }

  async getAllLandlords() {
    return this.runQuery("SELECT * FROM landlord");
  }

  async getLandlordById(landlordId: string) {
    return this.runQuery("SELECT * FROM landlord WHERE id = $1", [landlordId]);
  }

  async createLandlord(landlordData: any) {
    const { phone_number, email, fax_number, landlord_name } = landlordData;

    return this.runQuery(
      `
        WITH inserted_contactinfo AS (
          INSERT INTO contactinfo (phonenumber, email, faxnumber) 
          VALUES ($1, $2, $3)
          RETURNING id
        )
        INSERT INTO landlord (name, contact_info_id)
        SELECT $4, id
        FROM inserted_contactinfo
        RETURNING *;
      `,
      [phone_number, email, fax_number, landlord_name]
    );
  }

  async updateLandlordById(landlordId: string, landlordData: any) {
    const { name } = landlordData;

    return this.runQuery(
      `
      UPDATE landlord SET
        name = COALESCE($2, name)
        WHERE id = $1
      RETURNING *;
      `,
      [landlordId, name]
    );
  }

  async updateLandlordContactInfoById(
    landlordId: string,
    landlordContactInfoData: any
  ) {
    const { phone_number, email, fax_number } = landlordContactInfoData;

    return this.runQuery(
      `
      UPDATE contactinfo SET
        phonenumber = COALESCE($2, phonenumber),
        email = COALESCE($3, email),
        faxnumber = COALESCE($4, faxnumber),
      FROM landlord
      WHERE landlord.contact_info_id = contactinfo.id
      AND
      landlord.id = $1;
      `,
      [landlordId, phone_number, email, fax_number]
    );
  }

  async deleteLandlord(landlordId: string) {
    return this.runQuery("DELETE FROM landlord WHERE id = $1", [landlordId]);
  }
}

export default new LandlordController();
