const express = require('express')
const router = express.Router()

const postCtrl = require('../../controllers/api/post')


router.post('/', postCtrl.create)
router.get('/', postCtrl.index)
router.get('/:id', postCtrl.show)
router.patch('/:id', postCtrl.update)
router.delete('/:id', postCtrl.deleteOne)


module.exports = router