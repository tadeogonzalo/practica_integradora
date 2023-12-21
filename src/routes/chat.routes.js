import { Router } from "express";
import messagesModel from "../dao/models/messages.model.js";

const router = Router();


router.get("/", async (req, res) => {

    const messages = await messagesModel.find();

    res.send({
        status: "success",
        message: messages
    })

});

router.post('/', async (req, res) => {
    const { username, message } = req.body;

    try {
      const newMessage = {
        username: username,
        message: message,
      };

      await messagesModel.create(newMessage);

      res.redirect('/');
    } catch (error) {

      console.error('Error al guardar el mensaje:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

export default router;