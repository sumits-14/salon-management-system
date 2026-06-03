import express from "express"
import { registerUser, loginUser, getMe } from "../controllers/authController.js"
import authorize from "../middleware/roleMiddleware.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router() 

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
// router.post("/services", protect, authorize('admin'), createService)

export default router













