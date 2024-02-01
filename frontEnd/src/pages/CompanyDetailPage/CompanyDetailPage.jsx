import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CompaniesContext from "../../store/CompaniesContext";
import DepartmentsContext from "../../store/DepartmentsContext";
import InfoModal from "../../components/modals/InfoModal/InfoModal";
import classes from "./CompanyDetailPage.module.css";

const CompanyDetailPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyDepartments, setCompanyDepartments] = useState([]);
  const { companies } = useContext(CompaniesContext);
  const { setDepartments } = useContext(DepartmentsContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getCompany = companies.find((c) => c.id === +params.companyId);

    if (getCompany) {
      setCompany(getCompany);
    } else {
      setShowModal(true);
    }
  }, [companies, params.companyId]);

  useEffect(() => {
    if (company) {
      fetchCompanyDetails();
    }
  }, [company]);

  const handleAddDepartmentClick = () => {
    navigate("/adddepartmentpage", { state: { company: company } });
  };

  const handleDepartmentClick = (departmentId) => {
    navigate(`/${params.companyId}/${departmentId}`, {
      state: { company: company },
    });
  };

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7204/department/get-all-departments-by-companyid/${params.companyId}`
      );
      const fetchedDepartments = response.data.$values || [];
      setCompanyDepartments(fetchedDepartments);
      setDepartments(fetchedDepartments);
    } catch (error) {
      console.error("Error fetching company details:", error);
      setShowModal(true);
    }
  };
  console.log(companyDepartments);
  return (
    <>
      {company ? (
        <div className={classes.container}>
          <div className={classes["title__box"]}>
            <h1 className={classes["title"]}>Company name: {company.name}</h1>
          </div>
          <div className={classes["description__box"]}>
            <div className={classes["description__box"]}>
              <button
                className={classes["add_department_button"]}
                onClick={handleAddDepartmentClick}
              >
                Add department
              </button>
            </div>
          </div>
          <div className={classes["departments__box"]}>
            <h2>Departments:</h2>
            <ul>
              {Array.isArray(companyDepartments) &&
                companyDepartments.map((department) => (
                  <li
                    key={department.id}
                    onClick={() => handleDepartmentClick(department.id)}
                  >
                    {department.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <InfoModal
          showModal={showModal}
          onClose={() => {
            setShowModal(false);
            navigate("/");
          }}
          description={"Company not found"}
        />
      )}
    </>
  );
};

export default CompanyDetailPage;
