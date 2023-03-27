const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../../server")
const { correctVet, correctOwner } = require("./fixtures")
const { generateAccessToken } = require("../utils/index")

chai.should()
chai.use(chaiHttp)

describe("Unit tests for appointment-service", async ()=> {

    const token = await generateAccessToken({ id: correctOwner._id })

    describe("GET /owner/:id", ()=> {

        it("should shows appointments of owner when given an owner id", (done)=> {
            chai.request(server).get(`/appointment/owner/${correctOwner._id}`).set("Authorization", token).end((err,res)=> {
                res.should.have.status(200)
                res.body.should.be.an("array")
                res.body[0].should.have.property("ownerId")
                res.body[0].should.have.property("vetId")
                res.body[0].should.have.property("date")
                
                
                done()
            })
            
        })

        it("should give error when there is not a valid jwt", (done)=> {
            chai.request(server).get(`/appointment/owner/${correctOwner._id}`).end((err,res)=> {
                res.should.have.status(500)
                done()
            })
        })


    })

    describe("GET /vet/:id", ()=> {

        it("should get appointments of vet when given a vet id", (done)=> {
            chai.request(server).get(`/appointment/vet/${correctVet._id}`).end((err,res)=> {
                res.should.have.status(200)
                res.body.should.be.an("array")
                res.body[0].should.have.property("ownerId")
                res.body[0].should.have.property("vetId")
                res.body[0].should.have.property("date")
                
                
                done()
            })
        })

        
    })

    describe("POST /owner/:id", ()=> {

        it("should give an error when there is not a valid jwt", (done)=> {
            chai.request(server)
            .post(`/appointment/owner/${correctOwner._id}`)
            .send({ ownerId: "random", vetId: "random", date: "2023-03-30", time: "12:50"})
            .end((err,res)=> {
                res.should.have.status(500)
                done()
            })
        })

        it("should give an error when a user try to get appointment with a date from past", (done)=> {
            chai.request(server)
            .post(`/appointment/owner/${correctOwner._id}`)
            .send({ ownerId: "random", vetId: "random", date: "2022-03-30", time: "12:50"})
            .set("Authorization", token).end((err,res)=> {
                res.should.have.status(500)
                res.body.should.be.equal("You cant get appointment for past time")
                done()
            })
        })

        it("should give an error when a user try to get appointment NOT between working hours ", (done)=> {
            chai.request(server)
            .post(`/appointment/owner/${correctOwner._id}`)
            .send({ ownerId: "random", vetId: "random", date: Date.now(), time: "19:50"})
            .set("Authorization", token).end((err,res)=> {
                res.should.have.status(500)
                res.body.should.be.equal("You cant choose that time")
                done()
            })
        })

        it("should give an error a user try to get appointment for a day further than a month", (done)=> {
            chai.request(server)
            .post(`/appointment/owner/${correctOwner._id}`)
            .send({ ownerId: "random", vetId: "random", date: "2026-03-30", time: "12:50"})
            .set("Authorization", token).end((err,res)=> {
                res.should.have.status(500)
                res.body.should.be.equal("Difference between appointments is more than 30 days")
                done()
            })
        })

        it("should not allow appointments with non-round start times", (done)=> {
            chai.request(server)
            .post(`/appointment/owner/${correctOwner._id}`)
            .send({ ownerId: "random", vetId: "random", date: "2023-03-30", time: "12:52"})
            .set("Authorization", token).end((err,res)=> {
                res.should.have.status(500)
                res.body.should.be.equal("You cant choose that time")
                done()
            })
        })
    })
})