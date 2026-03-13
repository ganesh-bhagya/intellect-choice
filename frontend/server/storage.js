import { getPool } from './db.js';

export async function addContact(contact) {
  const [result] = await getPool().execute(
    `INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)`,
    [contact.name, contact.email, contact.phone || null, contact.message]
  );
  const id = result.insertId;
  const [rows] = await getPool().execute(
    'SELECT id, name, email, phone, message, created_at AS createdAt FROM contacts WHERE id = ?',
    [id]
  );
  const row = rows[0];
  return { id: String(row.id), ...row, createdAt: row.createdAt?.toISOString?.() || row.createdAt };
}

export async function addApplication(application) {
  const [result] = await getPool().execute(
    `INSERT INTO applications (name, email, phone, position, message, cv_path, cv_original_name)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      application.name,
      application.email,
      application.phone || null,
      application.position,
      application.message || null,
      application.cv_path || null,
      application.cv_original_name || null,
    ]
  );
  const id = result.insertId;
  const [rows] = await getPool().execute(
    `SELECT id, name, email, phone, position, message, cv_path AS cvPath, cv_original_name AS cvOriginalName, created_at AS createdAt
     FROM applications WHERE id = ?`,
    [id]
  );
  const row = rows[0];
  return {
    id: String(row.id),
    ...row,
    createdAt: row.createdAt?.toISOString?.() || row.createdAt,
  };
}

export async function listContacts() {
  const [rows] = await getPool().execute(
    'SELECT id, name, email, phone, message, created_at AS createdAt FROM contacts ORDER BY created_at DESC'
  );
  return rows.map((r) => ({
    id: String(r.id),
    name: r.name,
    email: r.email,
    phone: r.phone,
    message: r.message,
    createdAt: r.createdAt?.toISOString?.() || r.createdAt,
  }));
}

export async function listApplications() {
  const [rows] = await getPool().execute(
    `SELECT id, name, email, phone, position, message, cv_path AS cvPath, cv_original_name AS cvOriginalName, created_at AS createdAt
     FROM applications ORDER BY created_at DESC`
  );
  return rows.map((r) => ({
    id: String(r.id),
    name: r.name,
    email: r.email,
    phone: r.phone,
    position: r.position,
    message: r.message,
    cvPath: r.cvPath,
    cvOriginalName: r.cvOriginalName,
    createdAt: r.createdAt?.toISOString?.() || r.createdAt,
  }));
}

export async function getApplicationById(id) {
  const [rows] = await getPool().execute(
    `SELECT id, name, email, phone, position, message, cv_path AS cvPath, cv_original_name AS cvOriginalName, created_at AS createdAt
     FROM applications WHERE id = ?`,
    [id]
  );
  if (!rows.length) return null;
  const r = rows[0];
  return {
    id: String(r.id),
    ...r,
    createdAt: r.createdAt?.toISOString?.() || r.createdAt,
  };
}
