import { Router } from "express";
import {
  getAllDrivers,
  getDriver,
  createDriver,
  updateDriver,
  deleteDriver,
} from "@/features/drivers/driver.controller";

const router = Router();

router.get("/", getAllDrivers); // GET /api/drivers
router.post("/", createDriver); // post /api/drivers
router.get("/:license_number", getDriver); // GET /api/drivers/1
router.put("/:license_number", updateDriver); // PUT /api/drivers/1
router.delete("/:license_number", deleteDriver); // DELETE /api/drivers/1

export default router;
