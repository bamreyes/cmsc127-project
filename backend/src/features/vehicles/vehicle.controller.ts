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