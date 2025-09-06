import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, Award, TrendingUp, Medal, Crown } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Player } from '../types'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'runs_scored' | 'wickets_taken' | 'batting_average' | 'strike_rate'>('runs_scored')

  useEffect(() => {
    fetchPlayers()
  }, [sortBy])

  const fetchPlayers = async () => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order(sortBy, { ascending: false })
        .limit(50)

      if (error) throw error
      setPlayers(data || [])
    } catch (error) {
      console.error('Error fetching players:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500'
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600'
      default:
        return 'bg-white'
    }
  }

  const sortOptions = [
    { value: 'runs_scored', label: 'Runs Scored', icon: Target },
    { value: 'wickets_taken', label: 'Wickets Taken', icon: Award },
    { value: 'batting_average', label: 'Batting Average', icon: TrendingUp },
    { value: 'strike_rate', label: 'Strike Rate', icon: TrendingUp }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Player Leaderboard
          </h1>
          <p className="text-gray-600">
            Top performing players in the Namma Cricket community
          </p>
        </div>

        {/* Sort Options */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as any)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    sortBy === option.value
                      ? 'bg-cricket-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <option.icon className="w-4 h-4 mr-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top 3 Players */}
        {players.length >= 3 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="order-2 md:order-1"
              >
                <div className="card text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-300 to-gray-500"></div>
                  <div className="pt-4">
                    <div className="flex justify-center mb-4">
                      <Medal className="w-12 h-12 text-gray-400" />
                    </div>
                    {players[1].profile_image ? (
                      <img
                        src={players[1].profile_image}
                        alt={players[1].name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                        <Trophy className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {players[1].name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {players[1].player_type}
                    </p>
                    <p className="text-2xl font-bold text-gray-700">
                      {sortBy === 'batting_average' || sortBy === 'strike_rate' 
                        ? `${players[1][sortBy].toFixed(1)}${sortBy === 'strike_rate' ? '%' : ''}`
                        : players[1][sortBy]
                      }
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="order-1 md:order-2"
              >
                <div className="card text-center relative overflow-hidden transform scale-105">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                  <div className="pt-4">
                    <div className="flex justify-center mb-4">
                      <Crown className="w-16 h-16 text-yellow-500" />
                    </div>
                    {players[0].profile_image ? (
                      <img
                        src={players[0].profile_image}
                        alt={players[0].name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-400"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-yellow-100 flex items-center justify-center border-4 border-yellow-400">
                        <Trophy className="w-10 h-10 text-yellow-600" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {players[0].name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {players[0].player_type}
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {sortBy === 'batting_average' || sortBy === 'strike_rate' 
                        ? `${players[0][sortBy].toFixed(1)}${sortBy === 'strike_rate' ? '%' : ''}`
                        : players[0][sortBy]
                      }
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="order-3"
              >
                <div className="card text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                  <div className="pt-4">
                    <div className="flex justify-center mb-4">
                      <Medal className="w-12 h-12 text-amber-600" />
                    </div>
                    {players[2].profile_image ? (
                      <img
                        src={players[2].profile_image}
                        alt={players[2].name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-amber-400"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-amber-100 flex items-center justify-center border-4 border-amber-400">
                        <Trophy className="w-8 h-8 text-amber-600" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {players[2].name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {players[2].player_type}
                    </p>
                    <p className="text-2xl font-bold text-amber-600">
                      {sortBy === 'batting_average' || sortBy === 'strike_rate' 
                        ? `${players[2][sortBy].toFixed(1)}${sortBy === 'strike_rate' ? '%' : ''}`
                        : players[2][sortBy]
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Complete Rankings
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Runs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wickets
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matches
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {players.map((player, index) => (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`hover:bg-gray-50 ${index < 3 ? getRankBg(index + 1) : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(index + 1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {player.profile_image ? (
                          <img
                            src={player.profile_image}
                            alt={player.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <Trophy className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {player.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {player.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cricket-100 text-cricket-800">
                        {player.player_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.runs_scored}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.wickets_taken}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.batting_average.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.strike_rate.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.matches_played}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {players.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No players found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Be the first to register and claim the top spot!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard