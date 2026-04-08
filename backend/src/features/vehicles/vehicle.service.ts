import pool from "@/config/db";
// import { Vehicle } from "@/features/vehicles/vehicle.model";  uncomment if gagamitin na

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
