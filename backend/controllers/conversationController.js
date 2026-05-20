const Conversation = require('../models/conversation');

const createConversation = async (req, res) => {
    try{
        const senderId = req.body.senderId;
        const recieverId = req.body.reciever;

        const existingConversation = await Conversation.findOne({
            members: {
                $all: [ senderId, recieverId ]
            }
        }) 

        if(existingConversation){
            return res.json({
                conversaiton: existingConversation
            })
        }

        const newConversation = await Conversation.create({
            members: [ senderId, recieverId ]
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

const getUserConversation = async () => {
    try{
        const userId = req.query.userId;
        
        const conversation = await Conversation.findOne({
            members: {
                $in: [userId]
            }
        })

        res.json({
            conversations
        })
    }catch(err){
        console.log(err.message)
    }
}


module.exports = [ createConversation, getUserConversation ]
