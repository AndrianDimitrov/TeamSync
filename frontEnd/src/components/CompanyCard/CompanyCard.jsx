import { useContext } from "react";
import classes from "./CompanyCard.module.css";
import CompaniesContext from "../../store/CompaniesContext";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ id, name }) => {
  const { setCompanies } = useContext(CompaniesContext);
  const navigate = useNavigate();
  console.log(id);
  const removeCompanyHandler = () => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== id)
    );
  };

  const onClickHandler = () => {
    navigate(`/${id}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.remove} onClick={removeCompanyHandler}>
        X
      </div>
      <div className={classes.card} onClick={onClickHandler}>
        <h2 className={classes.title}>{name}</h2>
      </div>
    </div>
  );
};

export default CompanyCard;
