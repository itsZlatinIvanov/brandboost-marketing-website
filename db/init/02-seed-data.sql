-- Insert a test client
INSERT INTO clients (id, company_name, contact_name, email, logo_url)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Test Client',
  'John Doe',
  'client@example.com',
  'https://via.placeholder.com/150'
);

-- Insert a test user for the client
INSERT INTO users (id, email, password_hash, full_name, role, client_id)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'client@example.com',
  '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', -- "password"
  'John Doe',
  'client',
  '11111111-1111-1111-1111-111111111111'
);

-- Insert an editor user
INSERT INTO users (id, email, password_hash, full_name, role)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'editor@example.com',
  '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', -- "password"
  'Jane Smith',
  'editor'
);

-- Insert a test project
INSERT INTO projects (id, name, client_id, description, status)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'Test Project',
  '11111111-1111-1111-1111-111111111111',
  'This is a test project for development',
  'active'
);

-- Assign the editor to the project
INSERT INTO project_assignments (project_id, user_id, role)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  '33333333-3333-3333-3333-333333333333',
  'editor'
);

-- Insert a test video
INSERT INTO videos (id, project_id, filename, drive_file_id, status, editor_id)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  '44444444-4444-4444-4444-444444444444',
  'test_video.mp4',
  'sample_drive_id_12345',
  'internal_review',
  '33333333-3333-3333-3333-333333333333'
);

-- Insert a test comment
INSERT INTO comments (video_id, user_id, text, timestamp, visibility)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  '33333333-3333-3333-3333-333333333333',
  'This is a test comment for development',
  15.5,
  'internal'
); 