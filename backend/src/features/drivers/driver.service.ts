import pool from "@/config/db";
import { Driver } from "@/features/drivers/driver.model";

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
    const [result] = await connection.query("SELECT * FROM drivers WHERE license_number = ?", [
      license_number,
    ]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const createDriver = async (driver: Driver) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query("INSERT INTO drivers VALUES (?,?,?,?,?,?,?,?,?)", [
      driver.license_number,
      driver.full_name,
      driver.date_of_birth,
      driver.sex,
      driver.address,
      driver.license_type,
      driver.license_status,
      driver.issued_at,
      driver.expires_at,
    ]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const updateDriver = async (driver: Driver) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
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
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteDriver = async (license_number: string) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query("DELETE FROM drivers WHERE license_number=?", [
      license_number,
    ]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
