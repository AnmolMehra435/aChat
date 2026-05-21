const Message = require('../models/messages');


const createMessage = async (req, res) => {
    try{
        const conversationId = req.body.conversationId;
        const sender = req.body.sender;
        const text = req.body.text;

        const newMessage = await Message.create({
            conversationId: conversationId,
            sender: sender,
            text: text
        })

        return res.status(201).json({
            "message": newMessage
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            "message": "error ocurred"
        })
    }
}

const getMessage = async (req, res) => {
    try{
        const conversationId = req.params.conversationId;

        const messages = await Message.find({
            conversationId: conversationId
        }).populate(
            'sender',
            'name username avatar'
        )

        return res.json({ messages })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            "message": "error ocurred"
        })
    }
}


module.exports = { createMessage, getMessage }