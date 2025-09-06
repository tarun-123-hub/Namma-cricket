import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      players: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          age: number
          player_type: 'Batter' | 'Bowler' | 'All-rounder'
          batting_style: string
          bowling_style: string
          profile_image: string | null
          runs_scored: number
          wickets_taken: number
          matches_played: number
          strike_rate: number
          bowling_economy: number
          batting_average: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone: string
          age: number
          player_type: 'Batter' | 'Bowler' | 'All-rounder'
          batting_style: string
          bowling_style: string
          profile_image?: string | null
          runs_scored?: number
          wickets_taken?: number
          matches_played?: number
          strike_rate?: number
          bowling_economy?: number
          batting_average?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string
          age?: number
          player_type?: 'Batter' | 'Bowler' | 'All-rounder'
          batting_style?: string
          bowling_style?: string
          profile_image?: string | null
          runs_scored?: number
          wickets_taken?: number
          matches_played?: number
          strike_rate?: number
          bowling_economy?: number
          batting_average?: number
          created_at?: string
          updated_at?: string
        }
      }
      tournaments: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          description: string
          start_date: string
          end_date: string
          registration_deadline: string
          max_participants: number
          entry_fee: number
          prize_pool: number
          status?: 'upcoming' | 'ongoing' | 'completed'
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          start_date?: string
          end_date?: string
          registration_deadline?: string
          max_participants?: number
          entry_fee?: number
          prize_pool?: number
          status?: 'upcoming' | 'ongoing' | 'completed'
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      tournament_registrations: {
        Row: {
          id: string
          tournament_id: string
          player_id: string
          registration_date: string
          status: 'registered' | 'confirmed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          player_id: string
          registration_date?: string
          status?: 'registered' | 'confirmed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          player_id?: string
          registration_date?: string
          status?: 'registered' | 'confirmed' | 'cancelled'
          created_at?: string
        }
      }
    }
  }
}