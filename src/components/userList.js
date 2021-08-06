import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../graphQL/queries";
import { REMOVE_USER } from "../graphQL/mutations";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

let UserList = () => {
  const { data, refetch, loading, error } = useQuery(GET_USERS);

  let csv = null;

  let upload = (e) => {
    let csv = e.target.files[0];
    if (csv) {
      let fd = new FormData();
      fd.append("image", csv);
      csv = fd;
    }
  };

  let handleCsvSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/importCsv", csv)
      .then(({ data }) => {
        console.log(data);
        if (data.succes) {
          csv = null;
          alert(data.message);
          refetch();
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (error) {
    alert(error.message);
  }

  let [state, setState] = useState([]);

  useEffect(() => {
    if (data) {
      setState(data.users.datas);
    }
  }, [data]);

  let [removeUser] = useMutation(REMOVE_USER);

  //deletetion

  let deleteUser = async (id) => {
    let res = await removeUser({
      variables: {
        id,
      },
    });

    if (res.data.removeUser.success) {
      alert("user deleted");
      setState(data.users.datas.filter((user) => user.id !== id));
    } else {
      alert(res.data.removeUser.message);
    }
  };

  let importUsers = () => {};

  if (!loading && data)
    return (
      <div className="container">
        <Link to="/add" className="mr-2">
          Add user
        </Link>
        <a
          href="http://localhost:8000/exportCsv"
          className="btn btn-sm btn-outline-primary"
        >
          Downloed users as csv
        </a>
        <form
          onSubmit={(e) => {
            handleCsvSubmit(e);
          }}
        >
          <p>import csv as user data</p>
          <input type="file" name="csv" onBlur={(e) => upload(e)} />
          <button type="submit" onClick={importUsers}>
            Import
          </button>
        </form>
        <table className="table table-striped table-hovered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {state.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  {user.photo ? (
                    <img
                      src={`http://localhost:8000/images/${user.photo}`}
                      alt="avator"
                      className="img img-thumbnail"
                      height="400px"
                      width="200px"
                    />
                  ) : (
                    "No-photo"
                  )}
                </td>
                <td>
                  <Link
                    className="btn btn-outline-secondary"
                    to={`/update/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={async () => {
                      if (window.confirm("Are you sure to delete?")) {
                        deleteUser(user.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  else
    return (
      <center>
        <h4>Loading...</h4>
      </center>
    );
};

export default UserList;
