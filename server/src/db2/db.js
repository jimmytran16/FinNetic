const mysql = require('mysql2/promise');

// TESTING MYSQL2
const config = {
    db: {host:'localhost', user: 'root', password: '68016801', database: 'finnetic'}
}

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);
  
    return results;
}

async function getData() {
    var data = await query('SELECT * FROM Users WHERE username = ?', ['testing@gmail.com']);
    console.log(data)
}


getData();