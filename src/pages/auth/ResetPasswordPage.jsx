import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!token.trim() || !password) {
      setError('Reset token and password are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/reset-password', { token, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <Card.Header>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your reset token and new password.
          </p>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Reset Token" value={token} onChange={(event) => setToken(event.target.value)} />
            <Input
              label="New Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              error={error}
            />
            <Button type="submit" className="w-full" loading={loading}>
              Reset Password
            </Button>
          </form>
          <p className="mt-4 text-center text-sm">
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Back to login
            </Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
