const User = require("../models/users.model");

const findUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            where: {
                status: 'available' 
            }
        })

        res.status(200).json({
        status: 'success',
        message:'Users was found successfuly',
        users
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
status: 'fail',
message: 'Internal server error'
        })
    }}
    

const findUserById = async(req, res) => {
    try {
        const {id} = req.params;

        const userId = await User.findOne({
            where: {
                id,
                status: 'available',
            }
        })

        if(!userId){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }

    res.status(200).json({
        status: 'success',
        message: 'User was found successfully',
        userId,
    })
    } catch (error) {
        console.log(error);
       return res.status(500).json({
status: 'fail',
message: 'Internal server error'
        })
    }
   
}

const createUser = async(req, res) => {
    try {
         const {name, email, password, role} = req.body
    const user = await User.create({
            name,
            email,
            password,
            role
         })
    res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
status: 'fail',
message: 'Internal server error'
        })
    }
   
    }

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body

    const user = await User.findOne({
        where: {
            id,
            status: 'available',
        }
    })
     if(!user){
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
     }

     await user.update({name, email});

    res.status(200).json({
        status: 'success',
        message: 'User update successfully',
        user
    }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
status: 'fail',
message: 'Internal server error'
        })
    }}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params

        const user = await User.findOne({
            where: {
                status: 'available',
                id
            }
        })

        if(!user){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }

        await user.update({status: 'disable'})

         res.status(200).json({
            status: 'success',
            message: 'User delete successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
status: 'fail',
message: 'Internal server error'
        })
    }}

    module.exports = {
        findUsers,
        findUserById,
        createUser,
        updateUser,
        deleteUser
    }