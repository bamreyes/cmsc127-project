import pool from "../../config/db";

export async function setupTrigger() {
  try {
    await pool.query(`DROP TRIGGER IF EXISTS set_status_expired`);
    await pool.query(`CREATE TRIGGER set_status_expired
                          BEFORE UPDATE ON vehicle_registrations
                          FOR EACH ROW
                          BEGIN
                               IF NEW.expiration_date <= CURDATE() 
                               THEN SET NEW.registration_status = 'Expired';
                               ELSEIF NEW.registration_status = 'Suspended'
                               THEN SET NEW.registration_status = 'Suspended';
                               ELSEIF CURDATE() >= NEW.registration_date
                               THEN SET NEW.registration_status = 'Active';
                               ELSE
                               SET NEW.registration_status = 'Pending';
                               END IF;
                           END;`);

    await pool.query(`DROP TRIGGER IF EXISTS set_status_expired_insert`);
    await pool.query(`CREATE TRIGGER set_status_expired_insert
                          BEFORE INSERT ON vehicle_registrations
                          FOR EACH ROW
                          BEGIN
                               IF NEW.expiration_date <= CURDATE() 
                               THEN SET NEW.registration_status = 'Expired';
                               ELSEIF NEW.registration_status = 'Suspended'
                               THEN SET NEW.registration_status = 'Suspended';
                               ELSEIF CURDATE() >= NEW.registration_date
                               THEN SET NEW.registration_status = 'Active';
                               ELSE
                               SET NEW.registration_status = 'Pending';
                               END IF;
                           END;`);

    console.log("Trigger successful.");
  } catch (err) {
    console.error("A trigger error occurred:", err);
  }
}
