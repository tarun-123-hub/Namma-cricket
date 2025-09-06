import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Users, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  BarChart3,
  Plus
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Player, Tournament } from '../types'
import StatCard from '../components/UI/StatCard'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { Link } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [player, setPlayer] = useState<Player | null>(null)
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchPlayerData()
      fetchTournaments()
    }
  }, [user])

  const fetchPlayerData = async () => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setPlayer(data)
    } catch (error) {
      console.error('Error fetching player data:', error)
    }
  }

  const fetchTournaments = async () => {
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('status', 'upcoming')
        .limit(3)

      if (error) throw error
      setTournaments(data || [])
    } catch (error) {
      console.error('Error fetching tournaments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Trophy className="mx-auto h-12 w-12 text-cricket-600" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Complete Your Player Profile
            </h2>
            <p className="mt-2 text-gray-600">
              Create your player profile to start participating in tournaments
            </p>
            <Link
              to="/player-registration"
              className="mt-6 btn-primary inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Player Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Runs Scored',
      value: player.runs_scored,
      icon: Target,
      color: 'cricket'
    },
    {
      title: 'Wickets Taken',
      value: player.wickets_taken,
      icon: Award,
      color: 'primary'
    },
    {
      title: 'Matches Played',
      value: player.matches_played,
      icon: Users,
      color: 'cricket'
    },
    {
      title: 'Strike Rate',
      value: `${player.strike_rate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'primary'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-4">
              {player.profile_image ? (
                <img
                  src={player.profile_image}
                  alt={player.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-cricket-100 flex items-center justify-center">
                  <Users className="w-8 h-8 text-cricket-600" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {player.name}!
                </h1>
                <p className="text-gray-600">
                  {player.player_type} • {player.batting_style} • {player.bowling_style}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Performance Overview
                </h2>
                <BarChart3 className="w-5 h-5 text-cricket-600" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Batting Average</span>
                    <span>{player.batting_average.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-cricket-600 h-2 rounded-full"
                      style={{ width: `${Math.min(player.batting_average, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Bowling Economy</span>
                    <span>{player.bowling_economy.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${Math.min(player.bowling_economy * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Strike Rate</span>
                    <span>{player.strike_rate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-cricket-600 h-2 rounded-full"
                      style={{ width: `${Math.min(player.strike_rate, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upcoming Tournaments */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Upcoming Tournaments
                </h2>
                <Calendar className="w-5 h-5 text-cricket-600" />
              </div>
              
              <div className="space-y-4">
                {tournaments.length > 0 ? (
                  tournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {tournament.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {new Date(tournament.start_date).toLocaleDateString()}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cricket-600 font-medium">
                          ₹{tournament.prize_pool.toLocaleString()}
                        </span>
                        <Link
                          to={`/tournaments/${tournament.id}`}
                          className="text-sm bg-cricket-600 text-white px-3 py-1 rounded hover:bg-cricket-700 transition-colors duration-200"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No upcoming tournaments
                  </p>
                )}
              </div>
              
              <Link
                to="/tournaments"
                className="block text-center text-cricket-600 hover:text-cricket-700 font-medium mt-4"
              >
                View All Tournaments
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/profile"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <Users className="w-8 h-8 text-cricket-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Edit Profile</h3>
                  <p className="text-sm text-gray-600">Update your information</p>
                </div>
              </Link>
              
              <Link
                to="/tournaments"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <Trophy className="w-8 h-8 text-cricket-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Join Tournament</h3>
                  <p className="text-sm text-gray-600">Find and register</p>
                </div>
              </Link>
              
              <Link
                to="/leaderboard"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <Award className="w-8 h-8 text-cricket-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">View Rankings</h3>
                  <p className="text-sm text-gray-600">Check leaderboard</p>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard