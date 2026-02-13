import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../components/StatusBadge';
import { mockPositions } from '../data/mockData';
import { Plus, Search, Briefcase } from 'lucide-react';

export function PositionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPositions = mockPositions.filter(position => 
    position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    position.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Open Positions</h1>
          <p className="text-slate-500 mt-1">{filteredPositions.length} positions available</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Position
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search positions by title or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPositions.map((position) => (
          <Card key={position.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{position.title}</CardTitle>
                    <p className="text-sm text-slate-500">{position.clientName}</p>
                  </div>
                </div>
                <StatusBadge status={position.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Experience</span>
                <span className="font-medium">{position.experience}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Budget</span>
                <span className="font-medium text-green-600">{position.budget}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">Openings</span>
                  <div className="flex gap-2">
                    <Badge variant="outline">{position.filled} Filled</Badge>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {position.openings - position.filled} Open
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(position.filled / position.openings) * 100}%` }}
                  />
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-slate-500 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-1">
                  {position.requiredSkills.slice(0, 4).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {position.requiredSkills.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{position.requiredSkills.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Positions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Positions - Table View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Openings</TableHead>
                  <TableHead>Filled</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.map((position) => (
                  <TableRow key={position.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell className="font-medium">{position.title}</TableCell>
                    <TableCell>{position.clientName}</TableCell>
                    <TableCell>{position.experience}</TableCell>
                    <TableCell className="text-green-600 font-medium">{position.budget}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{position.openings}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {position.filled}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={position.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
