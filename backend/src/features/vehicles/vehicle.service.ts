import pool from "@/config/db";
import { Vehicle } from "@/features/vehicles/vehicle.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const getAllVehicles = async () => {
  const connection = await pool.getConnection();
  try {
    const [result] = (await connection.query("SELECT * FROM vehicles")) as any as [Vehicle[], any];
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const getVehicle = async (plate_number: string) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM vehicles WHERE plate_number = ?",
      [plate_number],
    );
    return result[0] as Vehicle;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const createVehicle = async (vehicle: Vehicle) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO vehicles VALUES (?,?,?,?,?,?,?,?,?)",
      [
        vehicle.plate_number,
        vehicle.engine_number,
        vehicle.chassis_number,
        vehicle.vehicle_type,
        vehicle.make,
        vehicle.model,
        vehicle.year,
        vehicle.color,
        vehicle.license_number,
      ],
    );

    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM vehicles WHERE plate_number = ?",
      [vehicle.plate_number],
    );
    return rows[0] as Vehicle;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const updateVehicle = async (vehicle: Vehicle) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE vehicles SET engine_number=?, chassis_number=?, vehicle_type=?, make=?, model=?, year=?, color=?, license_number=? WHERE plate_number=?",
      [
        vehicle.engine_number,
        vehicle.chassis_number,
        vehicle.vehicle_type,
        vehicle.make,
        vehicle.model,
        vehicle.year,
        vehicle.color,
        vehicle.license_number,
        vehicle.plate_number,
      ],
    );

    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM vehicles WHERE plate_number = ?",
      [vehicle.plate_number],
    );
    return rows[0] as Vehicle;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteVehicle = async (plate_number: string) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM vehicles WHERE plate_number=?",
      [plate_number],
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return plate_number;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
