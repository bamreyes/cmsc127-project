import pool from '../../config/db';

async function setupTrigger() {
    try {
        await pool.query(`DROP TRIGGER IF EXISTS set_status_expired`);
        await pool.query(`CREATE TRIGGER set_status_expired
                          BEFORE UPDATE ON vehicle_registrations
                          FOR EACH ROW
                          BEGIN
                              IF NEW.expiration_date <= CURDATE() 
                              THEN SET NEW.registration_status = 'Expired';
                              END IF;
                          END;`);

        console.log("Trigger successful.");
    } catch (err) {
        console.error("A trigger error occurred:", err);
    }
}