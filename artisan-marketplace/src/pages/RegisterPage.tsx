import React from 'react';
import styled from 'styled-components';
import { Container, colors } from '../styles/GlobalStyles';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPageWrapper = styled.div`
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, ${colors.neutral.light} 0%, ${colors.neutral.white} 100%);
  padding: 60px 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 40px 0;
    min-height: calc(100vh - 70px);
  }
`;

const RegisterPage: React.FC = () => {
  return (
    <RegisterPageWrapper>
      <Container>
        <RegisterForm />
      </Container>
    </RegisterPageWrapper>
  );
};

export default RegisterPage;