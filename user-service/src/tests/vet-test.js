const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../../server")
const { correctVet, wrongUser } = require("./fixtures")
const { generateAccessToken } = require("../utils/index")


chai.should()
chai.use(chaiHttp)

describe("Unit tests for vet functions", async ()=> {
    const token = await generateAccessToken({ id: correctVet._id })
    describe("GET /vets/:id", ()=> {
        it("should get a vet with a given id", (done)=> {
            chai.request(server).get(`/vets/${correctVet._id}`).end((err, res)=> {
                res.should.have.status(200)
                res.body.should.have.property("name")
                res.body.should.have.property("email")
                res.body.should.not.have.property("password")
                res.body.should.have.property("services")
                res.body.should.have.property("address")
                done()
            })
        })

        it("should give an error when given invalid id", (done)=> {
            chai.request(server).get(`/vets/${wrongUser._id}`).end((err, res)=> {
                res.should.have.status(500)
                
                done()
            })
        })
    })

    describe("PATCH /vets/:id", ()=> {
        it("should update vet's services", (done)=> {

            chai.request(server).patch(`/vets/${correctVet._id}`).send(correctVet).set("Authorization", token).end((err,res)=> {
                res.should.have.status(200)
                res.body.should.have.property("services")
                
                done()
            })
        })

        it("should not allow any change if there is not a valid jwt", (done)=> {

            chai.request(server).patch(`/vets/${correctVet._id}`).send(correctVet).end((err, res)=> {
                res.should.have.status(500)
                
                done()
            })
        })
    })

})