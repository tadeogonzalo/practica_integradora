import { Router } from "express";
import { ProductManager } from "../dao/managers/ProductsManager.js";
import messagesModel from "../dao/models/messages.model.js";

const router = Router()
const path = "productos.json"
const manager = new ProductManager(path);
/*
router.get("/", async (req,res)=>{
    const allProducts = await manager.getProducts();
    res.render('home', {products: allProducts })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); 
});
*/
router.get("/", async (req, res) => {

    try {
        // Obtener todos los mensajes desde MongoDB y pasarlos a la vista
        const messages = await messagesModel.find().sort({ timestamp: 1 }).lean();

        res.render('chat', { messages });

      } catch (error) {

        console.error('Error al obtener mensajes:', error);
        res.render('chat', { messages: [] });
      }

});


export default router;