import ControllerApi from "./controllerApi";

class LandlordController extends ControllerApi {
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

  async updateLandlordById(landlordName: string | null, landlordId: string) {
    return this.runQuery(
      `
    UPDATE landlord SET
      name = COALESCE($2, name)
      WHERE id = $1
    RETURNING *;
    `,
      [landlordId, landlordName]
    );
  }

  async deleteLandlord(landlordId: string) {
    return this.runQuery("DELETE FROM landlord WHERE id = $1", [landlordId]);
  }
}

export default new LandlordController();
