import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FIND_USER, GET_USERS } from "../graphQL/queries";
import { DELETE_IMAGE, UPDATE_USER } from "../graphQL/mutations";
import axios from "axios";

let Update = () => {
  let photo = null;
  let photoName = "";
  let param = useParams();
  let history = useHistory();
  let [state, setState] = useState({ name: "", password: "", age: "" });
  let { data } = useQuery(FIND_USER, {
    variables: {
      id: Number(param.id),
    },
  });

  let [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  let [deleteImage] = useMutation(DELETE_IMAGE);

  if (!state.name) {
    if (data) {
      setState({ ...data.user.data, password: "" });
    }
  }

  let upload = (e) => {
    let file = e.target.files[0];
    if (file) {
      let fd = new FormData();
      fd.append("image", file);
      photo = fd;
      photoName = file.name;
    }
  };

  let update = async () => {
    let res = await updateUser({
      variables: { ...state, age: Number(state.age), photo: photoName },
    });
    if (res.data.updateUser.success) {
      deletePastImage();
      alert("successfully updated!");
      history.push("/");
    } else {
      alert(res.data.updateUser.message);
    }
  };

  let deletePastImage = () => {
    if (state.photo) {
      deleteImage({
        variables: {
          photo: state.photo,
        },
      });
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/upload", photo)
      .then(({ data }) => {
        if (data.success) {
          update();
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container">
      <form className="row g-3" onSubmit={handleSubmit}>
        <h3 className="text-center">Update user</h3>
        <div className="col-auto">
          <label htmlFor="name" className="visually-hidden">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter name"
            onChange={(e) => setState({ ...state, name: e.target.value })}
            value={state.name}
          ></input>
        </div>
        <div className="col-auto">
          <label htmlFor="password" className="visually-hidden">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="name"
            name="password"
            placeholder="Enter  password"
            onChange={(e) => setState({ ...state, password: e.target.value })}
            value={state.password}
          ></input>
        </div>
        <div className="col-auto">
          <label htmlFor="age" classage="visually-hidden">
            age
          </label>
          <input
            type="number"
            classage="form-control"
            id="age"
            name="age"
            placeholder="Enter  age"
            onChange={(e) => setState({ ...state, age: e.target.value })}
            value={state.age}
          ></input>
        </div>
        <div className="col-auto">
          <label htmlFor="image" classage="visually-hidden">
            photo
          </label>
          <input
            type="file"
            classage="form-control"
            id="image"
            name="image"
            placeholder="select  image"
            onBlur={(e) => upload(e)}
          ></input>
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary mb-3"
            disabled={!state.name || !state.password || !state.age}
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
