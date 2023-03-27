require('dotenv').config();

const correctOwner = {

    firstName: process.env.CORRECT_TEST_USER,
    lastName:process.env.CORRECT_TEST_USER,
    email: process.env.CORRECT_TEST_USER+"@gmail.com",
    password: process.env.CORRECT_TEST_USER,
    verifyPassword: process.env.CORRECT_TEST_USER,
    _id: process.env.CORRECT_TEST_USER_ID,
    animals: [],

}

const correctVet = {
    name: process.env.CORRECT_TEST_USER,
    email: process.env.CORRECT_TEST_USER + "gmail.com",
    password: process.env.CORRECT_TEST_USER,
    latitude: 3242,
    longtitude: 231,
    address: process.env.CORRECT_TEST_USER,
    _id: process.env.CORRECT_VET_USER_ID,
    services: ["cat", "dog"],

}

const wrongUser = {
    
        email: process.env.WRONG_TEST_USER+"@gmail.com",
        password: process.env.WRONG_TEST_USER,
        _id: process.env.WRONG_TEST_USER
    
}



module.exports = { correctOwner, correctVet, wrongUser }