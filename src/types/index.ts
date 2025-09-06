export interface User {
  id: string
  email: string
  role: 'user' | 'admin'
  created_at: string
}

export interface Player {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  age: number
  player_type: 'Batter' | 'Bowler' | 'All-rounder'
  batting_style: string
  bowling_style: string
  profile_image?: string
  runs_scored: number
  wickets_taken: number
  matches_played: number
  strike_rate: number
  bowling_economy: number
  batting_average: number
  created_at: string
  updated_at: string
}

export interface Tournament {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  registration_deadline: string
  max_participants: number
  entry_fee: number
  prize_pool: number
  status: 'upcoming' | 'ongoing' | 'completed'
  created_by: string
  created_at: string
  updated_at: string
}

export interface TournamentRegistration {
  id: string
  tournament_id: string
  player_id: string
  registration_date: string
  status: 'registered' | 'confirmed' | 'cancelled'
  created_at: string
}

export interface PlayerStats {
  runs_scored: number
  wickets_taken: number
  matches_played: number
  strike_rate: number
  bowling_economy: number
  batting_average: number
}