import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShimmerUI from "./ShimmerUI";
import { 
  Stethoscope, 
  Heart, 
  Info, 
  Calendar, 
  FileText, 
  Users, 
  Clock, 
  Activity,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

function DashboardLayout({ userType }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    appointments: 0,
    patients: 0,
    reports: 0,
    upcoming: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getProjectInfo = () => {
    const baseCardClasses = "rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-800";
    const statCardClasses = "bg-black rounded-xl p-4 shadow-md border border-gray-800";

    if (userType === "doctor") {
      return (
        <div className="space-y-6">
          <div className={`${baseCardClasses} bg-black`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-900 rounded-xl">
                <Stethoscope className="text-gray-400 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">Doctor's Dashboard</h2>
                <p className="text-gray-400">Welcome back! Here's your overview</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className={statCardClasses}>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-400 w-5 h-5" />
                  <h3 className="text-sm font-medium text-gray-400">Today's Appointments</h3>
                </div>
                <p className="text-2xl font-bold text-gray-100 mt-2">{stats.appointments}</p>
              </div>
              <div className={statCardClasses}>
                <div className="flex items-center gap-3">
                  <Users className="text-gray-400 w-5 h-5" />
                  <h3 className="text-sm font-medium text-gray-400">Total Patients</h3>
                </div>
                <p className="text-2xl font-bold text-gray-100 mt-2">{stats.patients}</p>
              </div>
              <div className={statCardClasses}>
                <div className="flex items-center gap-3">
                  <FileText className="text-gray-400 w-5 h-5" />
                  <h3 className="text-sm font-medium text-gray-400">Reports Reviewed</h3>
                </div>
                <p className="text-2xl font-bold text-gray-100 mt-2">{stats.reports}</p>
              </div>
              <div className={statCardClasses}>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-400 w-5 h-5" />
                  <h3 className="text-sm font-medium text-gray-400">Upcoming</h3>
                </div>
                <p className="text-2xl font-bold text-gray-100 mt-2">{stats.upcoming}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-black p-4 rounded-xl border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-100 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors">
                    <span className="text-gray-400">View Today's Schedule</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors">
                    <span className="text-gray-400">Review Patient Reports</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors">
                    <span className="text-gray-400">Set Availability</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-black p-4 rounded-xl border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-100 mb-2">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-900">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">New appointment request from John Doe</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-900">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Lab report uploaded by Sarah Smith</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      );
    }

    if (userType === "patient") {
      return (
        <div className="space-y-6">
          <div className={`${baseCardClasses} bg-black`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-900 rounded-xl">
                <Heart className="text-gray-400 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">Patient's Dashboard</h2>
                <p className="text-gray-400">Your health journey at a glance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className={statCardClasses}>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-400 w-5 h-5" />
                  <h3 className="text-sm font-medium text-gray-400">Upcoming Appointments</h3>
                </div>
                <p className="text-2xl font-bold text-gray-100 mt-2">{stats.appointments}</p>
              </div>
              <div className={statCardClasses}>
                <div className="flex items-center gap-3">
                  <FileText className="text-gray-400 w-5 h-5" />
                  <h3 className="text-sm font-medium text-gray-400">Medical Reports</h3>
                </div>
                <p className="text-2xl font-bold text-gray-100 mt-2">{stats.reports}</p>
              </div>
              <div className={statCardClasses}>
                <div className="flex items-center gap-3">
                  <Users className="text-gray-400 w-5 h-5" />
                  <h3 className="text-sm font-medium text-gray-400">My Doctors</h3>
                </div>
                <p className="text-2xl font-bold text-gray-100 mt-2">{stats.patients}</p>
              </div>
              <div className={statCardClasses}>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-400 w-5 h-5" />
                  <h3 className="text-sm font-medium text-gray-400">Recent Activity</h3>
                </div>
                <p className="text-2xl font-bold text-gray-100 mt-2">{stats.upcoming}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-black p-4 rounded-xl border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-100 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors">
                    <span className="text-gray-400">Book New Appointment</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors">
                    <span className="text-gray-400">Upload Medical Report</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors">
                    <span className="text-gray-400">View My Records</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-black p-4 rounded-xl border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-100 mb-2">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-900">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Appointment confirmed with Dr. Smith</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-900">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Lab report uploaded successfully</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`${baseCardClasses} bg-black`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gray-900 rounded-xl">
            <Info className="text-gray-400 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-100">Welcome to MedXpert</h2>
            <p className="text-gray-400">Your healthcare companion</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header userType={userType} />

      {location.pathname === `/${userType}` && (isLoading ? <ShimmerUI /> : getProjectInfo())}

      <main className="flex-grow px-4 md:px-10 py-6">
        {isLoading ? <ShimmerUI /> : <Outlet />}
      </main>

      <Footer />
    </div>
  );
}

DashboardLayout.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default DashboardLayout;
