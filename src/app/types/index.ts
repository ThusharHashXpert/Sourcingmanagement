export type UserRole = 'Admin' | 'BDM' | 'AM' | 'Recruiter';

export type CandidateStatus = 
  | 'New'
  | 'Screening'
  | 'Interview Level 1'
  | 'Interview Level 2'
  | 'Interview Level 3'
  | 'Interview Level 4'
  | 'Offered'
  | 'Joined'
  | 'Rejected'
  | 'On Hold';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  clientId: string;
  clientName: string;
  status: CandidateStatus;
  assignedRecruiterId: string;
  assignedRecruiterName: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  experience: string;
  skills: string[];
  education: string;
  location: string;
  nextInterviewDate?: string;
  joinDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewLevel {
  level: number;
  date?: string;
  status: 'Pending' | 'Scheduled' | 'Completed' | 'Passed' | 'Failed';
  interviewer?: string;
  feedback?: string;
  scheduledTime?: string;
}

export interface Comment {
  id: string;
  candidateId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  location: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  openPositions: number;
  activeContracts: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface Position {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  description: string;
  requiredSkills: string[];
  experience: string;
  budget: string;
  openings: number;
  filled: number;
  status: 'Open' | 'Closed' | 'On Hold';
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'candidate_added' | 'interview_scheduled' | 'status_changed' | 'offer_sent' | 'candidate_joined';
  title: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export interface DashboardStats {
  totalCandidates: number;
  openPositions: number;
  pendingInterviews: number;
  placementRate: number;
  candidatesTrend: number;
  positionsTrend: number;
  interviewsTrend: number;
  placementTrend: number;
}
