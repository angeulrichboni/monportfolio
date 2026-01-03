import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Public Components
import { Layout } from './components/layout/Layout';
import { Home } from './features/home/Home';
import { Projects } from './features/projects/Projects';
import { ProjectDetails } from './features/projects/ProjectDetails';
import { Skills } from './features/skills/Skills';
import { Contact } from './features/contact/Contact';
import { Experience } from './features/experience/Experience';
import { Education } from './features/education/Education';

// Admin Components
import { AuthProvider } from './admin/context/AuthContext';
import { ProtectedRoute } from './admin/components/shared/ProtectedRoute';
import { Login } from './admin/pages/Login';
import { AdminLayout } from './admin/components/layout/AdminLayout';
import { Dashboard } from './admin/pages/Dashboard';
import { ProjectList } from './admin/pages/projects/ProjectList';
import { EducationList } from './admin/pages/education/EducationList';
import { ExperienceList } from './admin/pages/experience/ExperienceList';
import { SkillManager } from './admin/pages/skills/SkillManager';
import { BlogList } from './admin/pages/blog/BlogList';

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetails />} />
              <Route path="skills" element={<Skills />} />
              <Route path="experience" element={<Experience />} />
              <Route path="education" element={<Education />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectList />} />
              <Route path="education" element={<EducationList />} />
              <Route path="experiences" element={<ExperienceList />} />
              <Route path="skills" element={<SkillManager />} />
              <Route path="blog" element={<BlogList />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;