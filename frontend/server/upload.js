import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, 'uploads', 'cvs');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    const base = Date.now() + '-' + (file.originalname || 'cv').replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 80);
    cb(null, base.slice(0, 255 - ext.length) + ext);
  },
});

const ALLOWED_MIMES = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];
const ALLOWED_EXT = ['.pdf', '.doc', '.docx'];

export const uploadCv = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const ok = ALLOWED_MIMES.includes(file.mimetype) || ALLOWED_EXT.includes(ext);
    if (ok) cb(null, true);
    else cb(new Error('Only PDF and Word documents (.pdf, .doc, .docx) are allowed.'), false);
  },
}).single('cv');

export function getCvPath(filename) {
  return path.join(UPLOAD_DIR, filename);
}
