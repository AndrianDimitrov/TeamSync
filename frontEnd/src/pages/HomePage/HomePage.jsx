import { useContext, useEffect, useState } from "react";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import axios from "axios"; // Import axios library
import classes from "./HomePage.module.css";
import CompaniesContext from "../../store/CompaniesContext";

const HomePage = () => {
  const { companies, setCompanies } = useContext(CompaniesContext);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("https://localhost:7204/company");
        setCompanies(response.data.$values);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <h2>Companies:</h2>
      {companies.map((company) => (
        <CompanyCard id={company.id} name={company.name} />
      ))}
    </div>
  );
};

export default HomePage;
