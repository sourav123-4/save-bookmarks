export const getcategories = () => {
  return {
    type: "GET_CATEGORIES",
  };
};

export const receivecategories = (data) => {
  return {
    type: "RECEIVE_CATEGORIES",
    data,
  };
};

export const addCategory = (data) => {
  return {
    type: "ADD_CATEGORY",
    data,
  };
};

export const deletecategory = (id) => {
  return {
    type: "DELETE_CATEGORY",
    id,
  };
};

export const updatecategory = (id, name) => {
  return {
    type: "UPDATE_CATEGORY",
    name,
    id,
  };
};

export const addUrl = (id, name) => {
  return {
    type: "ADD_URL",
    name,
    id,
  };
};

export const deleteUrl = (id) => {
  return {
    type: "DELETE_URL",
    id,
  };
};

export const updateurl = (id, name) => {
  return {
    type: "UPDATE_URL",
    name,
    id,
  };
};

export const addUser = (data) => {
  return {
    type: "ADD_USER",
    data,
  };
};
