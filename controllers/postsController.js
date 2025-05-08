// importo l array di oggetti dal file in data
const posts = require('../data/posts')

// !!! importo file di connessione al database
const connection = require('../data/db')

// funzioni per ogni verbo delle route

//funzione index
function index(req, res) {

    //preparo query
    const sql = 'SELECT * FROM `posts`'

    // eseguo query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failed' })
        res.json(results)
    })

}

//funzione show
function show(req, res) {

    const post = posts.find((element) => element.title === req.params.id)

    if (!post) {

        res.status(404)

        return res.json({
            error: "not found",
            message: "post non trovato"
        })
    }

    res.json(post)
}

//funzione store
function store(req, res) {

    const newId = posts[posts.length - 1].id + 1

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(newPost);

    console.log(posts);

    res.status(201);

    res.json(newPost);
}

//funzione update
function update(req, res) {

    const id = parseInt(req.params.id)

    const post = posts.find((element) => element.id === id)

    if (!post) {

        res.status(404)

        return res.json({
            error: "not found",
            message: "id post non trovato"
        })
    }

    post.title = req.body.title
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags

    console.log(posts)

    res.json(post)
}

//funzione modify
function modify(req, res) {
    res.send('modifica parziale del post ' + req.params.id)
}

//funzione destroy
function destroy(req, res) {
    const post = posts.find((element) => element.title === req.params.id)

    if (!post) {

        res.status(404)

        return res.json({
            error: "not found",
            message: "post non trovato"
        })
    }

    posts.splice(posts.indexOf(post), 1)

    console.log(posts)

    res.sendStatus(204)
}

// esporto le funzioni, che importo in router
module.exports = { index, show, store, update, modify, destroy }