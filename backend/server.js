const express = require('express')
const app = express();
const routers = require('./src/routes/index')
const cors = require('cors')
const db = require('./src/db/db')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(require('morgan')('dev'))

db.connect();

app.use('/auth', routers.authRouter);
app.use('/dashboard', routers.dashboardRouter);

app.listen(4000, () => console.log(`Connection to PORT ${ 4000 }`));
