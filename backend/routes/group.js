import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { addGroup, deleteGroup, getAllGroups, getGroup, modifyGroup } from '../controllers/group.js';

const router = express.Router();

router.get("/", protectRoute, getAllGroups);
router.get("/:id", protectRoute, getGroup);
router.post("/", protectRoute, addGroup);
router.put("/:id", protectRoute, modifyGroup);
router.delete("/:id", protectRoute, deleteGroup);

export default router;