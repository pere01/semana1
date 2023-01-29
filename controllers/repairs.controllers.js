const Repairs = require("../models/repairs.model");

const repairPending = async (req, res) => {
    try {
        const pending = await Repairs.findAll({
            where:{
                status: 'pending'
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'Repair was found successfuly',
            pending,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error'
        })
    }
    
};

const repairPendingId = async (req, res) => {
    try {
        const {id} = req.params

        const pendingId = await Repairs.findOne({
            where: {
                id: id,
                status: 'pending'
            }
        });

       if(!pendingId){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        };
        res.status(200).json({
            status: 'success',
            message: 'Repair was found successfully',
            pendingId,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error'
        })
    }
};

const createRepair = async (req, res) => {
    try {
        const {date, status, userId} = req.body;

        const newRepair = await Repairs.create({
            date,
            status,
            userId
        });
        res.status(201).json({
            status: 'success',
            message: 'The repair was created successfully',
            newRepair,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error'
        })
    }
};

const updateRepair = async (req, res) => {
    try {
        const {id} = req.params;
        
        const repairUpdate = await Repairs.findOne({
            where: {
                id,
                status: 'pending'
            },
        });
        if(!repairUpdate) {
            return res.status(404).json({
                status: 'error',
                message: 'the repair to update has not been found',
            });
}
        await repairUpdate.update({
                status: 'completed'
            })
        
            req.status(200).json({
                status: 'successes',
                message: 'the repair has been successfully updated',
                repairUpdate,
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error'
        })
    }
    };
    const deleteRepair = async (req, res)=>{
        try {
            const {id} = req.params;

            const notRepair = await Repairs.findOne({
                where:{
                    status: 'pending',
                    id,
                }
            })

            if(!notRepair){
                return res.status(404).json({
                    status: 'error',
                    message: 'The repair to delete was not found',
                });
            }

            await notRepair.update({
                status: 'canceled'
            });

            req.status(200).json({
                status: 'successes',
                message: 'Repair successfully removed',
                notRepair
            })

        } catch (error) {
            console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error'
        })
        }


    }

module.exports = {
    repairPending,
    repairPendingId,
    createRepair,
    updateRepair,
    deleteRepair
}