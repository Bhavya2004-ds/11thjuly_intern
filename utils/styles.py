import streamlit as st

def load_css():
    """Load custom CSS styles for the application"""
    st.markdown("""
    <style>
        /* Import Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        /* Global Styles */
        html, body, [class*="css"] {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        /* Hide Streamlit default elements */
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        
        /* Custom header styles */
        .main-header {
            background: linear-gradient(135deg, #2E86AB 0%, #A23B72 100%);
            padding: 2rem 1.5rem;
            border-radius: 15px;
            margin-bottom: 2rem;
            color: white;
            text-align: center;
            box-shadow: 0 8px 32px rgba(46, 134, 171, 0.3);
        }
        
        .main-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            letter-spacing: -0.02em;
        }
        
        .main-header p {
            font-size: 1.1rem;
            margin: 0;
            opacity: 0.9;
            font-weight: 400;
        }
        
        /* Card styles */
        .metric-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            text-align: center;
            transition: all 0.3s ease;
            height: 100%;
        }
        
        .metric-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .metric-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2E86AB;
            margin: 0 0 0.5rem 0;
        }
        
        .metric-label {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        /* Info cards */
        .info-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border-left: 4px solid #2E86AB;
            margin: 1rem 0;
        }
        
        .warning-card {
            background: #fef7cd;
            border-left-color: #f59e0b;
            border: 1px solid #fbbf24;
        }
        
        .success-card {
            background: #d1fae5;
            border-left-color: #10b981;
            border: 1px solid #34d399;
        }
        
        .danger-card {
            background: #fee2e2;
            border-left-color: #ef4444;
            border: 1px solid #f87171;
        }
        
        /* Button styles */
        .stButton > button {
            background: linear-gradient(135deg, #2E86AB 0%, #A23B72 100%);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            width: 100%;
        }
        
        .stButton > button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(46, 134, 171, 0.4);
        }
        
        /* Sidebar styles */
        .sidebar .sidebar-content {
            padding: 1rem;
        }
        
        /* Chart container */
        .chart-container {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            margin: 1rem 0;
        }
        
        /* Table styles */
        .dataframe {
            border: none !important;
        }
        
        .dataframe thead th {
            background-color: #f8fafc !important;
            color: #374151 !important;
            font-weight: 600 !important;
            border: none !important;
            padding: 0.75rem !important;
        }
        
        .dataframe tbody td {
            border: none !important;
            padding: 0.75rem !important;
        }
        
        .dataframe tbody tr:nth-child(even) {
            background-color: #f9fafb !important;
        }
        
        /* Risk highlighting */
        .risk-high {
            background-color: #ef4444 !important;
            color: white !important;
            font-weight: 600 !important;
            border-radius: 6px;
            padding: 0.25rem 0.5rem;
        }
        
        .risk-low {
            background-color: #10b981 !important;
            color: white !important;
            font-weight: 600 !important;
            border-radius: 6px;
            padding: 0.25rem 0.5rem;
        }
        
        /* File uploader */
        .stFileUploader > div > div {
            background-color: #f8fafc;
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .stFileUploader > div > div:hover {
            border-color: #2E86AB;
            background-color: #f1f9ff;
        }
        
        /* Progress bar */
        .stProgress > div > div > div {
            background: linear-gradient(135deg, #2E86AB 0%, #A23B72 100%);
        }
        
        /* Tabs */
        .stTabs [data-baseweb="tab-list"] {
            gap: 8px;
        }
        
        .stTabs [data-baseweb="tab"] {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 0.5rem 1rem;
            border: 1px solid #e2e8f0;
        }
        
        .stTabs [aria-selected="true"] {
            background: linear-gradient(135deg, #2E86AB 0%, #A23B72 100%);
            color: white !important;
        }
        
        /* Section headers */
        .section-header {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e293b;
            margin: 2rem 0 1rem 0;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e2e8f0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .main-header h1 {
                font-size: 2rem;
            }
            
            .metric-value {
                font-size: 2rem;
            }
        }
    </style>
    """, unsafe_allow_html=True)