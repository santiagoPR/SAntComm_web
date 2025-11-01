# SAntComm Project Agent Routing Guide

## Available Agents for SAntComm Web & Mobile

### Global Agents (8)
1. `/code-review` - Code review and security analysis
2. `/tech-write-enhanced` - Technical writing with auto-compilation
3. `/tech-write` - Basic technical writing
4. `/analyze-data` - Data analysis and visualization
5. `/ml-develop` - ML model development
6. `/deploy` - DevOps and deployment
7. `/data-audit` - Data quality auditing
8. `/ensemble-training` - Multi-model ensemble training

### SAntComm-Specific Agents (4)
9. `/frontend-dev` - Web frontend development
10. `/mobile-app-dev` - Mobile app development (React Native/Flutter)
11. `/api-builder` - Backend API development
12. `/ui-ux-design` - UI/UX design and design systems

---

## Quick Recognition Patterns

### `/frontend-dev` - Frontend Development
**Auto-activate when user asks for:**
- "Build the homepage"
- "Create a React component"
- "Add navigation to the website"
- "Implement the dashboard"
- "Create responsive layout"
- "Build web interface"
- "Add Tailwind styling"

**Example:**
```
User: "Build a responsive navigation bar for the website"
→ Auto-use: /frontend-dev
```

---

### `/mobile-app-dev` - Mobile App Development
**Auto-activate when user asks for:**
- "Create mobile app"
- "Build React Native component"
- "Add mobile navigation"
- "Implement Flutter widget"
- "Mobile app screens"
- "iOS/Android feature"
- "Mobile push notifications"

**Example:**
```
User: "Create a login screen for the mobile app"
→ Auto-use: /mobile-app-dev
```

---

### `/api-builder` - API Development
**Auto-activate when user asks for:**
- "Create API endpoint"
- "Build REST API"
- "Add authentication endpoint"
- "Create GraphQL schema"
- "Backend API routes"
- "Database models"
- "API documentation"

**Example:**
```
User: "Create a REST API for user management"
→ Auto-use: /api-builder
```

---

### `/ui-ux-design` - Design System
**Auto-activate when user asks for:**
- "Create design system"
- "Design the interface"
- "Choose color palette"
- "Design components"
- "Create style guide"
- "Accessibility audit"
- "Design tokens"

**Example:**
```
User: "Create a design system with colors and typography"
→ Auto-use: /ui-ux-design
```

---

## Multi-Agent Workflows for SAntComm

### Full-Stack Feature Development
```
User: "Build a user dashboard with profile management"

Workflow:
1. /ui-ux-design → Create design system and component specs
2. /api-builder → Build user profile API endpoints
3. /frontend-dev → Implement web dashboard
4. /mobile-app-dev → Implement mobile version
5. /code-review → Security and quality check
6. /deploy → Deploy to staging
```

### Mobile + Web App Development
```
User: "Create a messaging feature for both web and mobile"

Workflow:
1. /ui-ux-design → Design message UI/UX
2. /api-builder → Build messaging API with WebSocket
3. /frontend-dev → Web messaging interface
4. /mobile-app-dev → Mobile messaging interface
5. /code-review → Review all code
6. /deploy → Deploy backend and frontend
```

### Design-to-Production Pipeline
```
User: "Design and build a landing page"

Workflow:
1. /ui-ux-design → Create landing page design
2. /frontend-dev → Implement responsive landing page
3. /code-review → Accessibility and performance check
4. /deploy → Deploy to production
```

---

## Agent Priority Matrix

| Task Type | Primary Agent | Secondary Agent | Review Agent |
|-----------|---------------|-----------------|--------------|
| Web UI | /frontend-dev | /ui-ux-design | /code-review |
| Mobile UI | /mobile-app-dev | /ui-ux-design | /code-review |
| API Endpoints | /api-builder | - | /code-review |
| Design System | /ui-ux-design | - | - |
| Full Feature | /ui-ux-design | /frontend-dev or /mobile-app-dev | /code-review |
| Deployment | /deploy | - | /code-review |
| Documentation | /tech-write-enhanced | - | - |

---

## Natural Language Detection Examples

```
"Build a responsive navbar" → /frontend-dev
"Create mobile login screen" → /mobile-app-dev
"Add user authentication API" → /api-builder
"Design the app color scheme" → /ui-ux-design
"Review the frontend code" → /code-review
"Deploy the web app" → /deploy
"Write API documentation" → /tech-write-enhanced
```

---

## Project-Specific Best Practices

### For SAntComm Web
- Always use `/ui-ux-design` first for new features
- Use `/frontend-dev` for all web implementation
- Run `/code-review` before merging to main
- Use `/deploy` for containerization and CI/CD

### For SAntComm Mobile
- Design with `/ui-ux-design` (mobile-first)
- Implement with `/mobile-app-dev`
- Test on both iOS and Android
- Use `/api-builder` for backend integration

### For Full-Stack Features
1. Design → `/ui-ux-design`
2. Backend → `/api-builder`
3. Frontend → `/frontend-dev` and `/mobile-app-dev`
4. Review → `/code-review`
5. Deploy → `/deploy`

---

**Created**: 2025-10-31
**Project**: SAntComm Web & Mobile
**Total Agents**: 12 (8 global + 4 project-specific)
