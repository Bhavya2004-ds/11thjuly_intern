import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Handle optional imports gracefully
try:
    import plotly.express as px
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    PLOTLY_AVAILABLE = True
except ImportError:
    PLOTLY_AVAILABLE = False
    st.warning("Plotly not available. Some interactive charts will be replaced with matplotlib.")

try:
    from scipy import stats
    SCIPY_AVAILABLE = True
except ImportError:
    SCIPY_AVAILABLE = False
    st.warning("SciPy not available. Some statistical features will be limited.")

from utils.data_processing import get_student_insights

def show():
    # Main header
    st.markdown("""
    <div class="main-header">
        <h1>Advanced Analytics</h1>
        <p>Deep dive into student performance data with statistical analysis and insights</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Check if data exists
    if 'df' not in st.session_state or st.session_state.df is None:
        st.markdown("""
        <div class="info-card warning-card">
            <h3>No Data Available</h3>
            <p>Please upload student data first to view advanced analytics.</p>
            <p>Navigate to the <strong>"Upload & Analyze"</strong> page to get started.</p>
        </div>
        """, unsafe_allow_html=True)
        return
    
    df = st.session_state.df
    
    if 'Predicted_Score' not in df.columns:
        st.warning("Predictions not available. Please re-upload your data.")
        return
    
    # Analytics tabs
    tab1, tab2, tab3, tab4 = st.tabs([
        "Performance Analysis", 
        "🔗 Correlation Analysis", 
        "👥 Demographic Insights",
        "Statistical Summary"
    ])
    
    with tab1:
        show_performance_analysis(df)
    
    with tab2:
        show_correlation_analysis(df)
    
    with tab3:
        show_demographic_insights(df)
    
    with tab4:
        show_statistical_summary(df)

def show_performance_analysis(df):
    """Show detailed performance analysis"""
    st.markdown("### Performance Distribution Analysis")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Box plot for score distribution
        fig = px.box(
            df, 
            y='Predicted_Score',
            title='Score Distribution (Box Plot)',
            color_discrete_sequence=['#2E86AB']
        )
        fig.add_hline(y=50, line_dash="dash", line_color="red", annotation_text="Pass Threshold")
        fig.update_layout(
            plot_bgcolor='white',
            paper_bgcolor='white',
            font_family="Inter"
        )
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        # Violin plot for detailed distribution
        fig = px.violin(
            df, 
            y='Predicted_Score',
            title='Detailed Score Distribution',
            color_discrete_sequence=['#A23B72']
        )
        fig.add_hline(y=50, line_dash="dash", line_color="red", annotation_text="Pass Threshold")
        fig.update_layout(
            plot_bgcolor='white',
            paper_bgcolor='white',
            font_family="Inter"
        )
        st.plotly_chart(fig, use_container_width=True)
    
    # Performance by study hours
    if 'Study_Hours_per_Week' in df.columns:
        st.markdown("### Study Hours vs Performance")
        
        # Create bins for study hours
        df['Study_Hours_Bin'] = pd.cut(df['Study_Hours_per_Week'], 
                                      bins=[0, 10, 20, 30, 100], 
                                      labels=['0-10h', '11-20h', '21-30h', '30h+'])
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Scatter plot
            fig = px.scatter(
                df, 
                x='Study_Hours_per_Week', 
                y='Predicted_Score',
                title='Study Hours vs Predicted Score',
                trendline="ols",
                color='Predicted_Score',
                color_continuous_scale='viridis'
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                font_family="Inter"
            )
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            # Box plot by study hour bins
            avg_by_hours = df.groupby('Study_Hours_Bin')['Predicted_Score'].agg(['mean', 'std', 'count']).reset_index()
            
            fig = px.bar(
                avg_by_hours, 
                x='Study_Hours_Bin', 
                y='mean',
                error_y='std',
                title='Average Score by Study Hours',
                color='mean',
                color_continuous_scale='blues'
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                font_family="Inter"
            )
            st.plotly_chart(fig, use_container_width=True)
    
    # Attendance analysis
    if 'Attendance_Rate' in df.columns:
        st.markdown("### Attendance vs Performance")
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Scatter plot
            fig = px.scatter(
                df, 
                x='Attendance_Rate', 
                y='Predicted_Score',
                title='Attendance Rate vs Predicted Score',
                trendline="ols",
                color='Predicted_Score',
                color_continuous_scale='plasma'
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                font_family="Inter"
            )
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            # Attendance bins analysis
            df['Attendance_Bin'] = pd.cut(df['Attendance_Rate'], 
                                         bins=[0, 70, 80, 90, 100], 
                                         labels=['<70%', '70-80%', '80-90%', '90%+'])
            
            avg_by_attendance = df.groupby('Attendance_Bin')['Predicted_Score'].agg(['mean', 'std', 'count']).reset_index()
            
            fig = px.bar(
                avg_by_attendance, 
                x='Attendance_Bin', 
                y='mean',
                error_y='std',
                title='Average Score by Attendance Range',
                color='mean',
                color_continuous_scale='oranges'
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                font_family="Inter"
            )
            st.plotly_chart(fig, use_container_width=True)

def show_correlation_analysis(df):
    """Show correlation analysis between variables"""
    st.markdown("### 🔗 Variable Correlation Analysis")
    
    # Select numeric columns for correlation
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    if len(numeric_cols) > 1:
        # Correlation matrix
        corr_matrix = df[numeric_cols].corr()
        
        # Create correlation heatmap
        fig = px.imshow(
            corr_matrix,
            text_auto=True,
            aspect="auto",
            title="Correlation Matrix of Numeric Variables",
            color_continuous_scale='RdBu_r'
        )
        fig.update_layout(
            plot_bgcolor='white',
            paper_bgcolor='white',
            font_family="Inter"
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Top correlations with predicted score
        if 'Predicted_Score' in corr_matrix.columns:
            score_correlations = corr_matrix['Predicted_Score'].abs().sort_values(ascending=False)
            score_correlations = score_correlations[score_correlations.index != 'Predicted_Score']
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("#### Strongest Predictors")
                top_predictors = score_correlations.head(5)
                
                for var, corr in top_predictors.items():
                    correlation_strength = "Strong" if corr > 0.7 else "Moderate" if corr > 0.4 else "Weak"
                    st.metric(
                        label=var.replace('_', ' ').title(),
                        value=f"{corr:.3f}",
                        help=f"{correlation_strength} correlation with predicted score"
                    )
            
            with col2:
                # Correlation bar chart
                fig = px.bar(
                    x=top_predictors.values[:5],
                    y=top_predictors.index[:5],
                    orientation='h',
                    title='Top 5 Correlations with Predicted Score',
                    color=top_predictors.values[:5],
                    color_continuous_scale='viridis'
                )
                fig.update_layout(
                    plot_bgcolor='white',
                    paper_bgcolor='white',
                    font_family="Inter"
                )
                st.plotly_chart(fig, use_container_width=True)
    
    else:
        st.info("Not enough numeric variables for correlation analysis.")

def show_demographic_insights(df):
    """Show demographic analysis"""
    st.markdown("### 👥 Demographic Performance Analysis")
    
    # Gender analysis
    if 'Gender' in df.columns:
        st.markdown("#### 👥 Performance by Gender")
        
        # Convert gender encoding back to readable format
        df_display = df.copy()
        if df['Gender'].dtype in ['int64', 'float64']:
            df_display['Gender'] = df_display['Gender'].map({0: 'Male', 1: 'Female'})
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Box plot by gender
            fig = px.box(
                df_display, 
                x='Gender', 
                y='Predicted_Score',
                title='Score Distribution by Gender',
                color='Gender',
                color_discrete_sequence=['#2E86AB', '#A23B72']
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                font_family="Inter"
            )
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            # Gender statistics
            gender_stats = df_display.groupby('Gender')['Predicted_Score'].agg(['mean', 'std', 'count']).round(2)
            
            fig = px.bar(
                x=gender_stats.index,
                y=gender_stats['mean'],
                error_y=gender_stats['std'],
                title='Average Score by Gender',
                color=gender_stats['mean'],
                color_continuous_scale='blues'
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                font_family="Inter"
            )
            st.plotly_chart(fig, use_container_width=True)
    
    # Parental education analysis
    if 'Parental_Education_Level' in df.columns:
        st.markdown("#### Performance by Parental Education")
        
        # For encoded data, we'll show the analysis with encoded values
        education_stats = df.groupby('Parental_Education_Level')['Predicted_Score'].agg(['mean', 'std', 'count']).reset_index()
        
        fig = px.bar(
            education_stats,
            x='Parental_Education_Level',
            y='mean',
            error_y='std',
            title='Average Score by Parental Education Level',
            color='mean',
            color_continuous_scale='greens'
        )
        fig.update_layout(
            plot_bgcolor='white',
            paper_bgcolor='white',
            font_family="Inter"
        )
        st.plotly_chart(fig, use_container_width=True)
    
    # Extracurricular activities analysis
    if 'Extracurricular_Activities' in df.columns:
        st.markdown("#### Impact of Extracurricular Activities")
        
        df_display = df.copy()
        if df['Extracurricular_Activities'].dtype in ['int64', 'float64']:
            df_display['Extracurricular_Activities'] = df_display['Extracurricular_Activities'].map({0: 'No', 1: 'Yes'})
        
        col1, col2 = st.columns(2)
        
        with col1:
            fig = px.box(
                df_display, 
                x='Extracurricular_Activities', 
                y='Predicted_Score',
                title='Score Distribution by Extracurricular Participation',
                color='Extracurricular_Activities',
                color_discrete_sequence=['#ff7f0e', '#2ca02c']
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                font_family="Inter"
            )
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            extra_stats = df_display.groupby('Extracurricular_Activities')['Predicted_Score'].agg(['mean', 'std', 'count']).round(2)
            
            # Calculate the difference
            if len(extra_stats) == 2:
                diff = extra_stats.loc['Yes', 'mean'] - extra_stats.loc['No', 'mean']
                st.metric(
                    "Performance Boost",
                    f"{diff:.2f} points",
                    help="Average score difference between students with and without extracurricular activities"
                )
            
            st.dataframe(extra_stats, use_container_width=True)

def show_statistical_summary(df):
    """Show statistical summary and insights"""
    st.markdown("### Statistical Summary")
    
    # Basic statistics
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Descriptive Statistics")
        
        stats_df = df['Predicted_Score'].describe().round(2)
        stats_dict = {
            'Metric': ['Count', 'Mean', 'Std Dev', 'Min', '25%', 'Median (50%)', '75%', 'Max'],
            'Value': [stats_df['count'], stats_df['mean'], stats_df['std'], 
                     stats_df['min'], stats_df['25%'], stats_df['50%'], 
                     stats_df['75%'], stats_df['max']]
        }
        
        stats_display_df = pd.DataFrame(stats_dict)
        st.dataframe(stats_display_df, use_container_width=True, hide_index=True)
    
    with col2:
        st.markdown("#### Performance Categories")
        
        # Risk level distribution
        high_risk = len(df[df['Predicted_Score'] < 40])
        moderate_risk = len(df[(df['Predicted_Score'] >= 40) & (df['Predicted_Score'] < 50)])
        low_risk = len(df[(df['Predicted_Score'] >= 50) & (df['Predicted_Score'] < 70)])
        excellent = len(df[df['Predicted_Score'] >= 70])
        total = len(df)
        
        categories_df = pd.DataFrame({
            'Category': ['High Risk (<40)', 'Moderate Risk (40-50)', 'Low Risk (50-70)', 'Excellent (70+)'],
            'Count': [high_risk, moderate_risk, low_risk, excellent],
            'Percentage': [f"{(high_risk/total*100):.1f}%", f"{(moderate_risk/total*100):.1f}%", 
                          f"{(low_risk/total*100):.1f}%", f"{(excellent/total*100):.1f}%"]
        })
        
        st.dataframe(categories_df, use_container_width=True, hide_index=True)
    
    # Distribution analysis
    st.markdown("#### Distribution Analysis")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Q-Q plot for normality
        fig = go.Figure()
        
        sorted_scores = np.sort(df['Predicted_Score'])
        theoretical_quantiles = stats.norm.ppf(np.linspace(0.01, 0.99, len(sorted_scores)))
        
        fig.add_trace(go.Scatter(
            x=theoretical_quantiles,
            y=sorted_scores,
            mode='markers',
            name='Data Points',
            marker=dict(color='#2E86AB', size=6)
        ))
        
        # Add reference line
        fig.add_trace(go.Scatter(
            x=theoretical_quantiles,
            y=theoretical_quantiles * np.std(sorted_scores) + np.mean(sorted_scores),
            mode='lines',
            name='Normal Distribution',
            line=dict(color='red', dash='dash')
        ))
        
        fig.update_layout(
            title='Q-Q Plot (Normality Check)',
            xaxis_title='Theoretical Quantiles',
            yaxis_title='Sample Quantiles',
            plot_bgcolor='white',
            paper_bgcolor='white',
            font_family="Inter"
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        # Skewness and kurtosis
        skewness = stats.skew(df['Predicted_Score'])
        kurtosis = stats.kurtosis(df['Predicted_Score'])
        
        st.markdown("#### 📐 Distribution Shape")
        
        col2_1, col2_2 = st.columns(2)
        
        with col2_1:
            st.metric(
                "Skewness",
                f"{skewness:.3f}",
                help="Measures asymmetry of the distribution"
            )
        
        with col2_2:
            st.metric(
                "Kurtosis",
                f"{kurtosis:.3f}",
                help="Measures tail heaviness of the distribution"
            )
        
        # Interpretation
        if abs(skewness) < 0.5:
            skew_interpretation = "Approximately symmetric"
        elif skewness > 0.5:
            skew_interpretation = "Right-skewed (tail extends right)"
        else:
            skew_interpretation = "Left-skewed (tail extends left)"
        
        st.info(f"**Distribution Shape:** {skew_interpretation}")
    
    # Outlier analysis
    st.markdown("#### Outlier Analysis")
    
    Q1 = df['Predicted_Score'].quantile(0.25)
    Q3 = df['Predicted_Score'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = df[(df['Predicted_Score'] < lower_bound) | (df['Predicted_Score'] > upper_bound)]
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Total Outliers", len(outliers))
    
    with col2:
        st.metric("Lower Bound", f"{lower_bound:.1f}")
    
    with col3:
        st.metric("Upper Bound", f"{upper_bound:.1f}")
    
    if len(outliers) > 0:
        st.markdown("##### Outlier Students")
        outlier_display = outliers[['Student_ID', 'Predicted_Score']].copy()
        outlier_display.columns = ['Student ID', 'Predicted Score']
        st.dataframe(outlier_display, use_container_width=True, hide_index=True)
    else:
        st.success("No outliers detected in the score distribution.")
    
    # Key insights
    st.markdown("#### Key Statistical Insights")
    
    insights = []
    
    # Performance insights
    mean_score = df['Predicted_Score'].mean()
    if mean_score >= 70:
        insights.append("🌟 **Excellent Overall Performance**: The class average is in the excellent range.")
    elif mean_score >= 60:
        insights.append("**Good Overall Performance**: The class is performing well above the pass threshold.")
    elif mean_score >= 50:
        insights.append("**Moderate Performance**: The class average is just above the pass threshold.")
    else:
        insights.append("**Below Average Performance**: The class may need significant intervention.")
    
    # Distribution insights
    std_dev = df['Predicted_Score'].std()
    if std_dev < 10:
        insights.append("**Consistent Performance**: Low variability suggests similar performance levels across students.")
    elif std_dev > 20:
        insights.append("**High Variability**: Large spread in scores suggests diverse performance levels.")
    
    # Risk insights
    risk_percentage = (len(df[df['Predicted_Score'] < 50]) / len(df)) * 100
    if risk_percentage < 10:
        insights.append("**Low Risk Population**: Most students are predicted to perform well.")
    elif risk_percentage > 30:
        insights.append("**High Risk Population**: A significant portion of students may need support.")
    
    for insight in insights:
        st.markdown(insight)