const express = require('express')
const pharma = require('../models/pharma')
const { request } = require('express')
const router = express.Router()
//const medicine = require('medicine')
router.post('/add', async(req, res) => {

    //console.log(req.body.id)
    /* console.log(req.body.patientName)*/
    //console.log(req.body.medicines) 
    /* user = req.body.id
    req_medicines = req.body.medicines
    console.log(req.body.patientName)
    console.log(req.body.patientContactNumber)
    console.log(req.body.doctorName)
    console.log(req.body.doctorRegNumber)
    console.log(req.body.medicines) */
    const json = {
        name: req.body.patientName,
        contact_number: req.body.patientContactNumber,
        doc_name: req.body.doctorName,
        doc_reg: req.body.doctorRegNumber,
        med_details: req.body.medicines
    }

    const a = await new pharma(json)

    try {
        const b = await a.save()
        res.json({ msg: 'done', data: b })
    } catch (e) {
        res.json({ msg: 'err', data: e })
    }

})

module.exports = router


