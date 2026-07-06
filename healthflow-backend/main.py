from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="HealthFlow AI Backend")

# Allow your Next.js frontend (usually port 3000 or 3001) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- HARDCODED DUMMY DATA ---

# 1. Dashboard Metrics
dashboard_data = {
    "total_appointments": 142,
    "predicted_no_shows": 12,
    "revenue_at_risk": 3200,
    "recovered_revenue": 1450,
    "waitlist_size": 25
}

# 2. Appointments List (with No-Show Probability)
appointments_data = [
    {"id": 101, "patient_name": "John Doe", "time": "09:30 AM", "no_show_probability": "84%", "status": "High Risk"},
    {"id": 102, "patient_name": "Jane Smith", "time": "10:15 AM", "no_show_probability": "12%", "status": "Low Risk"},
    {"id": 103, "patient_name": "Robert Johnson", "time": "11:00 AM", "no_show_probability": "71%", "status": "High Risk"}
]

# 3. Waitlist Patients (Ready to replace no-shows)
waitlist_data = [
    {"id": 501, "patient_name": "Alice Brown", "urgency": "High", "distance_miles": 2.5},
    {"id": 502, "patient_name": "Charlie Green", "urgency": "Medium", "distance_miles": 4.1},
    {"id": 503, "patient_name": "Emily White", "urgency": "Low", "distance_miles": 1.2}
]

# Request pattern for the POST endpoint
class ApproveRelease(BaseModel):
    waitlist_id: int
    appointment_id: int

# --- ENDPOINTS ---

@app.get("/dashboard")
def get_dashboard():
    """Returns general hospital no-show metrics."""
    return dashboard_data

@app.get("/appointments")
def get_appointments():
    """Returns today's appointments and their AI no-show risk."""
    return appointments_data

@app.get("/waitlist")
def get_waitlist():
    """Returns replacement patients waiting for an opening."""
    return waitlist_data

@app.post("/approve")
def approve_replacement(payload: ApproveRelease):
    """Simulates moving a waitlist patient into a no-show slot."""
    return {
        "success": True,
        "message": f"Successfully assigned waitlist patient {payload.waitlist_id} to appointment slot {payload.appointment_id}.",
        "recovered_revenue_added": 250
    }
