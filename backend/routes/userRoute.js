import express from 'express';
import { loginUser,registerUser,adminLogin,registerSeller,loginSeller, getSellerProfile } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
// userRouter.post('/sellerR',registerSeller)
// userRouter.post('/sellerL',loginSeller)
userRouter.post('/seller/register', registerSeller);
userRouter.post('/seller/login', loginSeller);
// Add this new route
userRouter.get('/seller/profile', authUser, getSellerProfile);

export default userRouter;