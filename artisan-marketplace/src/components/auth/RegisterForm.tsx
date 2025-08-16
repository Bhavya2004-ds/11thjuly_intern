import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, AlertCircle, Check } from 'lucide-react';
import { 
  Card, 
  Button, 
  Input, 
  Select,
  ErrorText, 
  FlexBox, 
  colors 
} from '../../styles/GlobalStyles';

const AuthCard = styled(Card)`
  max-width: 500px;
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

const UserTypeSelector = styled.div`
  margin-bottom: 30px;
  
  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 500;
    color: ${colors.neutral.black};
    font-size: 14px;
  }
`;

const UserTypeOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const UserTypeOption = styled.button<{ isSelected: boolean }>`
  padding: 16px;
  border: 2px solid ${props => props.isSelected ? colors.primary : colors.neutral.medium};
  border-radius: 8px;
  background: ${props => props.isSelected ? `${colors.primary}10` : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    border-color: ${colors.primary};
    background: ${colors.primary}10;
  }
  
  .title {
    font-weight: 600;
    color: ${props => props.isSelected ? colors.primary : colors.neutral.black};
    margin-bottom: 4px;
  }
  
  .description {
    font-size: 12px;
    color: ${colors.neutral.dark};
    line-height: 1.3;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
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

const PasswordStrength = styled.div<{ strength: number }>`
  margin-top: 8px;
  
  .strength-bar {
    height: 4px;
    background: ${colors.neutral.light};
    border-radius: 2px;
    overflow: hidden;
    
    .fill {
      height: 100%;
      transition: all 0.3s ease;
      width: ${props => (props.strength / 4) * 100}%;
      background: ${props => {
        if (props.strength <= 1) return colors.error;
        if (props.strength <= 2) return colors.warning;
        if (props.strength <= 3) return colors.info;
        return colors.success;
      }};
    }
  }
  
  .strength-text {
    font-size: 12px;
    margin-top: 4px;
    color: ${props => {
      if (props.strength <= 1) return colors.error;
      if (props.strength <= 2) return colors.warning;
      if (props.strength <= 3) return colors.info;
      return colors.success;
    }};
  }
`;

const TermsCheckbox = styled.div`
  margin: 24px 0;
  
  label {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.4;
    
    input[type="checkbox"] {
      margin-top: 2px;
      accent-color: ${colors.primary};
    }
    
    a {
      color: ${colors.primary};
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
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

const SignInLink = styled.div`
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

// Validation schema
const registerSchema = yup.object({
  userType: yup
    .string()
    .oneOf(['buyer', 'artisan'], 'Please select a user type')
    .required('User type is required'),
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  city: yup
    .string()
    .required('City is required'),
  state: yup
    .string()
    .required('State is required'),
  agreesToTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
});

interface RegisterFormData {
  userType: 'buyer' | 'artisan';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  city: string;
  state: string;
  agreesToTerms: boolean;
}

interface RegisterFormProps {
  onRegister?: (data: RegisterFormData) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [userType, setUserType] = useState<'buyer' | 'artisan' | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [registerError, setRegisterError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema)
  });

  const password = watch('password');

  React.useEffect(() => {
    if (password) {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0: return '';
      case 1: return 'Weak password';
      case 2: return 'Fair password';
      case 3: return 'Good password';
      case 4: return 'Strong password';
      default: return '';
    }
  };

  const handleUserTypeSelect = (type: 'buyer' | 'artisan') => {
    setUserType(type);
    setValue('userType', type);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setRegisterError('');
      
      if (onRegister) {
        await onRegister(data);
      } else {
        // Mock registration for demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Registration successful', data);
        navigate('/login');
      }
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader>
        <h1>Join CraftBazaar</h1>
        <p>Create your account and become part of our community</p>
      </AuthHeader>

      {registerError && (
        <ErrorAlert>
          <AlertCircle className="icon" size={16} />
          <span className="message">{registerError}</span>
        </ErrorAlert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <UserTypeSelector>
          <label>I want to join as a:</label>
          <UserTypeOptions>
            <UserTypeOption
              type="button"
              isSelected={userType === 'buyer'}
              onClick={() => handleUserTypeSelect('buyer')}
            >
              <div className="title">Buyer</div>
              <div className="description">Browse and purchase unique handicrafts</div>
            </UserTypeOption>
            <UserTypeOption
              type="button"
              isSelected={userType === 'artisan'}
              onClick={() => handleUserTypeSelect('artisan')}
            >
              <div className="title">Artisan</div>
              <div className="description">Sell your handcrafted products</div>
            </UserTypeOption>
          </UserTypeOptions>
          {errors.userType && <ErrorText>{errors.userType.message}</ErrorText>}
        </UserTypeSelector>

        <FormRow>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <InputWrapper>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                hasError={!!errors.firstName}
                {...register('firstName')}
              />
              <User className="input-icon" size={18} />
            </InputWrapper>
            {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <InputWrapper>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                hasError={!!errors.lastName}
                {...register('lastName')}
              />
              <User className="input-icon" size={18} />
            </InputWrapper>
            {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label htmlFor="email">Email Address</label>
          <InputWrapper>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              hasError={!!errors.email}
              {...register('email')}
            />
            <Mail className="input-icon" size={18} />
          </InputWrapper>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="phone">Phone Number</label>
          <InputWrapper>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              hasError={!!errors.phone}
              {...register('phone')}
            />
            <Phone className="input-icon" size={18} />
          </InputWrapper>
          {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
        </FormGroup>

        <FormRow>
          <FormGroup>
            <label htmlFor="city">City</label>
            <InputWrapper>
              <Input
                id="city"
                type="text"
                placeholder="Enter your city"
                hasError={!!errors.city}
                {...register('city')}
              />
              <MapPin className="input-icon" size={18} />
            </InputWrapper>
            {errors.city && <ErrorText>{errors.city.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="state">State</label>
            <Select
              id="state"
              hasError={!!errors.state}
              {...register('state')}
            >
              <option value="">Select state</option>
              <option value="andhra-pradesh">Andhra Pradesh</option>
              <option value="bihar">Bihar</option>
              <option value="delhi">Delhi</option>
              <option value="gujarat">Gujarat</option>
              <option value="haryana">Haryana</option>
              <option value="karnataka">Karnataka</option>
              <option value="kerala">Kerala</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="punjab">Punjab</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="uttar-pradesh">Uttar Pradesh</option>
              <option value="west-bengal">West Bengal</option>
            </Select>
            {errors.state && <ErrorText>{errors.state.message}</ErrorText>}
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label htmlFor="password">Password</label>
          <PasswordWrapper>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              hasError={!!errors.password}
              {...register('password')}
            />
            <Lock className="input-icon" size={18} />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </PasswordWrapper>
          {password && (
            <PasswordStrength strength={passwordStrength}>
              <div className="strength-bar">
                <div className="fill" />
              </div>
              <div className="strength-text">{getPasswordStrengthText()}</div>
            </PasswordStrength>
          )}
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <PasswordWrapper>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              hasError={!!errors.confirmPassword}
              {...register('confirmPassword')}
            />
            <Lock className="input-icon" size={18} />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </PasswordWrapper>
          {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
        </FormGroup>

        <TermsCheckbox>
          <label>
            <input
              type="checkbox"
              {...register('agreesToTerms')}
            />
            <span>
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </span>
          </label>
          {errors.agreesToTerms && <ErrorText>{errors.agreesToTerms.message}</ErrorText>}
        </TermsCheckbox>

        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <SignInLink>
        <span>Already have an account?</span>
        <Link to="/login">Sign in here</Link>
      </SignInLink>
    </AuthCard>
  );
};

export default RegisterForm;