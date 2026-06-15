import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid 
} from 'recharts';

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#a855f7'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-cyan-400 animate-pulse text-xl">Loading Analytics...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-400">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Visitors" value={stats.total} icon="👥" color="text-blue-400" />
        <StatCard title="Unique Visitors" value={stats.unique} icon="👤" color="text-purple-400" />
        <StatCard title="Today's Visits" value={stats.today} icon="⚡" color="text-green-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Traffic (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.traffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} 
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Line type="monotone" dataKey="visits" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Device Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.devices}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 space-x-4">
            {stats.devices.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-sm text-gray-300">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}: {entry.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Countries Bar Chart */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">Top Countries</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.countries}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                cursor={{ fill: '#374151' }}
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} 
              />
              <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">Recent Visitors</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-sm">
                <th className="pb-3 px-4 font-medium">Time</th>
                <th className="pb-3 px-4 font-medium">Location</th>
                <th className="pb-3 px-4 font-medium">System</th>
                <th className="pb-3 px-4 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {stats.recent.map((visitor) => (
                <tr key={visitor.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                  <td className="py-3 px-4 text-gray-300 whitespace-nowrap">
                    {new Date(visitor.visited_at).toLocaleString('en-US', {
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-200">{visitor.city !== 'Unknown' ? visitor.city : ''} {visitor.country}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-cyan-400">{visitor.browser}</div>
                    <div className="text-xs text-gray-500">{visitor.device_type} • {visitor.os}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 max-w-xs truncate" title={visitor.referrer}>
                    {visitor.referrer === 'Direct' ? 'Direct' : new URL(visitor.referrer).hostname}
                  </td>
                </tr>
              ))}
              {stats.recent.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">No recent visitors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
    </div>
    <div className="text-4xl opacity-80">{icon}</div>
  </div>
);

export default Dashboard;
