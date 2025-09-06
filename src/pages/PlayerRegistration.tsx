import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { User, Phone, Calendar, Target, Upload, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const playerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  age: z.number().min(16, 'Must be at least 16 years old').max(50, 'Must be under 50 years old'),
  player_type: z.enum(['Batter', 'Bowler', 'All-rounder']),
  batting_style: z.string().min(1, 'Please select batting style'),
  bowling_style: z.string().min(1, 'Please select bowling style'),
})

type PlayerFormData = z.infer<typeof playerSchema>

const PlayerRegistration: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      email: user?.email || ''
    }
  })

  const playerType = watch('player_type')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`
      const filePath = `profiles/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('player-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('player-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  const onSubmit = async (data: PlayerFormData) => {
    if (!user) return

    setIsLoading(true)
    try {
      let profileImageUrl = null
      
      if (profileImage) {
        profileImageUrl = await uploadImage(profileImage)
      }

      const { error } = await supabase
        .from('players')
        .insert({
          user_id: user.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          age: data.age,
          player_type: data.player_type,
          batting_style: data.batting_style,
          bowling_style: data.bowling_style,
          profile_image: profileImageUrl,
          runs_scored: 0,
          wickets_taken: 0,
          matches_played: 0,
          strike_rate: 0,
          bowling_economy: 0,
          batting_average: 0
        })

      if (error) throw error

      toast.success('Player profile created successfully!')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const battingStyles = [
    'Right-handed',
    'Left-handed'
  ]

  const bowlingStyles = [
    'Right-arm fast',
    'Left-arm fast',
    'Right-arm medium',
    'Left-arm medium',
    'Right-arm off-spin',
    'Left-arm orthodox',
    'Right-arm leg-spin',
    'Left-arm chinaman',
    'Not applicable'
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Player Profile
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your cricket skills and preferences
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Image Upload */}
            <div className="text-center">
              <div className="mb-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-cricket-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <label className="cursor-pointer bg-cricket-600 hover:bg-cricket-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors duration-200">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">Optional: Upload your profile picture</p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('name')}
                    type="text"
                    className="input-field pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="input-field"
                  placeholder="Enter your email"
                  readOnly
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('phone')}
                    type="tel"
                    className="input-field pl-10"
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('age', { valueAsNumber: true })}
                    type="number"
                    min="16"
                    max="50"
                    className="input-field pl-10"
                    placeholder="Enter your age"
                  />
                </div>
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                )}
              </div>
            </div>

            {/* Cricket Specialization */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Target className="w-5 h-5 mr-2 text-cricket-600" />
                Cricket Specialization
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Player Type *
                </label>
                <select
                  {...register('player_type')}
                  className="input-field"
                >
                  <option value="">Select player type</option>
                  <option value="Batter">Batter</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                </select>
                {errors.player_type && (
                  <p className="mt-1 text-sm text-red-600">{errors.player_type.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batting Style *
                  </label>
                  <select
                    {...register('batting_style')}
                    className="input-field"
                    disabled={playerType === 'Bowler'}
                  >
                    <option value="">Select batting style</option>
                    {battingStyles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                    {playerType === 'Bowler' && (
                      <option value="Not applicable">Not applicable</option>
                    )}
                  </select>
                  {errors.batting_style && (
                    <p className="mt-1 text-sm text-red-600">{errors.batting_style.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bowling Style *
                  </label>
                  <select
                    {...register('bowling_style')}
                    className="input-field"
                    disabled={playerType === 'Batter'}
                  >
                    <option value="">Select bowling style</option>
                    {bowlingStyles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                  {errors.bowling_style && (
                    <p className="mt-1 text-sm text-red-600">{errors.bowling_style.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                Skip for now
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Registration
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default PlayerRegistration