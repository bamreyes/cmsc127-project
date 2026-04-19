import { Request, Response } from "express";
import * as DriverService from "@/features/drivers/driver.service";
import { Driver } from "@/features/drivers/driver.model";
import { LicenseType, LicenseStatus, Sex, DriverFilter } from "@/types/driver";

// GET /api/drivers
export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const result = await DriverService.getAllDrivers();
    console.log(result);

    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occured" });
  }
};

// GET /api/drivers/:license_number
export const getDriver = async (req: Request, res: Response) => {
  const { license_number } = req.params;

  if (!license_number) {
    return res.status(400).send({ success: false, error: "License number is required" });
  }

  if (typeof license_number !== "string" || license_number.trim() === "") {
    return res
      .status(400)
      .send({ success: false, error: "A valid license number string is required" });
  }

  try {
    const result = await DriverService.getDriver(license_number as string);
    console.log(result);

    if (!result) {
      return res.status(404).send({ success: false, message: "Driver not found" });
    }

    res.status(201).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occured" });
  }
};

// POST /api/drivers
export const createDriver = async (req: Request, res: Response) => {
  const {
    license_number,
    full_name,
    date_of_birth,
    sex,
    region,
    province,
    city_municipality,
    barangay,
    street_building_house,
    license_type,
    license_status,
    issued_at,
    expires_at,
  } = req.body;

  const requiredFields = [
    "license_number",
    "full_name",
    "date_of_birth",
    "sex",
    "region",
    "province",
    "city_municipality",
    "street_building_house",
    "license_type",
    "license_status",
    "issued_at",
    "expires_at",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ success: false, message: `'${field}' is missing` });
    }
  }

  if (
    isNaN(new Date(issued_at).getTime()) ||
    isNaN(new Date(expires_at).getTime()) ||
    isNaN(new Date(date_of_birth).getTime())
  ) {
    return res
      .status(400)
      .send({ success: false, message: "Dates must be in a valid format (YYYY-MM-DD)" });
  }

  if (new Date(expires_at) <= new Date(issued_at)) {
    return res
      .status(400)
      .send({ success: false, error: "Expiration date cannot be on or before issuance date" });
  }

  try {
    const result = await DriverService.createDriver({
      license_number,
      full_name,
      date_of_birth,
      sex,
      region,
      province,
      city_municipality,
      barangay: barangay || null,
      street_building_house,
      license_type,
      license_status,
      issued_at,
      expires_at,
    } as Driver);
    console.log(result);

    res.status(200).send({ success: true, message: "Driver created successfully", data: result });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).send({
        success: false,
        message: "A driver with this license number already exists.",
      });
    }

    res.status(500).send({ success: false, message: "An error occured" });
  }
};

// PUT /api/drivers/:license_number
export const updateDriver = async (req: Request, res: Response) => {
  const { license_number } = req.params;

  if (!license_number) {
    return res.status(400).send({ success: false, message: "License number is required" });
  }

  if (typeof license_number !== "string" || license_number.trim() === "") {
    return res
      .status(400)
      .send({ success: false, message: "A valid license number string is required" });
  }

  const {
    full_name,
    date_of_birth,
    sex,
    region,
    province,
    city_municipality,
    barangay,
    street_building_house,
    license_type,
    license_status,
    issued_at,
    expires_at,
  } = req.body;

  const requiredFields = [
    "license_number",
    "full_name",
    "date_of_birth",
    "sex",
    "region",
    "province",
    "city_municipality",
    "street_building_house",
    "license_type",
    "license_status",
    "issued_at",
    "expires_at",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ success: false, message: `'${field}' is missing` });
    }
  }

  if (isNaN(new Date(issued_at).getTime()) || isNaN(new Date(expires_at).getTime())) {
    return res
      .status(400)
      .send({ success: false, message: "Dates must be in a valid format (YYYY-MM-DD)" });
  }

  if (new Date(expires_at) <= new Date(issued_at)) {
    return res
      .status(400)
      .send({ success: false, message: "Expiration date cannot be on or before issuance date" });
  }

  try {
    const result = await DriverService.updateDriver({
      license_number,
      full_name,
      date_of_birth,
      sex,
      region,
      province,
      city_municipality,
      barangay: barangay,
      street_building_house,
      license_type,
      license_status,
      issued_at,
      expires_at,
    } as Driver);
    console.log(result);

    if (!result) {
      return res.status(404).send({ success: false, message: "Driver not found" });
    }

    res.status(200).send({ success: true, message: "Driver updated successfully", data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occured" });
  }
};

// DELETE /api/drivers/:license_number
export const deleteDriver = async (req: Request, res: Response) => {
  const { license_number } = req.params;

  if (!license_number) {
    return res.status(400).send({ success: false, message: "License number is required" });
  }

  if (typeof license_number !== "string" || license_number.trim() === "") {
    return res
      .status(400)
      .send({ success: false, message: "A valid license number string is required" });
  }

  try {
    const result = await DriverService.deleteDriver(license_number as string);
    console.log(result);

    if (!result) {
      return res.status(404).send({ success: false, message: "Driver not found" });
    }

    res
      .status(200)
      .send({ success: true, message: "Driver successfully deleted", deleted_id: result });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occured" });
  }
};

// GET /api/drivers/filter/
export const filterDrivers = async (req: Request, res: Response) => {
  const { license_type, license_status, min_bdate, max_bdate, sex } = req.query;

  if (min_bdate || max_bdate) {
    const min = new Date(min_bdate as string);
    const max = new Date(max_bdate as string);

    if (isNaN(min.getTime()) || isNaN(max.getTime())) {
      return res.status(400).send({
        success: false,
        message: "Dates must be in a valid format (YYYY-MM-DD)",
      });
    }

    if (min > max) {
      return res.status(400).send({
        success: false,
        message: "Minimum date cannot be after maximum date",
      });
    }
  }

  try {
    const result = await DriverService.filterDriver({
      sex: (sex as Sex) ?? null,
      license_type: (license_type as LicenseType) ?? null,
      license_status: (license_status as LicenseStatus) ?? null,
      min_bdate: min_bdate ? new Date(min_bdate as string) : null,
      max_bdate: max_bdate ? new Date(max_bdate as string) : null,
    } as DriverFilter);

    res
      .status(200)
      .send({ success: true, message: `Found ${result.length} driver(s)`, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occured" });
  }
};
