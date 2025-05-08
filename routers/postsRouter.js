// importo express
const express = require('express')

// invoco express
const router = express.Router()

// importo le funzioni da controller
const postsController = require('../controllers/postsController')

// rotte per ogni verbo

// index
router.get('/', postsController.index)

// show
router.get('/:id', postsController.show)

// store
router.post('/', postsController.store)

// update
router.put('/:id', postsController.update)

// modify
router.patch('/:id', postsController.modify)

// destroy
router.delete('/:id', postsController.destroy)


// esporto router, (lo importo in app.js)
module.exports = router