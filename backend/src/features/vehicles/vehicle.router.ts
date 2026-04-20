import { Router } from "express";
import {
    getAllVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
} from "@/features/vehicles/vehicle.controller";


const router = Router();

router.get("/", getAllVehicles);
router.get("/:plate_number", getVehicle);
router.post("/:plate_number", createVehicle);
router.put("/:plate_number", updateVehicle);
router.delete("/:plate_number", deleteVehicle);

export default router;
