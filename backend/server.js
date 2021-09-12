const express = require('express')
const app = express();
const routers = require('./src/routes/index')
const cors = require('cors')
const db = require('./src/db/db')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(require('morgan')('dev'))
app.use((req,res,next) => {
    console.log('REQ BODY',req.body)
    next();
})

db.connect();

app.get('/', (req,res,next) => { return res.json({ message:'Hello from Tracker API' }) } )
app.use('/auth', routers.authRouter);
app.use('/dashboard', routers.dashboardRouter);
app.use('/settings', routers.settingsRouter);

app.listen(4000, () => console.log(`Connection to PORT ${ 4000 }`));
