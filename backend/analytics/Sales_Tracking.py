
import os
import dash
from dash import html, dcc
import pandas as pd
import plotly.express as px
from supabase import create_client, Client
from dash.dependencies import Input, Output
from dotenv import load_dotenv
 
# Load environment variables
load_dotenv()

def get_env_variable(key):
    with open(".env") as f:
        for line in f:
            if line.startswith(key + "="):
                return line.strip().split("=", 1)[1].strip('"')

supabase_url = get_env_variable("EXPO_PUBLIC_SUPABASE_URL")
supabase_key = get_env_variable("EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)


from dotenv import load_dotenv
load_dotenv()

from dotenv import load_dotenv
import os



# Retrieve environment variables
supabase_url = os.getenv("EXPO_PUBLIC_SUPABASE_URL") 
supabase_key = os.getenv("EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")
 
# Validate configuration
if not supabase_url or not supabase_key:
    raise ValueError(f"Missing Supabase configuration. URL: {supabase_url}, Key: {'[REDACTED]' if supabase_key else 'None'}")
 
# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)                              


# Fetch sales data
response = supabase.table("Sales").select("*").execute()
sales_data = response.data

if not sales_data:
    raise ValueError("No sales data retrieved from Supabase.")



# Convert to DataFrame
df_sales = pd.DataFrame(sales_data)
df_sales = df_sales.dropna(subset=["amount", "date"])
df_sales["date"] = pd.to_datetime(df_sales["date"])
df_sales["amount"] = pd.to_numeric(df_sales["amount"])

# Basic Analysis
total_sales = df_sales["amount"].sum()
average_sales = df_sales["amount"].mean()
daily_sales = df_sales.groupby(df_sales["date"].dt.date)["amount"].sum()
monthly_sales = df_sales.groupby(df_sales["date"].dt.to_period("M"))["amount"].sum()

# Loan Logic
def check_loan_eligibility(df, min_days=10, min_avg_sales=1000):
    sales_by_day = df.groupby(df["date"].dt.date)["amount"].sum()
    return len(sales_by_day) >= min_days and sales_by_day.mean() >= min_avg_sales

def recommend_loan_amount(df, factor=0.3):
    monthly_sales = df.groupby(df["date"].dt.to_period("M"))["amount"].sum()
    return round(monthly_sales.mean() * factor, 2)

def recommend_payment_plan(loan_amount, months=6, annual_interest=0.12):
    monthly_interest = annual_interest / 12
    total_repayable = loan_amount * (1 + monthly_interest * months)
    return round(total_repayable / months, 2)

# Evaluate
is_eligible = check_loan_eligibility(df_sales)
loan_amount = recommend_loan_amount(df_sales) if is_eligible else 0
monthly_payment = recommend_payment_plan(loan_amount) if is_eligible else 0

# Additional Insights
top_product = df_sales.groupby("product_name")["amount"].sum().idxmax()
top_payment_method = df_sales.groupby("payment_method")["amount"].sum().idxmax()
most_profitable_day = daily_sales.idxmax()

# Display Results
print("\n====== SALES & LOAN SUMMARY ======")
print(f"Total Sales: P{total_sales:,.2f}")
print(f"Average Daily Sales: P{daily_sales.mean():,.2f}")
print(f"Top Selling Product: {top_product}")
print(f"Most Used Payment Method: {top_payment_method}")
print(f"Best Sales Day: {most_profitable_day} (P{daily_sales.max():,.2f})")

if is_eligible:
    print("\nLoan Eligibility: ✅ ELIGIBLE")
    print(f"Recommended Loan Amount: P{loan_amount:,.2f}")
    print(f"Monthly Payment (6 months): P{monthly_payment:,.2f}")
else:
    print("\nLoan Eligibility: ❌ NOT ELIGIBLE")
    print("Reason: Insufficient daily sales volume or number of sales days.")

'''
import os
import dash
from dash import html, dcc
import pandas as pd
import plotly.express as px
from supabase import create_client, Client
from dash.dependencies import Input, Output
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

supabase_url = os.getenv("EXPO_PUBLIC_SUPABASE_URL")
supabase_key = os.getenv("EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("Missing Supabase URL or Key")

supabase: Client = create_client(supabase_url, supabase_key)

# Fetch and prepare data function
def load_and_process_data():
    response = supabase.table("Sales").select("*").execute()
    sales_data = response.data
    if not sales_data:
        raise ValueError("No sales data retrieved from Supabase.")
    df = pd.DataFrame(sales_data)
    df = df.dropna(subset=["amount", "date"])
    df["date"] = pd.to_datetime(df["date"])
    df["amount"] = pd.to_numeric(df["amount"])
    return df

df_sales = load_and_process_data()

# Analysis functions
def check_loan_eligibility(df, min_days=10, min_avg_sales=1000):
    sales_by_day = df.groupby(df["date"].dt.date)["amount"].sum()
    return len(sales_by_day) >= min_days and sales_by_day.mean() >= min_avg_sales

def recommend_loan_amount(df, factor=0.3):
    monthly_sales = df.groupby(df["date"].dt.to_period("M"))["amount"].sum()
    return round(monthly_sales.mean() * factor, 2)

def recommend_payment_plan(loan_amount, months=6, annual_interest=0.12):
    monthly_interest = annual_interest / 12
    total_repayable = loan_amount * (1 + monthly_interest * months)
    return round(total_repayable / months, 2)

# Compute analysis results
total_sales = df_sales["amount"].sum()
daily_sales = df_sales.groupby(df_sales["date"].dt.date)["amount"].sum()
monthly_sales = df_sales.groupby(df_sales["date"].dt.to_period("M"))["amount"].sum()

is_eligible = check_loan_eligibility(df_sales)
loan_amount = recommend_loan_amount(df_sales) if is_eligible else 0
monthly_payment = recommend_payment_plan(loan_amount) if is_eligible else 0

top_product = df_sales.groupby("product_name")["amount"].sum().idxmax()
top_payment_method = df_sales.groupby("payment_method")["amount"].sum().idxmax()
most_profitable_day = daily_sales.idxmax()

# Dash app
app = dash.Dash(__name__)
app.title = "Sales & Loan Dashboard"

app.layout = html.Div([
    html.H1("Sales & Loan Summary Dashboard"),

    html.Div([
        html.H2("Summary"),
        html.P(f"Total Sales: P{total_sales:,.2f}"),
        html.P(f"Average Daily Sales: P{daily_sales.mean():,.2f}"),
        html.P(f"Top Selling Product: {top_product}"),
        html.P(f"Most Used Payment Method: {top_payment_method}"),
        html.P(f"Best Sales Day: {most_profitable_day} (P{daily_sales.max():,.2f})"),
        html.H3("Loan Status"),
        html.P("✅ Eligible" if is_eligible else "❌ Not Eligible"),
        html.P(f"Recommended Loan Amount: P{loan_amount:,.2f}" if is_eligible else ""),
        html.P(f"Monthly Payment (6 months): P{monthly_payment:,.2f}" if is_eligible else ""),
    ], style={"padding": "10px", "border": "1px solid #ddd", "margin-bottom": "20px"}),

    html.Div([
        dcc.Graph(
            figure=px.line(
                daily_sales, 
                title="Daily Sales Trend",
                labels={"index": "Date", "amount": "Sales Amount (P)"}
            )
        ),
    ], style={"margin-bottom": "40px"}),

    html.Div([
        dcc.Graph(
            figure=px.bar(
                monthly_sales.astype(float), 
                title="Monthly Sales Summary",
                labels={"index": "Month", "amount": "Sales Amount (P)"}
            )
        ),
    ], style={"margin-bottom": "40px"}),

    html.Div([
        dcc.Graph(
            figure=px.pie(
                df_sales['payment_method'].value_counts(), 
                names=df_sales['payment_method'].value_counts().index,
                values=df_sales['payment_method'].value_counts().values,
                title="Payment Methods Distribution"
            )
        )
    ])
])

if __name__ == "__main__":
    app.run_server(debug=True)


'''
