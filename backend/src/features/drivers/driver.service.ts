import pool from "@/config/db";
import { Driver } from "@/features/drivers/driver.model";
import { DriverFilter } from "@/types/driver";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export const getAllDrivers = async () => {
  const connection = await pool.getConnection();
  try {
    const [result] = (await connection.query("SELECT * FROM drivers")) as any as [Driver[], any];
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const getDriver = async (license_number: string) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM drivers WHERE license_number = ?",
      [license_number],
    );
    return result[0] as Driver;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const createDriver = async (driver: Driver) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO drivers VALUES (?,?,?,?,?,?,?,?,?)",
      [
        driver.license_number,
        driver.full_name,
        driver.date_of_birth,
        driver.sex,
        driver.address,
        driver.license_type,
        driver.license_status,
        driver.issued_at,
        driver.expires_at,
      ],
    );

    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM drivers WHERE license_number = ?",
      [driver.license_number],
    );
    return rows[0] as Driver;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const updateDriver = async (driver: Driver) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE drivers SET full_name=? , date_of_birth=?, sex=?, address=?, license_type=?, license_status=?, issued_at=?, expires_at=? WHERE license_number=?",
      [
        driver.full_name,
        driver.date_of_birth,
        driver.sex,
        driver.address,
        driver.license_type,
        driver.license_status,
        driver.issued_at,
        driver.expires_at,
        driver.license_number,
      ],
    );

    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM drivers WHERE license_number = ?",
      [driver.license_number],
    );
    return rows[0] as Driver;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteDriver = async (license_number: string) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM drivers WHERE license_number=?",
      [license_number],
    );

    if (result.affectedRows == 0) {
      return null;
    }

    return license_number;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const filterDriver = async ({
  sex,
  license_type,
  license_status,
  min_date,
  max_date,
}: DriverFilter) => {
  const connection = await pool.getConnection();
  try {
    const conditions = [];
    const params = [];

    if (license_type) {
      conditions.push("license_type = ?");
      params.push(license_type);
    }
    if (license_status) {
      conditions.push("license_status = ?");
      params.push(license_status);
    }
    if (min_date) {
      conditions.push("date_of_birth >= ?");
      params.push(min_date);
    }
    if (max_date) {
      conditions.push("date_of_birth <= ?");
      params.push(max_date);
    }
    if (sex) {
      conditions.push("sex = ?");
      params.push(sex);
    }
    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const [result] = await connection.query(`SELECT * FROM drivers ${where}`, params);

    return result as Driver[];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
