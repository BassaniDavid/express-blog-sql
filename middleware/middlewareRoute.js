// funzione per middleware in caso di rotta inesistente
function notFound (req, res, next) {
    console.log('se il percorso è sbagliato, il middleware funziona')

    res.status(404)
    res.json({
        error: 'not found',
        message: 'pagina non trovata'
    })
}

// esporto funzione, che importo in app.js
module.exports = notFound