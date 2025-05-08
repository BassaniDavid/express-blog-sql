// funzione per middleware in caso di errore
function errorHandler (err, req, res, next) {
    console.log('se ci sono degli errori, il middleware funziona')

    res.status(500)
    res.json({
        error: err.message
    })
}

// esporto funzione, che importo in app.js
module.exports = errorHandler