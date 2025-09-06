import React from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-8 w-8 text-cricket-400" />
              <span className="text-2xl font-bold">Namma Cricket</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your ultimate destination for cricket tournaments, player management, and performance tracking. 
              Join the community and showcase your cricket skills!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cricket-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cricket-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cricket-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-cricket-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="text-gray-300 hover:text-cricket-400 transition-colors duration-200">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-300 hover:text-cricket-400 transition-colors duration-200">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-cricket-400 transition-colors duration-200">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-cricket-400" />
                <span className="text-gray-300">info@nammacricket.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-cricket-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-cricket-400" />
                <span className="text-gray-300">Bangalore, Karnataka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Namma Cricket. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-cricket-400 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-cricket-400 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer