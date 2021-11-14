import express from 'express';
import { statsController } from '../controllers';

const statsRoute = express.Router();

statsRoute.get("/sale", statsController.TotalSale);

export default statsRoute;