import { Router } from "express";
import {
    getAllVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
} from "@/features/vehicles/vehicle.controller";

const router = Router();

router.get("/", getAllVehicles);
router.get("/:plate_number", getVehicle);
router.post("/", createVehicle);
router.put("/", updateVehicle);
// router.delete("/", ...);

export default router;
