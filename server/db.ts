// const mongoose = require("mongoose")
import mongoose from "mongoose"

const conn = mongoose.connect(process.env.URI)
        .then(db => console.log('DB is connected'))
        .catch(err => console.error(err))