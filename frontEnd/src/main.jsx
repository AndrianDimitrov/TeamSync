import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CompaniesContextProvider } from "./store/CompaniesContext.jsx";
import { DepartmentsContextProvider } from "./store/DepartmentsContext.jsx";
import { EmployeesContextProvider } from "./store/EmployeeContext.jsx";
import { AuthContextProvider } from "./store/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DepartmentsContextProvider>
          <CompaniesContextProvider>
            <DepartmentsContextProvider>
              <EmployeesContextProvider>
                <App />
              </EmployeesContextProvider>
            </DepartmentsContextProvider>
          </CompaniesContextProvider>
        </DepartmentsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
