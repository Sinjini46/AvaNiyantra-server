const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    res.json({
        data: [{
                link: '/user/authenticate',
                parameters: ['email', 'password']
            },
            {
                link: '/user/createuser',
                parameters: ['name', 'category', 'registration', 'email', 'password']
            }
        ]
    })
})

module.exports = router;