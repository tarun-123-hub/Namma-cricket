import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Calendar,
  Star,
  ArrowRight
} from 'lucide-react'
import StatCard from '../components/UI/StatCard'

const Home: React.FC = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Tournament Management',
      description: 'Organize and participate in cricket tournaments with ease'
    },
    {
      icon: Users,
      title: 'Player Profiles',
      description: 'Create detailed profiles and track your cricket journey'
    },
    {
      icon: Target,
      title: 'Performance Analytics',
      description: 'Detailed statistics and performance insights'
    },
    {
      icon: Award,
      title: 'Leaderboards',
      description: 'Compete with other players and climb the rankings'
    }
  ]

  const stats = [
    { title: 'Active Players', value: '2,500+', icon: Users },
    { title: 'Tournaments', value: '150+', icon: Trophy },
    { title: 'Matches Played', value: '5,000+', icon: Target },
    { title: 'Success Rate', value: '98%', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Welcome to <span className="text-cricket-200">Namma Cricket</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-cricket-100 max-w-3xl mx-auto"
            >
              Your ultimate destination for cricket tournaments, player management, 
              and performance tracking. Join the community and showcase your skills!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="bg-white text-cricket-600 hover:bg-cricket-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Register as Player
              </Link>
              <Link
                to="/tournaments"
                className="border-2 border-white text-white hover:bg-white hover:text-cricket-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                View Tournaments
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Namma Cricket?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive cricket management platform designed for players, 
              organizers, and cricket enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-cricket-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-cricket-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Tournaments</h2>
            <Link
              to="/tournaments"
              className="flex items-center text-cricket-600 hover:text-cricket-700 font-medium"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((tournament) => (
              <motion.div
                key={tournament}
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-cricket-100 text-cricket-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Upcoming
                  </span>
                  <span className="text-sm text-gray-500">₹5,000 Prize</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Summer Cricket Championship {tournament}
                </h3>
                <p className="text-gray-600 mb-4">
                  Join the most exciting cricket tournament of the season
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 15-20, 2024
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    32 Teams
                  </div>
                </div>
                <Link
                  to="/tournaments"
                  className="btn-primary w-full text-center"
                >
                  Register Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Players Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our community of cricket enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'All-rounder',
                content: 'Namma Cricket has transformed how I track my performance and find tournaments. Highly recommended!',
                rating: 5
              },
              {
                name: 'Priya Sharma',
                role: 'Fast Bowler',
                content: 'The platform is incredibly user-friendly and the tournament organization is top-notch.',
                rating: 5
              },
              {
                name: 'Arjun Patel',
                role: 'Batsman',
                content: 'Love the detailed analytics and leaderboard features. It keeps me motivated to improve.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cricket-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Cricket Journey?
          </h2>
          <p className="text-xl mb-8 text-cricket-100 max-w-2xl mx-auto">
            Join thousands of players who are already using Namma Cricket to 
            enhance their game and participate in exciting tournaments.
          </p>
          <Link
            to="/register"
            className="bg-white text-cricket-600 hover:bg-cricket-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home