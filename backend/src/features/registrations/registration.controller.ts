import { Request, Response } from "express";
import * as RegistrationService from "@/features/registrations/registration.service";
import { VehicleRegistration } from "@/features/registrations/registration.model";

// For consistent date formats.
function formatDate(dateString: string): string {
    const newDate = new Date(dateString);

    return newDate.toISOString().slice(0, 10);  // Convert to ISO string then cut.
}

// GET /api/registrations
export const getAllRegistrations = async (req: Request, res: Response) => {
  try {
    const result = await RegistrationService.getAllRegistrations();
    console.log(result);

    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occured" });
  }
};

// GET /api/registrations/:registration_number
export const getRegistration = async (req: Request, res: Response) => {
    const { registration_number } = req.params;
    const regNum = parseInt(registration_number as string, 10);  // Convert to int.

    if (isNaN(regNum)) {
        return res.status(400).send({ success: false, error: "Registration number must be a number." });
    }

    try {
        const result = await RegistrationService.getRegistration(regNum);
        console.log(result);

        if (!result) {
            return res.status(404).send({ 
                success: false, 
                message: "Vehicle registration not found." 
            });
        }

        res.status(200).send({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: "An error occurred." });
    }
};

// POST /api/registrations
export const createRegistration = async (req: Request, res: Response) => {
    const { registration_number,
            registration_status,
            registration_date,
            expiration_date,
            plate_number } = req.body;

    const newRegDate = formatDate(registration_date);
    const newExpDate = formatDate(expiration_date);

    const requiredFields = ["registration_number",
                            "registration_status",
                            "registration_date",
                            "expiration_date",
                            "plate_number"];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).send({ success: false, message: `'${field}' is required.` });
        }
    }

    if (isNaN(Number(registration_number))) {
        return res
            .status(400)
            .send({ success: false, message: "Registration number must be a number." });
    }

    if (isNaN(new Date(newRegDate).getTime()) || isNaN(new Date(newExpDate).getTime())) {
        return res
            .status(400)
            .send({ success: false, message: "Dates must be in a valid format (YYYY-MM-DD)." });
    }

    if (new Date(newExpDate) <= new Date(newRegDate)) {
        return res
            .status(400)
            .send({ success: false, error: "Expiration date cannot be on or before registration date." });
    }

    try {
        const result = await RegistrationService.createRegistration({
            registration_number,
            registration_status,
            registration_date: new Date (newRegDate),
            expiration_date: new Date (newExpDate),
            plate_number
        } as VehicleRegistration);

        console.log(result);
        res.status(201).send({ success: true, message: "Vehicle registration created successfully.", data: result });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send({ success: false, message: "A vehicle registration with this registration number already exists." });
        }

        res.status(500).send({ success: false, message: "An error occurred." });
    }
};