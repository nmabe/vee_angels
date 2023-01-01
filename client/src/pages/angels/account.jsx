import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changePassword, changeProfilePic } from '@/store/angels/user-slice'
import { toast } from 'sonner'
import { signOutUser } from '@/store/auth-slice'
import UploadProfPic from '@/components/v-angels/uploadProfPic';

export default function AngelsAccountPage() {
  // Example initial state, replace with real user data as needed
  let user = useSelector((state) => state.auth.user)
  const [username, setUsername] = useState(user?.username || 'Guest')
  const [editing, setEditing] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const [saving, setSaving] = useState(false)
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(false);
  const [uploadedImage, setUploadedImageFile] = useState(null);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to Vee Angels!', read: false },
    { id: 2, message: 'Your profile was viewed 3 times today.', read: false }
    // Add more mock or fetched notifications here
  ])

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      (notifications || []).map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  // Handle changing password

  const handlePasswordChange = async () => {
    if (newPassword !== newPasswordAgain) {
      toast.warning('Passwords do not match.', {
        description: 'Please make sure both passwords are the same.',
        action: {
          label: 'Dismiss',
          onClick: () => console.log('Closed')
        },
        variant: 'destructive'
      })
      return
    }
    setSaving(true)
    dispatch(changePassword({ id: user.id, password: newPassword })).then(
      (data) => {
        if (!data.payload?.success) {
          toast.warning('There was a problem with your request.', {
            description: 'Something Went Wrong!!!',
            action: {
              label: 'Dismiss',
              onClick: () => console.log('Closed')
            },
            variant: 'destructive'
          })
        } else {
          toast.success(`Password updated for ${username}`, {
            description: 'Your password has been successfully updated.',
            action: {
              label: 'OK',
              onClick: () => console.log('Closed')
            }
          })
          setEditing(false)
          setNewPassword('')
          setNewPasswordAgain('')
          dispatch(signOutUser())
        }
        setSaving(false)
      }
    )
  }

  // Handle image upload (
  useEffect(() => {
    if (!user) {
      user = useSelector((state) => state.auth.user)
      setUsername(user?.username || 'Guest')
    }
  }, [user])

  return (
    <div className="min-h-screen font-inter text-gray-900 bg-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-[#892f82] text-center tracking-tight leading-tight">
            Account Settings
          </h1>
          <div className="mt-6 flex justify-center md:justify-start">
            <Link
              to="/angels/angels"
              className="bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-2.5 px-6 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition"
            >
              Explore Angels
            </Link>
          </div>

          {/* Notifications */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="block font-semibold text-gray-700 text-lg">
                Notifications
              </label>
              <button
                onClick={clearNotifications}
                className="text-xs text-[#892f82] underline hover:text-[#6d2568] transition"
                disabled={notifications.length === 0}
              >
                Clear All
              </button>
            </div>
            <div className="bg-[#f9f6fb] rounded-lg shadow-inner p-4 max-h-40 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-gray-400 text-sm text-center">
                  No notifications.
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-center justify-between mb-2 last:mb-0 p-2 rounded transition ${
                      n.read
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <span>{n.message}</span>
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="ml-4 text-xs bg-[#892f82] text-white px-2 py-1 rounded hover:bg-[#6d2568] transition"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Profile Image Upload */}
          <UploadProfPic
            user={user}
            loadingState={loadingState}
            setLoadingState={setLoadingState}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImageFile}
          />
          {/* Password Edit */}
          <div className="mb-8">
            <label className="block font-semibold mb-2 text-gray-700">
              Change Password
            </label>
            {editing ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-500"> </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-2 border-[#892f82]/30 rounded px-3 py-2 flex-1 focus:outline-none focus:border-[#892f82] transition"
                  />
                  <input
                    name="new-password-again"
                    type="password"
                    placeholder="Confirm Password"
                    value={newPasswordAgain}
                    onChange={(e) => setNewPasswordAgain(e.target.value)}
                    className="border-2 border-[#892f82]/30 rounded px-3 py-2 flex-1 focus:outline-none focus:border-[#892f82] transition"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePasswordChange}
                    className="w-full bg-[#892f82] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#6d2568] transition"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false)
                      setNewPassword('')
                      setNewPasswordAgain('')
                    }}
                    className="bg-gray-100 w-full px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-xl font-medium text-gray-800">
                  {username}
                </span>
                <button
                  onClick={() => setEditing(true)}
                  className="text-[#892f82] underline text-base font-semibold hover:text-[#6d2568] transition"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
