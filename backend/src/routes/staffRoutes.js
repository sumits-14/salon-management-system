import express from "express"
import { getStaff, createStaff, updateStaff, toggleStaffStatus } from "../controllers/staffController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.route("/")
     .get(getStaff)
     .post(createStaff);

router.route("/:id")
     .put(updateStaff)

router.patch("/:id/status", toggleStaffStatus);

export default router;
