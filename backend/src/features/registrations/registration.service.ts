import pool from "@/config/db";
import { VehicleRegistration } from "@/features/registrations/registration.model";
import { RegistrationFilter } from "@/types/registration";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// GET registrations
export const getAllRegistrations = async () => {
    const connection = await pool.getConnection();

    try {
        const [result] = (await connection.query("SELECT * FROM vehicle_registrations")) as any as [VehicleRegistration[], any];
        
        return result;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

// GET registrations BY registration_number
export const getRegistration = async(registration_number: number) => {
    const connection = await pool.getConnection();

    try {
        const [result] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM vehicle_registrations WHERE registration_number = ?",
            [registration_number]
        );

        return result[0] as VehicleRegistration;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

// POST registration
export const createRegistration = async(vehicle_registration: VehicleRegistration) => {
    const connection = await pool.getConnection();

    try {
        const [result] = await connection.query<ResultSetHeader>(
            "INSERT INTO vehicle_registrations (registration_number, registration_status, registration_date, expiration_date, plate_number) VALUES (?, ?, ?, ?, ?)",
            [vehicle_registration.registration_number,
             vehicle_registration.registration_status,
             vehicle_registration.registration_date,
             vehicle_registration.expiration_date,
             vehicle_registration.plate_number]
        );

        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM vehicle_registrations WHERE registration_number = ?",
            [vehicle_registration.registration_number]
        );

        return rows[0] as VehicleRegistration;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

// DELETE registration
export const deleteRegistration = async(registration_number: number) => {
    const connection = await pool.getConnection();

    try {
        const [result] = (await connection.query<ResultSetHeader>(
            "DELETE FROM vehicle_registrations WHERE registration_number = ?;",
            [registration_number]
        ));
        
        if (result.affectedRows == 0) {
            return null;
        }

        return registration_number;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

// GENERAL FUNCTION FORMAT
/*
export const <function name> = async (<paramters here>) => {
  const connection = await pool.getConnection();
  try {
    const [result] = (await connection.query(<query here>),<parameters here>);
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
*/