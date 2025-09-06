# Namma Cricket - Cricket Management Platform

A comprehensive full-stack cricket website that provides an interactive platform for cricket enthusiasts to register, participate in tournaments, and track their performance.

## Features

### User Authentication System
- Secure login/registration mechanisms
- Role-based access control (Player/Admin)
- Password management and recovery

### User-Side Features
- Dynamic landing page with cricket-themed design
- Comprehensive player registration workflow
- Detailed player profile management
- Interactive leaderboard system
- Tournament registration and tracking
- Performance analytics and statistics

### Admin-Side Features
- Admin dashboard for tournament management
- Player management capabilities
- Comprehensive database tracking
- Tournament creation and organization tools

### Key Highlights
- **Responsive Design**: Optimized for all devices
- **Real-time Updates**: Live data synchronization
- **Performance Tracking**: Detailed cricket statistics
- **Interactive UI**: Modern, polished design with animations
- **Secure**: JWT authentication and data protection

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: React Context API
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd namma-cricket
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Set up Supabase database:
   - Click "Connect to Supabase" in the top right of the application
   - Follow the setup instructions to create the necessary tables

6. Start the development server:
```bash
npm run dev
```

## Database Schema

The application uses the following main tables:

### Players
- User profiles with cricket-specific information
- Performance statistics and metrics
- Player types (Batter, Bowler, All-rounder)
- Batting and bowling styles

### Tournaments
- Tournament information and scheduling
- Entry fees and prize pools
- Registration deadlines and participant limits
- Status tracking (upcoming, ongoing, completed)

### Tournament Registrations
- Player tournament registrations
- Registration status tracking
- Date and time stamps

## Features in Detail

### Player Registration
- Comprehensive player information capture
- Support for multiple player types
- Optional profile image upload
- Skill specification and preferences

### Performance Metrics
- Runs scored and wickets taken
- Strike rate and bowling economy
- Batting average calculations
- Match participation tracking

### Tournament Management
- Create and manage tournaments
- Set entry fees and prize pools
- Track registrations and participants
- Status management and updates

### Leaderboard System
- Multiple sorting criteria
- Top player showcases
- Comprehensive rankings table
- Real-time updates

## Security Features

- Secure password hashing
- JWT-based authentication
- Role-based access controls
- Input validation and sanitization
- Protected API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.