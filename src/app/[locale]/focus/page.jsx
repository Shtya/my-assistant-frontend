'use client';
import { useState, useEffect } from 'react';

export default function EmployeeMonitoringSystem() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
          <h1 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Employee Monitor</h1>
          
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'map' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Virtual Map
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'activity' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Activity History
            </button>
            <button
              onClick={() => setActiveTab('meetings')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'meetings' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Meetings
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'attendance' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              HR Attendance
            </button>
          </nav>

          <div className="mt-8">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'map' && <VirtualMap />}
          {activeTab === 'activity' && <ActivityHistory />}
          {activeTab === 'meetings' && <MeetingManagement />}
          {activeTab === 'attendance' && <HRAttendance />}
        </div>
      </div>
    </div>
  );
}

// app/components.tsx

// Dark Mode Toggle Component
export function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
    >
      {darkMode ? (
        <>
          <span>☀️</span> Light Mode
        </>
      ) : (
        <>
          <span>🌙</span> Dark Mode
        </>
      )}
    </button>
  );
}

// User Management Component
export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('employee');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data
    setUsers([
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'manager', status: 'active' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'employee', status: 'active' },
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'employee', status: 'inactive' },
    ]);
  }, []);

  const handleInvite = () => {
    if (!inviteEmail) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsers([...users, {
        id: `${users.length + 1}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: selectedRole,
        status: 'pending'
      }]);
      setInviteEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Invite New User</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
          >
            <option value="manager">Manager</option>
            <option value="supervisor">Supervisor</option>
            <option value="employee">Employee</option>
          </select>
          <button
            onClick={handleInvite}
            disabled={loading || !inviteEmail}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Invite'}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">User List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : user.status === 'pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Virtual Map Component
export function VirtualMap() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Mock data
    setEmployees([
      { id: '1', name: 'John Doe', position: { x: 100, y: 150 }, status: 'active', avatar: '👨‍💻' },
      { id: '2', name: 'Jane Smith', position: { x: 250, y: 200 }, status: 'meeting', avatar: '👩‍💻' },
      { id: '3', name: 'Mike Johnson', position: { x: 400, y: 100 }, status: 'idle', avatar: '🧑‍💻' },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Virtual Office Map</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg h-96 overflow-hidden">
          {/* Office background */}
          <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20">
            {/* Office desks */}
            <div className="absolute w-32 h-24 bg-white dark:bg-gray-700 rounded-md shadow" style={{ top: '50px', left: '50px' }}></div>
            <div className="absolute w-32 h-24 bg-white dark:bg-gray-700 rounded-md shadow" style={{ top: '50px', left: '250px' }}></div>
            <div className="absolute w-32 h-24 bg-white dark:bg-gray-700 rounded-md shadow" style={{ top: '200px', left: '150px' }}></div>
          </div>

          {/* Employee avatars */}
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="absolute flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
              style={{ top: `${employee.position.y}px`, left: `${employee.position.x}px` }}
              title={employee.name}
            >
              <div className={`text-2xl p-2 rounded-full ${
                employee.status === 'active' 
                  ? 'bg-green-100 dark:bg-green-900' 
                  : employee.status === 'meeting' 
                    ? 'bg-yellow-100 dark:bg-yellow-900' 
                    : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                {employee.avatar}
              </div>
              <span className="text-xs mt-1 bg-black bg-opacity-50 text-white px-1 rounded whitespace-nowrap">
                {employee.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
export function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Mock data
    setEmployees([
      { id: '1', name: 'John Doe', status: 'active', device: 'open', lastActivity: '2 min ago', productivity: 85 },
      { id: '2', name: 'Jane Smith', status: 'idle', device: 'idle', lastActivity: '15 min ago', productivity: 65 },
      { id: '3', name: 'Mike Johnson', status: 'inactive', device: 'offline', lastActivity: '1 hour ago', productivity: 0 },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Employees</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">On Time Today</h3>
          <p className="text-2xl font-bold">85%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Productivity</h3>
          <p className="text-2xl font-bold">7.2/10</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">Employee Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Productivity</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.status === 'active' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : employee.status === 'idle' 
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.device === 'open' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : employee.device === 'idle' 
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {employee.device}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{employee.lastActivity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${employee.productivity}%` }}
                        ></div>
                      </div>
                      <span className="text-xs ml-2">{employee.productivity}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Activity History Component
export function ActivityHistory() {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [dateRange, setDateRange] = useState('today');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Mock data
    if (selectedEmployee) {
      setActivities([
        {
          id: '1',
          date: new Date().toISOString().split('T')[0],
          checkIn: '09:05 AM',
          checkOut: '05:32 PM',
          screenshots: 12,
          idleTime: '1h 23m',
          tabsUsed: ['Gmail', 'Jira', 'VS Code', 'Slack'],
        },
        {
          id: '2',
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          checkIn: '08:58 AM',
          checkOut: '05:45 PM',
          screenshots: 15,
          idleTime: '45m',
          tabsUsed: ['Gmail', 'Figma', 'Slack', 'Notion'],
        }
      ]);
    } else {
      setActivities([]);
    }
  }, [selectedEmployee]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Activity History</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
          >
            <option value="">Select Employee</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
            <option value="3">Mike Johnson</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {!selectedEmployee ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Please select an employee to view their activity history
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No activities found for the selected period
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check In/Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Screenshots</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Idle Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tabs Used</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{activity.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>{activity.checkIn}</div>
                      <div>{activity.checkOut}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{activity.screenshots}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{activity.idleTime}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {activity.tabsUsed.slice(0, 3).map((tab, index) => (
                          <span key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                            {tab}
                          </span>
                        ))}
                        {activity.tabsUsed.length > 3 && (
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                            +{activity.tabsUsed.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Meeting Management Component
export function MeetingManagement() {
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    attendees: [],
    message: ''
  });

  useEffect(() => {
    // Mock data
    setMeetings([
      {
        id: '1',
        title: 'Project Kickoff',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '10:00 AM',
        attendees: ['John Doe', 'Jane Smith'],
        status: 'accepted',
        message: 'Please prepare your project ideas'
      },
      {
        id: '2',
        title: 'Monthly Review',
        date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        time: '02:00 PM',
        attendees: ['All Team'],
        status: 'pending',
        message: 'Monthly performance review'
      }
    ]);
  }, []);

  const handleCreateMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) return;
    
    const meeting = {
      id: `${meetings.length + 1}`,
      title: newMeeting.title,
      date: newMeeting.date,
      time: newMeeting.time,
      attendees: newMeeting.attendees.length ? newMeeting.attendees : ['All Team'],
      status: 'pending',
      message: newMeeting.message
    };
    
    setMeetings([meeting, ...meetings]);
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      attendees: [],
      message: ''
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Meeting Management</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Schedule New Meeting</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Meeting Title"
            value={newMeeting.title}
            onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
              className="rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
            />
            <input
              type="time"
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
              className="rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
            />
          </div>
          
          <textarea
            placeholder="Message (optional)"
            value={newMeeting.message}
            onChange={(e) => setNewMeeting({...newMeeting, message: e.target.value})}
            rows={3}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
          />
          
          <button
            onClick={handleCreateMeeting}
            disabled={!newMeeting.title || !newMeeting.date || !newMeeting.time}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Schedule Meeting
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">Upcoming Meetings</h3>
        </div>
        {meetings.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No meetings scheduled
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{meeting.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {meeting.date} at {meeting.time}
                    </p>
                    {meeting.message && (
                      <p className="text-sm mt-1">{meeting.message}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    meeting.status === 'accepted' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : meeting.status === 'pending' 
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {meeting.status}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Attendees: {meeting.attendees.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// HR Attendance Component
export function HRAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Mock data
    setAttendance([
      { id: '1', name: 'John Doe', checkIn: '09:05 AM', checkOut: '05:32 PM', status: 'on-time' },
      { id: '2', name: 'Jane Smith', checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'on-time' },
      { id: '3', name: 'Mike Johnson', checkIn: '09:35 AM', checkOut: '--', status: 'late' },
      { id: '4', name: 'Sarah Williams', checkIn: '--', checkOut: '--', status: 'absent' },
    ]);
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">HR Attendance</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg font-semibold mb-2 sm:mb-0">Daily Attendance</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{record.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{record.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.status === 'on-time' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : record.status === 'late' 
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Employees</h3>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Present Today</h3>
            <p className="text-2xl font-bold">18</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Late Today</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Absent Today</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}