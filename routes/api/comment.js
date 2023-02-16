const express = require('express')
const router = express.Router()

const commentCtrl = require('../../controllers/api/comment')

router.post('/:id', commentCtrl.create)

module.exports = router