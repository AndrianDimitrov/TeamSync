import { createContext, useState } from "react";

const EmployeesContext = createContext({
  employees: [],
  setEmployees: () => {},
});

export const EmployeesContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        setEmployees,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContext;
