const Conversation = require('../models/conversation');

const createConversation = async (req, res) => {
    try{
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;

        const existingConversation = await Conversation.findOne({
            members: {
                $all: [ senderId, receiverId ]
            }
        }) 

        if(existingConversation){
            return res.json({
                conversation: existingConversation
            })
        }

        const newConversation = await Conversation.create({
            members: [ senderId, receiverId ]
        })

        return res.json({
            conversation: newConversation
        })
    }catch(err){
        console.log(err.message);
        res.status(403).json({
            "message": "error occurred"
        })
    }
}

const getUserConversation = async (req, res) => {
    try{
        const userId = req.query.userId;
        
        const conversations = await Conversation.find({
            members: {
                $in: [userId]
            }
        }).populate(
            'members',
            '-password'
        );

        res.json({
            conversations
        })
    }catch(err){
        console.log(err.message)
    }
}


module.exports = { createConversation, getUserConversation }
