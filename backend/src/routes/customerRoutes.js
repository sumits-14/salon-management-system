import express from 'express'
import { createCustomer, getCustomers, singleCustomer, searchCustomerByMobile, updateCustomer, deleteCustomer } from '../controllers/customerController.js'

import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createCustomer)
router.get('/', protect, getCustomers)
router.get('/:id', protect, singleCustomer)
router.get('/search/mobile/:mobileNumber', protect, searchCustomerByMobile)
router.put('/:id', protect, updateCustomer)
router.delete('/:id', protect, deleteCustomer)

export default router

