import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Users, Briefcase, Target } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', candidates: 32, placements: 18, interviews: 45 },
  { month: 'Feb', candidates: 45, placements: 24, interviews: 62 },
  { month: 'Mar', candidates: 38, placements: 22, interviews: 51 },
  { month: 'Apr', candidates: 52, placements: 28, interviews: 68 },
  { month: 'May', candidates: 48, placements: 31, interviews: 59 },
  { month: 'Jun', candidates: 61, placements: 35, interviews: 73 },
];

const recruiterPerformance = [
  { name: 'Michael Brown', candidates: 28, placements: 15 },
  { name: 'Lisa Davis', candidates: 24, placements: 12 },
  { name: 'Emily Johnson', candidates: 19, placements: 10 },
  { name: 'John Smith', candidates: 16, placements: 8 },
];

const statusPieData = [
  { name: 'New', value: 12, color: '#3b82f6' },
  { name: 'Screening', value: 8, color: '#8b5cf6' },
  { name: 'Interview', value: 15, color: '#f59e0b' },
  { name: 'Offered', value: 5, color: '#06b6d4' },
  { name: 'Joined', value: 8, color: '#10b981' },
];

export function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-500 mt-1">Performance insights and metrics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Candidates</p>
                <p className="text-3xl font-semibold mt-1">304</p>
                <p className="text-xs text-green-600 mt-1">↑ 18% vs last period</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Placements</p>
                <p className="text-3xl font-semibold mt-1">158</p>
                <p className="text-xs text-green-600 mt-1">↑ 22% vs last period</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Avg. Time to Hire</p>
                <p className="text-3xl font-semibold mt-1">21d</p>
                <p className="text-xs text-green-600 mt-1">↓ 3 days improved</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Success Rate</p>
                <p className="text-3xl font-semibold mt-1">68.5%</p>
                <p className="text-xs text-green-600 mt-1">↑ 4.2% vs last period</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Candidate Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="candidates" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Candidates"
                />
                <Line 
                  type="monotone" 
                  dataKey="placements" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Placements"
                />
                <Line 
                  type="monotone" 
                  dataKey="interviews" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Interviews"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recruiter Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Recruiter Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recruiterPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="candidates" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Candidates" />
              <Bar dataKey="placements" fill="#10b981" radius={[8, 8, 0, 0]} name="Placements" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'TechCorp Solutions', placements: 12, color: 'bg-blue-500' },
                { name: 'HealthTech Medical', placements: 9, color: 'bg-green-500' },
                { name: 'FinanceHub Inc', placements: 7, color: 'bg-purple-500' },
                { name: 'EduLearn Platform', placements: 5, color: 'bg-orange-500' },
              ].map((client, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${client.color}`} />
                    <span className="text-sm">{client.name}</span>
                  </div>
                  <span className="text-sm font-medium">{client.placements} placements</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { position: 'Full Stack Developer', count: 15 },
                { position: 'Data Engineer', count: 11 },
                { position: 'Financial Analyst', count: 8 },
                { position: 'Product Manager', count: 6 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.position}</span>
                  <span className="text-sm font-medium text-blue-600">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { level: 'Level 1', rate: 85 },
                { level: 'Level 2', rate: 72 },
                { level: 'Level 3', rate: 58 },
                { level: 'Level 4', rate: 45 },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.level}</span>
                    <span className="font-medium">{item.rate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
