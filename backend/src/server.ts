import dotenv from "dotenv";
import express from "express";
import pool from "@/config/db";

import driverRouter from "@/features/drivers/driver.router";
import registrationRouter from "@/features/registrations/registration.router";
import vehicleRouter from "@/features/vehicles/vehicle.router";
import violationRouter from "@/features/violations/violation.router";

const app = express();
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
  } catch (err) {
    console.error("Database connection failed:", err);
  }
});
