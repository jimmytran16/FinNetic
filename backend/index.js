const app = require('./server')
const port = process.env.PORT || 4000;
app.listen(port, (err) => { console.log(err ? err : `Connected to PORT ${port}`) } );