const URLModel = require('../models/url')

async function createAndSaveModel(url, done) {
    try {
        let id = await getAvailableId()
        const savedModel = await URLModel.create({ url, id })
        done(null, savedModel)
    }
    catch (err) {
        done(err, null)
    }
}

async function getAvailableId() {
    try {
        const count = await URLModel.countDocuments({})
        return count + 1
    } catch (error) {
        console.error(error)
    }
}

async function findByIndex(id, done) {
    try {
        const availableModels = await URLModel.find({ id })
        done(null, availableModels)
    }
    catch (err) {
        done(err, null)
    }
}

async function findByURL(url, done) {
    try {
        const availableModels = await URLModel.find({ url })
        done(null, availableModels)
    }
    catch (err) {
        done(err, null)
    }
}


module.exports = { findByURL, findByIndex, createAndSaveModel, getAvailableId }