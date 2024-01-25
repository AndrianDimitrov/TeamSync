import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { randomIntFromInterval } from "../../utils/randomIdGenerator";
import InfoModal from "../../components/modals/InfoModal/InfoModal";
import CompaniesContext from "../../store/CompaniesContext";
import classes from "./AddDepartmentPage.module.css";
import { useLocation } from "react-router-dom";

const AddDepartmentPage = () => {
  const [departmentName, setDepartmentName] = useState("");
  const { selectedCompanyId } = useContext(CompaniesContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { company } = location.state;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!departmentName) {
      setShowModal(true);
      return;
    }

    const newDepartment = {
      name: departmentName,
      companyId: company.id,
      employees: [],
    };

    await axios
      .post(
        "https://localhost:7204/department/create-department",
        newDepartment
      )
      .then((response) => {
        console.log("Department created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating department:", error.response); // Log the error
      });
    navigate(`/${company.id}`);
  };

  const onChangeHandler = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <>
      <InfoModal
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <div className={classes.container}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <div className={classes.title}>Add a department</div>
          <div className={`${classes["dapartment__name"]}`}>
            <label htmlFor="departmentName">Name:</label>
            <input
              id="departmentName"
              type="text"
              value={departmentName}
              onChange={onChangeHandler(setDepartmentName)}
            />
          </div>
          <button className={classes.button} type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddDepartmentPage;
