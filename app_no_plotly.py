import streamlit as st
import sys
from pathlib import Path

# Add the current directory to the Python path
sys.path.append(str(Path(__file__).parent))

# Import pages - use try/except to handle plotly import issues
try:
    from pages import dashboard, upload_data, analytics, about
except ImportError as e:
    st.error(f"Import error: {e}")
    st.error("Please install all required packages: pip install -r requirements.txt")
    st.stop()

from utils.styles import load_css

# Page configuration
st.set_page_config(
    page_title="EduPredict - Student Performance Analytics",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load custom CSS
load_css()

# Initialize session state
if 'page' not in st.session_state:
    st.session_state.page = 'Dashboard'

# Sidebar navigation
with st.sidebar:
    st.markdown("""
    <div style="text-align: center; padding: 1rem 0;">
        <h1 style="color: #2E86AB; margin: 0;">🎓 EduPredict</h1>
        <p style="color: #666; margin: 0.5rem 0 2rem 0; font-style: italic;">
            Empowering educators with data-driven insights
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Navigation menu
    pages = {
        "📊 Dashboard": "Dashboard",
        "📤 Upload & Analyze": "Upload",
        "📈 Advanced Analytics": "Analytics", 
        "ℹ️ About": "About"
    }
    
    st.markdown("### Navigation")
    for display_name, page_key in pages.items():
        if st.button(display_name, key=page_key, use_container_width=True):
            st.session_state.page = page_key
    
    st.markdown("---")
    
    # Quick stats if data exists
    if 'df' in st.session_state and st.session_state.df is not None:
        st.markdown("### Quick Stats")
        df = st.session_state.df
        st.metric("Total Students", len(df))
        if 'Predicted_Score' in df.columns:
            at_risk = len(df[df['Predicted_Score'] < 50])
            st.metric("At-Risk Students", at_risk)
            avg_score = round(df['Predicted_Score'].mean(), 1)
            st.metric("Avg Score", f"{avg_score}%")
    
    st.markdown("---")
    st.markdown("""
    <div style="text-align: center; color: #888; font-size: 12px;">
        <p>Built with ❤️ for educators</p>
        <p>© 2024 EduPredict</p>
    </div>
    """, unsafe_allow_html=True)

# Main content area
try:
    if st.session_state.page == 'Dashboard':
        dashboard.show()
    elif st.session_state.page == 'Upload':
        upload_data.show()
    elif st.session_state.page == 'Analytics':
        analytics.show()
    elif st.session_state.page == 'About':
        about.show()
except Exception as e:
    st.error("An error occurred. Please check that all required packages are installed.")
    st.error(f"Error details: {str(e)}")
    st.info("Try running: pip install -r requirements.txt")