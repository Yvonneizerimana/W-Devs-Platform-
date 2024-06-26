import adminController from "../controllers/admin.controller.js";
import authValidation from "../middlewares/authValidation.js"
import { otpValidation } from "../utils/validation.js";
import userController from '../controllers/admin.controller.js'
import checkUsers from "../utils/authCheck.js";
import express from 'express';
const app= express();
app.use(express.json)


const adminRouter = express.Router();

adminRouter.route('/create').post(authValidation,adminController.createAdmin);
adminRouter.route('/verify').post(otpValidation, adminController.ValidateOpt);
adminRouter.route('/login').post(adminController.loginUser);
adminRouter.route('/forgotPassword').post(adminController.forgotPassword)
adminRouter.route('/resetPassword/:resetToken').post(adminController.resetPassword)
adminRouter.route('/logout').get(adminController.logout);


adminRouter.route('/listOfAllUsers').get(checkUsers.admin,userController.listOfAllUsers)
adminRouter.route('/listProfileById').get(checkUsers.admin,userController.listProfileById)
adminRouter.route('/verifyProfile').get(checkUsers.admin,userController.verifyProfile)
adminRouter.route('/approved').get(checkUsers.admin,userController.approved)
adminRouter.route('/rejected').get(checkUsers.admin,userController.rejected)
adminRouter.route('/updateProfile').get(checkUsers.admin,userController.updateProfile)
adminRouter.route('/deleteProfile').get(checkUsers.admin,userController.deleProfile)
adminRouter.route('/listUsersByStatus').get(checkUsers.admin,userController.listUsersByStatus)

export default adminRouter  