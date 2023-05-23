import ControllerApi from "./controller_api";

class TenantController extends ControllerApi {
  MODEL_NAME = "tenant";

  async createTenant(tenantData: any) {
    const { phone_number, email, fax_number, tenant_name } = tenantData;

    return this.runQuery(
      `
        WITH inserted_contactinfo AS (
          INSERT INTO contactinfo (phonenumber, email, faxnumber) 
          VALUES ($1, $2, $3)
          RETURNING id
        )
        INSERT INTO tenant (name, contact_info_id)
        SELECT $4, id
        FROM inserted_contactinfo
        RETURNING *;
      `,
      [phone_number, email, fax_number, tenant_name]
    );
  }

  async updateTenantById(tenantId: string, tenantName: string | null = null) {
    return this.runQuery(
      `
        UPDATE tenant SET
          name = COALESCE($2, name)
          WHERE id = $1
        RETURNING *;
      `,
      [tenantId, tenantName]
    );
  }
}

export default new TenantController();
