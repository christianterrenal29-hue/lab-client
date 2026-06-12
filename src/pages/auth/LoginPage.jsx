import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="bg-primary-600 px-6 py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-primary-100 mt-1">
            Top Link Global College
          </p>
          <p className="text-primary-200 text-sm">
            Laboratory Inventory System
          </p>
        </div>

        {/* Form */}
        <Card.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-2.5 rounded-lg border ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {"Don't have an account? "}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Register here
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <p>Admin: admin@toplink.edu / admin123</p>
              <p>Staff: staff@toplink.edu / staff123</p>
              <p>Student: student@toplink.edu / student123</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
