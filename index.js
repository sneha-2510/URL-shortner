const express = require('express')
const urlRouter = require('./routes/url.js')
const connectToMongoDB = require("./connection.js")
const URL = require('./models/url.js')

const app = express();
const PORT = 8001

connectToMongoDB("mongodb://localhost:27017/urlShortner")

app.use(express.json())

app.use("/url", urlRouter)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now(),
                }
            }
        })

    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})