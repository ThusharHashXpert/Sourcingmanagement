import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { StatusBadge } from '../components/StatusBadge';
import { mockCandidates } from '../data/mockData';
import { Plus, Search, Filter, Download } from 'lucide-react';
import type { CandidateStatus } from '../types';
import { format } from 'date-fns';

export function CandidatesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.clientName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCandidates(new Set(filteredCandidates.map(c => c.id)));
    } else {
      setSelectedCandidates(new Set());
    }
  };

  const handleSelectCandidate = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedCandidates);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedCandidates(newSelected);
  };

  const uniqueStatuses: CandidateStatus[] = [
    'New',
    'Screening',
    'Interview Level 1',
    'Interview Level 2',
    'Interview Level 3',
    'Interview Level 4',
    'Offered',
    'Joined',
    'Rejected',
    'On Hold',
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Candidates</h1>
          <p className="text-slate-500 mt-1">{filteredCandidates.length} candidates found</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search by name, email, position, or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {selectedCandidates.size > 0 && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-slate-600">
                {selectedCandidates.size} selected
              </span>
              <Button size="sm" variant="outline">Assign Recruiter</Button>
              <Button size="sm" variant="outline">Update Status</Button>
              <Button size="sm" variant="outline" className="text-red-600">Delete</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.size === filteredCandidates.length && filteredCandidates.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-slate-300"
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recruiter</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Expected CTC</TableHead>
                  <TableHead>Next Interview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-slate-500">
                      No candidates found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <TableRow 
                      key={candidate.id}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => navigate(`/candidates/${candidate.id}`)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedCandidates.has(candidate.id)}
                          onChange={(e) => handleSelectCandidate(candidate.id, e.target.checked)}
                          className="rounded border-slate-300"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-slate-500">{candidate.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>{candidate.clientName}</TableCell>
                      <TableCell>
                        <StatusBadge status={candidate.status} />
                      </TableCell>
                      <TableCell className="text-sm">{candidate.assignedRecruiterName}</TableCell>
                      <TableCell className="text-sm">{candidate.experience}</TableCell>
                      <TableCell className="text-sm font-medium">{candidate.expectedCTC}</TableCell>
                      <TableCell className="text-sm">
                        {candidate.nextInterviewDate ? (
                          <span className="text-orange-600">
                            {format(new Date(candidate.nextInterviewDate), 'MMM dd, yyyy')}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
