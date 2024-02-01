import React, { useContext } from "react";
import classes from "./EmployeeCard.module.css";
import EmployeesContext from "../../store/EmployeeContext";

const EmployeeCard = ({ employee }) => {
  const { setEmployees } = useContext(EmployeesContext);

  const removeEmployeeHandler = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== employee.id)
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.remove} onClick={removeEmployeeHandler}>
        X
      </div>
      <div className={classes.card}>
        <h3 className={classes.title}>{employee.firstName}</h3>
        <p className={classes.position}>{employee.lastName}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
