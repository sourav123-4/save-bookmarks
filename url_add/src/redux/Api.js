export const fetchCategory = async () => {
  try {
    const res = await fetch(`http://localhost:8080/categories`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const addCategory = async (data) => {
  const name = data;
  try {
    const res = await fetch(`http://localhost:8080/addCategory`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name }),
    });
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategory = async (id) => {
  const _id = id;
  try {
    await fetch(`http://localhost:8080/deleteCategory/${_id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCategory = async (name, id) => {
  try {
    await fetch(`http://localhost:8080/updatecategory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUrl = async (name, id) => {
  try {
    const res = await fetch(`http://localhost:8080/addUrl`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name, CategoryId: id }),
    });
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUrl = async (id) => {
  const _id = id;
  try {
    await fetch(`http://localhost:8080/deleteurl/${_id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUrl = async (name, id) => {
  try {
    await fetch(`http://localhost:8080/updateurl/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUser = async (user) => {
  console.log(user, "userrrr");
  try {
    const res = await fetch(`http://localhost:8080/addUser`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
