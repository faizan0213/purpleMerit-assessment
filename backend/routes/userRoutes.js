const router = require("express").Router();
const {
  getAllUsers,
  updateStatus,
  updateProfile,
  changePassword,
} = require("../controllers/userControllers");

const { updateUserRole } = require("../controllers/userControllers");
const { isAdmin } = require("../middlewares/roleMiddleware");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

// only admin can change role
router.patch("/:id/role", protect, adminOnly, updateUserRole);

// admin status change

router.get("/", protect, isAdmin, getAllUsers);
router.patch("/:id/status", protect, isAdmin, updateStatus);

router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;
