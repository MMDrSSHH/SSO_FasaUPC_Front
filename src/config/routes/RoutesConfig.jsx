import { Navigate, Route, Routes } from "react-router";
import NotFound from "../../pages/NotFound";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route index element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
