import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailPage } from './pages/CandidateDetailPage';
import { ClientsPage } from './pages/ClientsPage';
import { TeamPage } from './pages/TeamPage';
import { PositionsPage } from './pages/PositionsPage';
import { ReportsPage } from './pages/ReportsPage';
import { Toaster } from './components/ui/sonner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
      />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <Layout>
              <CandidatesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/candidates/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <CandidateDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Layout>
              <ClientsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/team"
        element={
          <ProtectedRoute>
            <Layout>
              <TeamPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/positions"
        element={
          <ProtectedRoute>
            <Layout>
              <PositionsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <ReportsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </BrowserRouter>
  );
}
