import { Router } from "express";
import { getAllRegistrations,
         getRegistration,
         createRegistration } from "@/features/registrations/registration.controller";

const router = Router();

router.get("/", getAllRegistrations);                  // GET /api/registrations
router.get("/:registration_number", getRegistration);  // GET /api/registrations
router.post("/", createRegistration);                  // POST /api/registrations

export default router;
