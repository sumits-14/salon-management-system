import express from "express"
import cors from "cors"
import authRoutes from './routes/authRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import customerRoutes from './routes/customerRoutes.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use(
     '/api/auth',
     authRoutes
)

app.use(
     '/api/services',
     serviceRoutes
)

app.use(
     '/api/customers',
     customerRoutes
)

app.get("/", (req, res) => {
     res.json({
          success : true,
          message : "Salon Management app running!"
     })
})


export default app
