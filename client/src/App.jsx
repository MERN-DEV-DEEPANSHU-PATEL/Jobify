import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Status,
} from "./pages/dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import DeleteAccount from "./pages/dashboard/DeleteAccount";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/all-job" element={<AllJobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/delete" element={<DeleteAccount />} />
        <Route index element={<Status />} />
      </Route>
      <Route path="/" element={<div>DashBoard </div>} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<div>Login</div>} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
