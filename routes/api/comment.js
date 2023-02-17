const express = require('express')
const router = express.Router()

const commentCtrl = require('../../controllers/api/comment')

router.post('/:id', commentCtrl.create)
router.delete('/:id', commentCtrl.deleteOne)
router.patch('/:id', commentCtrl.update)

module.exports = router