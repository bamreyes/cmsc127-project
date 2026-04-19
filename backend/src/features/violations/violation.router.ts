import { Router } from "express";
import {
  getAllViolations,
  getViolation,
  createViolation,
  deleteViolation,
  updateViolation,
  filterViolations,
  filterByDriver,
  filterByVehicle,
  groupTypeByYear,
} from "@/features/violations/violation.controller";

const router = Router();

router.get("/filter", filterViolations);
router.get("/filter-driver", filterByDriver);
router.get("/filter-vehicle", filterByVehicle);
router.get("/", getAllViolations);
router.get("/type-count-by-year", groupTypeByYear);
router.get("/:violation_id", getViolation);
router.post("/", createViolation);
router.delete("/:violation_id", deleteViolation);
router.put("/:violation_id", updateViolation);

export default router;
