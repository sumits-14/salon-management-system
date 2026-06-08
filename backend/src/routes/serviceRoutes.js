import express from 'express'

import { createService, getServices, updateServices, deleteService } from '../controllers/serviceController.js'
import protect from '../middleware/authMiddleware.js'
import authorize from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get("/", protect, getServices)
router.post("/", protect, authorize("admin"), createService)
router.put("/:id", protect, authorize("admin"), updateServices)
router.delete("/:id", protect, authorize("admin"), deleteService)

export default router
