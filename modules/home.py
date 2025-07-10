import streamlit as st

def show():
    # Hero section
    st.markdown("""
    <div class="main-header" style="text-align: center; padding: 4rem 2rem;">
        <h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-weight: 800;">EduPredict</h1>
        <p style="font-size: 1.4rem; margin-bottom: 2rem; opacity: 0.9;">
            Empowering Educators with AI-Driven Student Performance Analytics
        </p>
        <p style="font-size: 1.1rem; opacity: 0.8;">
            Predict student outcomes, identify at-risk learners, and make data-driven decisions to improve educational success
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Call-to-action buttons
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col1:
        if st.button("Get Started - Sign Up", use_container_width=True, type="primary"):
            st.session_state.page = 'Signup'
            st.rerun()
    
    with col2:
        if st.button("Already Have Account? Sign In", use_container_width=True):
            st.session_state.page = 'Login'
            st.rerun()
    
    with col3:
        if st.button("Learn More", use_container_width=True, type="secondary"):
            st.session_state.page = 'About'
            st.rerun()
    
    st.markdown("---")
    
    # Key Features Section
    st.markdown("""
    <div style="text-align: center; margin: 3rem 0 2rem 0;">
        <h2 style="color: #3B82F6; font-size: 2.5rem; margin-bottom: 1rem;">Why Choose EduPredict?</h2>
        <p style="font-size: 1.1rem; color: #666; max-width: 800px; margin: 0 auto;">
            Transform your approach to education with powerful analytics that help you understand and support every student's journey.
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Feature cards
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div class="feature-card" style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); text-align: center; height: 280px; border: 1px solid #e2e8f0;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3B82F6, #1E40AF); border-radius: 50%; margin: 0 auto 1.5rem auto; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 2rem; font-weight: bold;">AI</span>
            </div>
            <h3 style="color: #3B82F6; margin-bottom: 1rem;">Smart Predictions</h3>
            <p style="color: #666; line-height: 1.6;">
                Advanced machine learning algorithms analyze student data to predict exam performance and identify learning patterns.
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="feature-card" style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); text-align: center; height: 280px; border: 1px solid #e2e8f0;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10B981, #059669); border-radius: 50%; margin: 0 auto 1.5rem auto; display: flex; align-items: center; justify-content: center;">
                                 <span style="color: white; font-size: 2rem; font-weight: bold;">!</span>
            </div>
            <h3 style="color: #10B981; margin-bottom: 1rem;">Early Intervention</h3>
            <p style="color: #666; line-height: 1.6;">
                Identify at-risk students early with comprehensive risk assessment and get actionable recommendations for support.
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="feature-card" style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); text-align: center; height: 280px; border: 1px solid #e2e8f0;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B5CF6, #7C3AED); border-radius: 50%; margin: 0 auto 1.5rem auto; display: flex; align-items: center; justify-content: center;">
                                 <span style="color: white; font-size: 2rem; font-weight: bold;">▲</span>
            </div>
            <h3 style="color: #8B5CF6; margin-bottom: 1rem;">Visual Analytics</h3>
            <p style="color: #666; line-height: 1.6;">
                Interactive dashboards and beautiful visualizations make complex data easy to understand and act upon.
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("<br>", unsafe_allow_html=True)
    
    # How it works section
    st.markdown("""
    <div style="background: #f8fafc; padding: 3rem 2rem; border-radius: 16px; margin: 3rem 0;">
        <h2 style="text-align: center; color: #3B82F6; font-size: 2.5rem; margin-bottom: 2rem;">How It Works</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; max-width: 900px; margin: 0 auto;">
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #3B82F6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.5rem; font-weight: bold;">1</div>
                <h4 style="color: #1E293B; margin-bottom: 0.5rem;">Upload Data</h4>
                <p style="color: #666; font-size: 0.9rem;">Upload your student CSV file with academic and demographic data</p>
            </div>
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #10B981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.5rem; font-weight: bold;">2</div>
                <h4 style="color: #1E293B; margin-bottom: 0.5rem;">AI Analysis</h4>
                <p style="color: #666; font-size: 0.9rem;">Our AI analyzes patterns and predicts student performance</p>
            </div>
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #8B5CF6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.5rem; font-weight: bold;">3</div>
                <h4 style="color: #1E293B; margin-bottom: 0.5rem;">Take Action</h4>
                <p style="color: #666; font-size: 0.9rem;">Get insights, reports, and recommendations to help every student succeed</p>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Demo credentials
    st.markdown("""
    <div style="background: linear-gradient(135deg, #3B82F6, #1E40AF); padding: 2rem; border-radius: 16px; text-align: center; color: white; margin: 2rem 0;">
        <h3 style="margin-bottom: 1rem; color: white;">Try It Now - Demo Account</h3>
        <p style="margin-bottom: 1.5rem; opacity: 0.9;">Experience EduPredict with our sample data</p>
        <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; display: inline-block;">
            <p style="margin: 0; font-size: 1.1rem;"><strong>Username:</strong> demo</p>
            <p style="margin: 0; font-size: 1.1rem;"><strong>Password:</strong> demo123</p>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Final call to action
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col2:
        st.markdown("<div style='text-align: center; margin: 2rem 0;'>", unsafe_allow_html=True)
        
        col_a, col_b = st.columns(2)
        with col_a:
            if st.button("Start Free Account", use_container_width=True, type="primary"):
                st.session_state.page = 'Signup'
                st.rerun()
        
        with col_b:
            if st.button("Try Demo Login", use_container_width=True):
                st.session_state.page = 'Login'
                st.rerun()
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Footer
    st.markdown("""
    <div style="text-align: center; margin-top: 3rem; padding: 2rem 0; border-top: 1px solid #e2e8f0; color: #666;">
        <p>Built for educators who care about every student's success</p>
        <p style="font-size: 0.9rem;">© 2024 EduPredict - Transforming Education Through Data</p>
    </div>
    """, unsafe_allow_html=True)