const promiseRouter = require("express-promise-router");
const router = promiseRouter();
const authenticateToken = require("./middleware/authenticateJWT");

//User routes
const user = require("./controllers/user");
router.post("/user/signup", user.create);
router.post("/user/login", user.login);
router.post("/user/forgotpassword", user.forgotPassword);
router.patch("/user/resetpassword", authenticateToken, user.resetPassword);
router.patch("/user/edit", authenticateToken, user.edit);
router.get("/user", authenticateToken, user.get);

//Phone routes
const phone = require("./controllers/phone");
router.post("/phone/create", authenticateToken, phone.createPhone);
router.delete("/phone/delete", authenticateToken, phone.deletePhone);
router.patch("/phone/edit", authenticateToken, phone.editPhone);
router.patch("/phone/track", authenticateToken, phone.trackPhone);
router.get("/phone/all", authenticateToken, phone.allPhones);
router.get("/phone/get/:software_id", authenticateToken, phone.getPhone);

//Admin routes
const admin = require("./controllers/admin");
router.delete("/admin/user/delete", authenticateToken, admin.deleteUser);
router.delete("/admin/phone/delete", authenticateToken, admin.deletePhone);
router.patch("/admin/user/edit", authenticateToken, admin.editUser);
router.patch("/admin/phone/edit", authenticateToken, admin.editPhone);
router.get("/admin/user/all", authenticateToken, admin.allUsers);
router.get("/admin/phone/all", authenticateToken, admin.allPhones);
router.get(
  "/admin/phone/all/:user_id",
  authenticateToken,
  admin.allPhonesForUser
);

module.exports = router;
