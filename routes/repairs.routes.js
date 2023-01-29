const { Router } = require("express");
const { createRepair, updateRepair, deleteRepair, repairPending, repairPendingId } = require("../controllers/repairs.controllers");

const router = Router()

router.get('/', repairPending)

router.get('/:id', repairPendingId)

router.post('/', createRepair);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair)

module.exports = {
    repairsRouter: router
}