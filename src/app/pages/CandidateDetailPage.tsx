import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { StatusBadge } from '../components/StatusBadge';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  DollarSign,
  Calendar,
  User,
  Edit,
  Save,
  CheckCircle2,
  Circle,
  Clock
} from 'lucide-react';
import { mockCandidates, mockInterviewLevels, mockComments } from '../data/mockData';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import type { InterviewLevel } from '../types';

export function CandidateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');

  const candidate = mockCandidates.find(c => c.id === id);
  const interviewLevels = id ? mockInterviewLevels[id] || [] : [];
  const comments = id ? mockComments[id] || [] : [];

  if (!candidate) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">Candidate not found</h2>
          <Button onClick={() => navigate('/candidates')} className="mt-4">
            Back to Candidates
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveComment = () => {
    if (newComment.trim()) {
      toast.success('Comment added successfully');
      setNewComment('');
    }
  };

  const getInterviewIcon = (level: InterviewLevel) => {
    if (level.status === 'Passed' || level.status === 'Completed') {
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    } else if (level.status === 'Scheduled') {
      return <Clock className="h-5 w-5 text-yellow-600" />;
    } else if (level.status === 'Failed') {
      return <Circle className="h-5 w-5 text-red-600" />;
    } else {
      return <Circle className="h-5 w-5 text-slate-300" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/candidates')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{candidate.name}</h1>
            <p className="text-slate-500 mt-1">{candidate.position} at {candidate.clientName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => { setIsEditing(false); toast.success('Changes saved'); }}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={candidate.name} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <Input value={candidate.email} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <Input value={candidate.phone} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <Input value={candidate.location} disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position Applied</Label>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <Input value={candidate.position} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Total Experience</Label>
                  <Input value={candidate.experience} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Current CTC</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <Input value={candidate.currentCTC} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Expected CTC</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <Input value={candidate.expectedCTC} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notice Period</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <Input value={candidate.noticePeriod} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Assigned Recruiter</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <Input value={candidate.assignedRecruiterName} disabled={!isEditing} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Education</Label>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-slate-400" />
                  <Input value={candidate.education} disabled={!isEditing} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Timeline */}
          {interviewLevels.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Interview Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviewLevels.map((level, index) => (
                    <div key={level.level} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">{getInterviewIcon(level)}</div>
                        {index < interviewLevels.length - 1 && (
                          <div className="w-0.5 h-full bg-slate-200" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Level {level.level} Interview</h4>
                          <Badge 
                            className={
                              level.status === 'Passed' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                              level.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' :
                              level.status === 'Failed' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                              'bg-slate-100 text-slate-700 hover:bg-slate-100'
                            }
                          >
                            {level.status}
                          </Badge>
                        </div>
                        {level.date && (
                          <p className="text-sm text-slate-500">
                            {format(new Date(level.date), 'MMM dd, yyyy')} 
                            {level.scheduledTime && ` at ${level.scheduledTime}`}
                          </p>
                        )}
                        {level.interviewer && (
                          <p className="text-sm text-slate-600 mt-1">Interviewer: {level.interviewer}</p>
                        )}
                        {level.feedback && (
                          <p className="text-sm text-slate-600 mt-2 p-2 bg-slate-50 rounded">
                            {level.feedback}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comments Thread */}
          <Card>
            <CardHeader>
              <CardTitle>Comments & Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-primary pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.userName}</span>
                      <span className="text-xs text-slate-400">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{comment.content}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <Label>Add Comment</Label>
                  <Textarea
                    placeholder="Add a note or comment about this candidate..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <Button size="sm" onClick={handleSaveComment}>
                    Add Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Status */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <StatusBadge status={candidate.status} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Update Status
                </Button>
                <Button className="w-full" variant="outline">
                  Schedule Interview
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Send Offer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Applied on</p>
                <p className="font-medium">{format(new Date(candidate.createdAt), 'MMM dd, yyyy')}</p>
              </div>
              <Separator />
              <div>
                <p className="text-slate-500">Last Updated</p>
                <p className="font-medium">{format(new Date(candidate.updatedAt), 'MMM dd, yyyy')}</p>
              </div>
              <Separator />
              <div>
                <p className="text-slate-500">Client</p>
                <p className="font-medium">{candidate.clientName}</p>
              </div>
              {candidate.nextInterviewDate && (
                <>
                  <Separator />
                  <div>
                    <p className="text-slate-500">Next Interview</p>
                    <p className="font-medium text-orange-600">
                      {format(new Date(candidate.nextInterviewDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </>
              )}
              {candidate.joinDate && (
                <>
                  <Separator />
                  <div>
                    <p className="text-slate-500">Join Date</p>
                    <p className="font-medium text-green-600">
                      {format(new Date(candidate.joinDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
