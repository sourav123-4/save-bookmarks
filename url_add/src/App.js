import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./components/SignUp";
import {
  addCategory,
  getcategories,
  deletecategory,
  updatecategory,
  addUrl,
  deleteUrl,
  updateurl,
} from "./redux/Action";
function App() {
  const [state, setState] = useState(false);
  const [urlState, setUrlState] = useState(false);
  const [name, setName] = useState("");
  const [urlName, setUrlName] = useState("");
  const [edit, setEdit] = useState(false);
  const [urlEdit, setUrlEdit] = useState(false);
  const [id, setId] = useState("");
  const [urlId, setUrlId] = useState("");
  const [deleteState, setDeleteState] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.rootReducer.AllCategories);

  useEffect(() => {
    dispatch(getcategories());
    setDeleteState(false);
  }, [dispatch, state, name, id, edit, deleteState]);

  const hanldeAdd = () => {
    setState(true);
  };
  const handleSave = () => {
    dispatch(addCategory(name));
    setName("");
    setState(false);
  };
  const handleDelete = (id) => {
    dispatch(deletecategory(id));
    setDeleteState(true);
  };

  const handleUpdate = () => {
    dispatch(updatecategory(id, name));
    setId("");
  };

  const handleEdit = (id, name) => {
    setId(id);
    setEdit(true);
  };
  console.log("setName", deleteState);

  const hanldeurlAdd = () => {
    setUrlState(true);
  };
  const handleUrlSave = (id) => {
    dispatch(addUrl(id, urlName));
    setUrlName("");
    setUrlState(false);
    setDeleteState(true);
  };

  const handleUrlDelete = (id) => {
    dispatch(deleteUrl(id));
    setDeleteState(true);
  };

  const handleUrlEdit = (id, name) => {
    setUrlId(id);
    setUrlEdit(true);
  };

  const handleUrlUpdate = () => {
    dispatch(updateurl(urlId, urlName));
    setUrlId("");
  };
  return (
    <div className="App">
      <SignUp />
      {category &&
        category[0] &&
        category?.map((item, index) => {
          return (
            <div key={item._id} className="item">
              <div className="item-header">
                {id !== item._id && <h1>{item.name}</h1>}
                {edit && id === item._id && (
                  <div>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={item.name}
                    />
                    <button onClick={handleUpdate}>Save</button>
                  </div>
                )}
                <button onClick={() => handleEdit(item._id, item.name)}>
                  edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  delete
                </button>
              </div>
              {item.AllUrls.map((urls) => {
                return (
                  <div key={urls._id} className="url">
                    {urlId !== urls._id && <p>{urls.name}</p>}
                    {urlEdit && urlId === urls._id && (
                      <div>
                        <input
                          onChange={(e) => setUrlName(e.target.value)}
                          defaultValue={urls.name}
                        />
                        <button onClick={handleUrlUpdate}>Save</button>
                      </div>
                    )}
                    <button onClick={() => handleUrlEdit(urls._id, urls.name)}>
                      edit
                    </button>
                    <button onClick={() => handleUrlDelete(urls._id)}>
                      delete
                    </button>
                    {!urlState && <button onClick={hanldeurlAdd}>Add</button>}
                    {urlState && (
                      <div>
                        <input
                          placeholder="enter url name"
                          onChange={(e) => setUrlName(e.target.value)}
                        />
                        <button onClick={() => handleUrlSave(item._id)}>
                          save
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      {!state && category[category.length - 1] && (
        <button onClick={hanldeAdd}>Add Project</button>
      )}
      {state && (
        <div>
          <input
            placeholder="enter project name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSave}>save</button>
        </div>
      )}
    </div>
  );
}

export default App;
