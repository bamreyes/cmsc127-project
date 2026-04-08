import { Request, Response } from "express";
import * as DriverService from "@/features/drivers/driver.service";
import { Driver } from "@/features/drivers/driver.model";

// GET /api/drivers
export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const result = await DriverService.getAllDrivers();
    console.log(result);

    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET /api/drivers/:license_number
export const getDriver = async (req: Request, res: Response) => {
  const { license_number } = req.params;

  try {
    const result = await DriverService.getDriver(license_number as string);
    console.log(result);

    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send(error);
  }
};

// POST /api/drivers
export const createDriver = async (req: Request, res: Response) => {
  const {
    license_number,
    full_name,
    date_of_birth,
    sex,
    address,
    license_type,
    license_status,
    issued_at,
    expires_at,
  } = req.body;

  if (new Date(expires_at) <= new Date(issued_at)) throw Error("Invalid dates");

  try {
    const result = await DriverService.createDriver({
      license_number,
      full_name,
      date_of_birth,
      sex,
      address,
      license_type,
      license_status,
      issued_at,
      expires_at,
    } as Driver);
    console.log(result);

    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send(error);
  }
};

// PUT /api/drivers/:license_number
export const updateDriver = async (req: Request, res: Response) => {
  const { license_number } = req.params;
  const {
    full_name,
    date_of_birth,
    sex,
    address,
    license_type,
    license_status,
    issued_at,
    expires_at,
  } = req.body;

  if (new Date(expires_at) <= new Date(issued_at)) throw Error("Invalid dates");

  try {
    const result = await DriverService.updateDriver({
      license_number,
      full_name,
      date_of_birth,
      sex,
      address,
      license_type,
      license_status,
      issued_at,
      expires_at,
    } as Driver);
    console.log(result);

    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send(error);
  }
};

// DELETE /api/drivers/:license_number
export const deleteDriver = async (req: Request, res: Response) => {
  const { license_number } = req.params;
  console.log(`DEBUG: |${license_number}|`);
  try {
    const result = await DriverService.deleteDriver(license_number as string);
    console.log(result);

    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send(error);
  }
};
