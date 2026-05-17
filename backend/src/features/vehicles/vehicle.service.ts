import pool from "@/config/db";
import { Vehicle } from "@shared";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DriverFilter } from "@shared";

export const getAllVehicles = async () => {
  const connection = await pool.getConnection();
  try {
    const [result] = (await connection.query(
      "SELECT * FROM vehicles",
    )) as any as [Vehicle[], any];
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
      "INSERT INTO vehicles (plate_number, engine_number, chassis_number, vehicle_type, make, model, year, color, license_number) VALUES (?,?,?,?,?,?,?,?,?)",
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

export const filterVehicleByDriver = async (driverFilter: DriverFilter) => {
  const connection = await pool.getConnection();
  const conditions: string[] = [];
  const params: any[] = [];
  const mapping: Record<string, string> = {
    min_bdate: "d.date_of_birth >= ?",
    max_bdate: "d.date_of_birth <= ?",
    min_issued_at: "d.issued_at >= ?",
    max_issued_at: "d.issued_at <= ?",
    min_expires_at: "d.expires_at >= ?",
    max_expires_at: "d.expires_at <= ?",
    address: "d.address LIKE ?",
    min_year: "v.year >= ?",
    max_year: "v.year <= ?",
  };

  const vehicleFields = [
    "plate_number",
    "engine_number",
    "chassis_number",
    "vehicle_type",
    "make",
    "model",
    "color",
    "license_number",
  ];
  const likeFields = ["make", "model", "color"];

  Object.entries(driverFilter).forEach(([key, value]) => {
    if (!value) return;

    if (vehicleFields.includes(key)) {
      if (likeFields.includes(key)) {
        conditions.push(`v.${key} LIKE ?`);
        params.push(`%${value}%`);
      } else {
        conditions.push(`v.${key} = ?`);
        params.push(value);
      }
    } else {
      conditions.push(mapping[key] || `d.${key} = ?`);
      params.push(key === "address" ? `%${value}%` : value);
    }
  });

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const [result] = await connection.query(
      `SELECT v.* FROM vehicles v INNER JOIN drivers d ON v.license_number = d.license_number ${whereClause}`,
      params,
    );

    return result as Vehicle[];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
