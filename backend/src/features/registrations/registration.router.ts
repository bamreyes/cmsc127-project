import { Router } from "express";
import { getAllRegistrations,
         getRegistration,
         createRegistration,
         deleteRegistration } from "@/features/registrations/registration.controller";

const router = Router();

router.get("/", getAllRegistrations);                        // GET /api/registrations
router.get("/:registration_number", getRegistration);        // GET /api/registrations/:reg_no
router.post("/", createRegistration);                        // POST /api/registrations
router.delete("/:registration_number", deleteRegistration);  // DELERE /api/registrations/:reg_no

export default router;