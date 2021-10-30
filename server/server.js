const express = require('express')
const app = express();
const routers = require('./src/routes/index')
const cors = require('cors')
const db = require('./src/db/db')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log('REQ BODY', req.body)
        next();
    })
    app.use(require('morgan')('dev'))
}

db.connect();

app.get('/', (req, res) => { return res.json({ message: 'Hello from Tracker API' }) })
app.use('/auth', routers.authRouter);
app.use('/dashboard', routers.dashboardRouter);
app.use('/budget', routers.budgetRouter);
app.use('/settings', routers.settingsRouter);

module.exports = app;
