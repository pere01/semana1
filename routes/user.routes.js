const { Router } = require("express");
const {createUser, updateUser, deleteUser, findUserById, findUsers } = require("../controllers/user.controller");

const router = Router();

router.get('/', findUsers);

router.get('/:id', findUserById)

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = {
    userRouter: router,
}