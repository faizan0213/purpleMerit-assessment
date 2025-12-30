const router = require("express").Router();
const { register, login, getMe, logout } = require("../controllers/authControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

module.exports = router;
