const promiseRouter = require("express-promise-router");
const router = promiseRouter();
const authenticateToken = require("./middleware/authenticateJWT");

//User routes
const user = require("./controllers/user");
router.post("/user/signup", user.create);
router.post("/user/login", user.login);
router.patch("/user/edit", authenticateToken, user.edit);
router.get("/user", authenticateToken, user.get);

//Phone routes
const budget = require("./controllers/phone");
router.delete("/phone/delete", authenticateToken, phone.delete);
router.patch("/phone/edit", authenticateToken, phone.edit);
router.get("/phone/:phone_id/all", authenticateToken, phone.allPhones);

//Admin routes
const admin = require("./controllers/admin");
router.patch("/admin/user/edit", authenticateToken, admin.editUser);
router.patch("/admin/phone/edit", authenticateToken, admin.editPhone);
router.get("/admin/user/all", authenticateToken, admin.allUsers);
router.get("/admin/phone/all", authenticateToken, admin.allPhones);

module.exports = router;
