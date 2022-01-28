import express from "express";
import path from 'path';
import {requestTime, logger} from './middleware.js'
import serverRoutes from "./routes/servers.js";


const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(requestTime)
app.use(logger)

app.use(serverRoutes)

app.get('/', (req, res) => {
    res.render('index', {title: 'Main page', active: 'main'})
})

app.get('/features', (req, res) => {
    res.render('features', {title: 'feature page', active: 'features'})
})

app.listen(PORT, () => {
    console.log(`server has been started on ${PORT}`)
})