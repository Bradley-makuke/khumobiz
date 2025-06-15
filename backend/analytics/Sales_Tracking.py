
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


