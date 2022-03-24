import {Router} from 'express';
import * as productsCtrl from  '../controllers/products.controller';
import { authJwt } from '../middlewares'

const router = Router();

router.post('/',[authJwt.verifyToken,authJwt.isModerator],productsCtrl.createProducts);

router.get('/',productsCtrl.getProducts);

router.get("/:id",productsCtrl.getProductsById);

router.put("/:id",[authJwt.verifyToken,authJwt.isAdmin],productsCtrl.updateProductsById);

router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin],productsCtrl.deleteProductsById);


export default router;