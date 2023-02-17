const express = require('express')
const router = express.Router()

const checkToken = require('../../config/checkToken')
const commentCtrl = require('../../controllers/api/comment')

router.post('/:id', commentCtrl.create)
router.delete('/:id', commentCtrl.deleteOne)
router.patch('/:id', commentCtrl.update)
router.patch('/likes/:id', checkToken ,commentCtrl.addLike)
router.patch('/dislikes/:id', checkToken ,commentCtrl.addDislike)


module.exports = router