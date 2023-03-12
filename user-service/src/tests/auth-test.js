const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../../server")
const { generateRefreshToken } = require("../utils/index")



chai.use(chaiHttp)
chai.should()

const correctUser = {
    firstName: process.env.USER,
    lastName: process.env.USER,
    email: process.env.USER+"@gmail.com",
    password: process.env.USER,
    _id: process.env.USER_ID,
}

const wrongUser = {
    email:"1dsfs",
    password: "werdg"
}

const emptyUser = {
    firstName:"",
    lastName:"",
    email:"",
    password: "",
}

describe("Authorization Unit Tests", ()=> {
    describe("POST /auth/register", ()=> {
        it("should not register a user that already exists", (done)=> {
            chai.request(server).post("/auth/register").send(correctUser).end((err, res)=> {
                res.should.have.status(500)
                done()
            })
        })

        it("should give an error when a user doesnt fill required informations", (done)=> {
            chai.request(server).post("/auth/register").send(emptyUser).end((err, res)=> {
                res.should.have.status(500)
                done()
            })
        } )
    })

    describe("POST auth/login", ()=> {
        it("login process works perfectly", (done)=> {
            chai.request(server).post("/auth/login").send(correctUser).end((err,res)=> {
                if(err) console.log(err)

                res.should.have.status(200);
                res.body.should.have.property("token")
                res.body.should.have.property("email") 
                res.should.have.cookie("refreshToken")

                done()
            })
        })

        it("should not allow wrong credentials",(done)=> {
            chai.request(server).post("/auth/login").send(wrongUser).end((err,res)=> {
                res.should.have.status(500)

                done()
            })
        })
    })


    describe("POST auth/logout", ()=> {
        it("should delete cookies", (done)=> {
            chai.request(server).post("/auth/logout").send().end((err, res)=> {
                res.should.not.have.cookie()
                res.should.have.status(200)
                res.body.should.be.equal("Logged Out")
                done()
            })
        })
    })

    describe("POST auth/refresh", async ()=> {
        const refreshToken = await generateRefreshToken({id: correctUser._id})
        it("should return a new access token when given a valid refresh token", (done)=> {
            chai.request(server).post("/auth/refresh").send().set("Cookie", `refreshToken=${refreshToken}`).end((err, res)=> {
                res.should.have.status(200)
                res.body.should.have.property("token")
                done()
            })
        })
    })


    

    
})