import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pool from "@/config/db";

import driverRouter from "@/features/drivers/driver.router";
import registrationRouter from "@/features/registrations/registration.router";
import vehicleRouter from "@/features/vehicles/vehicle.router";
import violationRouter from "@/features/violations/violation.router";
import { initializeDatabase } from "./seed";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CMSC 127 RUNNING");
});

app.use("/api/drivers", driverRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/registrations", registrationRouter);
app.use("/api/violations", violationRouter);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  try {
    await pool.query("SELECT 1");
    console.log("Database connected");
    const populate = process.env.POPULATE_DB === "true";
    await initializeDatabase(populate);
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
});
