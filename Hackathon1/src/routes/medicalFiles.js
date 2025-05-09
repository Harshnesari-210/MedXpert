import express from 'express';
import upload from '../middlewares/upload.js';
import {
  uploadFile,
  getMyFiles,
  shareFile,
  getFilesSharedWithDoctor,
} from '../controllers/medicalFileController.js';
import { authenticateDoctor } from '../middlewares/auth.js'; // Updated to use named import

const router = express.Router();

router.post('/upload', authenticateDoctor, upload.single('file'), uploadFile);
router.get('/my-files', authenticateDoctor, getMyFiles);
router.post('/share', authenticateDoctor, shareFile);
router.get('/shared-with-me', authenticateDoctor, getFilesSharedWithDoctor);

export default router;
