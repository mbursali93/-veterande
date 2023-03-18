const VetService = require("../services/vet-service")

const service = new VetService()

class VetController {
    async getVetById (req,res) {
        try {
            const id = req.params.id;
            const vet = await service.getVetById(id)
            const { password, ...others } = vet._doc
            
            res.status(200).json({...others})
        } catch(e) {
            res.status(500).json(e.message)
        }
    }

    async updateVetServices (req,res) {
        try {
            const id = req.params.id
            const services = req.body.services

            const vet = await service.updateVetServices({ id, services })
            
            res.status(200).json(vet)

        } catch(e) {
            res.status(500).json(e.message)
        }
    }

    async deleteVet (req,res) {
        try {
            const id = req.params.id
            await service.deleteVet(id)
            res.status(200).json("user has been deleted")
        } catch(e) {
            res.status(500).json(e.message)
        }
    }
}

module.exports = VetController;