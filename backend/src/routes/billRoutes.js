import express from 'express'
import { createBill, getCustomerBills } from '../controllers/billController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/", protect, createBill);
router.get("/", protect, getCustomerBills)

export default router


