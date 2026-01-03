import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Lock, AlertCircle, Info } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<LoginForm>({
    schema: loginSchema,
    initialValues: { email: 'admin@portfolio.com', password: 'password123', remember: false },
    onSubmit: async (data) => {
      // Simulate API call for demonstration (Replace with adminApi.login(data) in real prod)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.email === 'admin@portfolio.com' && data.password === 'password123') {
        login('fake-jwt-token-xyz', { id: '1', email: data.email, role: 'admin', created_at: new Date().toISOString() });
        navigate('/admin');
      } else {
        alert('Invalid credentials (Try: admin@portfolio.com / password123)');
      }
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <Lock className="h-6 w-6 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-500">Enter your credentials to access the dashboard</p>
        </div>

        {/* Dev Hint */}
        <div className="mb-6 rounded-md bg-blue-50 p-4 text-sm text-blue-700">
          <div className="flex items-start">
            <Info className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
            <div>
              <p className="font-semibold">Demo Credentials:</p>
              <p>Email: <span className="font-mono">admin@portfolio.com</span></p>
              <p>Password: <span className="font-mono">password123</span></p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
            <input
              type="email"
              className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-primary-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="admin@example.com"
            />
            {errors.email && <p className="mt-1 flex items-center text-xs text-red-500"><AlertCircle className="mr-1 h-3 w-3" />{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-primary-500 ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 flex items-center text-xs text-red-500"><AlertCircle className="mr-1 h-3 w-3" />{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                checked={values.remember}
                onChange={(e) => handleChange('remember', e.target.checked)}
              />
              <span className="ml-2 text-sm text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
          </div>

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};