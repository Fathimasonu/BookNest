require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')

const usersCltr = require('./app/controllers/users-cltr')
const { authenticateUser } = require('./app/middlewares/authentication')
const { userRegisterValidationSchema, userLoginValidationSchema } = require('./app/helpers/user-validation')



const port = 3020
const app = express() 
app.use(express.json())
app.use(cors())

configureDB()

app.post('/auth/register', usersCltr.register)
app.post('/auth/login', checkSchema(userLoginValidationSchema), usersCltr.login)
app.get('/api/users/account', authenticateUser, usersCltr.account)


app.listen(port, () => {
    console.log('server running on port', port)
})