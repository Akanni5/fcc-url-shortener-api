const express = require('express')
const router = express.Router()

const dns = require('dns')

const { findByURL, findByIndex, createAndSaveModel } = require('../utils/url-model')

router.post('/shorturl', async (req, res) => {
    try {
        const url = req.body.url
        const _url = new URL(url)
        dns.lookup(_url.hostname, async (err, address) => {
            if (err) {
                // handle error
                res.json({error: "Invalid URL"})
            }
            else {
                await findByURL(url, (err, data) => {
                    if (err) res.json(err)

                    if (data.length === 0) { // url does not exist in database
                        createAndSaveModel(url, (err, data) => {
                            if (err)
                                res.json(err)
                            else if (data)
                                res.json({ "original_url": url, "short_url": data.id })
                        })
                    }
                    else {
                        const urlData = data[0]
                        res.json({ "original_url": urlData.url, "short_url": urlData.id })

                    }
                })
            }
        })

    }
    catch (err) {
        console.error(err)
        res.json({error: "Invalid URL"})
    }
})

router.get('/shorturl/:id', async (req, res) => {
    // 1. check if id is valid
    const id = req.params.id
    findByIndex(id, (err, data) => {
        if (err) {
            res.json({ message: err })
        }
        if (data.length == 0) {
            res.json({ message: "invalid index" })
        }
        else if (data) {
            // 3. redirect to the url
            res.redirect(data[0].url)
        }
    })
})

module.exports = router
