import pool from "@/config/db";
import { Vehicle } from "@/features/vehicles/vehicle.model";
import { RowDataPacket } from "mysql2";

export const getAllVehicles = async () => {
  const connection = await pool.getConnection();
  try{
    const [result] = (await connection.query("SELECT * FROM vehicles")) as any as [Vehicle[], any];
    return result;
  }catch (error) {
    throw error;
  } finally {
    connection.release;
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