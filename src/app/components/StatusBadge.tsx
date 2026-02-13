import type { CandidateStatus } from '../types';
import { Badge } from './ui/badge';

interface StatusBadgeProps {
  status: CandidateStatus | 'Open' | 'Closed' | 'On Hold' | 'Active' | 'Inactive';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
      case 'Open':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Screening':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'Interview Level 1':
      case 'Interview Level 2':
      case 'Interview Level 3':
      case 'Interview Level 4':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Offered':
        return 'bg-cyan-100 text-cyan-700 hover:bg-cyan-100';
      case 'Joined':
      case 'Active':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Rejected':
      case 'Closed':
      case 'Inactive':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'On Hold':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} border-0`}>
      {status}
    </Badge>
  );
}