import pool from "./config/db";
import { setupTrigger } from "./features/registrations/registration.trigger";
import { setupDriverTrigger } from "./features/drivers/driver.trigger";

export async function initializeDatabase(populate: boolean = false) {
  const connection = await pool.getConnection();
  try {
    await connection.query("SET FOREIGN_KEY_CHECKS = 0;");

    await connection.query("DROP TABLE IF EXISTS traffic_violations;");
    await connection.query("DROP TABLE IF EXISTS vehicle_registrations;");
    await connection.query("DROP TABLE IF EXISTS vehicles;");
    await connection.query("DROP TABLE IF EXISTS drivers;");

    await connection.query(`
      CREATE TABLE drivers (
        license_number varchar(50) NOT NULL,
        full_name varchar(255) NOT NULL,
        date_of_birth date NOT NULL,
        sex varchar(10) DEFAULT NULL,
        address text DEFAULT NULL,
        license_type varchar(50) DEFAULT NULL,
        license_status varchar(20) DEFAULT NULL,
        issued_at date DEFAULT NULL,
        expires_at date DEFAULT NULL,
        PRIMARY KEY (license_number)
      )
    `);

    await connection.query(`
      CREATE TABLE vehicles (
        plate_number varchar(20) NOT NULL,
        engine_number varchar(50) NOT NULL,
        chassis_number varchar(50) NOT NULL,
        vehicle_type varchar(50) DEFAULT NULL,
        make varchar(50) DEFAULT NULL,
        model varchar(50) DEFAULT NULL,
        year int(11) DEFAULT NULL,
        color varchar(30) DEFAULT NULL,
        license_number varchar(50) DEFAULT NULL,
        PRIMARY KEY (plate_number),
        UNIQUE KEY engine_number (engine_number),
        UNIQUE KEY chassis_number (chassis_number),
        KEY fk_vehicles_drivers (license_number),
        CONSTRAINT fk_vehicles_drivers FOREIGN KEY (license_number) REFERENCES drivers (license_number) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE vehicle_registrations (
        registration_number bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        registration_status varchar(20) DEFAULT NULL,
        registration_date date DEFAULT NULL,
        expiration_date date DEFAULT NULL,
        plate_number varchar(20) NOT NULL,
        license_number varchar(50) DEFAULT NULL,
        active_plate_number varchar(20) GENERATED ALWAYS AS (
          IF(registration_status = 'Active', plate_number, NULL)
        ) VIRTUAL,
        PRIMARY KEY (registration_number),
        KEY idx_plate_number (plate_number),
        KEY fk_reg_drivers (license_number),
        UNIQUE KEY unique_active_registration (active_plate_number),
        CONSTRAINT fk_reg_vehicles FOREIGN KEY (plate_number) REFERENCES vehicles (plate_number) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT fk_reg_drivers FOREIGN KEY (license_number) REFERENCES drivers (license_number) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE traffic_violations (
        violation_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        date date NOT NULL,
        location varchar(255) DEFAULT NULL,
        fine_amount decimal(10,2) DEFAULT NULL,
        apprehending_officer varchar(255) DEFAULT NULL,
        violation_status varchar(20) DEFAULT NULL,
        violation_type varchar(100) DEFAULT NULL,
        license_number varchar(50) DEFAULT NULL,
        plate_number varchar(20) DEFAULT NULL,
        PRIMARY KEY (violation_id),
        KEY license_number (license_number),
        KEY plate_number (plate_number),
        CONSTRAINT fk_tv_driver FOREIGN KEY (license_number) REFERENCES drivers (license_number) ON DELETE RESTRICT,
        CONSTRAINT fk_tv_vehicle FOREIGN KEY (plate_number) REFERENCES vehicles (plate_number) ON DELETE RESTRICT
      )
    `);

    await connection.query("SET FOREIGN_KEY_CHECKS = 1;");

    await setupTrigger();
    await setupDriverTrigger();

    if (populate) {
      const drivers = [
        ['LTO-TX-001', 'Juan Dela Cruz', '1985-05-15', 'Male', '123 Rizal St, Manila', 'Professional', 'Active', '2020-01-15', '2025-01-15'],
        ['LTO-TX-002', 'Maria Clara', '1990-08-22', 'Female', '456 Bonifacio Ave, Quezon City', 'Non-Professional', 'Active', '2021-03-10', '2026-03-10'],
        ['LTO-TX-003', 'Andres Bonifacio', '1988-11-30', 'Male', '789 Mabini St, Caloocan', 'Professional', 'Suspended', '2019-07-20', '2024-07-20'],
        ['LTO-TX-004', 'Jose Rizal', '1992-06-19', 'Male', '101 Luna St, Makati', 'Non-Professional', 'Active', '2022-02-14', '2027-02-14'],
        ['LTO-TX-005', 'Gabriela Silang', '1995-03-08', 'Female', '202 Aguinaldo Highway, Cavite', 'Professional', 'Expired', '2018-05-05', '2023-05-05'],
      ];

      for (const d of drivers) {
        await connection.query(
          "INSERT INTO drivers (license_number, full_name, date_of_birth, sex, address, license_type, license_status, issued_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          d
        );
      }

      const vehicles = [
        ['ABC-1234', 'ENG-1001', 'CHAS-2001', 'SUV', 'Toyota', 'Fortuner', 2020, 'Black', 'LTO-TX-001'],
        ['XYZ-9876', 'ENG-1002', 'CHAS-2002', 'Sedan', 'Honda', 'Civic', 2019, 'White', 'LTO-TX-002'],
        ['DEF-4567', 'ENG-1003', 'CHAS-2003', 'Truck', 'Isuzu', 'Elf', 2015, 'Red', 'LTO-TX-003'],
        ['LMN-3456', 'ENG-1004', 'CHAS-2004', 'Motorcycle', 'Yamaha', 'Mio', 2021, 'Blue', 'LTO-TX-004'],
        ['PQR-7890', 'ENG-1005', 'CHAS-2005', 'Van', 'Nissan', 'Urvan', 2018, 'Silver', 'LTO-TX-001'],
      ];

      for (const v of vehicles) {
        await connection.query(
          "INSERT INTO vehicles (plate_number, engine_number, chassis_number, vehicle_type, make, model, year, color, license_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          v
        );
      }

      const registrations = [
        ['Active', '2023-01-10', '2024-01-10', 'ABC-1234', 'LTO-TX-001'],
        ['Active', '2023-05-15', '2024-05-15', 'XYZ-9876', 'LTO-TX-002'],
        ['Expired', '2022-08-20', '2023-08-20', 'DEF-4567', 'LTO-TX-003'],
        ['Active', '2023-11-05', '2024-11-05', 'LMN-3456', 'LTO-TX-004'],
        ['Active', '2023-02-28', '2024-02-28', 'PQR-7890', 'LTO-TX-001'],
      ];

      for (const r of registrations) {
        await connection.query(
          "INSERT INTO vehicle_registrations (registration_status, registration_date, expiration_date, plate_number, license_number) VALUES (?, ?, ?, ?, ?)",
          r
        );
      }

      const violations = [
        ['2023-06-15', 'EDSA, Quezon City', 1500.00, 'Officer Santos', 'Unpaid', 'Speeding', 'LTO-TX-001', 'ABC-1234'],
        ['2023-09-22', 'C5 Road, Pasig', 1000.00, 'Officer Reyes', 'Paid', 'Beating the Red Light', 'LTO-TX-003', 'DEF-4567'],
        ['2023-10-05', 'Makati Ave, Makati', 500.00, 'Officer Cruz', 'Unpaid', 'Illegal Parking', 'LTO-TX-002', 'XYZ-9876'],
        ['2023-11-12', 'Roxas Blvd, Manila', 2000.00, 'Officer Garcia', 'Paid', 'Reckless Driving', 'LTO-TX-004', 'LMN-3456'],
        ['2023-12-01', 'Commonwealth Ave, QC', 1500.00, 'Officer Santos', 'Unpaid', 'Speeding', 'LTO-TX-001', 'PQR-7890'],
      ];

      for (const v of violations) {
        await connection.query(
          "INSERT INTO traffic_violations (date, location, fine_amount, apprehending_officer, violation_status, violation_type, license_number, plate_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          v
        );
      }

      console.log("Database initialized and populated successfully.");
    } else {
      console.log("Database initialized successfully (empty schema).");
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  } finally {
    connection.release();
  }
}

if (require.main === module) {
  const populate = !process.argv.includes("--no-populate");
  initializeDatabase(populate)
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}
