import express from 'express';
import { statsController } from '../controllers';

const statsRoute = express.Router();

statsRoute.route('/')
    .get((req, res) => {
        res.status(200).send('stats route');
    });

statsRoute.get("/totalincome", statsController.TotalIncomeWithPeriod);

export default statsRoute;