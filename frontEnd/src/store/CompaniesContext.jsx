// CompaniesContext.js
import { createContext, useState } from "react";

const CompaniesContext = createContext({
  companies: [],
  setCompanies: () => {},
});

export const CompaniesContextProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);

  return (
    <CompaniesContext.Provider value={{ companies, setCompanies }}>
      {children}
    </CompaniesContext.Provider>
  );
};

export default CompaniesContext;
