require('dotenv').config();

const correctUser = {

    firstName: process.env.CORRECT_TEST_USER,
    lastName:process.env.CORRECT_TEST_USER,
    email: process.env.CORRECT_TEST_USER+"@gmail.com",
    password: process.env.CORRECT_TEST_USER,
    verifyPassword: process.env.CORRECT_TEST_USER,
    _id: process.env.CORRECT_TEST_USER_ID,
    animals: [],

}

const wrongUser = {
    
        email: process.env.WRONG_TEST_USER+"@gmail.com",
        password: process.env.WRONG_TEST_USER,
        _id: process.env.WRONG_TEST_USER
    
}



module.exports = { correctUser, wrongUser }