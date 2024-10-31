import express from 'express';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';
import { upload } from '../middlewares/fileUpload.js';
const router = express.Router();

router.get('/news', getNews);
router.get('/news/:id', getNewsById);
router.post('/news', upload.single('images'), createNews);
router.patch('/news/:id', upload.single('images'), updateNews);
router.delete('/news/:id', deleteNews);

export default router;
