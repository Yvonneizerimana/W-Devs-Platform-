import userController from "../controllers/user.controller.js";
import authValidation from "../middlewares/authValidation.js"
import { otpValidation } from "../utils/validation.js";
import checkUsers from "../utils/authCheck.js";
import express from 'express';
import profileController from '../controllers/createProfile.controller.js'
import profile from '../utils/uploadDocument.js';
const app= express();
app.use(express.json)


const userRouter = express.Router();

userRouter.route('/create').post(authValidation,userController.createUser);
userRouter.route('/verify').post(otpValidation, userController.ValidateOpt);
userRouter.route('/login').post(userController.loginUser);
userRouter.route('/forgotPassword').post(userController.forgotPassword)
userRouter.route('/resetPassword/:resetToken').post(userController.resetPassword)
userRouter.route('/logout').get(userController.logout);

userRouter.route('/profile').post(checkUsers.user,profile.array('uploadDocuments', 10),profileController.createProfile);
userRouter.route('/viewProfile').get(checkUsers.user,profileController.viewProfile); 
userRouter.route('/updateProfile').put(checkUsers.user,profile.array('uploadDocuments', 10),profileController.updateProfile); 
userRouter.route('/deleteProfile').delete(checkUsers.user,profileController.deleteProfile); 
userRouter.route('/viewUserProfile').post(checkUsers.user,profileController.viewApproved); 



export default userRouter