import { createContext, useState } from "react";

const DepartmentsContext = createContext({
  departments: [],
  setDepartments: () => {},
  selectedDepartmentId: null,
  setSelectedDepartmentId: () => {},
  removeDepartment: () => {}, // Add the removeDepartment function
});

export const DepartmentsContextProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const removeDepartment = (departmentId) => {
    setDepartments((prevDepartments) =>
      prevDepartments.filter((department) => department.id !== departmentId)
    );
  };

  return (
    <DepartmentsContext.Provider
      value={{
        departments,
        setDepartments,
        selectedDepartmentId,
        setSelectedDepartmentId,
        removeDepartment, // Include the removeDepartment function
      }}
    >
      {children}
    </DepartmentsContext.Provider>
  );
};

export default DepartmentsContext;
