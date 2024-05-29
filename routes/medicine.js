const express = require('express')
const medicine = require('../models/medicine')
const { request } = require('express')
const router = express.Router()

router.post('/add', async(req, res) => {
    const json = {
        id: req.body.id,
        name: req.body.name,
        level: req.body.level,
        quantity: req.body.quantity
    }
    a = await new medicine(json)

    try {
        const b = await a.save()
        res.json({ msg: b }).status(201)
    } catch (e) {
        res.json({ msg: e }).status(500)
    }
})

router.post('/delete', async(req, res) => {
    medicine.findByIdAndDelete(req.body._id, (err, data) => {
        if (err) {
            res.json({ msg: 'error' })
        } else {
            res.json({ msg: 'done', data: data })
        }
    })
})

router.post('/update', async (req, res) => {
    //console.log(req.body)
    try {
        if (req.body.quantity == 0) {
            const result = await medicine.deleteOne({ _id: req.body._id });
            if (result.deletedCount === 0) {
                res.json({ msg: "No matching document found for deletion" });
            } else {
                res.json({ msg: "Document deleted successfully" });
            }
        } else {
            const result = await medicine.findByIdAndUpdate(req.body._id, req.body);
            if (!result) {
                res.json({ msg: "No matching document found for update" });
            } else {
                res.json({ msg: "Document updated successfully" });
            }
        }
    } catch (error) {
        res.status(500).json({ msg: "Error", error: error.message });
    }
});

router.post('/update_med_by_user', async(req, res) => {
    //console.log(req)
    const id =  req.body.id
    const _name = req.body.name
    try{
        /* console.log(id)
        console.log(_name) */
        const result = await medicine.updateOne(
            { id: id, name: { $regex: new RegExp(_name, 'i') } },
            {$inc : {quantity:req.body.quantity}}
        );
        //console.log(result)
        if (result.modifiedCount === 0) {
            res.json({ msg: "No matching document found" });
        } else {
            res.json({ msg: "Document updated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/update_med', async(req, res) => {
    //console.log(req)
    const _id =  req.body.id
    const _name = req.body.name
    try{
        //console.log(_id)
        //console.log(_name)
        const result = await medicine.updateOne(
            {_id, _name},
            {$set : {quantity:req.body.quantity}}
        );
        console.log(result)
        if (result.nModified === 0) {
            res.json({ msg: "No matching document found" });
        } else {
            res.json({ msg: "Document updated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async(req, res) => {
    const a = await medicine.find({ id: req.body.id })
    res.json({ msg: "done", data: a })
})

// router.post('/get_med_buId', async(req, res) => {
//     medicine.findById(req.body.id, (err, docs) => {
//         if (err) {
//             res.json({ msg: "error" })
//         } else {
//             res.json({ msg: "done", data: docs })
//         }
//     })
// })
module.exports = router;