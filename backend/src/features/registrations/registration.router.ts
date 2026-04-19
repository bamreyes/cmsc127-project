console.log("Loading registration router...");
import { Router } from "express";
import {
  getAllRegistrations,
  getRegistrationID,
  getRegistrationPlateNo,
  getExpiredRegistrations,
  createRegistration,
  updateRegistration,
  deleteRegistration,
} from "@/features/registrations/registration.controller";

const router = Router();

router.get("/", getAllRegistrations); // GET /api/registrations
router.get("/number/:registration_number", getRegistrationID); // GET /api/registrations/:reg_no
router.get("/plate/:plate_number", getRegistrationPlateNo); // GET /api/registrations/:plate_no
router.get("/expired", getExpiredRegistrations); // GET /api/registrations/expired
router.post("/", createRegistration); // POST /api/registrations
router.put("/:registration_number", updateRegistration); // PUT /api/registrations/:reg_no
router.delete("/:registration_number", deleteRegistration); // DELETE /api/registrations/:reg_no

export default router;
