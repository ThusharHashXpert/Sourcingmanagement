import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Briefcase, Calendar, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { mockDashboardStats, mockActivities } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatDistanceToNow } from 'date-fns';

const candidateChartData = [
  { month: 'Jan', candidates: 32, placements: 18 },
  { month: 'Feb', candidates: 45, placements: 24 },
  { month: 'Mar', candidates: 38, placements: 22 },
  { month: 'Apr', candidates: 52, placements: 28 },
  { month: 'May', candidates: 48, placements: 31 },
  { month: 'Jun', candidates: 61, placements: 35 },
];

const statusDistribution = [
  { status: 'New', count: 12 },
  { status: 'Screening', count: 8 },
  { status: 'Interview', count: 15 },
  { status: 'Offered', count: 5 },
  { status: 'Joined', count: 8 },
];

export function DashboardPage() {
  const stats = mockDashboardStats;

  const KPICard = ({ 
    title, 
    value, 
    trend, 
    icon: Icon,
    color 
  }: { 
    title: string; 
    value: string | number; 
    trend: number; 
    icon: any;
    color: string;
  }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">{title}</p>
            <h3 className="text-3xl font-semibold">{value}</h3>
            <div className="flex items-center mt-2">
              {trend > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(trend)}%
              </span>
              <span className="text-xs text-slate-500 ml-2">vs last month</span>
            </div>
          </div>
          <div className={`${color} p-3 rounded-lg`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Candidates"
          value={stats.totalCandidates}
          trend={stats.candidatesTrend}
          icon={Users}
          color="bg-blue-500"
        />
        <KPICard
          title="Open Positions"
          value={stats.openPositions}
          trend={stats.positionsTrend}
          icon={Briefcase}
          color="bg-purple-500"
        />
        <KPICard
          title="Pending Interviews"
          value={stats.pendingInterviews}
          trend={stats.interviewsTrend}
          icon={Calendar}
          color="bg-orange-500"
        />
        <KPICard
          title="Placement Rate"
          value={`${stats.placementRate}%`}
          trend={stats.placementTrend}
          icon={TrendingUp}
          color="bg-green-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Pipeline Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Pipeline Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={candidateChartData}>
                <defs>
                  <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="candidates" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorCandidates)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="placements" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorPlacements)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Current Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="status" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className={`
                  p-2 rounded-lg
                  ${activity.type === 'candidate_joined' ? 'bg-green-100' : ''}
                  ${activity.type === 'offer_sent' ? 'bg-blue-100' : ''}
                  ${activity.type === 'interview_scheduled' ? 'bg-yellow-100' : ''}
                  ${activity.type === 'status_changed' ? 'bg-purple-100' : ''}
                  ${activity.type === 'candidate_added' ? 'bg-cyan-100' : ''}
                `}>
                  {activity.type === 'candidate_joined' && <TrendingUp className="h-5 w-5 text-green-600" />}
                  {activity.type === 'offer_sent' && <Briefcase className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'interview_scheduled' && <Calendar className="h-5 w-5 text-yellow-600" />}
                  {activity.type === 'status_changed' && <Users className="h-5 w-5 text-purple-600" />}
                  {activity.type === 'candidate_added' && <Users className="h-5 w-5 text-cyan-600" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <p className="text-sm text-slate-500">{activity.description}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {activity.userName} · {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
