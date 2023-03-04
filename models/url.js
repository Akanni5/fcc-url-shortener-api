const express = require('express')
let mongoose

try {
    mongoose = require('mongoose')
} catch (error) {
    console.log(error)
}

const URLSchema = mongoose.Schema({
    url: { type: String, required: true },
    id: { type: Number, required: true },
    dateCreated: { type: Date, default: Date.now }
})

const URLModel = mongoose.model("URL_DATA", URLSchema)

module.exports = URLModel