import cors from 'cors' // import cors
import dotenv from 'dotenv' // import dotenv
import express from 'express'
import productRouter from './routes/productRouter.js' // import productRouter

dotenv.config() // use dotenv
const app = express() // use express

// middleware
app.use(cors()) // use cors
app.use(express.json()) // use express.json()
app.use(express.urlencoded({ extended: true })) // use express.urlencoded()

// routes
app.use('/api/products', productRouter) // use productRouter


app.get('/', (req, res) => {
    res.send('Hello World!')
    })

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    }
)
