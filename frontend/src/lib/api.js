const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

function getApiOrigin() {
  try {
    return new URL(API_BASE).origin;
  } catch {
    return '';
  }
}

export function resolveMediaUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const origin = getApiOrigin();
  if (path.startsWith('/')) return `${origin}${path}`;
  return `${origin}/${path}`;
}

async function request(path, options = {}) {
  const body = options.body;
  const isFormData = body instanceof FormData;
  const headers = isFormData
    ? { ...(options.headers || {}) }
    : { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers,
    body,
  });

  let data;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message = data?.error || data?.message || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export function submitContact(data) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function submitApplication(dataOrFormData) {
  const isFormData = dataOrFormData instanceof FormData;
  return request('/applications', {
    method: 'POST',
    body: isFormData ? dataOrFormData : JSON.stringify(dataOrFormData),
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
  });
}

export function getCvDownloadUrl(applicationId) {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
  return `${base}/admin/applications/${applicationId}/cv`;
}

/** Fetch CV as blob with credentials (use for download when link might not send cookies). */
export async function downloadCv(applicationId, filename = 'cv') {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
  const url = `${base}/admin/applications/${applicationId}/cv`;
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error(res.status === 401 ? 'Unauthorized' : 'Failed to download CV');
  const blob = await res.blob();
  const name = res.headers.get('content-disposition')?.match(/filename="?([^";\n]+)"?/)?.[1] || filename;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function fetchContacts() {
  return request('/admin/contacts');
}

export function fetchApplications() {
  return request('/admin/applications');
}

export function adminLogin(credentials) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

/** Check if current session is authenticated. Throws if 401. */
export function fetchAdminMe() {
  return request('/admin/me');
}

export function adminLogout() {
  return request('/admin/logout', { method: 'POST' });
}

// Jobs (admin)
export function fetchJobs() {
  return request('/admin/jobs');
}

// Jobs (public – active only, for Careers page)
export function fetchPublicJobs() {
  return request('/jobs');
}

export function createJob(data) {
  return request('/admin/jobs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateJob(id, data) {
  return request(`/admin/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteJob(id) {
  return request(`/admin/jobs/${id}`, {
    method: 'DELETE',
  });
}

// Blogs (admin)
export function fetchAdminBlogs() {
  return request('/admin/blogs');
}

export function createBlog(data) {
  return request('/admin/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function uploadBlogImage(file) {
  const form = new FormData();
  form.append('image', file);
  return request('/admin/blogs/upload-image', {
    method: 'POST',
    body: form,
  });
}

export function updateBlog(id, data) {
  return request(`/admin/blogs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteBlog(id) {
  return request(`/admin/blogs/${id}`, {
    method: 'DELETE',
  });
}

// Blogs (public)
export function fetchPublicBlogs({ limit, offset } = {}) {
  const params = new URLSearchParams();
  if (limit != null) params.set('limit', String(limit));
  if (offset != null) params.set('offset', String(offset));
  const qs = params.toString();
  return request(`/blogs${qs ? `?${qs}` : ''}`);
}

export function fetchBlogBySlug(slug) {
  return request(`/blogs/${encodeURIComponent(slug)}`);
}

export default {
  submitContact,
  submitApplication,
  fetchContacts,
  fetchApplications,
  adminLogin,
  adminLogout,
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  fetchAdminBlogs,
  createBlog,
  uploadBlogImage,
  updateBlog,
  deleteBlog,
  fetchPublicBlogs,
  fetchBlogBySlug,
};
