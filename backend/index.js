import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from'dotenv'
import corsConfig from './corsConfig.js'

dotenv.config()

//import routes
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

// port to run server on
const port = process.env.PORT || 5555

//start express server
const app = express()
// configuring body parser
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(bodyParser.json({ limit: "30mb", extended: true }))

// invoke cors
//  Note: at the time of writing(11 feb '23), even without invoking cors, the project was working fine (on localhost)
app.use(cors(corsConfig))

// set up mongodb connection
const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL).then(() => {
    console.log("connected to mongodb");

    // set server to listen on port when db connection is successful
    app.listen(port, () => {
        console.log("server live on", port);
    })

}).catch((err) => {
    console.log("error connecting to mongodb --- ", err);
})
//Note
//mongodbdriver says usenewurlparser and useunifiedtopology have no longer any effects

app.use('/posts', postRoutes)
app.use('/user', userRoutes)
// app.use('/post/:id', getPost)

// for testing
app.get('/test', (req, res) => {
    res.json("server test successful");
})

app.get('/', (req, res) => {
    res.send("server is live");
})
