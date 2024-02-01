const url = "http://localhost:5173/";

export function deleteDepartament(departamentId) {
  return fetch(url + "/departament/delete-department{" + departamentId + "}", {
    method: "DELETE",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res);
}
