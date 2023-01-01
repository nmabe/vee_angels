import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Star,
  Bookmark,
  UserPlus,
  MessageCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { getApplications } from '@/store/applications/applications-slice'
import { getAngels } from '@/store/admin/angel-slice'
import { getUsers } from '@/store/angels/user-slice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

export default function DashboardAdminPage() {
    const signUps = useSelector((state) => state.applications.applications)
    const { angelsList } = useSelector((state) => state.adminAngel)
    const { users } = useSelector((state) => state.users)
  const navigate = useNavigate();

    const dispatch = useDispatch();


  // Mock data for demonstration
  const stats = [
    {
      label: 'Total Angels',
      value: angelsList?.length ?? 0,
      icon: <Users className="w-7 h-7 text-cyan-400 drop-shadow-glow" />
    },
    {
      label: 'New Signups',
      value: signUps.length,
      icon: <UserPlus className="w-7 h-7 text-pink-400 drop-shadow-glow" />
    },
    {
      label: 'Users',
      value: users.length ?? 0,
      icon: <Bookmark className="w-7 h-7 text-violet-400 drop-shadow-glow" />
    },
    {
      label: 'Avg. Rating',
      value: 4.8,
      icon: <Star className="w-7 h-7 text-yellow-300 drop-shadow-glow" />
    }
  ]

  const extraStats = [
    {
      label: 'Active Chats',
      value: 27,
      icon: <MessageCircle className="w-5 h-5 text-cyan-400 drop-shadow-glow" />
    },
    {
      label: 'Reports',
      value: 3,
      icon: <AlertCircle className="w-5 h-5 text-pink-400 drop-shadow-glow" />
    },
    {
      label: 'Growth Rate',
      value: '+12%',
      icon: <TrendingUp className="w-5 h-5 text-green-400 drop-shadow-glow" />
    }
  ]

  const [recentActivity] = useState([
    {
      message: 'Angel Sophie Bennett joined the platform.',
      time: '2 hours ago'
    },
    { message: 'User Thulani FKP bookmarked an angel.', time: '4 hours ago' },
    { message: 'Angel Kabza received a new review.', time: '1 day ago' },
    { message: 'Angel Zanele updated her profile.', time: '2 days ago' },
    {
      message: 'User Sizwe sent a message to Angel Sophie.',
      time: '3 days ago'
    }
  ])

  const [recentReports] = useState([
    {
      user: 'Angel Kabza',
      issue: 'Inappropriate message',
      status: 'Pending',
      time: '1 hour ago'
    },
    {
      user: 'User Thulani',
      issue: 'Profile photo issue',
      status: 'Resolved',
      time: 'Yesterday'
    },
    {
      user: 'Angel Zanele',
      issue: 'Spam report',
      status: 'Pending',
      time: '2 days ago'
    }
  ])

  // Chart data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Signups',
        data: [3, 5, 7, 8, 12, 14, 13],
        borderColor: '#00fff7',
        backgroundColor: 'rgba(0,255,247,0.08)',
        tension: 0.5,
        fill: true,
        pointBackgroundColor: '#00fff7'
      }
    ]
  }

  const doughnutData = {
    labels: ['Angels', 'Users', 'Admins'],
    datasets: [
      {
        label: 'User Types',
        data: [128, 450, 3],
        backgroundColor: ['#00fff7', '#ff6fff', '#b3b3b3'],
        borderWidth: 2
      }
    ]
  }

  // Quick actions
  const handleQuickAction = (action) => {
    switch (action) {
      case 'Manage Angels':
        // Navigate to angels management page
        navigate('/admin/angels');
        break;
      case 'View Reports':
        // Navigate to reports page
        navigate('/admin/features');
        break;
      case 'Settings':
        // Navigate to settings page
        navigate('/admin/features');
        break;
      case 'Export Data':
        // Trigger data export functionality
        alert('Exporting data...')
        break;
      default:
        toast.error('Unknown action', {
          description: 'The action you selected is not recognized.',
          action: {
            label: 'Dismiss',
            onClick: () => console.log('Closed')
          },
          variant: 'destructive'
        });
        break;
    }
  }
  
  useEffect(() => {
    dispatch(getApplications());
    dispatch(getAngels());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1021] via-[#23243a] to-[#1a1b2f] py-10 px-2 md:px-10 relative overflow-hidden">
      {/* Futuristic glowing grid background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,247,0.08)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      <h1 className="text-4xl font-extrabold text-cyan-300 mb-10 text-center tracking-widest z-10 drop-shadow-glow">ADMIN DASHBOARD
      </h1>
      {/* Stats Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-cyan-400/10 shadow-xl shadow-cyan-400/10 hover:shadow-cyan-300/30 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-cyan-400/10 rounded-full p-4">{stat.icon}</div>
              <CardTitle className="text-lg font-semibold text-cyan-100 tracking-wider">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-cyan-200 drop-shadow-glow">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Data Visualizations */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <Card className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-cyan-400/10 shadow-xl flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-cyan-200 tracking-wider">
              Signups Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Line
              data={lineData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { color: "#23243a" } },
                  x: { grid: { color: "#23243a" } }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-cyan-400/10 shadow-xl flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-cyan-200 tracking-wider">
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex justify-center">
            <div className="w-44 h-44 mx-auto">
              <Doughnut
                data={doughnutData}
                options={{
                  plugins: { legend: { position: 'bottom', labels: { color: '#fff' } } }
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Extra Stats */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        {extraStats.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-2xl bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border border-pink-400/10 shadow-xl"
          >
            <CardHeader className="flex flex-row items-center gap-3 pb-1">
              <div className="bg-pink-400/10 rounded-full p-3">{stat.icon}</div>
              <CardTitle className="text-base font-semibold text-pink-100 tracking-wider">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-200 drop-shadow-glow">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Recent Activity & Reports */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-[#23243a] to-[#1a1b2f] rounded-2xl border border-cyan-400/10 shadow-xl p-6">
          <h2 className="text-xl font-bold text-cyan-200 mb-4 tracking-wider">
            Recent Activity
          </h2>
          <ul className="divide-y divide-cyan-900/40">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="py-3 flex justify-between items-center">
                <span className="text-cyan-100">{item.message}</span>
                <span className="text-xs text-cyan-400">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Recent Reports */}
        <div className="bg-gradient-to-br from-[#23243a] to-[#1a1b2f] rounded-2xl border border-pink-400/10 shadow-xl p-6">
          <h2 className="text-xl font-bold text-pink-200 mb-4 tracking-wider">
            Recent Reports
          </h2>
          <ul className="divide-y divide-pink-900/40">
            {recentReports.map((report, idx) => (
              <li
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1"
              >
                <span className="text-pink-100">
                  <b>{report.user}</b>: {report.issue}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    report.status === 'Pending'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`}
                >
                  {report.status}
                </span>
                <span className="text-xs text-pink-400">{report.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="relative z-10 flex flex-col md:flex-row gap-4 justify-center mb-10">
        <Button
          className="bg-cyan-400 text-[#23243a] hover:bg-cyan-300 rounded-xl px-8 py-4 font-extrabold tracking-widest shadow-cyan-400/30 shadow-lg border-2 border-cyan-300/40"
          onClick={() => handleQuickAction('Manage Angels')}
        >
          Manage Angels
        </Button>
        <Button
          variant="outline"
          className="border-pink-400 text-pink-200 hover:bg-pink-400/10 rounded-xl px-8 py-4 font-extrabold tracking-widest shadow-pink-400/30 shadow-lg"
          onClick={() => handleQuickAction('View Reports')}
        >
          View Reports
        </Button>
        <Button
          variant="outline"
          className="border-cyan-400 text-cyan-200 hover:bg-cyan-400/10 rounded-xl px-8 py-4 font-extrabold tracking-widest shadow-cyan-400/30 shadow-lg"
          onClick={() => handleQuickAction('Settings')}
        >
          Settings
        </Button>
        <Button
          variant="outline"
          className="border-yellow-400 text-yellow-200 hover:bg-yellow-400/10 rounded-xl px-8 py-4 font-extrabold tracking-widest shadow-yellow-400/30 shadow-lg"
          onClick={() => handleQuickAction('Export Data')}
        >
          Export Data
        </Button>
      </div>
      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-cyan-400 mt-8 tracking-widest">
        &copy; {new Date().getFullYear()} Vee Angels. Admin Dashboard.
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
