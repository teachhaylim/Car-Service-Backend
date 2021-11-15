import express from 'express';
import { statsController } from '../controllers';
import { auth } from '../middleware';

const statsRoute = express.Router();

statsRoute.get("/sale", auth, statsController.SaleDashboard);
statsRoute.get("/admin", auth, statsController.AdminDashboard);

export default statsRoute;