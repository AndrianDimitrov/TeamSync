import "./App.css";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import RegisterCompanyPage from "./pages/RegisterCompanyPage/RegisterCompanyPage";
import CompanyDetailPage from "./pages/CompanyDetailPage/CompanyDetailPage";
import AddDepartmentPage from "./pages/AddDepartmentPage/AddDepartmentPage";
import DepartmentDetailPage from "./pages/DepartmentDetailPage/DepartmentDetailPage";
import AddEmployeePage from "./pages/AddEmployeePage/AddEmployeePage";
import AuthContext from "./store/AuthContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage/ForgottenPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  const authentication = useContext(AuthContext);
  if (authentication.user === null) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgotten-password" element={<ForgottenPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registerCompany" element={<RegisterCompanyPage />} />
        <Route path="/:companyId" element={<CompanyDetailPage />} />
        <Route path="/adddepartmentpage" element={<AddDepartmentPage />} />
        <Route
          path="/:companyId/:departmentId"
          element={<DepartmentDetailPage />}
        />
        <Route path="/addemployeepage" element={<AddEmployeePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
