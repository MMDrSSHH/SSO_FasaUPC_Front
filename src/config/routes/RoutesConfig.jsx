import { Navigate, Route, Routes } from "react-router";
import NotFound from "../../pages/NotFound";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route index element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
