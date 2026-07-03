export const kpis = {
  appointments: 1245,
  predictedNoShows: 142,
  revenueRisk: 21300,
  recoveredSlots: 89,
};

export const insights = [
  {
    id: "ins-1",
    title: "High Risk in Cardiology",
    description: "No-show probability spiked 15% for Dr. Smith's Friday afternoon clinic.",
    type: "warning",
  },
  {
    id: "ins-2",
    title: "Waitlist Opportunity",
    description: "3 high-priority MRI patients can fill upcoming predicted cancellations.",
    type: "opportunity",
  },
  {
    id: "ins-3",
    title: "Revenue Recovery Active",
    description: "Automated SMS reminders recovered $4,200 in at-risk revenue this week.",
    type: "success",
  },
];

export const utilization = [
  { department: "Cardiology", current: 85, capacity: 100 },
  { department: "Radiology", current: 95, capacity: 100 },
  { department: "General Practice", current: 60, capacity: 100 },
  { department: "Orthopedics", current: 78, capacity: 100 },
];

export const recentActions = [
  { id: 1, action: "Approved slot reassignment for Robert Chen", time: "10 mins ago", user: "Dr. Sarah Lee" },
  { id: 2, action: "Automated waitlist notification sent to 3 patients", time: "1 hour ago", user: "System" },
  { id: 3, action: "Flagged 5 appointments for high no-show risk", time: "2 hours ago", user: "System" },
];

export const waitlist = [
  { id: "wl-1", patientName: "Michael Chang", department: "Radiology", procedure: "MRI Scan", priority: "High", waitDays: 14 },
  { id: "wl-2", patientName: "Sarah Jenkins", department: "Cardiology", procedure: "Echocardiogram", priority: "High", waitDays: 11 },
  { id: "wl-3", patientName: "David Torres", department: "Orthopedics", procedure: "Knee Consult", priority: "Medium", waitDays: 22 },
  { id: "wl-4", patientName: "Emily Ross", department: "General Practice", procedure: "Annual Physical", priority: "Low", waitDays: 45 },
];

export const appointments = [
  {
    id: "apt-1",
    patientName: "James Wilson",
    time: "Today, 2:30 PM",
    department: "Cardiology",
    doctor: "Dr. A. Smith",
    riskScore: 88,
    riskFactors: ["Missed last 2 appointments", "Lives >30 miles away", "Unconfirmed SMS"],
    recommendation: {
      action: "Double-book slot from high-priority waitlist",
      recoveredRevenue: 350,
      newPatientName: "Sarah Jenkins",
      reassignmentText: "Slot reassigned to Sarah Jenkins (Waitlist: Cardiology)",
    }
  },
  {
    id: "apt-2",
    patientName: "Linda Martinez",
    time: "Tomorrow, 9:00 AM",
    department: "Radiology",
    doctor: "Dr. K. Patel",
    riskScore: 92,
    riskFactors: ["Historical no-show rate 60%", "No insurance verified"],
    recommendation: {
      action: "Promote waitlisted MRI patient",
      recoveredRevenue: 800,
      newPatientName: "Michael Chang",
      reassignmentText: "Slot reassigned to Michael Chang (Waitlist: Radiology)",
    }
  },
  {
    id: "apt-3",
    patientName: "Robert Taylor",
    time: "Tomorrow, 11:15 AM",
    department: "Orthopedics",
    doctor: "Dr. J. Doe",
    riskScore: 65,
    riskFactors: ["Weather alert in patient zip code", "Unconfirmed email"],
    recommendation: {
      action: "Send urgent personalized SMS reminder",
      recoveredRevenue: 250,
      newPatientName: null,
      reassignmentText: "Personalized follow-up sequence triggered.",
    }
  },
  {
    id: "apt-4",
    patientName: "Amanda White",
    time: "Oct 24, 1:00 PM",
    department: "General Practice",
    doctor: "Dr. M. Lee",
    riskScore: 12,
    riskFactors: [],
    recommendation: null
  }
];