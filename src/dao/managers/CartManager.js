import fs from "fs";
import path from "path";
import __dirname from "../../utils.js";

class CartManager {

    constructor( pathFile ){

        this.path = path.join(__dirname,`/files/${pathFile}`);
    }

    async getCarts(){

        try{

            if( fs.existsSync(this.path) )
            {
                const carts = JSON.parse(await fs.promises.readFile( this.path, 'utf-8'))
                
                return carts;

            }else{

                return [];
            }

        }catch (err){

            return err;
        }
    }

    async createCart( ){

        const carts = await this.getCarts();
        
        if( carts.length === 0)
        {
            let cart = {
                id: 1,
                products: []
            }

            carts.push( cart );

        }else{

            let cart = {
                id: carts[ carts.length-1 ].id + 1,
                products: []
            }

            carts.push( cart );
        }

        await fs.promises.writeFile( this.path, JSON.stringify(carts, null, '\t') )

        return carts;
        
    }

    async getCartById(cartId){

        const carts = await this.getCarts();

        let cart = carts.find(cart => cart.id == cartId)

        if(cart){

            return cart;

        }else{

            return "Cart Not Found.";
        }
    }

    async addProductToCart( cartId, productId )
    {
        const carts = await this.getCarts();

        let cart = carts.find(cart => cart.id == cartId)

        if(!cart){

            return "Cart Not Found.";
        }

        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await fs.promises.writeFile( this.path, JSON.stringify(carts, null, '\t') )

        return carts;
    }
    
}

export { CartManager };