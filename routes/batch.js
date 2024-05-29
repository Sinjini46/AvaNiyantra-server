const express = require('express')
const batch = require('../models/batch')
const user = require('../models/user')
const parcel = require('../models/parcel')
const medicine = require('../models/medicine')
const { request } = require('express')
const router = express.Router()

router.post('/create_batch', async (req, res) => {
    const json = {
        sender_id: req.body.sender_id,
        sender_name: req.body.name,
        receiver_id: req.body.receiver_id,
        parcel_id: req.body.parcel_id,
        status: 0
    }

    const batchInstance = new batch(json);

    try {
        const savedBatch = await batchInstance.save();

        const parcelDocs = await parcel.find({ parcel_id: req.body.parcel_id });

        for (let i = 0; i < parcelDocs.length; i++) {
            const dat = parcelDocs[i];
            const medicineDoc = await medicine.findById(dat.med_id);

            if (!medicineDoc) {
                res.json({ msg: "error", data: "Medicine not found" });
                return;
            }

            const updatedQuantity = medicineDoc.quantity - dat.quantity;
            //console.log(updatedQuantity)
            if(updatedQuantity == 0){
                await medicine.deleteOne({ _id: medicineDoc._id });
            }
            else{
                await medicine.findByIdAndUpdate(medicineDoc._id, { quantity: updatedQuantity });
            }
            const id = req.body.receiver_id;
            const _name = medicineDoc.name;

            try {
                /* console.log(id);
                console.log(_name); */
                // Checking if the med is already present or not
                const result = await medicine.updateOne(
                    { id: id, name: { $regex: new RegExp(_name, 'i') } },
                    { $inc: { quantity: dat.quantity } }
                );
                //console.log(result)
                if (result.modifiedCount === 0) {
                    //console.log("New Medicine to be added");
                    // Adding the med as the med is not present for the reciver
                    const newMedicine = {
                        id: req.body.receiver_id,
                        name: medicineDoc.name,
                        level: medicineDoc.level,
                        quantity: dat.quantity,
                        parent: medicineDoc._id
                    };

                    const newMedInstance = new medicine(newMedicine);
                    try {
                        await newMedInstance.save();
                    } catch (e) {
                        res.json({ msg: "error", data: e });
                        return;
                    }
                }
            } catch (error) {
                res.status(500).json({ msg: "error", data: error });
            }
        }

        res.json({ msg: "done", data: savedBatch });
    } catch (error) {
        res.json({ msg: "error", data: error });
    }
});


router.post('/get_recv', async(req, res) => {
    batch.find({ receiver_id: req.body.receiver_id }, (err, docs) => {
        if (err) {
            res.json({ msg: "error" })
        } else {
            res.json({ msg: "done", data: docs })
        }
    })
})

module.exports = router
