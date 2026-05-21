# 📝 Candidate Notes App

A full-stack web application for managing recruitment candidates and their interview notes, built with React, TypeScript, Node.js, Express, and MongoDB.

**Live Demo:** [Frontend](https://frontend-candidate-note-app.vercel.app)

**Repositories:**

- Frontend: <https://github.com/pankajtyagi1601/frontend_candidate_note_app>
- Backend: <https://github.com/pankajtyagi1601/backend_candidate_note_app>

---

## Features

- Add candidates with name and role
- View all candidates in a clean list
- Click on a candidate to view/add notes
- Bulk upload candidates from CSV file

---

## Architecture

### Frontend

- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.3.9
- **Language**: TypeScript 5.0.4
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios 1.4.0
- **Routing**: React Router DOM 6.11.1
- **Deployment**: Vercel

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express 4.18.2
- **Language**: TypeScript 5.0.4
- **Database**: MongoDB Atlas
- **ODM**: Mongoose 7.0.3
- **CORS**: cors 2.8.5
- **Environment**: dotenv 16.0.3

### Database Schema

**Candidate Model**

```typescript
{
  name: String (required)
  role: String (required)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

**Note Model**

```typescript
{
  candidateId: ObjectId (ref: Candidate)
  content: String (required)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Git installed
- npm or yarn package manager

### 1. Clone the Repositories

```bash
# Clone frontend
git clone https://github.com/pankajtyagi1601/frontend_candidate_note_app.git

# Clone backend
git clone https://github.com/pankajtyagi1601/backend_candidate_note_app.git
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend_candidate_note_app

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB connection string
# PORT=5000
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/candidate-notes
# NODE_ENV=development

# Run the backend
npm run dev
```

**Backend will start on <http://localhost:5000>**

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend_candidate_note_app

# Install dependencies
npm install

# Create .env file (if needed)
# VITE_API_URL=http://localhost:5000/api

# Run the frontend
npm run dev
```

**Frontend will start on <http://localhost:3000>**

### 4. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account / Sign in
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `myFirstDatabase` with `candidate-notes`
8. Paste this into your backend `.env` file as `MONGODB_URI`
9. Add your IP to the IP Whitelist (or use 0.0.0.0/0 for testing)

---

## Project Structure

```
candidate-notes-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts        # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── candidateController.ts
│   │   │   └── noteController.ts
│   │   ├── models/
│   │   │   ├── Candidate.ts       # Mongoose model
│   │   │   └── Note.ts            # Mongoose model
│   │   ├── routes/
│   │   │   ├── candidateRoutes.ts
│   │   │   └── noteRoutes.ts
│   │   └── server.ts              # Express app entry
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
    └── nodemon.json

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddCandidate.tsx
│   │   │   ├── BulkUpload.tsx
│   │   │   |── CandidateList.tsx
│   │   │   ├── HomePage.tsx
│   │   │   └── CandidateDetail.tsx
│   │   ├── services/                 # API service layer
│   │   │   |── api.ts              
│   │   │   |── candidateService.ts          
│   │   │   └── notesService.ts              
│   │   ├── types/                  # TypeScript interfaces
│   │   │   |── api.ts            
│   │   │   |── candidate.ts
│   │   │   └── note.ts     
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── index.html
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

---

## 🔌 API Endpoints

### Candidates

- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get candidate with notes
- `POST /api/candidates` - Create a candidate

  ```json
  {
    "name": "John Doe",
    "role": "Software Engineer"
  }
  ```

- `POST /api/candidates/bulk-upload` - Bulk upload candidates

  ```json
  [
    { "name": "John Doe", "role": "Software Engineer" },
    { "name": "Jane Smith", "role": "Product Manager" }
  ]
  ```

### Notes

- `GET /api/notes` - Get all notes
- `GET /api/notes/candidate/:candidateId` - Get notes for a candidate
- `POST /api/notes` - Create a note

  ```json
  {
    "candidateId": "65f1234abcd5678efgh90123",
    "content": "Great technical skills, good communication"
  }
  ```

### Health Check

- `GET /api/health` - Server health check

---

## CSV Upload Format

Create a CSV file with the following format:

```csv
name,role
John Doe,Software Engineer
Jane Smith,Product Manager
Mike Johnson,UX Designer
```

Or without header:

```csv
John Doe,Software Engineer
Jane Smith,Product Manager
```

---

## Design Decisions

### Why Separate Frontend/Backend?

- **Scalability**: Can deploy independently
- **Security**: Database credentials never exposed to frontend

### Why TypeScript?

- **Type Safety**: Catch errors at compile time
- **Better IDE support**: Autocomplete and IntelliSense
- **Self-documenting code**: Types serve as documentation
- **Maintainability**: Easier to refactor and scale

### Why MongoDB?

- **Flexible schema**: Easy to iterate during development
- **Free tier**: MongoDB Atlas offers generous free hosting
- **JSON-native**: Natural fit with JavaScript/TypeScript
- **Easy deployment**: No server management required
- **Scalability**: Can handle growth efficiently

---

## Technology Choices Explained

### Stable Versions Used

All dependencies use **stable, production-ready versions** (not latest bleeding edge):

**Backend:**

- Express 4.18.2 - Industry-standard web framework
- Mongoose 7.0.3 - Robust ODM with years of production use
- TypeScript 5.0.4 - Stable with excellent tooling
- Node.js 18+ - LTS version with long-term support

**Frontend:**

- React 18.2.0 - Current stable release
- Vite 4.3.9 - Fast, proven build tool
- Axios 1.4.0 - Reliable HTTP client
- React Router DOM 6.11.1 - Standard routing library

---

## AI Tools Used

I used AI assistance (Claude) for:

- Boilerplate code generation
- TypeScript interface definitions
- Error handling patterns
- README documentation
- Code structure recommendations

I wrote/reviewed/understood:

- Application architecture
- API design decisions
- Database schema design
- Component structure and composition
- Business logic implementation
- All code functionality and flow
- Deployment configuration

---

## Testing the App

### Manual Testing Checklist

1. **Add Candidate**
   - Add candidate with valid name and role
   - Try submitting with empty fields (should show error)
   - Verify candidate appears in list

2. **View Candidates**
   - All candidates display correctly
   - Click on a candidate opens detail view
   - Candidate info is accurate

3. **Add Notes**
   - Add note to a candidate
   - Multiple notes display in chronological order
   - Empty note submission shows error
   - Note timestamps are correct

4. **Bulk Upload**
   - Upload valid CSV file
   - Try uploading non-CSV (should show error)
   - Verify all candidates from CSV appear in list
   - CSV with/without headers both work

5. **Navigation**
   - Back button works from detail view
   - Tab switching works on home page
   - URL routing is correct

6. **Error Handling**
   - Backend down shows appropriate error
   - Network errors are handled gracefully
   - Invalid data shows user-friendly messages

---

## Deployment

### Backend Deployment (Vercel)

1. Create account on deployment platform
2. Connect your GitHub repository
3. Set environment variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=production
   PORT=5000
   ```

4. Build command: `npm run build`
5. Start command: `npm start`
6. Deploy and get your backend URL

### Frontend Deployment (Vercel)

1. Create account on Vercel
2. Connect your GitHub repository
3. Set environment variables:

   ```
   VITE_API_URL=your_backend_url/api
   ```

4. Build command: `npm run build`
5. Deploy automatically on git push

**Current Deployments:**

- Frontend: <https://frontend-candidate-note-app.vercel.app>

- Backend: <https://backend-candidate-note-app.vercel.app>

---

## Troubleshooting

### Backend won't start

- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0)
- Verify Node.js version is 18+
- Check if port 5000 is already in use
- Run `npm install` to ensure all dependencies are installed

### Frontend can't connect to backend

- Ensure backend is running on port 5000
- Check CORS is enabled in backend
- Verify proxy settings in `vite.config.ts`
- Check browser console for CORS errors
- Ensure `VITE_API_URL` is set correctly if using .env

### CSV upload not working

- Ensure CSV format is correct: `name,role`
- Check file is actually `.csv` extension
- Try with and without header row
- Verify no special characters in names/roles
- Check browser console for parsing errors

### Database connection issues

- Verify MongoDB Atlas credentials are correct
- Check network access in MongoDB Atlas (IP whitelist)
- Ensure database user has read/write permissions
- Test connection string separately
- Check MongoDB Atlas cluster status

---

## Learning Resources

If you're new to this stack, here are helpful resources:

- **React**: [React Official Docs](https://react.dev)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Express**: [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- **MongoDB**: [MongoDB University](https://university.mongodb.com/)
- **Mongoose**: [Mongoose Docs](https://mongoosejs.com/docs/)
- **Vite**: [Vite Guide](https://vitejs.dev/guide/)

---

## Contact & Support

**Developer:** Pankaj Tyagi

**Email:** <pankajtyagi1601@gmail.com>

**GitHub:**

- Frontend: <https://github.com/pankajtyagi1601/frontend_candidate_note_app>
- Backend: <https://github.com/pankajtyagi1601/backend_candidate_note_app>

---

## License

This project is created as part of the bash.ai Engineering Intern Challenge.

---

## Acknowledgments

- **bash.ai** for the internship opportunity and challenge
- **Anthropic (Claude)** for AI assistance in code generation
- **MongoDB** for free Atlas hosting
- **Vercel** for frontend deployment
- **React** and **Vite** teams for excellent developer tools

---

## Project Stats

- **Total Lines of Code**: ~2,500+
- **Components**: 5 React components
- **API Endpoints**: 7 RESTful endpoints
- **Development Time**: ~6-8 hours
- **Test Coverage**: Manual testing completed

---