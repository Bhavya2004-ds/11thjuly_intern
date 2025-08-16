import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { 
  Card, 
  Button, 
  Input, 
  ErrorText, 
  FlexBox, 
  colors 
} from '../../styles/GlobalStyles';

const AuthCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;

  @media (max-width: 480px) {
    margin: 20px;
    padding: 30px 20px;
  }
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: ${colors.neutral.black};
    margin-bottom: 8px;
  }

  p {
    color: ${colors.neutral.dark};
    font-size: 14px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: ${colors.neutral.black};
    font-size: 14px;
  }
`;

const InputWrapper = styled.div`
  position: relative;

  .input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.neutral.dark};
    z-index: 1;
  }

  input {
    padding-left: 44px;
    
    &:focus + .input-icon {
      color: ${colors.primary};
    }
  }
`;

const PasswordWrapper = styled(InputWrapper)`
  .toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: ${colors.neutral.dark};
    cursor: pointer;
    padding: 4px;
    
    &:hover {
      color: ${colors.primary};
    }
  }
`;

const FormActions = styled.div`
  margin-top: 30px;
`;

const ForgotPassword = styled(Link)`
  color: ${colors.primary};
  font-size: 14px;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 16px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid ${colors.neutral.medium};
  
  span {
    color: ${colors.neutral.dark};
    font-size: 14px;
  }
  
  a {
    color: ${colors.primary};
    text-decoration: none;
    font-weight: 500;
    margin-left: 4px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorAlert = styled.div`
  background-color: ${colors.error}15;
  border: 1px solid ${colors.error}30;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .icon {
    color: ${colors.error};
    flex-shrink: 0;
  }
  
  .message {
    color: ${colors.error};
    font-size: 14px;
  }
`;



interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLogin?: (data: LoginFormData) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  // Simple validation function
  const validateForm = (data: LoginFormData): string | null => {
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      return 'Please enter a valid email address';
    }
    if (!data.password || data.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setLoginError('');
      
      // Validate form
      const validationError = validateForm(data);
      if (validationError) {
        setLoginError(validationError);
        return;
      }
      
      if (onLogin) {
        await onLogin(data);
      } else {
        // Mock login for demo - in real app, this would call an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate different login outcomes
        if (data.email === 'demo@artisan.com') {
          console.log('Artisan login successful');
          navigate('/artisan-dashboard');
        } else if (data.email === 'demo@buyer.com') {
          console.log('Buyer login successful');
          navigate('/');
        } else {
          throw new Error('Invalid credentials. Try demo@artisan.com or demo@buyer.com');
        }
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthCard>
      <AuthHeader>
        <h1>Welcome Back</h1>
        <p>Sign in to your account to continue</p>
      </AuthHeader>

      {loginError && (
        <ErrorAlert>
          <AlertCircle className="icon" size={16} />
          <span className="message">{loginError}</span>
        </ErrorAlert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="email">Email Address</label>
          <InputWrapper>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
            />
            <Mail className="input-icon" size={18} />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Password</label>
          <PasswordWrapper>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', { required: true })}
            />
            <Lock className="input-icon" size={18} />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </PasswordWrapper>
        </FormGroup>

        <FormActions>
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
          
          <ForgotPassword to="/forgot-password">
            Forgot your password?
          </ForgotPassword>
        </FormActions>
      </form>

      <SignUpLink>
        <span>Don't have an account?</span>
        <Link to="/register">Create one here</Link>
      </SignUpLink>
    </AuthCard>
  );
};

export default LoginForm;