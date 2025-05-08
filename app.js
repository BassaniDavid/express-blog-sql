// importo express
const express = require('express')

// invoco express
const app = express()

// stabilisco il numero per la porta
const port = 2000

// importo le rotte del router
const postsRouter = require('./routers/postsRouter')

// importo middleware per rotte inesistenti
const notFound = require('./middleware/middlewareRoute')

// importo middleware per errori
const errorHandler = require('./middleware/middlewareError')

// invoco la funzione che mette a disposizione di express il body-parser
app.use(express.json())

// invoco le rotte presenti nel file router
app.use('/posts', postsRouter)

// applico il middleware in caso di errore
app.use(errorHandler)

// applico il middleware in caso di rotta inesistente
app.use(notFound)

// senza questa parte il server non sarebbe in ascolto di eventuali richieste dal client
app.listen(port, (req, res) => {
    console.log('server attivo su porta ' + port)
})
