import express from 'express';
import { Countries, Slot } from '../controllers';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    data: {
      message: 'Welcome to restcountries API',
    }
  });
});

router.get('/countries/fetch', Countries.fetchUniqueCountry);
router.get('/slot/spin', Slot.spin);

export default router;
