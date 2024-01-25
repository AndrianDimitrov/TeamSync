import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CompaniesContext from "../../store/CompaniesContext";
import DepartmentsContext from "../../store/DepartmentsContext";
import InfoModal from "../../components/modals/InfoModal/InfoModal";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import classes from "./DepartmentDetailPage.module.css";
import { useLocation } from "react-router-dom";

const DepartmentDetailPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [department, setDepartment] = useState(null);
  const [departmentEmployees, setDepartmentEmployees] = useState([]);
  const { departments, removeDepartment, setSelectedDepartmentId } =
    useContext(DepartmentsContext);
  const { selectedCompanyId } = useContext(CompaniesContext);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { company } = location.state;
  useEffect(() => {
    const getDepartment = departments.find(
      (department) => department.id === +params.departmentId
    );

    if (getDepartment) {
      setDepartment(getDepartment);
      setSelectedDepartmentId(getDepartment.id);

      // Fetch employees by departmentId
      fetchDepartmentEmployees(getDepartment.id);
    } else {
      setShowModal(true);
    }
  }, [params.departmentId, departments, setSelectedDepartmentId]);

  const fetchDepartmentEmployees = async (departmentId) => {
    try {
      const response = await axios.get(
        `https://localhost:7204/employee/get-all-employees-by-departmentid/${departmentId}`
      );
      const fetchedEmployees =
        response.data && response.data.$values ? response.data.$values : [];
      setDepartmentEmployees(fetchedEmployees);
    } catch (error) {
      console.error("Error fetching department employees:", error);
    }
  };

  const handleAddEmployeeClick = () => {
    navigate("/addemployeepage", {
      state: { depId: department.id, company: company },
    });
  };

  const handleDeleteDepartment = () => {
    removeDepartment(department.id);
    navigate(`/${selectedCompanyId}`);
  };

  return (
    <>
      {department ? (
        <div className={classes.container}>
          <div className={classes["title__box"]}>
            <h1 className={classes["title"]}>
              Department name: {department.name}
            </h1>
          </div>
          <div className={classes["description__box"]}>
            <div className={classes["description__box"]}>
              <button
                className={classes["add_employee_button"]}
                onClick={handleAddEmployeeClick}
              >
                Add employee
              </button>
              <button
                className={classes["delete_department_button"]}
                onClick={handleDeleteDepartment}
              >
                Delete department
              </button>
            </div>
          </div>
          <div className={classes["employees__box"]}>
            <div className={classes.employee_cards}>
              {departmentEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <InfoModal
          showModal={showModal}
          onClose={() => {
            setShowModal(false);
            navigate("/");
          }}
          description={"Department not found"}
        />
      )}
    </>
  );
};

export default DepartmentDetailPage;
