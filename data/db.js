const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_blog'
})

connection.connect((err) => {
    if (err) throw err
    console.log('connesso a MySQL')
}
)

module.exports = connection