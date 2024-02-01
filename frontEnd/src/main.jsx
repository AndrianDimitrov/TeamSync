import React from "react";
import { SnackbarProvider } from "notistack";
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
    <SnackbarProvider>
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
    </SnackbarProvider>
  </React.StrictMode>
);
