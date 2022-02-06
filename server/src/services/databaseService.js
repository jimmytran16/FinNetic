const mysql = require('mysql2/promise');

module.exports = class DatabaseService {
    constructor() {
        this.config = {
            db: {host:'localhost', user: 'root', password: '68016801', database: 'finnetic'}
        }
    }

    async query(sql, params) {
        const connection = await mysql.createConnection(this.config.db);
        const [results] = await connection.execute(sql, params);
      
        return results;
    }

    parseDateToSqlFormat(date) {    
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }
}