const mongoose = require('mongoose')

mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
    return mongoose.connect(url).then(() => console.log("DB connected"))
}

module.exports = connectToMongoDB