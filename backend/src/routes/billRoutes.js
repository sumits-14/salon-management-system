import express from 'express'
import { createBill, getCustomerBills, getBills, getBillById } from '../controllers/billController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/", protect, createBill);
// router.get("/customer/:customerId", protect, getCustomerBills);
router.get("/", protect, getBills);
router.get("/customer/:customerId", protect, getCustomerBills);
router.get("/:id", protect, getBillById);

export default router


