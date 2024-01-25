// AddEmployeePage.js
import classes from "./AddEmployeePage.module.css";
import { useContext, useState } from "react";
import EmployeesContext from "../../store/EmployeeContext"; // Update the import path
import { randomIntFromInterval } from "../../utils/randomIdGenerator";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentsContext from "../../store/DepartmentsContext";
import CompaniesContext from "../../store/CompaniesContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AddEmployeePage = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");
  const { setEmployees } = useContext(EmployeesContext);
  const navigate = useNavigate();
  const { companyId, departmentId } = useParams();
  const { selectedCompanyId } = useContext(CompaniesContext);
  const { selectedDepartmentId } = useContext(DepartmentsContext);
  const location = useLocation();
  const { depId, company } = location.state;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!employeeName) {
      // Handle validation or show an error message
      return;
    }

    const newEmployee = {
      firstName: employeeName,
      lastName: employeeLastName,
      departmentId: depId,
    };

    await axios
      .post("https://localhost:7204/employee/create-employee", newEmployee)
      .then((response) => {
        console.log("Department created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating department:", error.response); // Log the error
      });

    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    navigate(`/${company.id}/${depId}`, { state: { company: company } });
  };

  const onChangeHandler = (setter) => (e) => {
    setter(e.target.value);
  };
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.title}>Add New Employee</div>

        <div className={classes.inputContainer}>
          <label>FirstName:</label>
          <input
            type="text"
            value={employeeName}
            onChange={onChangeHandler(setEmployeeName)}
          />
        </div>

        <div className={classes.inputContainer}>
          <label>LastName:</label>
          <input
            type="text"
            value={employeeLastName}
            onChange={onChangeHandler(setEmployeeLastName)}
          />
        </div>

        <button className={classes.button} type="submit">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
