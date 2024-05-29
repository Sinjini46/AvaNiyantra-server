const express = require('express')
const medicine_stock = require('../models/medicine_stock')
const { request } = require('express')
const router = express.Router()


router.post('/create_stock', async(req, res) => {
    const json = {
        user_id: req.body.user_id,
        med_id: req.body.med_id,
        quantity: 0,
    }

    const a = new medicine_stock(json)
    try {
        b = await a.save()
        res.json({ msg: 'done', data: b })
    } catch (e) {
        res.json({ 'msg': 'error', data: e })
    }
})

router.post('/find_stock_medId', (req, res) => {
    medicine_stock.findOne({ _id: req.body.id }, (err, docs) => {
        if (err) {
            res.json({ msg: "error", data: err })
        } else {
            res.json({ msg: "done", data: docs })
        }
    })
})

router.post('/update_stock', (req, res) => {
    if (req.body.quantity < 0) {
        res.json({ msg: "error", data: "quantity less than 0" })
        return
    }
    medicine_stock.findByIdAndUpdate(req.body.id, { quantity: req.body.quantity }, (err, data) => {
        if (err) {
            res.json({ msg: "error", data: err })
        } else {
            res.json({ msg: "done", data: data })
        }
    })
})

router.post('/get_stock_user', (req, res) => {
    medicine_stock.find({ user_id: req.body.id }, (err, docs) => {
        if (err) {
            res.json({ msg: "error", data: err })
        } else {
            res.json({ msg: "done", data: docs })
        }
    })
})


module.exports = router;