import express from 'express';
import {
  getPendaftar,
  getPendaftarById,
  createPendaftar,
  updatePendaftar,
  deletePendaftar,
} from '../controllers/formController.js';
const router = express.Router();

router.get('/peserta', getPendaftar);
router.get('/peserta/:id', getPendaftarById);
router.post('/peserta', createPendaftar);
router.patch('/peserta/:id', updatePendaftar);
router.delete('/peserta/:id', deletePendaftar);

export default router;
