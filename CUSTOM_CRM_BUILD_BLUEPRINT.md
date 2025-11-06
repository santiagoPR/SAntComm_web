# Custom Construction CRM - Complete Build Blueprint
**From Research to Implementation**
**Date:** January 3, 2025
**Project:** SAntComm Construction CRM

---

## EXECUTIVE SUMMARY

This document provides a **complete technical blueprint** for building a custom CRM system tailored for construction companies, combining the best features analyzed from **Zoho CRM** and **HubSpot Smart CRM**.

**Project Goals:**
- ✅ Full CRM functionality (contacts, companies, deals, projects)
- ✅ Advanced marketing automation (email, social media, campaigns)
- ✅ Construction-specific features (bids, contracts, subcontractors)
- ✅ Robust analytics and metrics
- ✅ RESTful API for integrations
- ✅ Modern, responsive UI

**Estimated Timeline:** 6-9 months (MVP), 12-18 months (full platform)
**Team Size:** 5-8 developers (2 frontend, 2 backend, 1 DevOps, 1 QA, 1 UI/UX, 1 PM)

---

## TABLE OF CONTENTS

1. [Technology Stack](#technology-stack)
2. [System Architecture](#system-architecture)
3. [Database Schema](#database-schema)
4. [Backend API Design](#backend-api-design)
5. [Frontend Components](#frontend-components)
6. [Marketing Automation Engine](#marketing-automation-engine)
7. [Email System Architecture](#email-system-architecture)
8. [Authentication & Security](#authentication--security)
9. [Implementation Roadmap](#implementation-roadmap)
10. [Code Examples](#code-examples)

---

## TECHNOLOGY STACK

### Frontend Stack
```javascript
{
  "framework": "React 18.x",
  "stateManagement": "Redux Toolkit + RTK Query",
  "routing": "React Router v6",
  "uiLibrary": "Material-UI (MUI) v5 + Tailwind CSS",
  "formHandling": "React Hook Form + Yup validation",
  "dataVisualization": "Recharts + Chart.js",
  "richTextEditor": "TipTap or Quill",
  "dragAndDrop": "dnd-kit or react-beautiful-dnd",
  "dateHandling": "date-fns",
  "httpClient": "Axios",
  "buildTool": "Vite"
}
```

### Backend Stack
```javascript
{
  "runtime": "Node.js 20.x LTS",
  "framework": "Express.js 4.x",
  "database": "PostgreSQL 16.x (primary) + Redis (caching)",
  "orm": "Prisma ORM 5.x",
  "authentication": "JWT + Passport.js",
  "emailService": "SendGrid or AWS SES",
  "fileStorage": "AWS S3 or MinIO",
  "jobQueue": "Bull (Redis-based queue)",
  "websockets": "Socket.io",
  "validation": "Joi or Zod",
  "logging": "Winston + Morgan",
  "testing": "Jest + Supertest"
}
```

### DevOps & Infrastructure
```javascript
{
  "hosting": "AWS (EC2, RDS, S3, CloudFront)",
  "containerization": "Docker + Docker Compose",
  "orchestration": "Kubernetes (optional for scale)",
  "ci/cd": "GitHub Actions or GitLab CI",
  "monitoring": "Prometheus + Grafana",
  "errorTracking": "Sentry",
  "analytics": "Mixpanel or Amplitude"
}
```

### Why This Stack?

**React + Node.js:**
- Single language (JavaScript/TypeScript) across stack
- Massive ecosystem and community support
- Excellent performance for real-time applications
- Easy to find developers

**PostgreSQL:**
- ACID compliance for data integrity
- Advanced features (JSONB, full-text search, CTEs)
- Excellent for complex relationships (CRM data)
- Free and open-source

**Prisma ORM:**
- Type-safe database queries
- Auto-generated migrations
- Excellent developer experience
- Built-in connection pooling

---

## SYSTEM ARCHITECTURE

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT TIER (Browser)                       │
├─────────────────────────────────────────────────────────────────┤
│  React SPA                                                      │
│  ├─ Dashboard (Metrics, Analytics)                             │
│  ├─ CRM Modules (Contacts, Companies, Deals, Projects)         │
│  ├─ Marketing Hub (Campaigns, Email, Social)                   │
│  ├─ Settings & Admin                                           │
│  └─ Real-time Notifications (Socket.io)                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS/WSS
┌─────────────────────────────────────────────────────────────────┐
│                   APPLICATION TIER (API Server)                 │
├─────────────────────────────────────────────────────────────────┤
│  Node.js + Express.js REST API                                 │
│  ├─ Authentication Middleware (JWT)                            │
│  ├─ Rate Limiting & Security                                   │
│  ├─ Business Logic Layer                                       │
│  │   ├─ CRM Services (CRUD operations)                         │
│  │   ├─ Marketing Services (Campaigns, Email)                  │
│  │   ├─ Analytics Services (Reports, Dashboards)               │
│  │   └─ Workflow Engine (Automation)                           │
│  ├─ WebSocket Server (Real-time updates)                       │
│  └─ Background Job Processor (Bull Queue)                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   DATA TIER (Persistence)                       │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL Database (Primary Data Store)                      │
│  ├─ CRM Data (Contacts, Companies, Deals, etc.)                │
│  ├─ Marketing Data (Campaigns, Templates, Analytics)           │
│  └─ System Data (Users, Permissions, Settings)                 │
│                                                                 │
│  Redis Cache & Queue                                           │
│  ├─ Session Storage                                            │
│  ├─ Rate Limiting Counters                                     │
│  └─ Background Job Queue                                       │
│                                                                 │
│  AWS S3 / MinIO (File Storage)                                 │
│  ├─ Document Uploads (Contracts, Proposals)                    │
│  ├─ Email Attachments                                          │
│  └─ Profile Images                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                 EXTERNAL SERVICES (Integrations)                │
├─────────────────────────────────────────────────────────────────┤
│  - SendGrid / AWS SES (Email Delivery)                         │
│  - Twilio (SMS)                                                 │
│  - Stripe (Payments)                                            │
│  - Google Calendar / Outlook (Calendar Sync)                    │
│  - Social Media APIs (LinkedIn, Facebook, Twitter)             │
│  - Accounting Software (QuickBooks, Xero)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## DATABASE SCHEMA

### Core Entities & Relationships

**Entity Relationship Diagram:**
```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   USERS      │       │  COMPANIES   │       │  CONTACTS    │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ email        │       │ name         │       │ firstName    │
│ password     │       │ industry     │       │ lastName     │
│ role         │       │ website      │       │ email        │
│ firstName    │       │ phone        │       │ phone        │
│ lastName     │       │ address      │       │ companyId FK │
│ createdAt    │       │ ownerId FK   │       │ ownerId FK   │
│ updatedAt    │       │ createdAt    │       │ position     │
└──────────────┘       │ updatedAt    │       │ createdAt    │
                       └──────────────┘       │ updatedAt    │
                                              └──────────────┘
                                                      ↓
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   DEALS      │       │   PROJECTS   │       │    BIDS      │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ title        │       │ name         │       │ rfpName      │
│ value        │       │ dealId FK    │       │ dealId FK    │
│ stageId FK   │       │ companyId FK │       │ bidAmount    │
│ pipelineId FK│       │ startDate    │       │ submittedAt  │
│ companyId FK │       │ endDate      │       │ status       │
│ contactId FK │       │ budget       │       │ competitors  │
│ probability  │       │ status       │       │ winLoss      │
│ closeDate    │       │ managerId FK │       │ createdAt    │
│ createdAt    │       │ createdAt    │       │ updatedAt    │
│ updatedAt    │       │ updatedAt    │       └──────────────┘
└──────────────┘       └──────────────┘

┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  PIPELINES   │       │    STAGES    │       │  ACTIVITIES  │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ name         │       │ name         │       │ type         │
│ description  │       │ pipelineId FK│       │ subject      │
│ isDefault    │       │ order        │       │ description  │
│ createdAt    │       │ probability  │       │ dealId FK    │
└──────────────┘       │ createdAt    │       │ contactId FK │
                       └──────────────┘       │ userId FK    │
                                              │ dueDate      │
                                              │ completed    │
                                              │ createdAt    │
                                              └──────────────┘

┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  CAMPAIGNS   │       │    EMAILS    │       │EMAIL_TEMPLATES│
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ name         │       │ subject      │       │ name         │
│ type         │       │ body (HTML)  │       │ subject      │
│ status       │       │ campaignId FK│       │ htmlContent  │
│ startDate    │       │ recipientId  │       │ category     │
│ endDate      │       │ sentAt       │       │ isActive     │
│ createdBy FK │       │ openedAt     │       │ createdAt    │
│ createdAt    │       │ clickedAt    │       └──────────────┘
│ updatedAt    │       │ bounced      │
└──────────────┘       │ status       │
                       │ createdAt    │
                       └──────────────┘

┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ SUBCONTRACTORS│      │  CONTRACTS   │       │   DOCUMENTS  │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ name         │       │ dealId FK    │       │ name         │
│ specialty    │       │ projectId FK │       │ fileUrl      │
│ licenseNo    │       │ type         │       │ fileSize     │
│ insurance    │       │ value        │       │ fileType     │
│ rating       │       │ signedDate   │       │ dealId FK    │
│ available    │       │ startDate    │       │ projectId FK │
│ createdAt    │       │ endDate      │       │ uploadedBy FK│
│ updatedAt    │       │ status       │       │ createdAt    │
└──────────────┘       │ pdfUrl       │       └──────────────┘
                       │ createdAt    │
                       └──────────────┘
```

---

### Complete Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// CORE CRM MODELS
// ============================================

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String   // Hashed with bcrypt
  firstName     String
  lastName      String
  role          Role     @default(USER)
  avatar        String?
  phone         String?
  timezone      String   @default("America/New_York")
  isActive      Boolean  @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relationships
  ownedCompanies Company[]   @relation("CompanyOwner")
  ownedContacts  Contact[]   @relation("ContactOwner")
  ownedDeals     Deal[]      @relation("DealOwner")
  activities     Activity[]
  campaigns      Campaign[]  @relation("CampaignCreator")
  projects       Project[]   @relation("ProjectManager")

  @@map("users")
}

enum Role {
  ADMIN
  MANAGER
  SALES_REP
  MARKETING
  USER
}

model Company {
  id              String   @id @default(uuid())
  name            String
  industry        String?
  website         String?
  phone           String?
  email           String?

  // Address
  street          String?
  city            String?
  state           String?
  zipCode         String?
  country         String   @default("USA")

  // Metadata
  companySize     String?  // "1-10", "11-50", "51-200", etc.
  annualRevenue   Decimal?
  description     String?  @db.Text
  logo            String?

  // Ownership
  ownerId         String
  owner           User     @relation("CompanyOwner", fields: [ownerId], references: [id])

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  contacts        Contact[]
  deals           Deal[]
  projects        Project[]

  @@index([ownerId])
  @@map("companies")
}

model Contact {
  id              String   @id @default(uuid())
  firstName       String
  lastName        String
  email           String?
  phone           String?
  mobile          String?

  // Professional Info
  position        String?
  department      String?
  linkedin        String?

  // Company Association
  companyId       String?
  company         Company? @relation(fields: [companyId], references: [id])

  // Ownership
  ownerId         String
  owner           User     @relation("ContactOwner", fields: [ownerId], references: [id])

  // Lead Source
  leadSource      String?  // "Website", "Referral", "Trade Show", etc.
  leadScore       Int      @default(0)

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  deals           Deal[]
  activities      Activity[]
  emailRecipients EmailRecipient[]

  @@index([companyId])
  @@index([ownerId])
  @@map("contacts")
}

model Pipeline {
  id              String   @id @default(uuid())
  name            String
  description     String?  @db.Text
  isDefault       Boolean  @default(false)
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  stages          Stage[]
  deals           Deal[]

  @@map("pipelines")
}

model Stage {
  id              String   @id @default(uuid())
  name            String
  pipelineId      String
  pipeline        Pipeline @relation(fields: [pipelineId], references: [id], onDelete: Cascade)
  order           Int
  probability     Int      @default(50) // Win probability 0-100
  color           String?  // Hex color for UI
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  deals           Deal[]

  @@index([pipelineId])
  @@map("stages")
}

model Deal {
  id              String   @id @default(uuid())
  title           String
  description     String?  @db.Text
  value           Decimal  @default(0)
  currency        String   @default("USD")

  // Pipeline & Stage
  pipelineId      String
  pipeline        Pipeline @relation(fields: [pipelineId], references: [id])
  stageId         String
  stage           Stage    @relation(fields: [stageId], references: [id])

  // Associations
  companyId       String?
  company         Company? @relation(fields: [companyId], references: [id])
  contactId       String?
  contact         Contact? @relation(fields: [contactId], references: [id])

  // Ownership
  ownerId         String
  owner           User     @relation("DealOwner", fields: [ownerId], references: [id])

  // Forecasting
  expectedCloseDate DateTime?
  probability     Int      @default(50)

  // Outcome
  status          DealStatus @default(OPEN)
  wonDate         DateTime?
  lostDate        DateTime?
  lostReason      String?

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  activities      Activity[]
  project         Project?
  bids            Bid[]
  contracts       Contract[]
  documents       Document[]

  @@index([pipelineId])
  @@index([stageId])
  @@index([companyId])
  @@index([contactId])
  @@index([ownerId])
  @@map("deals")
}

enum DealStatus {
  OPEN
  WON
  LOST
  ABANDONED
}

// ============================================
// CONSTRUCTION-SPECIFIC MODELS
// ============================================

model Project {
  id              String   @id @default(uuid())
  name            String
  description     String?  @db.Text

  // Deal Association (created from won deal)
  dealId          String?  @unique
  deal            Deal?    @relation(fields: [dealId], references: [id])

  // Company Association
  companyId       String
  company         Company  @relation(fields: [companyId], references: [id])

  // Project Details
  projectType     String?  // "Residential", "Commercial", "Infrastructure"
  location        String?
  squareFootage   Int?
  budget          Decimal?

  // Timeline
  startDate       DateTime?
  endDate         DateTime?
  estimatedDuration Int?   // Days

  // Status
  status          ProjectStatus @default(PLANNING)
  progress        Int      @default(0) // Percentage 0-100

  // Project Manager
  managerId       String
  manager         User     @relation("ProjectManager", fields: [managerId], references: [id])

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  milestones      Milestone[]
  contracts       Contract[]
  documents       Document[]
  subcontractorAssignments SubcontractorAssignment[]

  @@index([dealId])
  @@index([companyId])
  @@index([managerId])
  @@map("projects")
}

enum ProjectStatus {
  PLANNING
  IN_PROGRESS
  ON_HOLD
  COMPLETED
  CANCELLED
}

model Milestone {
  id              String   @id @default(uuid())
  projectId       String
  project         Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  name            String
  description     String?  @db.Text
  dueDate         DateTime?
  completedDate   DateTime?
  status          MilestoneStatus @default(PENDING)
  order           Int      @default(0)

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([projectId])
  @@map("milestones")
}

enum MilestoneStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  DELAYED
}

model Bid {
  id              String   @id @default(uuid())

  // Deal Association
  dealId          String?
  deal            Deal?    @relation(fields: [dealId], references: [id])

  // Bid Details
  rfpName         String
  rfpNumber       String?
  clientName      String
  bidAmount       Decimal

  // Costs Breakdown
  laborCost       Decimal  @default(0)
  materialCost    Decimal  @default(0)
  equipmentCost   Decimal  @default(0)
  marginPercent   Decimal  @default(15)

  // Timeline
  submittedAt     DateTime?
  dueDate         DateTime?

  // Competition
  competitors     String[] // Array of competitor names
  estimatedCompetition Int  @default(3)

  // Outcome
  status          BidStatus @default(PREPARING)
  wonDate         DateTime?
  lostDate        DateTime?
  lostReason      String?  @db.Text

  // Lessons Learned
  notes           String?  @db.Text

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([dealId])
  @@map("bids")
}

enum BidStatus {
  PREPARING
  SUBMITTED
  UNDER_REVIEW
  WON
  LOST
  WITHDRAWN
}

model Subcontractor {
  id              String   @id @default(uuid())
  name            String
  companyName     String?
  email           String?
  phone           String?

  // Specialization
  specialty       String   // "Electrical", "Plumbing", "HVAC", etc.
  subSpecialties  String[] // Additional specialties

  // Credentials
  licenseNumber   String?
  insuranceCoverage Decimal?
  bondingCapacity Decimal?
  certifications  String[] // Safety certs, trade certs

  // Performance Metrics
  rating          Decimal  @default(5.0)
  projectsCompleted Int    @default(0)
  onTimeRate      Decimal  @default(100)
  qualityScore    Decimal  @default(5.0)

  // Availability
  isAvailable     Boolean  @default(true)
  currentCapacity Int      @default(100) // Percentage of available capacity

  // Address
  city            String?
  state           String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  projectAssignments SubcontractorAssignment[]

  @@map("subcontractors")
}

model SubcontractorAssignment {
  id              String   @id @default(uuid())

  projectId       String
  project         Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  subcontractorId String
  subcontractor   Subcontractor @relation(fields: [subcontractorId], references: [id])

  // Assignment Details
  scope           String   @db.Text
  contractValue   Decimal
  startDate       DateTime?
  endDate         DateTime?
  status          AssignmentStatus @default(ASSIGNED)

  // Performance
  rating          Decimal?
  feedback        String?  @db.Text

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([projectId])
  @@index([subcontractorId])
  @@map("subcontractor_assignments")
}

enum AssignmentStatus {
  ASSIGNED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

model Contract {
  id              String   @id @default(uuid())

  // Associations
  dealId          String?
  deal            Deal?    @relation(fields: [dealId], references: [id])
  projectId       String?
  project         Project? @relation(fields: [projectId], references: [id])

  // Contract Details
  title           String
  contractType    ContractType @default(FIXED_PRICE)
  value           Decimal

  // Timeline
  startDate       DateTime?
  endDate         DateTime?
  signedDate      DateTime?

  // Status
  status          ContractStatus @default(DRAFT)

  // Documents
  pdfUrl          String?
  signedPdfUrl    String?

  // Payment Terms
  paymentTerms    String?  @db.Text
  milestonePayments Boolean @default(false)

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([dealId])
  @@index([projectId])
  @@map("contracts")
}

enum ContractType {
  FIXED_PRICE
  COST_PLUS
  TIME_AND_MATERIALS
  UNIT_PRICE
}

enum ContractStatus {
  DRAFT
  PENDING_SIGNATURE
  SIGNED
  ACTIVE
  COMPLETED
  TERMINATED
}

model Document {
  id              String   @id @default(uuid())
  name            String
  description     String?  @db.Text

  // File Details
  fileUrl         String
  fileSize        Int      // Bytes
  fileType        String   // MIME type

  // Associations
  dealId          String?
  deal            Deal?    @relation(fields: [dealId], references: [id])
  projectId       String?
  project         Project? @relation(fields: [projectId], references: [id])

  // Metadata
  category        String?  // "Proposal", "Contract", "Permit", "Invoice"
  uploadedById    String
  uploadedBy      User     @relation(fields: [uploadedById], references: [id])

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([dealId])
  @@index([projectId])
  @@map("documents")
}

model Activity {
  id              String   @id @default(uuid())
  type            ActivityType
  subject         String
  description     String?  @db.Text

  // Associations
  dealId          String?
  deal            Deal?    @relation(fields: [dealId], references: [id])
  contactId       String?
  contact         Contact? @relation(fields: [contactId], references: [id])

  // Assignment
  userId          String
  user            User     @relation(fields: [userId], references: [id])

  // Scheduling
  dueDate         DateTime?
  startTime       DateTime?
  endTime         DateTime?

  // Status
  completed       Boolean  @default(false)
  completedAt     DateTime?

  // Reminders
  reminderTime    DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([dealId])
  @@index([contactId])
  @@index([userId])
  @@map("activities")
}

enum ActivityType {
  TASK
  CALL
  MEETING
  EMAIL
  SITE_VISIT
  FOLLOW_UP
}

// ============================================
// MARKETING AUTOMATION MODELS
// ============================================

model Campaign {
  id              String   @id @default(uuid())
  name            String
  description     String?  @db.Text
  type            CampaignType @default(EMAIL)

  // Status & Scheduling
  status          CampaignStatus @default(DRAFT)
  scheduledAt     DateTime?
  sentAt          DateTime?

  // Targeting
  targetList      String[] // Array of contact IDs or segment criteria

  // Content
  subject         String?
  fromName        String?
  fromEmail       String?
  replyTo         String?

  // Tracking
  totalRecipients Int      @default(0)
  sent            Int      @default(0)
  delivered       Int      @default(0)
  opened          Int      @default(0)
  clicked         Int      @default(0)
  bounced         Int      @default(0)
  unsubscribed    Int      @default(0)

  // Creator
  createdById     String
  createdBy       User     @relation("CampaignCreator", fields: [createdById], references: [id])

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  emails          Email[]

  @@index([createdById])
  @@map("campaigns")
}

enum CampaignType {
  EMAIL
  SMS
  SOCIAL
  MULTI_CHANNEL
}

enum CampaignStatus {
  DRAFT
  SCHEDULED
  SENDING
  SENT
  PAUSED
  CANCELLED
}

model EmailTemplate {
  id              String   @id @default(uuid())
  name            String
  subject         String
  htmlContent     String   @db.Text
  textContent     String?  @db.Text

  // Categorization
  category        String?  // "Proposal", "Follow-Up", "Newsletter"
  tags            String[]

  // Metadata
  isActive        Boolean  @default(true)
  isDefault       Boolean  @default(false)
  usageCount      Int      @default(0)

  // Variables (for personalization)
  variables       Json?    // {firstName}, {companyName}, etc.

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("email_templates")
}

model Email {
  id              String   @id @default(uuid())

  // Campaign Association
  campaignId      String?
  campaign        Campaign? @relation(fields: [campaignId], references: [id])

  // Email Content
  subject         String
  htmlBody        String   @db.Text
  textBody        String?  @db.Text
  fromEmail       String
  fromName        String?
  replyTo         String?

  // Sending
  status          EmailStatus @default(PENDING)
  sentAt          DateTime?
  scheduledFor    DateTime?

  // External Service IDs
  sendgridId      String?  // SendGrid message ID

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relationships
  recipients      EmailRecipient[]

  @@index([campaignId])
  @@map("emails")
}

enum EmailStatus {
  PENDING
  QUEUED
  SENT
  DELIVERED
  FAILED
  BOUNCED
}

model EmailRecipient {
  id              String   @id @default(uuid())

  emailId         String
  email           Email    @relation(fields: [emailId], references: [id], onDelete: Cascade)

  contactId       String?
  contact         Contact? @relation(fields: [contactId], references: [id])

  // Recipient Details
  emailAddress    String

  // Tracking
  opened          Boolean  @default(false)
  openedAt        DateTime?
  clicked         Boolean  @default(false)
  clickedAt       DateTime?
  bounced         Boolean  @default(false)
  bouncedReason   String?
  unsubscribed    Boolean  @default(false)
  unsubscribedAt  DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([emailId])
  @@index([contactId])
  @@map("email_recipients")
}

model WorkflowAutomation {
  id              String   @id @default(uuid())
  name            String
  description     String?  @db.Text

  // Trigger
  triggerType     TriggerType
  triggerConfig   Json     // Trigger-specific configuration

  // Conditions
  conditions      Json?    // Array of conditions to check

  // Actions
  actions         Json     // Array of actions to perform

  // Status
  isActive        Boolean  @default(true)

  // Stats
  executionCount  Int      @default(0)
  lastExecutedAt  DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("workflow_automations")
}

enum TriggerType {
  DEAL_STAGE_CHANGE
  DEAL_WON
  DEAL_LOST
  CONTACT_CREATED
  COMPANY_CREATED
  EMAIL_OPENED
  EMAIL_CLICKED
  FORM_SUBMITTED
  SCHEDULED_TIME
}

// ============================================
// ANALYTICS & REPORTING
// ============================================

model Report {
  id              String   @id @default(uuid())
  name            String
  description     String?  @db.Text
  type            String   // "Sales", "Marketing", "Pipeline"

  // Configuration
  config          Json     // Report filters, groupings, metrics

  // Schedule
  isScheduled     Boolean  @default(false)
  scheduleConfig  Json?    // Cron expression, recipients

  // Access
  isPublic        Boolean  @default(false)
  createdById     String

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("reports")
}

model ActivityLog {
  id              String   @id @default(uuid())
  userId          String
  action          String   // "created", "updated", "deleted"
  entityType      String   // "deal", "contact", "company"
  entityId        String
  changes         Json?    // Before/after values
  ipAddress       String?
  userAgent       String?
  createdAt       DateTime @default(now())

  @@index([userId])
  @@index([entityType, entityId])
  @@map("activity_logs")
}
```

---

## BACKEND API DESIGN

### RESTful API Structure

**Base URL:** `https://api.santcomcrm.com/v1`

### Authentication Endpoints

```javascript
// POST /auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}

// POST /auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
// Response: { "token": "jwt_token_here", "user": {...} }

// POST /auth/logout
// Authorization: Bearer {token}

// POST /auth/forgot-password
{
  "email": "user@example.com"
}

// POST /auth/reset-password
{
  "token": "reset_token",
  "newPassword": "NewSecurePass123!"
}
```

### CRM Module Endpoints

**Contacts:**
```javascript
// GET /contacts
// Query params: ?page=1&limit=20&search=john&companyId=abc

// GET /contacts/:id

// POST /contacts
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "companyId": "company-uuid",
  "position": "CEO",
  "leadSource": "Website"
}

// PATCH /contacts/:id
{
  "phone": "+0987654321",
  "leadScore": 75
}

// DELETE /contacts/:id
```

**Companies:**
```javascript
// GET /companies?page=1&limit=20&industry=Construction

// GET /companies/:id

// POST /companies
{
  "name": "ABC Construction",
  "industry": "Construction",
  "website": "https://abcconstruction.com",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94105"
  }
}

// PATCH /companies/:id

// DELETE /companies/:id
```

**Deals:**
```javascript
// GET /deals?stageId=abc&ownerId=xyz

// GET /deals/:id

// POST /deals
{
  "title": "Office Building Project",
  "value": 500000,
  "pipelineId": "default-pipeline",
  "stageId": "qualified-stage",
  "companyId": "company-uuid",
  "contactId": "contact-uuid",
  "expectedCloseDate": "2025-06-30",
  "probability": 75
}

// PATCH /deals/:id
{
  "stageId": "proposal-sent",
  "probability": 80
}

// POST /deals/:id/move-stage
{
  "stageId": "new-stage-uuid"
}

// DELETE /deals/:id
```

**Pipelines & Stages:**
```javascript
// GET /pipelines

// POST /pipelines
{
  "name": "Construction Sales Pipeline",
  "stages": [
    { "name": "Lead", "order": 1, "probability": 10 },
    { "name": "Qualified", "order": 2, "probability": 25 },
    { "name": "Proposal Sent", "order": 3, "probability": 50 },
    { "name": "Negotiation", "order": 4, "probability": 75 },
    { "name": "Closed Won", "order": 5, "probability": 100 }
  ]
}
```

**Projects:**
```javascript
// GET /projects?status=IN_PROGRESS

// GET /projects/:id

// POST /projects
{
  "name": "Downtown Office Tower",
  "dealId": "deal-uuid",
  "companyId": "company-uuid",
  "projectType": "Commercial",
  "location": "San Francisco, CA",
  "budget": 5000000,
  "startDate": "2025-03-01",
  "endDate": "2026-06-30",
  "managerId": "user-uuid"
}

// POST /projects/:id/milestones
{
  "name": "Foundation Complete",
  "dueDate": "2025-05-15",
  "order": 1
}
```

**Bids:**
```javascript
// GET /bids?status=SUBMITTED

// POST /bids
{
  "dealId": "deal-uuid",
  "rfpName": "City Hall Renovation",
  "bidAmount": 750000,
  "laborCost": 400000,
  "materialCost": 250000,
  "equipmentCost": 50000,
  "marginPercent": 15,
  "dueDate": "2025-02-15",
  "competitors": ["Competitor A", "Competitor B"]
}

// PATCH /bids/:id/submit

// PATCH /bids/:id/mark-won
```

**Subcontractors:**
```javascript
// GET /subcontractors?specialty=Electrical&available=true

// POST /subcontractors
{
  "name": "John Smith",
  "companyName": "Smith Electric",
  "specialty": "Electrical",
  "licenseNumber": "E12345",
  "phone": "+1234567890"
}

// POST /projects/:projectId/assign-subcontractor
{
  "subcontractorId": "sub-uuid",
  "scope": "All electrical work including wiring and panel installation",
  "contractValue": 75000,
  "startDate": "2025-04-01"
}
```

### Marketing Automation Endpoints

**Campaigns:**
```javascript
// GET /campaigns?status=SENT

// POST /campaigns
{
  "name": "Q1 2025 Newsletter",
  "type": "EMAIL",
  "subject": "Construction Industry Trends for 2025",
  "targetList": ["contact-uuid-1", "contact-uuid-2"],
  "scheduledAt": "2025-01-15T09:00:00Z"
}

// POST /campaigns/:id/send

// GET /campaigns/:id/analytics
```

**Email Templates:**
```javascript
// GET /email-templates?category=Proposal

// POST /email-templates
{
  "name": "Proposal Follow-Up",
  "subject": "Following Up on {companyName} Proposal",
  "htmlContent": "<html>...</html>",
  "category": "Follow-Up",
  "variables": ["firstName", "companyName", "proposalLink"]
}
```

**Workflow Automations:**
```javascript
// POST /workflow-automations
{
  "name": "New Deal Auto-Assignment",
  "triggerType": "DEAL_CREATED",
  "triggerConfig": {
    "pipelineId": "default-pipeline"
  },
  "actions": [
    {
      "type": "ASSIGN_OWNER",
      "config": { "strategy": "ROUND_ROBIN" }
    },
    {
      "type": "SEND_EMAIL",
      "config": {
        "templateId": "welcome-email",
        "to": "${deal.contact.email}"
      }
    },
    {
      "type": "CREATE_TASK",
      "config": {
        "subject": "Qualify new deal: ${deal.title}",
        "dueDate": "+2 days"
      }
    }
  ],
  "isActive": true
}
```

### Analytics Endpoints

```javascript
// GET /analytics/dashboard
// Response: {
//   totalDeals: 150,
//   dealValue: 5000000,
//   wonDeals: 45,
//   averageDealSize: 115000,
//   pipelineVelocity: 30 // days
// }

// GET /analytics/sales-funnel
// Response: [
//   { stage: "Lead", count: 50, value: 1000000 },
//   { stage: "Qualified", count: 30, value: 800000 },
//   ...
// ]

// GET /analytics/email-performance?campaignId=abc
// Response: {
//   sent: 1000,
//   delivered: 980,
//   opened: 350,
//   clicked: 75,
//   openRate: 35.7,
//   clickRate: 7.7
// }
```

---

## FRONTEND COMPONENTS

### Component Architecture

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Table.jsx
│   │   ├── Pagination.jsx
│   │   └── Card.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── DashboardLayout.jsx
│   ├── crm/
│   │   ├── contacts/
│   │   │   ├── ContactList.jsx
│   │   │   ├── ContactDetail.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactCard.jsx
│   │   ├── companies/
│   │   │   ├── CompanyList.jsx
│   │   │   ├── CompanyDetail.jsx
│   │   │   └── CompanyForm.jsx
│   │   ├── deals/
│   │   │   ├── DealList.jsx
│   │   │   ├── DealDetail.jsx
│   │   │   ├── DealForm.jsx
│   │   │   ├── DealKanban.jsx
│   │   │   └── DealCard.jsx
│   │   └── projects/
│   │       ├── ProjectList.jsx
│   │       ├── ProjectDetail.jsx
│   │       ├── ProjectGantt.jsx
│   │       └── MilestoneTimeline.jsx
│   ├── marketing/
│   │   ├── campaigns/
│   │   │   ├── CampaignList.jsx
│   │   │   ├── CampaignBuilder.jsx
│   │   │   └── CampaignAnalytics.jsx
│   │   ├── email/
│   │   │   ├── EmailEditor.jsx (Rich text editor)
│   │   │   ├── EmailTemplates.jsx
│   │   │   └── EmailPreview.jsx
│   │   └── automation/
│   │       ├── WorkflowBuilder.jsx (Visual workflow designer)
│   │       └── WorkflowList.jsx
│   ├── analytics/
│   │   ├── Dashboard.jsx
│   │   ├── SalesFunnel.jsx
│   │   ├── EmailMetrics.jsx
│   │   └── CustomReports.jsx
│   └── settings/
│       ├── UserSettings.jsx
│       ├── TeamSettings.jsx
│       ├── Integrations.jsx
│       └── BillingSettings.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── ContactsPage.jsx
│   ├── DealsPage.jsx
│   ├── ProjectsPage.jsx
│   ├── CampaignsPage.jsx
│   └── SettingsPage.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useContacts.js
│   ├── useDeals.js
│   ├── useCampaigns.js
│   └── useWebSocket.js
├── store/
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── contactsSlice.js
│   │   ├── dealsSlice.js
│   │   └── campaignsSlice.js
│   └── store.js (Redux store configuration)
├── services/
│   ├── api.js (Axios instance)
│   ├── authService.js
│   ├── crmService.js
│   └── marketingService.js
├── utils/
│   ├── formatters.js
│   ├── validators.js
│   └── constants.js
└── App.jsx
```

### Key Component Examples

**Deal Kanban Board:**
```jsx
// components/crm/deals/DealKanban.jsx
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDeals } from '../../../hooks/useDeals';

const DealKanban = ({ pipelineId }) => {
  const { stages, deals, moveDeal } = useDeals(pipelineId);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    moveDeal(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {stages.map(stage => (
          <Droppable key={stage.id} droppableId={stage.id}>
            {(provided) => (
              <div
                className="kanban-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{stage.name}</h3>
                <div className="deals-count">{stage.dealsCount} deals</div>

                {deals
                  .filter(deal => deal.stageId === stage.id)
                  .map((deal, index) => (
                    <Draggable key={deal.id} draggableId={deal.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="deal-card"
                        >
                          <h4>{deal.title}</h4>
                          <p className="value">${deal.value.toLocaleString()}</p>
                          <p className="company">{deal.company.name}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DealKanban;
```

**Email Campaign Builder:**
```jsx
// components/marketing/campaigns/CampaignBuilder.jsx
import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCampaigns } from '../../../hooks/useCampaigns';

const CampaignBuilder = () => {
  const [campaign, setCampaign] = useState({
    name: '',
    subject: '',
    targetList: [],
    scheduledAt: null
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your email...</p>',
  });

  const { createCampaign } = useCampaigns();

  const handleSave = async () => {
    const htmlContent = editor.getHTML();
    await createCampaign({
      ...campaign,
      htmlContent
    });
  };

  return (
    <div className="campaign-builder">
      <div className="campaign-settings">
        <input
          placeholder="Campaign Name"
          value={campaign.name}
          onChange={(e) => setCampaign({...campaign, name: e.target.value})}
        />
        <input
          placeholder="Email Subject"
          value={campaign.subject}
          onChange={(e) => setCampaign({...campaign, subject: e.target.value})}
        />
        {/* Target audience selector, schedule picker, etc. */}
      </div>

      <div className="email-editor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <button onClick={handleSave}>Save Campaign</button>
      <button onClick={() => sendCampaign(campaign.id)}>Send Now</button>
    </div>
  );
};
```

---

## MARKETING AUTOMATION ENGINE

### Workflow Automation System

**Workflow Execution Engine:**
```javascript
// services/automation/workflowEngine.js
class WorkflowEngine {
  async executeTrigger(triggerType, data) {
    // Find all active workflows matching trigger
    const workflows = await prisma.workflowAutomation.findMany({
      where: {
        triggerType,
        isActive: true
      }
    });

    for (const workflow of workflows) {
      await this.executeWorkflow(workflow, data);
    }
  }

  async executeWorkflow(workflow, triggerData) {
    try {
      // Check conditions
      if (!this.checkConditions(workflow.conditions, triggerData)) {
        return;
      }

      // Execute actions sequentially
      for (const action of workflow.actions) {
        await this.executeAction(action, triggerData);
      }

      // Update workflow stats
      await prisma.workflowAutomation.update({
        where: { id: workflow.id },
        data: {
          executionCount: { increment: 1 },
          lastExecutedAt: new Date()
        }
      });
    } catch (error) {
      console.error(`Workflow ${workflow.id} failed:`, error);
    }
  }

  checkConditions(conditions, data) {
    if (!conditions || conditions.length === 0) return true;

    return conditions.every(condition => {
      const { field, operator, value } = condition;
      const actualValue = this.getFieldValue(data, field);

      switch (operator) {
        case 'equals':
          return actualValue === value;
        case 'not_equals':
          return actualValue !== value;
        case 'greater_than':
          return actualValue > value;
        case 'less_than':
          return actualValue < value;
        case 'contains':
          return actualValue.includes(value);
        default:
          return false;
      }
    });
  }

  async executeAction(action, data) {
    const { type, config } = action;

    switch (type) {
      case 'SEND_EMAIL':
        await this.sendEmail(config, data);
        break;
      case 'CREATE_TASK':
        await this.createTask(config, data);
        break;
      case 'UPDATE_FIELD':
        await this.updateField(config, data);
        break;
      case 'ASSIGN_OWNER':
        await this.assignOwner(config, data);
        break;
      case 'ADD_TO_CAMPAIGN':
        await this.addToCampaign(config, data);
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  }

  async sendEmail(config, data) {
    const { templateId, to } = config;
    const template = await prisma.emailTemplate.findUnique({
      where: { id: templateId }
    });

    const recipient = this.resolveVariable(to, data);
    const subject = this.interpolateTemplate(template.subject, data);
    const body = this.interpolateTemplate(template.htmlContent, data);

    await emailService.send({
      to: recipient,
      subject,
      html: body
    });
  }

  async createTask(config, data) {
    const { subject, dueDate, assigneeId } = config;

    const dueDateValue = this.resolveDueDate(dueDate, data);
    const assignee = this.resolveVariable(assigneeId, data);

    await prisma.activity.create({
      data: {
        type: 'TASK',
        subject: this.interpolateTemplate(subject, data),
        dueDate: dueDateValue,
        userId: assignee,
        dealId: data.deal?.id,
        contactId: data.contact?.id
      }
    });
  }

  interpolateTemplate(template, data) {
    return template.replace(/\$\{([\w.]+)\}/g, (match, path) => {
      return this.getFieldValue(data, path) || match;
    });
  }

  getFieldValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  resolveDueDate(dateString, data) {
    if (dateString.startsWith('+')) {
      const days = parseInt(dateString.substring(1));
      const date = new Date();
      date.setDate(date.getDate() + days);
      return date;
    }
    return new Date(dateString);
  }
}

module.exports = new WorkflowEngine();
```

---

## EMAIL SYSTEM ARCHITECTURE

### Email Service with SendGrid

```javascript
// services/email/emailService.js
const sgMail = require('@sendgrid/mail');
const { PrismaClient } = require('@prisma/client');
const Bull = require('bull');

const prisma = new PrismaClient();
const emailQueue = new Bull('email-queue', process.env.REDIS_URL);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  async sendCampaign(campaignId) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        createdBy: true
      }
    });

    if (!campaign) throw new Error('Campaign not found');

    // Get recipients
    const contacts = await this.getRecipients(campaign.targetList);

    // Create email records
    const emailPromises = contacts.map(contact =>
      this.queueEmail(campaign, contact)
    );

    await Promise.all(emailPromises);

    // Update campaign stats
    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: 'SENDING',
        totalRecipients: contacts.length,
        sentAt: new Date()
      }
    });
  }

  async queueEmail(campaign, contact) {
    // Create email record
    const email = await prisma.email.create({
      data: {
        campaignId: campaign.id,
        subject: campaign.subject,
        htmlBody: this.personalizeContent(campaign.htmlContent, contact),
        fromEmail: campaign.fromEmail,
        fromName: campaign.fromName,
        status: 'QUEUED'
      }
    });

    // Create recipient record
    const recipient = await prisma.emailRecipient.create({
      data: {
        emailId: email.id,
        contactId: contact.id,
        emailAddress: contact.email
      }
    });

    // Add to queue
    await emailQueue.add({
      emailId: email.id,
      recipientId: recipient.id
    });
  }

  personalizeContent(content, contact) {
    return content
      .replace(/\{firstName\}/g, contact.firstName)
      .replace(/\{lastName\}/g, contact.lastName)
      .replace(/\{companyName\}/g, contact.company?.name || '')
      .replace(/\{email\}/g, contact.email);
  }

  async getRecipients(targetList) {
    return await prisma.contact.findMany({
      where: {
        id: { in: targetList }
      },
      include: {
        company: true
      }
    });
  }
}

// Email Queue Processor
emailQueue.process(async (job) => {
  const { emailId, recipientId } = job.data;

  const email = await prisma.email.findUnique({
    where: { id: emailId }
  });

  const recipient = await prisma.emailRecipient.findUnique({
    where: { id: recipientId }
  });

  try {
    // Add tracking pixel and unsubscribe link
    const htmlWithTracking = `
      ${email.htmlBody}
      <img src="${process.env.APP_URL}/track/open/${recipientId}" width="1" height="1" />
      <p><a href="${process.env.APP_URL}/unsubscribe/${recipientId}">Unsubscribe</a></p>
    `;

    // Send via SendGrid
    const msg = {
      to: recipient.emailAddress,
      from: email.fromEmail,
      subject: email.subject,
      html: htmlWithTracking,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      },
      customArgs: {
        recipientId: recipient.id
      }
    };

    await sgMail.send(msg);

    // Update email status
    await prisma.email.update({
      where: { id: emailId },
      data: {
        status: 'SENT',
        sentAt: new Date()
      }
    });

    // Update campaign stats
    await prisma.campaign.update({
      where: { id: email.campaignId },
      data: {
        sent: { increment: 1 }
      }
    });

  } catch (error) {
    console.error('Email send failed:', error);

    await prisma.email.update({
      where: { id: emailId },
      data: { status: 'FAILED' }
    });

    if (error.code === 550) {
      await prisma.emailRecipient.update({
        where: { id: recipientId },
        data: {
          bounced: true,
          bouncedReason: error.message
        }
      });
    }
  }
});

module.exports = new EmailService();
```

### Email Tracking Endpoints

```javascript
// routes/tracking.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Track email opens
router.get('/track/open/:recipientId', async (req, res) => {
  const { recipientId } = req.params;

  await prisma.emailRecipient.update({
    where: { id: recipientId },
    data: {
      opened: true,
      openedAt: new Date()
    }
  });

  // Update campaign stats
  const recipient = await prisma.emailRecipient.findUnique({
    where: { id: recipientId },
    include: { email: true }
  });

  if (recipient?.email?.campaignId) {
    await prisma.campaign.update({
      where: { id: recipient.email.campaignId },
      data: {
        opened: { increment: 1 }
      }
    });
  }

  // Return 1x1 transparent pixel
  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );
  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': pixel.length
  });
  res.end(pixel);
});

// Track link clicks
router.get('/track/click/:recipientId', async (req, res) => {
  const { recipientId } = req.params;
  const { url } = req.query;

  await prisma.emailRecipient.update({
    where: { id: recipientId },
    data: {
      clicked: true,
      clickedAt: new Date()
    }
  });

  // Update campaign stats
  const recipient = await prisma.emailRecipient.findUnique({
    where: { id: recipientId },
    include: { email: true }
  });

  if (recipient?.email?.campaignId) {
    await prisma.campaign.update({
      where: { id: recipient.email.campaignId },
      data: {
        clicked: { increment: 1 }
      }
    });
  }

  // Redirect to actual URL
  res.redirect(decodeURIComponent(url));
});

// Handle unsubscribes
router.get('/unsubscribe/:recipientId', async (req, res) => {
  const { recipientId } = req.params;

  await prisma.emailRecipient.update({
    where: { id: recipientId },
    data: {
      unsubscribed: true,
      unsubscribedAt: new Date()
    }
  });

  res.send('You have been unsubscribed from future emails.');
});

module.exports = router;
```

---

## AUTHENTICATION & SECURITY

### JWT Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('No authentication token provided');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true
      }
    });

    if (!user || !user.isActive) {
      throw new Error('User not found or inactive');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient permissions'
      });
    }
    next();
  };
};

module.exports = { authMiddleware, authorize };
```

### Password Hashing

```javascript
// utils/auth.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken
};
```

---

## IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Months 1-2)

**Sprint 1-2: Project Setup & Core Infrastructure**
- ✅ Initialize React + Vite frontend
- ✅ Setup Express.js backend
- ✅ Configure PostgreSQL database
- ✅ Setup Prisma ORM
- ✅ Create database schema
- ✅ Build authentication system (JWT)
- ✅ Setup Redux Toolkit
- ✅ Create basic layout components

**Sprint 3-4: Core CRM Modules**
- ✅ Contacts CRUD
- ✅ Companies CRUD
- ✅ Deals CRUD
- ✅ Pipeline management
- ✅ Activities/Tasks
- ✅ Basic search & filters

### Phase 2: CRM Features (Months 3-4)

**Sprint 5-6: Advanced CRM**
- ✅ Deal Kanban board
- ✅ Contact/Company relationships
- ✅ File uploads (S3 integration)
- ✅ Activity timeline
- ✅ Custom fields
- ✅ Advanced search

**Sprint 7-8: Construction-Specific**
- ✅ Projects module
- ✅ Bids module
- ✅ Contracts management
- ✅ Subcontractors database
- ✅ Project milestones
- ✅ Document management

### Phase 3: Marketing Automation (Months 5-6)

**Sprint 9-10: Email Marketing**
- ✅ Email templates
- ✅ Campaign builder
- ✅ SendGrid integration
- ✅ Email tracking (opens, clicks)
- ✅ Contact segmentation
- ✅ Unsubscribe handling

**Sprint 11-12: Automation & Workflows**
- ✅ Workflow builder UI
- ✅ Trigger system
- ✅ Action execution engine
- ✅ Conditional logic
- ✅ Scheduled workflows
- ✅ Background job queue

### Phase 4: Analytics & Reporting (Months 7-8)

**Sprint 13-14: Analytics Dashboard**
- ✅ Sales metrics
- ✅ Pipeline analytics
- ✅ Email campaign metrics
- ✅ Custom reports builder
- ✅ Data visualization (charts)
- ✅ Export functionality

**Sprint 15-16: Advanced Features**
- ✅ Real-time notifications (Socket.io)
- ✅ Calendar integration
- ✅ Social media posting
- ✅ Mobile responsiveness
- ✅ Performance optimization

### Phase 5: Polish & Launch (Month 9)

**Sprint 17-18: Testing & Deployment**
- ✅ Unit testing
- ✅ Integration testing
- ✅ Load testing
- ✅ Security audit
- ✅ Documentation
- ✅ Production deployment
- ✅ User training materials

---

## CODE EXAMPLES

### Complete API Endpoint Example

```javascript
// routes/deals.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, authorize } = require('../middleware/auth');
const { dealValidation } = require('../validators/dealValidator');

const prisma = new PrismaClient();

// GET /api/deals - List all deals with filtering
router.get('/', authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      stageId,
      pipelineId,
      ownerId,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};

    if (stageId) where.stageId = stageId;
    if (pipelineId) where.pipelineId = pipelineId;
    if (ownerId) where.ownerId = ownerId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [deals, total] = await Promise.all([
      prisma.deal.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { [sortBy]: sortOrder },
        include: {
          company: { select: { id: true, name: true } },
          contact: { select: { id: true, firstName: true, lastName: true } },
          owner: { select: { id: true, firstName: true, lastName: true } },
          stage: { select: { id: true, name: true, probability: true } },
          pipeline: { select: { id: true, name: true } }
        }
      }),
      prisma.deal.count({ where })
    ]);

    res.json({
      deals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

// POST /api/deals - Create a new deal
router.post('/', authMiddleware, dealValidation, async (req, res) => {
  try {
    const {
      title,
      description,
      value,
      pipelineId,
      stageId,
      companyId,
      contactId,
      expectedCloseDate,
      probability
    } = req.body;

    const deal = await prisma.deal.create({
      data: {
        title,
        description,
        value,
        pipelineId,
        stageId,
        companyId,
        contactId,
        ownerId: req.user.id,
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
        probability: probability || 50
      },
      include: {
        company: true,
        contact: true,
        owner: true,
        stage: true,
        pipeline: true
      }
    });

    // Trigger workflow automation
    await workflowEngine.executeTrigger('DEAL_CREATED', { deal });

    res.status(201).json(deal);
  } catch (error) {
    console.error('Error creating deal:', error);
    res.status(500).json({ error: 'Failed to create deal' });
  }
});

// PATCH /api/deals/:id - Update a deal
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if deal exists and user has access
    const existingDeal = await prisma.deal.findUnique({
      where: { id }
    });

    if (!existingDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    // Only owner or admin can update
    if (existingDeal.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const deal = await prisma.deal.update({
      where: { id },
      data: updates,
      include: {
        company: true,
        contact: true,
        owner: true,
        stage: true,
        pipeline: true
      }
    });

    // Trigger workflow if stage changed
    if (updates.stageId && updates.stageId !== existingDeal.stageId) {
      await workflowEngine.executeTrigger('DEAL_STAGE_CHANGE', {
        deal,
        previousStageId: existingDeal.stageId
      });
    }

    res.json(deal);
  } catch (error) {
    console.error('Error updating deal:', error);
    res.status(500).json({ error: 'Failed to update deal' });
  }
});

// POST /api/deals/:id/move-stage - Move deal to different stage
router.post('/:id/move-stage', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { stageId } = req.body;

    const deal = await prisma.deal.update({
      where: { id },
      data: { stageId },
      include: {
        stage: true,
        pipeline: true,
        company: true,
        contact: true
      }
    });

    // Update probability based on stage
    await prisma.deal.update({
      where: { id },
      data: { probability: deal.stage.probability }
    });

    await workflowEngine.executeTrigger('DEAL_STAGE_CHANGE', { deal });

    res.json(deal);
  } catch (error) {
    console.error('Error moving deal:', error);
    res.status(500).json({ error: 'Failed to move deal' });
  }
});

// DELETE /api/deals/:id - Delete a deal
router.delete('/:id', authMiddleware, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.deal.delete({
      where: { id }
    });

    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting deal:', error);
    res.status(500).json({ error: 'Failed to delete deal' });
  }
});

module.exports = router;
```

---

## DEPLOYMENT ARCHITECTURE

### Production Environment

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Frontend (React)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=https://api.santcomcrm.com
    depends_on:
      - backend

  # Backend (Node.js + Express)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/crm
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - SENDGRID_API_KEY=${SENDGRID_API_KEY}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - AWS_S3_BUCKET=${AWS_S3_BUCKET}
    depends_on:
      - db
      - redis

  # PostgreSQL Database
  db:
    image: postgres:16
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=crm_user
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=crm_production
    ports:
      - "5432:5432"

  # Redis (Caching & Queue)
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

  # Nginx (Reverse Proxy)
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

---

## COST ESTIMATION

### Development Costs

| Role | Rate | Hours | Total |
|------|------|-------|-------|
| **Senior Full-Stack Dev** (Lead) | $150/hr | 800 hrs | $120,000 |
| **Full-Stack Developer** × 2 | $100/hr | 1,200 hrs each | $240,000 |
| **UI/UX Designer** | $80/hr | 400 hrs | $32,000 |
| **DevOps Engineer** | $120/hr | 300 hrs | $36,000 |
| **QA Engineer** | $70/hr | 400 hrs | $28,000 |
| **Project Manager** | $100/hr | 400 hrs | $40,000 |
| **TOTAL DEVELOPMENT** | | | **$496,000** |

### Infrastructure Costs (Annual)

| Service | Cost/Month | Annual |
|---------|------------|--------|
| **AWS EC2** (t3.large × 2) | $150 | $1,800 |
| **AWS RDS** (PostgreSQL db.t3.medium) | $120 | $1,440 |
| **AWS S3** (1TB storage) | $25 | $300 |
| **AWS CloudFront** (CDN) | $50 | $600 |
| **Redis Cloud** | $30 | $360 |
| **SendGrid** (100k emails/month) | $90 | $1,080 |
| **Monitoring** (Sentry + Grafana) | $50 | $600 |
| **Domain & SSL** | $20 | $240 |
| **TOTAL INFRASTRUCTURE** | | **$6,420/year** |

### Total Project Cost

- **Development (9 months):** $496,000
- **Infrastructure (Year 1):** $6,420
- **Contingency (20%):** $100,000
- **TOTAL:** **$602,420**

---

## CONCLUSION

This blueprint provides a **complete technical foundation** for building your custom construction CRM. The architecture is:

✅ **Scalable:** Can handle thousands of users and millions of records
✅ **Modular:** Easy to add new features without breaking existing code
✅ **Modern:** Uses latest technologies and best practices
✅ **Secure:** Built-in authentication, authorization, and data protection
✅ **Production-Ready:** Includes deployment, monitoring, and error handling

**Next Steps:**
1. Review this blueprint with your development team
2. Prioritize features based on business needs
3. Start with Phase 1 (Foundation) - 2 months
4. Build iteratively, releasing MVP at Month 6
5. Gather user feedback and iterate

**Alternative Approaches:**
- **No-Code Platform:** Use Airtable + Softr for $200/month (faster but less customizable)
- **Low-Code Platform:** Use Retool or Bubble.io for rapid prototyping ($50k budget, 2-3 months)
- **Hybrid:** Buy white-label CRM and customize ($100k-$200k, 4-6 months)

This custom build gives you **100% control, 0% licensing fees**, and a platform perfectly tailored to construction workflows.
