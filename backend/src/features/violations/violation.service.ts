import pool from "@/config/db";
import { TrafficViolation } from "@/features/violations/violation.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DriverFilter } from "@/types/driver";
import { VehicleFilter } from "@/types/vehicle";
import { ViolationFilter } from "@/types/violation";

export const getAllViolations = async () => {
  const connection = await pool.getConnection();
  try {
    const [result] = (await connection.query("SELECT * FROM traffic_violations")) as any as [
      TrafficViolation[],
      any,
    ];
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const getViolation = async (violation_id: number) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM traffic_violations WHERE violation_id = ?",
      [violation_id],
    );
    return result[0] as TrafficViolation;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const createViolation = async (violation: TrafficViolation) => {
  const connection = await pool.getConnection();
  try {
    const [insertResult] = await connection.query<ResultSetHeader>(
      "INSERT INTO traffic_violations (date,region,province,city_municipality,fine_amount,apprehending_officer,violation_status,violation_type,license_number,plate_number) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        violation.date,
        violation.region,
        violation.province,
        violation.city_municipality,
        violation.fine_amount,
        violation.apprehending_officer,
        violation.violation_status,
        violation.violation_type,
        violation.license_number,
        violation.plate_number,
      ],
    );

    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM traffic_violations WHERE violation_id = ?",
      [insertResult.insertId],
    );
    return rows[0] as TrafficViolation;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const updateViolation = async (violation: TrafficViolation) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE traffic_violations SET date=?, region=?, province=?, city_municipality=?, fine_amount=?, apprehending_officer=?, violation_status=?, violation_type=?, license_number=?, plate_number=? WHERE violation_id=?",
      [
        violation.date,
        violation.region,
        violation.province,
        violation.city_municipality,
        violation.fine_amount,
        violation.apprehending_officer,
        violation.violation_status,
        violation.violation_type,
        violation.license_number,
        violation.plate_number,
        violation.violation_id,
      ],
    );

    console.log(result);
    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM traffic_violations WHERE violation_id = ?",
      [violation.violation_id],
    );
    return rows[0] as TrafficViolation;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteViolation = async (violation_id: number) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM traffic_violations WHERE violation_id=?",
      [violation_id],
    );

    if (result.affectedRows == 0) {
      return null;
    }

    return violation_id;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

// Violations
export const filterViolation = async (violationFilter: ViolationFilter) => {
  const connection = await pool.getConnection();
  const conditions: string[] = [];
  const params: any[] = [];
  const mapping: Record<string, string> = {
    min_date: "date >= ?",
    max_date: "date <= ?",
    min_fine_amount: "fine_amount >= ?",
    max_fine_amount: "fine_amount <= ?",
  };

  Object.entries(violationFilter).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    conditions.push(mapping[key] || `${key} = ?`);
    params.push(value);
  });

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const [result] = await connection.query(`SELECT * FROM traffic_violations ${where}`, params);
    return result as TrafficViolation[];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const filterViolationByDriver = async (
  driverFilter: DriverFilter,
  min_date?: Date | null,
  max_date?: Date | null,
) => {
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
    street_building_house: "d.street_building_house LIKE ?",
  };

  Object.entries(driverFilter).forEach(([key, value]) => {
    if (!value) return;
    conditions.push(mapping[key] || `d.${key} = ?`);
    params.push(key === "street_building_house" ? `%${value}%` : value);
  });

  if (min_date) {
    conditions.push("tv.date >= ?");
    params.push(min_date);
  }
  if (max_date) {
    conditions.push("tv.date <= ?");
    params.push(max_date);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const [result] = await connection.query(
      `SELECT tv.* FROM traffic_violations tv INNER JOIN drivers d ON tv.license_number = d.license_number ${whereClause}`,
      params,
    );

    return result as TrafficViolation[];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const filterViolationByVehicle = async (vehicleFilter: VehicleFilter) => {
  const connection = await pool.getConnection();
  const conditions: string[] = [];
  const params: any[] = [];
  const mapping: Record<string, string> = {
    min_year: "v.year >= ?",
    max_year: "v.year <= ?",
  };

  Object.entries(vehicleFilter).forEach(([key, value]) => {
    if (!value) return;
    conditions.push(mapping[key] || `v.${key} = ?`);
    params.push(value);
  });

  const vehicleWhere = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const [result] = await connection.query(
      `SELECT tv.* FROM traffic_violations tv INNER JOIN vehicles v ON tv.plate_number = v.plate_number ${vehicleWhere}`,
      params,
    );

    return result as TrafficViolation[];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

// By Type and Year
export const getTypeCountByYear = async (year: number) => {
  const [result] = await pool.query(
    "SELECT violation_type, COUNT(*) as count FROM traffic_violations WHERE YEAR(date) = ? GROUP BY violation_type",
    [year],
  );
  return result as TrafficViolation[];
};

// TODO: Implement location
