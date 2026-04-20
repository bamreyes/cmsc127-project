import { Request, Response } from "express";
import * as VehicleService from "@/features/vehicles/vehicle.service";
import { Vehicle } from "@/features/vehicles/vehicle.model";


// GET  all vehicles
export const getAllVehicles = async (req: Request, res: Response) => {
    try{
        const result = await VehicleService.getAllVehicles();
        console.log(result);

        res.status(200).send({success: true, data: result});
    } catch (error){
        res.status(500).send({success: false, message: "An error occured"});
    }
};

// GET vehicle
export const getVehicle = async (req: Request, res: Response) => {
  const { plate_number } = req.params;

  if (!plate_number) {
    return res.status(400).send({ success: false, error: "Plate number is required" });
  }

  if (typeof plate_number !== "string" || plate_number.trim() === "") {
    return res
      .status(400)
      .send({ success: false, error: "A valid plate number string is required" });
  }

  try {
    const result = await VehicleService.getVehicle(plate_number as string);
    console.log(result);

    if (!result) {
      return res.status(404).send({ success: false, message: "Vehicle not found" });
    }

    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occured" });
  }
};

// POST create vehicle
export const createVehicle = async (req: Request, res: Response) => {
    const {
        plate_number,
        engine_number,
        chassis_number,
        vehicle_type,
        make,
        model,
        year,
        color,
        license_number,
    } = req.body;

    const requiredFields = [
        "plate_number",
        "engine_number",
        "chassis_number",
        "vehicle_type",
        "make",
        "model",
        "year",
        "color",
        "license_number",
    ];

    for (const field of requiredFields){
        if (!req.body[field]){
            return res
                .status(400)
                .send({ success: false, message: `'${field}' is missing`});
        }
    }

    try{
        const result = await VehicleService.createVehicle({
            plate_number,
            engine_number,
            chassis_number,
            vehicle_type,
            make,
            model,
            year,
            color,
            license_number,
        } as Vehicle);

        console.log(result);

        res.status(200).send({ success: true, message: "Vehicle created successfully", data: result,});
    } catch (error: any){
        if(error.code === "ER_DUP_ENTRY"){
            return res.status(409).send({ success: false, message: "A vehicle with this plate number already exists.",})
        }
    }

    res.status(500).send({
        success: false,
        message: "An error occurred",
    });
};

// PUT update
export const updateVehicle = async (req: Request, res: Response) => {
    const {plate_number} = req.params;

    if (!plate_number){
        return res.status(400).send({ status: false, message: "Plate number is required",});
    }

    if (typeof plate_number !== "string" || plate_number.trim() === ""){
        return res.status(400).send({ success: false, message: "A valid plate number string is required",});
    }

    const{
        engine_number,
        chassis_number,
        vehicle_type,
        make,
        model,
        year,
        color,
        license_number,
    } = req.body;

    const requiredFields = [
        "engine_number",
        "chassis_number",
        "vehicle_type",
        "make",
        "model",
        "year",
        "color",
        "license_number",
    ];

    for (const field of requiredFields){
        if (!req.body[field]){
            return res.status(400).send({ success: false, message: `'${field}' is missing`,});
        }
    }

    try {
        const result = await VehicleService.updateVehicle({
            plate_number,
            engine_number,
            chassis_number,
            vehicle_type,
            make,
            model,
            year,
            color,
            license_number,
        } as Vehicle)

        console.log(result);

        if (!result) {
            return res.status(404).send({ success: false, message: "Vehicle not found"});
        }

        res.status(200).send({
            success: true,
            message: "Vehicle updated successfully",
            data: result,
        });
    } catch (error){
        res.status(500).send({
            success: false,
            message: "An error occurred",
        });
    }
}

export const deleteVehicle = async (req: Request, res: Response) => {
  const { plate_number } = req.params;

  if (!plate_number) {
    return res.status(400).send({ success: false, message: "Plate number is required" });
  }

  if (typeof plate_number !== "string" || plate_number.trim() === "") {
    return res
      .status(400)
      .send({ success: false, message: "A valid plate number string is required" });
  }

  try {
    const result = await VehicleService.deleteVehicle(plate_number as string);
    console.log(result);

    if (!result) {
      return res.status(404).send({ success: false, message: "Vehicle not found" });
    }

    res
      .status(200)
      .send({ success: true, message: "Vehicle successfully deleted", deleted_id: result });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occured" });
  }
};