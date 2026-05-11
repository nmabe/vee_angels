import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserX, UserCheck, Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '@/store/angels/user-slice'
import { useEffect } from 'react'

// Mock user data for demonstration
const mockUsers = [
  {
    id: 1,
    name: 'Sophie Bennett',
    email: 'sophie.bennett@email.com',
    role: 'Admin',
    status: 'Active',
    joined: '2025-04-12',
    image: 'https://via.placeholder.com/48x48/F0F8FF/696969?text=SB'
  },
  {
    id: 2,
    name: 'Thulani FKP',
    email: 'thulani.fkp@email.com',
    role: 'User',
    status: 'Suspended',
    joined: '2025-03-28',
    image: 'https://via.placeholder.com/48x48/F0F8FF/696969?text=TF'
  },
  {
    id: 3,
    name: 'Kabza',
    email: 'kabza@email.com',
    role: 'User',
    status: 'Active',
    joined: '2025-02-10',
    image: 'https://via.placeholder.com/48x48/F0F8FF/696969?text=KZ'
  },
  {
    id: 4,
    name: 'Zanele',
    email: 'zanele@email.com',
    role: 'Admin',
    status: 'Active',
    joined: '2025-01-15',
    image: 'https://via.placeholder.com/48x48/F0F8FF/696969?text=ZA'
  }
]

export default function UsersAdminPage() {
    const { users } = useSelector((state) => state.users)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const handleStatusToggle = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === 'Active' ? 'Suspended' : 'Active'
            }
          : u
      )
    )
  }
  const filteredUsers = []

/*
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  )*/

  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers])
  

  return (
    <div className="fixed inset-0 min-h-screen min-w-full bg-gradient-to-br from-[#0f1021] via-[#23243a] to-[#1a1b2f] flex flex-col relative overflow-hidden">
      {/* Futuristic glowing grid background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,247,0.08)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      <h1 className="text-3xl font-extrabold text-cyan-300 mb-8 text-center tracking-widest z-10 drop-shadow-glow mt-8">
        USERS ADMIN PANEL
      </h1>
      {/* Search Bar */}
      <div className="relative z-10 flex justify-end mb-8 px-6">
        <div className="flex items-center bg-[#23243a] rounded-xl px-4 py-2 border border-cyan-400/20 shadow">
          <Search className="w-5 h-5 text-cyan-300 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-cyan-100 placeholder-cyan-400 w-48"
          />
        </div>
      </div>
      {/* Users Table */}
      <div className="relative z-10 bg-gradient-to-br from-[#23243a] to-[#1a1b2f] rounded-2xl border border-cyan-400/10 shadow-xl p-6 overflow-x-auto flex-1 mx-0">
        <table className="min-w-full text-cyan-100">
          <thead>
            <tr className="border-b border-cyan-400/10">
              <th className="py-3 px-4 text-left font-semibold tracking-wider">
                Profile
              </th>
              <th className="py-3 px-4 text-left font-semibold tracking-wider">
                Name
              </th>
              <th className="py-3 px-4 text-left font-semibold tracking-wider">
                Email
              </th>
              <th className="py-3 px-4 text-left font-semibold tracking-wider">
                Role
              </th>
              <th className="py-3 px-4 text-left font-semibold tracking-wider">
                Joined
              </th>
              <th className="py-3 px-4 text-left font-semibold tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-center font-semibold tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-cyan-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-cyan-400/5 hover:bg-cyan-400/5 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={user.profPic }
                      alt={user.username}
                      className="bg-white w-12 h-12 rounded-full object-cover border-2 border-cyan-400/30 shadow"
                    />
                  </td>
                  <td className="py-3 px-4 font-bold">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">{user.joined}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === 'Active'
                          ? 'bg-cyan-400/20 text-cyan-200'
                          : 'bg-pink-400/20 text-pink-200'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <Button
                      size="sm"
                      className={`rounded-lg px-4 py-1 font-bold tracking-widest ${
                        user.status === 'Active'
                          ? 'bg-pink-400 text-[#23243a] hover:bg-pink-300'
                          : 'bg-cyan-400 text-[#23243a] hover:bg-cyan-300'
                      }`}
                      onClick={() => handleStatusToggle(user.id)}
                    >
                      {user.status === 'Active' ? (
                        <>
                          <UserX className="w-4 h-4 mr-1" /> Suspend
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4 mr-1" /> Activate
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-cyan-400 mt-8 tracking-widest">
        &copy; {new Date().getFullYear()} Vee Angels. Users Admin Panel.
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
