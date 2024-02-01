import axios from "axios";


const url = 'http://localhost:7204/';

export const deleteDepartment =  (departmentId) => {
    try {
      const response = axios.delete(
        `https://localhost:7204/department/delete-department${departmentId}`
      ).then(response => { console.log('Deleted post with ID ${postIdToDelete}')});


    } catch (error) {
      console.error("Error delete department", error);
    }
  };