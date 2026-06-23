import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setResetToken('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message);
      setResetToken(response.data.resetToken || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to process reset request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <Card.Header>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Forgot Password</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email to request a password reset.
          </p>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={error}
              required
            />
            {message && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-300">
                {message}
              </div>
            )}
            {resetToken && (
              <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                Dev reset token: {resetToken}
              </div>
            )}
            <Button type="submit" className="w-full" loading={loading}>
              Send Reset Link
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
