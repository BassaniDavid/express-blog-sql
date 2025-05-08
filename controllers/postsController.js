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

    // recupero id dall URL
    const { id } = req.params

    //preparo prima query
    const postSql = 'SELECT * FROM `posts` WHERE id = ?'

    //preparo seconda query
    const tagSql = 'SELECT `tags`.`id`, `tags`.`label` FROM db_blog.posts JOIN `post_tag` ON `post_tag`.`post_id` = `posts`.`id` JOIN `tags` ON `post_tag`.`tag_id` = `tags`.`id` WHERE `post_id` = ?'

    // eseguo prima query
    connection.query(postSql, [id], (err, postResults) => {
        if (err) return res.status(500).json({ error: 'database query failed' })
        if (postResults.lenght === 0) return res.status(404).json({ error: 'post not found' })

        // recupero il post
        const post = postResults[0]

        // se è andata a buon fine, eseguo la seconda query rimanendo all interno della prima
        connection.query(tagSql, [id], (err, tagResults) => {
            if (err) return res.status(500).json({ error: 'database query failed' })

            // aggiungo tag al post
            post.tags = tagResults
            res.json(post)
        })
    })

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

    // recupero id dall URL
    const { id } = req.params

    // elimino blog corrispondente
    connection.query('DELETE FROM `posts` WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'failed to delete post' })
        res.sendStatus(204)
    })
}

// esporto le funzioni, che importo in router
module.exports = { index, show, store, update, modify, destroy }