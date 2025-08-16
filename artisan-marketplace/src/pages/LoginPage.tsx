import React from 'react';
import styled from 'styled-components';
import { Container, colors } from '../styles/GlobalStyles';
import LoginForm from '../components/auth/LoginForm';

const LoginPageWrapper = styled.div`
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

const LoginPage: React.FC = () => {
  return (
    <LoginPageWrapper>
      <Container>
        <LoginForm />
      </Container>
    </LoginPageWrapper>
  );
};

export default LoginPage;