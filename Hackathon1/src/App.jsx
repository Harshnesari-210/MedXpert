import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./components/DashboardLayout";
import LabReport from "./components/LabReport";
import Profile from "./components/Profile";
import Appointments from "./components/Appointments";
import Billing from "./components/Billing";
import Treatmentanddiagnosis from "./components/Treatmentanddiagnosis";
import Settings from "./components/Settings";
import Error from "./components/Error";
import DoctorProfile from "./components/DoctorProfile";
import DoctorAppointments from "./components/DoctorAppointments";
import Appointment from "./modules/appoinment";
import AppointmentDoctor from "./components/appoinmentdoctor";
import MedicalFileUpload from "./components/uploadFile";
import MedicalFile from "./modules/medicalFiles";
import MedicalFiles from "./components/getfiles";
import SetAvailability from "./components/docotr-set-slots";
import PatientDetail from "./components/Patientdetailsfordoctor";


function App() {
  return (
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/" element={<HomePage />} errorElement={<Error />} />

  <Route path="/login" element={<AuthPage isSignup={false} />} errorElement={<Error />} />
  <Route path="/signup" element={<AuthPage isSignup={true} />} errorElement={<Error />} />

  <Route path="/doctor" element={<DashboardLayout userType={"doctor"} errorElement={<Error />} />} />
  <Route path="/doctor" element={<DashboardLayout userType={"doctor"} />}>
    <Route path="appointments" element={<AppointmentDoctor />} errorElement={<Error />} />
    <Route path="profile" element={<DoctorProfile />} errorElement={<Error />} />
    <Route path="availability" element={<SetAvailability />} errorElement={<Error />} />
    <Route path="patient/:patientId" element={<PatientDetail />} errorElement={<Error />} />

  </Route>

  <Route path="/patient" element={<DashboardLayout userType={"patient"} errorElement={<Error />} />} />
  <Route path="/patient" element={<DashboardLayout userType={"patient"} />}>
    <Route path="labreports" element={<LabReport />} errorElement={<Error />} />
    <Route path="profile" element={<Profile />} errorElement={<Error />} />
    <Route path="appointments" element={<Appointments />} errorElement={<Error />} />
    <Route path="appointments/:doctorId" element={<DoctorAppointments />} errorElement={<Error />} />
    <Route path="billing" element={<Billing />} errorElement={<Error />} />
    <Route path="treatmentanddiagnosis" element={<Treatmentanddiagnosis />} errorElement={<Error />} />
    <Route path="uploadData" element={<MedicalFileUpload />} errorElement={<Error />} />
    <Route path="Myfiles" element={<MedicalFiles />} errorElement={<Error />} />
    <Route path="settings" element={<Settings />} errorElement={<Error />} />
  </Route>
</Routes>

  );
}

export default App;
