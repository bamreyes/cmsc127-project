import { Router } from "express";
import {
  getAllVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  filterByDriver,
} from "@/features/vehicles/vehicle.controller";

const router = Router();

router.get("/", getAllVehicles);
router.get("/:plate_number", getVehicle);
router.post("/", createVehicle);
router.put("/:plate_number", updateVehicle);
router.delete("/:plate_number", deleteVehicle);
router.get("/filter/driver", filterByDriver);

export default router;
