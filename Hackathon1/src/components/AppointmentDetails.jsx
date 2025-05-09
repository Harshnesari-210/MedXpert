import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Stethoscope,
  CalendarCheck,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Building2,
  GraduationCap,
  Award
} from "lucide-react";

function AppointmentDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(location.state?.appointment);
  const [loading, setLoading] = useState(!appointment);

  useEffect(() => {
    if (!appointment) {
      // If no appointment data in state, fetch it
      const fetchAppointment = async () => {
        try {
          const appointmentId = location.pathname.split("/").pop();
          const response = await axios.get(`/appointment/${appointmentId}`);
          setAppointment(response.data);
        } catch (error) {
          console.error("Error fetching appointment details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointment();
    }
  }, [location, appointment]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading appointment details...</span>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-semibold mb-2">Appointment Not Found</h2>
          <p className="text-gray-400 mb-4">The appointment you're looking for doesn't exist or you don't have access to it.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/appointments")}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Appointments
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/appointments")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Appointments
        </motion.button>

        {/* Appointment Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-8 border border-gray-800 shadow-xl"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
              <CalendarCheck className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Appointment Details</h1>
              <div className={`px-4 py-1 rounded-full text-sm inline-block ${
                new Date(appointment.date) >= new Date()
                  ? "bg-green-500/20 text-green-500"
                  : "bg-gray-500/20 text-gray-500"
              }`}>
                {new Date(appointment.date) >= new Date() ? "Upcoming" : "Past"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Doctor Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Stethoscope className="w-6 h-6" />
            Doctor Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Doctor Name</p>
                  <p className="font-medium">Dr. {appointment.doctorId?.firstName} {appointment.doctorId?.lastName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">{appointment.doctorId?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-medium">{appointment.doctorId?.phone || "Not provided"}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Specialization</p>
                  <p className="font-medium">{appointment.doctorId?.speciality}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Hospital/Clinic</p>
                  <p className="font-medium">{appointment.doctorId?.hospital || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Experience</p>
                  <p className="font-medium">{appointment.doctorId?.experience || "Not provided"} years</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Appointment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Appointment Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-medium">{formatDate(appointment.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="font-medium">{appointment.timeSlot}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-medium">{appointment.doctorId?.address || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="font-medium">{appointment.status || "Confirmed"}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AppointmentDetails; 