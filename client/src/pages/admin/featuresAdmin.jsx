import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  UserCheck,
  UserX,
  AlertCircle,
  Settings,
  Mail,
  Download,
  CheckCircle2,
  XCircle,
  Activity,
  EyeOff
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getApplications,
  rejectApplication,
  approveApplication
} from '@/store/applications/applications-slice'
import { toast } from 'sonner'
import AngelPopUpCard from '@/components/v-angels/angelPopUpCard'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { getReports, deleteReport } from '@/store/contact/contact-reports-slice'
import { getMessages, deleteMessage } from '@/store/contact/contact-slice'
import axios from 'axios'

//TimeAgo.addDefaultLocale(en)

// Create formatter (English).
//const timeAgo = new TimeAgo('en-US');

const activities = [
  {
    id: 1,
    description: 'Angel Sophie Bennett updated her profile.',
    time: '2 hours ago'
  },
  {
    id: 2,
    description: 'User Thulani FKP sent a message.',
    time: '4 hours ago'
  },
  {
    id: 3,
    description: 'Angel Kabza received a new review.',
    time: '1 day ago'
  },
  {
    id: 4,
    description: 'Admin approved new angel registration.',
    time: '2 days ago'
  }
]

export default function FeaturesAdminPage() {
  const newAngels = useSelector((state) => state.applications.applications)
  const dispatch = useDispatch()
  const [reportList, setReportList] = useState([])
  const messages = useSelector((state) => state.contact.messages)

  useEffect(() => {
    dispatch(getApplications())
    dispatch(getReports()).then((data) => {
      if (data?.payload?.reports) {
        setReportList(data.payload.reports)
      }
    })
    dispatch(getMessages())
  }, [dispatch])

  const handleApprove = (id) => {
    dispatch(approveApplication(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getApplications())
        toast.success(`Angel registration approved`, {
          description: <h2>New Angel has been added</h2>,
          action: {
            label: 'Dismiss',
            onClick: () => {}
          }
        })
      } else {
        toast.warning('There was a problem with your request.', {
          description: 'Something Went Wrong!!!',
          action: {
            label: 'Dismiss',
            onClick: () => {}
          },
          variant: 'destructive'
        })
      }
    })
  }

  const handleReject = (id, profPicUrl = []) => {
    dispatch(rejectApplication({ id, profPicUrl })).then((data) => {
      if (data?.payload?.success) {
        toast.success(`Angel registration rejected`, {
          description: <h2>Angel Application has been Rejected</h2>,
          action: {
            label: 'Dismiss',
            onClick: () => {
              {
              }
            }
          }
        })
        dispatch(getApplications())
      } else {
        toast.warning('There was a problem with your request.', {
          description: 'Something Went Wrong!!!',
          action: {
            label: 'Dismiss',
            onClick: () => {}
          },
          variant: 'destructive'
        })
      }
    })

    // Add backend call here
  }

  const handleResolveReport = (id) => {
    setReportList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Resolved' } : r))
    )
    // Add backend call here
  }

  const resetViews = async () => {
    // Add backend call here to reset views
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/angels/angels/resetView/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (res.data?.success) {
        toast.success('View counts reset successfully', {
          description: 'All angel view counts have been reset.',
          action: {
            label: 'Dismiss',
            onClick: () => {}
          }
        })
      } else {
        toast.warning('Failed to reset view counts.', {
          description: 'Something went wrong while resetting views.',
          action: {
            label: 'Dismiss',
            onClick: () => {}
          },
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast.error('An error occurred.', {
        description: 'Unable to reset view counts.',
        action: {
          label: 'Dismiss',
          onClick: () => {}
        },
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1021] via-[#23243a] to-[#1a1b2f] relative overflow-hidden flex flex-col">
      {/* Futuristic glowing grid background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,247,0.08)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-cyan-300 mb-6 sm:mb-8 text-center tracking-widest z-10 drop-shadow-glow mt-8">
        FEATURES ADMIN PANEL
      </h1>
      <div className="relative z-10 flex flex-col gap-6 sm:gap-8 px-2 sm:px-4 pb-12 w-full max-w-[1600px] mx-auto">
        {/* Responsive grid: 1col mobile, 2col tablet, 3col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Approve Angel Registrations */}
          <Card className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-cyan-400/10 shadow-xl flex flex-col">
            <CardHeader className="flex flex-row items-center gap-3 pb-1">
              <UserCheck className="w-6 h-6 text-cyan-400 drop-shadow-glow" />
              <CardTitle className="text-lg font-semibold text-cyan-100 tracking-wider">
                Approve Angel Registrations
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              {newAngels.length === 0 ? (
                <div className="text-cyan-400 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <svg width="48" height="48" className="mb-2">
                      <circle
                        cx="24"
                        cy="24"
                        r="22"
                        stroke="#00fff7"
                        strokeWidth="2"
                        fill="#23243a"
                      />
                      <path
                        d="M16 24l6 6 10-10"
                        stroke="#00fff7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-bold text-cyan-200">
                      All angels are approved!
                    </span>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-transparent h-[250px] overflow-y-auto">
                  {newAngels.map((angel) => (
                    <li
                      key={angel._id}
                      className="flex items-center gap-3 bg-[#1a1b2f]/60 rounded-lg p-2"
                    >
                      <Dialog>
                        <DialogTrigger className="flex items-center gap-3 flex-1 min-w-0">
                          <img
                            src={angel.profPicUrl[0]}
                            alt={angel.username}
                            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                          />
                          <div className="flex flex-col items-start">
                            <span className="font-bold text-cyan-100 truncate">
                              {angel.username}
                            </span>
                          </div>
                        </DialogTrigger>
                        <AngelPopUpCard angel={angel} />
                      </Dialog>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-green-400 text-[#23243a] hover:bg-green-300 rounded-lg px-3 py-1 font-bold"
                          onClick={() => handleApprove(angel._id)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-400 text-[#23243a] hover:bg-red-300 rounded-lx px-3 py-1 font-bold"
                          onClick={() =>
                            handleReject(angel._id, angel.profPicUrl)
                          }
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          {/* Manage Reports */}
          <Card className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-pink-400/10 shadow-xl flex flex-col">
            <CardHeader className="flex flex-row items-center gap-3 pb-1">
              <AlertCircle className="w-6 h-6 text-pink-400 drop-shadow-glow" />
              <CardTitle className="text-lg font-semibold text-pink-100 tracking-wider">
                Manage Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              {reportList.length === 0 ? (
                <div className="text-pink-400 py-4">No reports.</div>
              ) : (
                <ul className="space-y-4">
                  {reportList.map((report) => (
                    <li
                      key={report.id}
                      className="flex items-center gap-3 bg-[#1a1b2f]/60 rounded-lg p-2"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-pink-100 truncate">
                          {report.title}
                        </div>
                        <div className="text-xs text-pink-400 truncate">
                          {report.issue}
                        </div>
                        <div className="text-xs text-pink-400">
                          Date: {report.createdAt}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          report.status === 'Pending'
                            ? 'bg-yellow-400/20 text-yellow-200'
                            : 'bg-green-400/20 text-green-200'
                        }`}
                      >
                        {report.status}
                      </span>
                      {report.status === 'Pending' && (
                        <Button
                          size="sm"
                          className="bg-green-400 text-[#23243a] hover:bg-green-300 rounded-lg px-3 py-1 font-bold"
                          onClick={() => handleResolveReport(report.id)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Resolve
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          {/* Activities */}
          <Card className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-cyan-400/10 shadow-xl flex flex-col">
            <CardHeader className="flex flex-row items-center gap-3 pb-1">
              <Activity className="w-6 h-6 text-cyan-400 drop-shadow-glow" />
              <CardTitle className="text-lg font-semibold text-cyan-100 tracking-wider">
                Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex items-center gap-3 bg-[#1a1b2f]/60 rounded-lg p-2"
                  >
                    <span className="flex-1 min-w-0 text-cyan-100 truncate">
                      {activity.description}
                    </span>
                    <span className="text-xs text-cyan-400">
                      {activity.time}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        {/* Settings, Emailing, Export - stacked below on all screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mt-6">
          {/* Settings */}
          <Card className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-cyan-400/10 shadow-xl">
            <CardHeader className="flex flex-row items-center gap-3 pb-1">
              <Settings className="w-6 h-6 text-cyan-400 drop-shadow-glow" />
              <CardTitle className="text-lg font-semibold text-cyan-100 tracking-wider">
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-cyan-400 text-[#23243a] hover:bg-cyan-300 rounded-lg px-3 py-2 font-bold mb-2"
                onClick={() => alert('Settings opened')}
              >
                Open Settings
              </Button>
            </CardContent>
          </Card>
          {/* Emailing */}
          <Card className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-cyan-400/10 shadow-xl">
            <CardHeader className="flex flex-row items-center gap-3 pb-1">
              <Mail className="w-6 h-6 text-cyan-400 drop-shadow-glow" />
              <CardTitle className="text-lg font-semibold text-cyan-100 tracking-wider">
                Email Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-cyan-400 text-[#23243a] hover:bg-cyan-300 rounded-lg px-3 py-2 font-bold mb-2"
                onClick={() => alert('Email dialog opened')}
              >
                Send Email
              </Button>
            </CardContent>
          </Card>
          {/* Export Data */}
          <Card className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-cyan-400/10 shadow-xl">
            <CardHeader className="flex flex-row items-center gap-3 pb-1">
              <EyeOff className="w-6 h-6 text-cyan-400 drop-shadow-glow" />
              <CardTitle className="text-lg font-semibold text-cyan-100 tracking-wider">
                Reset Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-cyan-400 text-[#23243a] hover:bg-cyan-300 rounded-lg px-3 py-2 font-bold"
                onClick={() => resetViews()}
              >
                Reset Views
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-cyan-400 mt-8 tracking-widest">
        &copy; {new Date().getFullYear()} Vee Angels. Features Admin Panel.
      </footer>
      {/* Custom glow utility */}
      <style>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px #00fff7aa);
        }
      `}</style>
    </div>
  )
}
