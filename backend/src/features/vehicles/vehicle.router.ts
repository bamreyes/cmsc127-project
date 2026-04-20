import { Router } from "express";
import {
    getAllVehicles,
    getVehicle,
} from "@/features/vehicles/vehicle.controller";

const router = Router();

router.get("/", getAllVehicles);
router.get("/:plate_number", getVehicle);
// router.post("/", ...);
// router.put("/", ...);
// router.delete("/", ...);

export default router;
