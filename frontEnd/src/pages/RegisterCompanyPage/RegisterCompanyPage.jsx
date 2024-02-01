import { useContext, useState } from "react";
import axios from "axios";
import classes from "./RegisterCompanyPage.module.css";
import CompaniesContext from "../../store/CompaniesContext";
import { useNavigate } from "react-router-dom";
import InfoModal from "../../components/modals/InfoModal/InfoModal";

const RegisterCompanyPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setCompanies } = useContext(CompaniesContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!companyName) {
      setShowModal(true);
      return;
    }

    const newCompany = {
      name: companyName,
      employees: [], //add employees if needed
      departments: [], //add departments if needed
    };

    try {
      const response = await axios.post(
        "https://localhost:7204/company/create-company",
        newCompany
      );
      const createdCompany = response.data;
      setCompanies((prevCompanies) => [...prevCompanies, createdCompany]);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
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
        description={"Please fill all the inputs"}
      />
      <div className={classes.regCompPageBody}>
        <div className={classes.container}>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes.title}>Register a company</div>
            <div className={`${classes["company__name"]}`}>
              <label htmlFor="companyName">Name:</label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={onChangeHandler(setCompanyName)}
              />
            </div>
            <button type="submit" className={classes.button}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterCompanyPage;
