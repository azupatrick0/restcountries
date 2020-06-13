import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';

const app = express();

const port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

app.use('/api/v1', router);

app.use('*', (_req, res) => {
  res.status(404).json({
    data: {
      message: 'Sorry, the endpoint you are looking for does not exist, please visit /api/v1'
    }
  });
});

app.use((err, _req, res, next) => {
  res.status(500).json({
    status: 500,
    data: {
      message: 'An error ocurred, please recheck your request parameters, then resend request!',
      error: err,
    },
  });
  next();
});

app.listen(port, () => console.log(`Server listening for requests on port ${port}`));

export default app;
