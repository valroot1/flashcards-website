import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { addGroup, getGroup } from '../controllers/group.js';

const router = express.Router();

router.get("/getGroup/:id", protectRoute, getGroup);
router.post("/addGroup", protectRoute, addGroup);

export default router;