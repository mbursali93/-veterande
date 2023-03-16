const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../../server")
const { generateAccessToken } = require("../utils/index")
const { correctOwner, wrongUser } = require("./fixtures")

chai.use(chaiHttp)
chai.should()



describe("Owner functions unit tests", async ()=> {
    const accessToken = await generateAccessToken({ id: process.env.CORRECT_TEST_USER_ID })
    describe(" GET /owners", ()=> {
        it("should get owner with a given id", (done)=> {
            chai.request(server).get(`/owners/${correctOwner._id}`).end((err, res)=> {
                res.should.have.status(200);
                res.body.should.not.have.property("token")
                res.body.should.have.property("firstName")
                res.body.should.have.property("lastName")
                res.body.should.have.property("animals")
                res.body.should.not.have.property("password")
                done()
            })
        })

        it("should give an error when try to get a non-user", (done)=> {
            chai.request(server).get(`/owners/${wrongUser._id}`).end((err,res)=> {
                res.should.have.status(500)
                done()
                
            })
        })

    })

    describe("PUT /owners:id", ()=> {
        it("should change password of the user", (done)=> {
            chai.request(server).put(`/owners/${correctOwner._id}`)
            .send(correctOwner)
            .set("Authorization", accessToken)
            .end((err,res)=> {
                res.should.have.status(200)
                res.body.should.be.equal("password has changed")
                done()
            })
        })

        it("should give an error when password do not match", (done)=> {
            
            chai.request(server).put(`/owners/${correctOwner._id}`).send(wrongUser)
            .set("Authorization", accessToken)
            .end((err, res)=> {
                res.should.have.status(500)
                res.body.should.be.equal("Passwords do not match")
                done()
            })
        })


       it("should give an error when there is not a valid jwt access token", (done)=> { 
                chai.request(server).put(`/owners/${correctOwner._id}`).send(correctOwner).end((err,res)=> {
                res.should.have.status(500)
                done()
            })
        })


    })

    describe("PATCH /owners/:id", ()=> {
        it("should handle owned animals correctly", (done)=> {
            chai.request(server)
            .patch(`/owners/${correctOwner._id}`)
            .send(correctOwner.animals)
            .set("Authorization", accessToken)
            .end((err, res)=> {
                res.should.have.status(200)
                done()
            })
        })

        it("should give an error when there is not a valid jwt access token", (done)=> {
            chai.request(server)
            .patch(`/owners/${correctOwner._id}`)
            .send()
            .end((err, res)=> {
                res.should.have.status(500)
                done()
            })
        })
    })

    
})



