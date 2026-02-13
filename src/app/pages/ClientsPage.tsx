import { useState, useMemo } from 'react';
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
import { mockClients } from '../data/mockData';
import { Plus, Search, Building2, Phone, Mail, MapPin } from 'lucide-react';

export function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = useMemo(() => {
    return mockClients.filter(client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Clients</h1>
          <p className="text-slate-500 mt-1">{filteredClients.length} active clients</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search clients by name, industry, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <p className="text-sm text-slate-500">{client.industry}</p>
                  </div>
                </div>
                <StatusBadge status={client.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{client.location}</span>
              </div>
              
              <div className="pt-2 border-t space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-medium">{client.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="h-3 w-3 text-slate-400" />
                  <span className="text-xs">{client.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="h-3 w-3 text-slate-400" />
                  <span className="text-xs">{client.contactPhone}</span>
                </div>
              </div>

              <div className="pt-3 border-t flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Open Positions</p>
                  <p className="text-2xl font-semibold text-blue-600">{client.openPositions}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Active Contracts</p>
                  <p className="text-2xl font-semibold text-green-600">{client.activeContracts}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-2">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Clients Table View */}
      <Card>
        <CardHeader>
          <CardTitle>All Clients - Table View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Open Positions</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>{client.location}</TableCell>
                    <TableCell>{client.contactPerson}</TableCell>
                    <TableCell className="text-sm text-slate-600">{client.contactEmail}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{client.openPositions}</Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={client.status} />
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
