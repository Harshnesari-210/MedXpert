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
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<HomePage />} errorElement={<Error />} />
      <Route
        path="/login"
        element={<AuthPage isSignup={false} />}
        errorElement={<Error />}
      />
      <Route
        path="/signup"
        element={<AuthPage isSignup={true} />}
        errorElement={<Error />}
      />
      <Route
        path="/doctor"
        element={
          <DashboardLayout userType={"doctor"} errorElement={<Error />} />
        }
      />
      <Route
        path="/doctor"
        element={
          <DashboardLayout userType={"doctor"} errorElement={<Error />} />
        }
      >
        {/* <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} /> */}
      </Route>
      <Route
        path="/patient"
        element={
          <DashboardLayout userType={"patient"} errorElement={<Error />} />
        }
      />
      <Route
        path="/patient"
        element={<DashboardLayout userType={"patient"} />}
        errorElement={<Error />}
      >
        <Route
          path="/patient/labreports"
          element={<LabReport />}
          errorElement={<Error />}
        />
        <Route
          path="/patient/profile"
          element={<Profile />}
          errorElement={<Error />}
        />
        <Route
          path="/patient/appointments/:doctorId"
          element={<DoctorAppointments />}
          errorElement={<Error />}
        />
        <Route
          path="/patient/billing"
          element={<Billing />}
          errorElement={<Error />}
        />
        <Route
          path="/patient/treatmentanddiagnosis"
          element={<Treatmentanddiagnosis />}
          errorElement={<Error />}
        />
        <Route
          path="/patient/settings"
          element={<Settings />}
          errorElement={<Error />}
        />
      </Route>
    </Routes>
  );
}

export default App;
