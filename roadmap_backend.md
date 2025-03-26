# Video Review Portal Backend Roadmap

This document outlines the complete implementation roadmap for the client portal and video review system, including infrastructure, architecture, key components, and timeline.

## 1. Infrastructure Overview

### 1.1 Technology Stack

- **Frontend Framework**: React/Next.js (keeping existing Cloudflare deployment)
- **Backend Framework**: Next.js API Routes
- **Database**: PostgreSQL
- **External Integrations**: 
  - Notion API for project management
  - Google Drive API for video storage and organization
- **Video Processing**: FFmpeg running on Google Cloud Run
- **Authentication**: JWT with role-based access control
- **Containerization**: Docker for development and deployment
- **Cloud Provider**: Google Cloud Platform

### 1.2 System Architecture

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│               │     │               │     │               │
│   Client      │────▶│   Backend     │────▶│   Database    │
│   Portal      │     │  (Google      │     │ (Cloud SQL)   │
│               │     │   Cloud Run)  │     │               │
└───────────────┘     └───────┬───────┘     └───────────────┘
                              │
        ┌───────────────┐     │     ┌───────────────┐
        │               │     │     │               │
        │  Notion API   │◀────┼────▶│  Google Drive │
        │  Integration  │     │     │  Integration  │
        │               │     │     │               │
        └───────────────┘     │     └───────────────┘
                              ▼
                      ┌───────────────┐     ┌───────────────┐
                      │               │     │               │
                      │    Storage    │     │ Video         │
                      │ (Google Cloud │────▶│ Processing    │
                      │  Storage)     │     │ (Cloud Run)   │
                      │               │     │               │
                      └───────────────┘     └───────────────┘
```

## 2. Client Portal Overview

### 2.1 Key Portal Features

- **Project Management Dashboard**
  - Integration with existing Notion database
  - Calendar view synchronized with Notion
  - Project status tracking and visualization
  - Task assignments and deadlines

- **Account Management**
  - Client profile and settings
  - Team management and user roles
  - Billing and subscription information

- **Resource Center**
  - Asset library for client materials
  - Guides and documentation
  - Brand guidelines and resources

- **Video Review System**
  - Client-facing review interface
  - Internal team collaboration space
  - Version control and approval workflow

### 2.2 User Roles and Permissions

- **Admin**: Full access to all features and settings
- **Internal Team**: Access to all projects, internal comments, and all video versions
- **Editor**: Access to assigned projects, internal comments, and ability to upload new versions
- **Client**: Access to only their projects and final approved videos for review

## 3. Development Environment Setup

### 3.1 Docker Configuration

**Dockerfile**
```dockerfile
FROM node:18-alpine

# Install FFmpeg for video processing
RUN apk add --no-cache ffmpeg

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/videoreview
      - STORAGE_BUCKET=videos
      - JWT_SECRET=your-secret-key
    depends_on:
      - db

  db:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: videoreview
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/init.sql:/docker-entrypoint-initdb.d/init.sql

  # Optional local storage emulator for development
  storage:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"

volumes:
  postgres_data:
  minio_data:
```

### 3.2 Local Development Workflow

1. Clone repository
2. Run `docker-compose up -d` to start all services
3. Access the API at `http://localhost:3000`
4. Access MinIO (local storage) at `http://localhost:9001`
5. Connect to database at `localhost:5432`

## 4. Database Schema

### 4.1 Core Tables

**Projects**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id),
  description TEXT,
  notion_page_id TEXT, -- To link with Notion
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'in_progress', 'in_review', 'client_review', 'completed'
  drive_folder_id TEXT, -- Google Drive folder ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Videos**
```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  drive_file_id TEXT NOT NULL, -- Google Drive file ID
  thumbnail_url TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'internal_review', -- 'internal_review', 'client_review', 'approved'
  duration FLOAT,
  editor_id UUID REFERENCES users(id), -- Assigned editor
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Comments**
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  text TEXT NOT NULL,
  timestamp FLOAT NOT NULL, -- in seconds
  position JSONB, -- {x: number, y: number} for frame-specific comments
  visibility TEXT NOT NULL DEFAULT 'internal', -- 'internal', 'client'
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4.2 User Management Tables

**Users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'client', -- 'admin', 'internal', 'editor', 'client'
  notion_user_id TEXT, -- Optional link to Notion user
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Clients**
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  drive_root_folder_id TEXT, -- Root Google Drive folder for client
  notion_database_id TEXT, -- Client's Notion database ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Assets**
```sql
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  drive_file_id TEXT NOT NULL, -- Google Drive file ID
  category TEXT, -- e.g., 'logo', 'brand_guide', 'font'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. API Endpoints

### 5.1 Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh JWT token

### 5.2 Projects

- `GET /api/projects` - List all projects (with pagination and filtering)
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/notion-sync` - Sync with Notion database
- `GET /api/projects/calendar` - Get projects in calendar format

### 5.3 Videos

- `GET /api/videos?project_id=:id` - List videos for project
- `GET /api/videos/:id` - Get video details
- `POST /api/videos/upload` - Upload new video (connects to Google Drive)
- `PUT /api/videos/:id/status` - Update video status (internal/client review)
- `POST /api/videos/:id/version` - Create new version of video
- `DELETE /api/videos/:id` - Delete video

### 5.4 Comments

- `GET /api/comments?video_id=:id&visibility=:visibility` - List comments for video
- `POST /api/comments` - Add comment
- `PUT /api/comments/:id` - Update comment (e.g., resolve)
- `DELETE /api/comments/:id` - Delete comment

### 5.5 Clients

- `GET /api/clients` - List all clients
- `GET /api/clients/:id` - Get client details
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### 5.6 Assets

- `GET /api/assets?client_id=:id` - List assets for client
- `POST /api/assets` - Upload new asset to Google Drive
- `GET /api/assets/:id` - Get asset details
- `DELETE /api/assets/:id` - Delete asset

### 5.7 Notion Integration

- `GET /api/notion/projects` - Get projects from Notion
- `POST /api/notion/sync-project/:id` - Sync project with Notion
- `GET /api/notion/calendar` - Get calendar data from Notion

### 5.8 Google Drive Integration

- `GET /api/drive/folders?client_id=:id` - List client folders
- `POST /api/drive/folders` - Create new folder
- `GET /api/drive/files?folder_id=:id` - List files in folder
- `GET /api/drive/file/:id` - Get file details and streaming URL

## 6. Integration Services

### 6.1 Notion Integration

```typescript
// lib/notion/client.ts
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getProjectsFromNotion(databaseId: string) {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'Last edited time', direction: 'descending' }],
  });
  
  return response.results.map(page => ({
    id: page.id,
    title: page.properties.Name?.title[0]?.plain_text || 'Untitled',
    status: page.properties.Status?.select?.name || 'No Status',
    dueDate: page.properties['Due Date']?.date?.start,
    assignedTo: page.properties['Assigned to']?.people?.map(person => ({
      id: person.id,
      name: person.name,
      email: person.person?.email,
    })),
  }));
}

export async function syncProjectWithNotion(projectId: string, notionPageId: string, updates: any) {
  const properties = {};
  
  if (updates.name) {
    properties['Name'] = {
      title: [{ text: { content: updates.name } }]
    };
  }
  
  if (updates.status) {
    properties['Status'] = {
      select: { name: updates.status }
    };
  }
  
  // Add more property mappings as needed
  
  return notion.pages.update({
    page_id: notionPageId,
    properties,
  });
}
```

### 6.2 Google Drive Integration

```typescript
// lib/drive/client.ts
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Create auth client
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

export async function createClientFolder(clientName: string, parentFolderId?: string) {
  const folderMetadata = {
    name: clientName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: parentFolderId ? [parentFolderId] : [],
  };
  
  const folder = await drive.files.create({
    requestBody: folderMetadata,
    fields: 'id, name, webViewLink',
  });
  
  return folder.data;
}

export async function uploadVideoToDrive(
  fileBuffer: Buffer, 
  filename: string, 
  folderId: string,
  contentType = 'video/mp4'
) {
  const fileMetadata = {
    name: filename,
    parents: [folderId],
  };
  
  const media = {
    mimeType: contentType,
    body: fileBuffer,
  };
  
  const file = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id, name, webViewLink, thumbnailLink',
  });
  
  // Set permissions - make viewable by anyone with the link
  await drive.permissions.create({
    fileId: file.data.id,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });
  
  return file.data;
}

export async function getFileStreamUrl(fileId: string) {
  // Get file metadata
  const file = await drive.files.get({
    fileId,
    fields: 'id, name, mimeType',
  });

  // Create a direct download URL
  const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  
  // Generate temporary access token
  const authClient = await auth.getRequestHeaders();
  const accessToken = authClient.Authorization.split(' ')[1];
  
  return {
    url: downloadUrl,
    accessToken,
    expiresIn: 3600, // Token expires in 1 hour
    filename: file.data.name,
    mimeType: file.data.mimeType,
  };
}
```

## 7. Video Processing Pipeline

### 7.1 Upload Flow

1. Editor uploads video file to `/api/videos/upload` with project_id
2. Backend generates a unique filename and uploads to Google Drive in client's folder
3. Backend gets stream URL and triggers video processing function
4. Video processing function:
   - Extracts metadata (duration, resolution)
   - Generates thumbnail
   - Creates optimized versions if needed
5. Backend updates database with video metadata, Google Drive file ID, and thumbnail URL
6. Returns success response with video details
7. Internal team notified of new video ready for review

### 7.2. Video Status Workflow

1. **Internal Review Flow:**
   - New videos default to `internal_review` status
   - Only internal team and editors can see and comment
   - Editor uploads new versions based on internal feedback
   - Internal team can mark video as ready for client

2. **Client Review Flow:**
   - Internal team changes status to `client_review`
   - Client is notified that a video is ready for review
   - Client can only see the latest approved version
   - Client can add comments (marked as client visibility)
   - Internal team reviews client comments

3. **Revision Flow:**
   - Editor creates new version based on client feedback
   - New version starts in `internal_review` status
   - Cycle repeats until video is approved

4. **Final Approval:**
   - Once client approves, video status changes to `approved`
   - Video is marked as complete in Notion
   - Final delivery to client

## 8. Authentication & Authorization

### 8.1 JWT Authentication

```typescript
// lib/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: any): string {
  return jwt.sign(
    { 
      sub: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET);
}

// Middleware to check authentication
export function withAuth(handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      
      // Add user info to request
      req.user = decoded;
      
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}

// Check if user has required role
export function hasRole(roles: string[]) {
  return (req: NextApiRequest, res: NextApiResponse, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    return next();
  };
}
```

### 8.2 Role-Based Access Control

```typescript
// lib/auth/permissions.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Define permission levels
const PERMISSIONS = {
  // Project permissions
  VIEW_ALL_PROJECTS: ['admin', 'internal'],
  VIEW_CLIENT_PROJECTS: ['admin', 'internal', 'editor', 'client'],
  CREATE_PROJECT: ['admin', 'internal'],
  
  // Video permissions
  UPLOAD_VIDEO: ['admin', 'internal', 'editor'],
  VIEW_INTERNAL_VIDEOS: ['admin', 'internal', 'editor'],
  VIEW_CLIENT_VIDEOS: ['admin', 'internal', 'editor', 'client'],
  
  // Comment permissions
  VIEW_ALL_COMMENTS: ['admin', 'internal', 'editor'],
  VIEW_CLIENT_COMMENTS: ['admin', 'internal', 'editor', 'client'],
  ADD_COMMENT: ['admin', 'internal', 'editor', 'client'],
  
  // Admin permissions
  MANAGE_USERS: ['admin'],
  MANAGE_CLIENTS: ['admin'],
};

// Check if user has permission
export function hasPermission(permission, user) {
  if (!user || !user.role) return false;
  return PERMISSIONS[permission].includes(user.role);
}

// Middleware to check permissions
export function requirePermission(permission) {
  return (req: NextApiRequest, res: NextApiResponse, next) => {
    if (!req.user || !hasPermission(permission, req.user)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    
    return next();
  };
}

// Additional middleware to check project access
export async function canAccessProject(req, res, next) {
  const { projectId } = req.query;
  const { user } = req;
  
  // Admins and internal team can access all projects
  if (user.role === 'admin' || user.role === 'internal') {
    return next();
  }
  
  // Get project from database
  const project = await db.project.findUnique({
    where: { id: projectId },
    include: { client: true },
  });
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  // Editors can access assigned projects
  if (user.role === 'editor') {
    const assignment = await db.projectAssignment.findFirst({
      where: { projectId, userId: user.id },
    });
    
    if (assignment) {
      return next();
    }
  }
  
  // Clients can only access their own projects
  if (user.role === 'client' && project.client.id === user.clientId) {
    return next();
  }
  
  return res.status(403).json({ error: 'You do not have access to this project' });
}
```

## 9. Implementation Timeline

### Phase 1: Development Environment Setup (1 week)
- Set up Docker development environment
- Create database schema
- Configure Google API connections
- Set up Notion API integration

### Phase 2: Core Portal Functionality (2 weeks)
- Implement user authentication and roles
- Create project management views
- Build Notion database sync
- Develop calendar view integration

### Phase 3: Video Review System (3 weeks)
- Implement Google Drive integration
- Build video player with commenting
- Create internal review workflow
- Develop client review interface
- Implement version control system

### Phase 4: Client Portal UI (2 weeks)
- Build responsive dashboard
- Create assets library
- Implement project views
- Develop user management interfaces

### Phase 5: Google Cloud Deployment (1 week)
- Set up Google Cloud infrastructure
- Configure CI/CD pipeline
- Deploy and test

### Phase 6: Testing & Optimization (1 week)
- Perform end-to-end testing
- Fix bugs and optimize performance
- Document API and system architecture
- User acceptance testing

### Phase 7: Launch & Maintenance (Ongoing)
- Launch to production
- Monitor and address issues
- Implement feature enhancements

## 10. Security Considerations

### 10.1 Data Protection
- All API endpoints secured with authentication
- Role-based access control
- HTTPS for all communications
- Secure storage of credentials using Secret Manager

### 10.2 Video Access Control
- Signed URLs for private videos
- Time-limited access tokens
- Permission checks on all video operations

### 10.3 API Rate Limiting
- Implement rate limiting to prevent abuse
- Monitor for unusual access patterns

## 11. Monitoring & Logging

### 11.1 Application Monitoring
- Set up Cloud Monitoring for API performance
- Configure alerts for errors and performance issues

### 11.2 Logging
- Structured logging for all operations
- Store logs in Cloud Logging
- Log retention policy

## 12. Scaling Considerations

### 12.1 Database Scaling
- Consider connection pooling for high traffic
- Implement query optimization
- Plan for database backups and failover

### 12.2 API Scaling
- Cloud Run auto-scaling based on load
- Optimize expensive operations

### 12.3 Storage Scaling
- Set up lifecycle policies for older videos
- Consider multi-region storage for critical assets

## 13. Future Enhancements

### 13.1 Advanced Features
- Real-time collaboration using WebSockets
- AI-based video analysis for automatic tagging
- Advanced video editing capabilities in-browser
- Automated subtitles and transcription
- Mobile app for on-the-go reviews

### 13.2 Integration Opportunities
- CRM integration
- Marketing automation connections
- Analytics dashboards
- Expanded Notion automation and workflows
- Integration with editing software (Adobe Premiere, Final Cut Pro) 