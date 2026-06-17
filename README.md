🔗 **Live Demo:** [https://nour-agha99.github.io/dental-dashboard/](https://nour-agha99.github.io/dental-dashboard/)

---

# 🗃 Data Storage — n8n Data Table

All booking data is stored in the **n8n Data Table** with a default status of **Confirmed**.

## 📋 Table Structure

| Field | Description |
|-------|-------------|
| `id` | Unique appointment ID |
| `customerName` | Patient full name |
| `customerEmail` | Patient email address |
| `phoneNumber` | Patient phone number |
| `appointmentDate` | Date of appointment |
| `appointmentTime` | Time of appointment |
| `status` | Default: `Confirmed` → can change to `Cancelled` or `Completed` |

## 📊 Status Flow

```
Confirmed ──→ Completed   (doctor marks after checkup)
Confirmed ──→ Cancelled   (patient clicks cancel link)
```
# 🦷 Dental Clinic — Appointment Booking System

> **Developer:**  Nour Alagha
> **Platform:** n8n (Workflow Automation) + React.js  
> **Type:** Full-Stack Clinic Management System
 Make sure n8n is running on `http://localhost:5678`
