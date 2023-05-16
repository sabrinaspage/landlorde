import { Pool } from "pg";
import pool from "../pool";

class ContactInfoController {
  pool: Pool;

  constructor() {
    this.pool = pool;
  }
}

export default ContactInfoController;
