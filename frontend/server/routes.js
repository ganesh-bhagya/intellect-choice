import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { addContact, addApplication, listContacts, listApplications, getApplicationById } from './storage.js';
import { sendContactEmail, sendApplicationEmail } from './email.js';
import { adminAuthMiddleware } from './auth.js';
import { uploadCv } from './upload.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }

  try {
    const saved = await addContact({ name, email, phone, message });
    await sendContactEmail(saved);
    res.status(201).json({ success: true, contact: saved });
  } catch (err) {
    console.error('Error handling contact submission', err);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

router.post('/applications', (req, res) => {
  uploadCv(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'CV file must be 5MB or smaller' });
      }
      return res.status(400).json({ error: err.message || 'File upload failed' });
    }
    const { name, email, phone, position, message } = req.body || {};
    if (!name || !email || !position) {
      return res.status(400).json({ error: 'name, email and position are required' });
    }

    const cv_path = req.file ? path.relative(path.join(process.cwd(), 'server'), req.file.path) : null;
    const cv_original_name = req.file ? req.file.originalname : null;

    try {
      const saved = await addApplication({
        name,
        email,
        phone,
        position,
        message,
        cv_path,
        cv_original_name,
      });
      await sendApplicationEmail(saved, req.file ? req.file.path : null);
      res.status(201).json({ success: true, application: saved });
    } catch (e) {
      console.error('Error handling application submission', e);
      res.status(500).json({ error: 'Failed to submit job application' });
    }
  });
});

// Admin list endpoints (protected)
router.get('/admin/contacts', adminAuthMiddleware, async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load contacts' });
  }
});

router.get('/admin/applications', adminAuthMiddleware, async (req, res) => {
  try {
    const applications = await listApplications();
    res.json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load applications' });
  }
});

// Download CV (protected)
router.get('/admin/applications/:id/cv', adminAuthMiddleware, async (req, res) => {
  try {
    const app = await getApplicationById(req.params.id);
    if (!app || !app.cvPath) return res.status(404).json({ error: 'CV not found' });
    const fullPath = path.join(process.cwd(), 'server', app.cvPath);
    if (!fs.existsSync(fullPath)) return res.status(404).json({ error: 'File not found' });
    const name = app.cvOriginalName || 'cv';
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.sendFile(path.resolve(fullPath));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get CV' });
  }
});

export default router;
