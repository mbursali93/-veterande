const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../../server")
const { generateRefreshToken } = require("../utils/index")
const { correctUser, wrongUser } = require("./fixtures")


chai.use(chaiHttp)
chai.should()


describe("Authorization Unit Tests", ()=> {
    //FOR OWNERS
    describe("POST /auth/register-owner", ()=> {
        it("should not register an owner that already exists", (done)=> {
            chai.request(server).post("/auth/register-owner").send(correctUser).end((err, res)=> {
                res.should.have.status(500)
                done()
            })
        })

        it("should give an error when a user doesnt fill required informations", (done)=> {
            chai.request(server).post("/auth/register-owner").send({
                firstName:"",
                lastName:"",
                email:"",
                password: "",
            }).end(
                (err, res)=> {
                res.should.have.status(500)
                done()
            })
        } )
    })

    describe("POST auth/login-owner", ()=> {
        it("login process works perfectly", (done)=> {
            chai.request(server).post("/auth/login-owner").send(correctUser).end((err,res)=> {
                if(err) console.log(err)

                res.should.have.status(200);
                res.body.should.have.property("token")
                res.body.should.have.property("email") 
                res.should.have.cookie("refreshToken")

                done()
            })
        })

        it("should not allow wrong credentials", (done)=> {
            chai.request(server).post("/auth/login-owner").send(wrongUser).end((err,res)=> {
                res.should.have.status(500)

                done()
            })
        })
    })

    //FOR VETS


    //COMMON

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
