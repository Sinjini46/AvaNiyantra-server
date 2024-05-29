const express = require('express')
const parcel = require('../models/parcel')
const { request } = require('express')
const crypto = require('crypto')
const router = express.Router()

router.post('/create_parcel', async(req, res) => {
    const json = {
        user_id: req.body.user_id,
        name: req.body.name,
        med_id: req.body.med_id,
        quantity: req.body.quantity,
        active: req.body.active
    }

    const a = await new parcel(json)

    try {
        const b = a.save()
        res.json({ msg: "done", data: b })
    } catch (e) {
        res.json({ msg: "error", data: e })
    }
})

router.post('/add_parcel_id', async(req, res) => {
    const id = crypto.randomBytes(20).toString('hex');
    parcel.find({ user_id: req.body.id, active: true }, (err, docs) => {
        for (i = 0; i < docs.length; i++) {
            parcel.findByIdAndUpdate(docs[i]._id, { active: false, parcel_id: id }, (err, docs) => {
                if (err) {
                    res.json({ msg: err, data: err })
                }

            })
        }
        res.json({ msg: "done", data: id })
    })
})

router.post('/delete_item', async(req, res) => {
    parcel.findByIdAndDelete(req.body.id, (err, docs) => {
        if (err) {
            res.json({ msg: "error", data: err })
        } else {
            res.json({ msg: "done", data: docs })
        }
    })
})

router.post('/change_quantity', async(req, res) => {
    parcel.findByIdAndUpdate(req.body.id, { quantity: req.body.quantity }, (err, docs) => {
        if (err) {
            res.json({ msg: "error", data: err })
        } else {
            res.json({ msg: "done", data: docs })
        }
    })
})

router.post('/change_status', async(req, res) => {
    parcel.findById(req.body.id, (err, data) => {
        if (err) {
            res.json({ msg: "error in status" })
            return
        } else {
            stat = data.active
            if (stat == true) {
                parcel.findByIdAndUpdate(req.body.id, { active: false }, (err, docs) => {
                    if (err) {
                        res.json({ msg: "error in status" })
                    } else {
                        res.json({ msg: "done", data: docs })
                    }
                })
            } else {
                parcel.findByIdAndUpdate(req.body.id, { active: true }, (err, docs) => {
                    if (err) {
                        res.json({ msg: "error in status" })
                    } else {
                        res.json({ msg: "done", data: docs })
                    }
                })
            }
        }
    })
})

router.post('/delete_cart_medicines', async (req, res) => {
    //console.log(req.body)
    try {
        const result = await parcel.findOneAndDelete({
            _id: req.body._id,
            med_id: req.body.med_id
        });

        if (!result) {
            res.json({ msg: "No matching document found for deletion" });
        } else {
            res.json({ msg: "Medicine deleted successfully", data: result });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error", data: error.message });
    }
});


router.post('/get_parcels_id', async(req, res) => {
    parcel.find({ user_id: req.body.user_id }, (err, docs) => {
        if (err) {
            res.json({ msg: "error", data: err })
        } else {
            res.json({ msg: "done", data: docs })
        }
    })
})

router.post('/get_all_parcels', async(req, res) => {
    parcel.find({ parcel_id: req.body.parcel_id }, (err, docs) => {
        if (err) {
            res.json({ msg: "error" })
        } else {
            res.json({ msg: "done", data: docs })
        }
    })
})
module.exports = router