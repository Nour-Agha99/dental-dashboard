import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// ⬅️ الـ component الرئيسي
const Dashboard = () => {
  // ⬅️ هنا الـ states
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // ⬅️ هنا الـ functions
  const loadAppointments = async () => {
  setLoading(true);
  setError('');
  try {
    const response = await fetch(
      'http://localhost:5678/webhook/get-appointments'
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // اقرأ الـ response مرة واحدة فقط
    const patientData = await response.json();
    
    // تأكد إنها array
    if (Array.isArray(patientData)) {

      setAppointments(patientData);
    } else if (patientData && typeof patientData === 'object') {
        console.log("patientData2", patientData);

      setAppointments([patientData]);
    } else {
      setAppointments([]);
    }
   
  } catch (err) {
    setError(`❌ خطأ: ${err.message}`);
    console.error('Error:', err);
  } finally {
    setLoading(false);
  }
};

  const updateStatus = async (id, status) => {
  if (!window.confirm(`هل تريد تحديث الحالة إلى ${status}؟`)) return;

  try {
    const response = await fetch(
      `http://localhost:5678/webhook/update-status?id=${id}`,
      { method: 'GET' }
    );

    if (response.ok) {
      showMessage(`✅ تم تحديث الحالة إلى ${status}`);
      loadAppointments();
    }
  } catch (err) {
    alert(`❌ خطأ: ${err.message}`);
  }
};

const deleteAppointment = async (id) => {
  if (!window.confirm('هل أنت متأكد من حذف هذا الموعد؟')) return;

  try {
    const response = await fetch(
      `http://localhost:5678/webhook/cancel-booking?id=${id}`,
      { method: 'GET' }
    );

    if (response.ok) {
      showMessage('✅ تم إلغاء الموعد بنجاح');
      loadAppointments();
    }
  } catch (err) {
    alert(`❌ خطأ: ${err.message}`);
  }
};

const showMessage = (msg) => {
  setMessage(msg);
  setTimeout(() => setMessage(''), 3000);
};
  // ⬅️ باقي الـ functions (updateStatus, deleteAppointment, etc)
  
  useEffect(() => {
    loadAppointments();
  }, []);

  console.log('aaaaa',appointments);
  
  // ⬅️ الـ JSX (HTML)
  return (
  <div className="dashboard">
    <div className="header">
      <h1>🦷 لوحة تحكم المواعيد</h1>
      <p>Dental Clinic - نظام إدارة الحجوزات</p>
    </div>

    <div className="controls">
      <button onClick={loadAppointments} className="refresh-btn">
        🔄 تحديث البيانات
      </button>
    </div>

    {message && <div className="success-message">{message}</div>}
    {error && <div className="error-message">{error}</div>}

    {loading ? (
      <div className="loading">جاري تحميل البيانات...</div>
    ) : appointments.length === 0 ? (
      <div className="empty-state">
        <h2>لا توجد مواعيد</h2>
        <p>جميع المواعيد قد تم إكمالها أو إلغاؤها</p>
      </div>
    ) : (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>الرقم</th>
              <th>اسم المريض</th>
              <th>البريد الإلكتروني</th>
              <th>رقم الهاتف</th>
              <th>التاريخ</th>
              <th>الوقت</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td>{apt.id}</td>
                <td>{apt.customerName}</td>
                <td>{apt.customerEmail || '-'}</td>
                <td>{apt.phoneNumber}</td>
                <td>{apt.appointmentDate}</td>
                <td>{apt.appointmentTime}</td>
                <td>
                  <span className={`status-badge status-${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </td>
                <td>
                  {
                    apt.status.toLowerCase()==="confirmed"?<div className="actions">
                    <button
                      className="action-btn complete-btn"
                      onClick={() => updateStatus(apt.id, 'Completed')}
                    >
                      ✓ مكتمل
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => deleteAppointment(apt.id)}
                    >
                      ✕ حذف
                    </button>
                  </div>:""
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
};

export default Dashboard;