import React, { useState } from "react";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

import "./CRUD.css";

export default function CRUD() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [buttonTitle, setButtonTitle] = useState("Submit");
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    id: "",
    index: "",
  });
  const [newData, setNewData] = useState({
    title: "",
    description: "",
  });

  const handleAddNew = (event) => {
    event.preventDefault();
    fetch("https://usman-fake-api.herokuapp.com/api/recipes/", {
      method: "Post",
      body: JSON.stringify({
        title: `${newData.title}`,
        body: `${newData.description}`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((added) => {
        setTimeout(() => {
          setNewData({ title: "", description: "" });
          const updatedTexts = [
            ...data,
            { _id: added._id, title: added.title, body: added.body },
          ];

          setData(updatedTexts);
          setButtonTitle("Submit");
        }, 1000);
        setButtonTitle("Loading");
      });
  };

  const newhandleTitleChange = (event) => {
    setNewData({
      title: event.target.value,
      description: editData.description,
    });
  };
  const newhandleDescriptionChange = (event) => {
    setNewData({
      title: newData.title,
      description: event.target.value,
    });
  };

  const SubmitEdit = (event) => {
    event.preventDefault();
    if (
      editData.title !== "" &&
      editData.description !== "" &&
      editData.id !== "" &&
      editData.index !== ""
    ) {
      fetch(`https://usman-fake-api.herokuapp.com/api/recipes/${editData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: `${editData.title}`,
          body: `${editData.description}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      setTimeout(() => {
        setEditData({
          title: "",
          description: "",
          id: "",
          index: "",
        });
        const updatedData = [...data];
        updatedData[parseInt(editData.index)].title = editData.title;
        updatedData[parseInt(editData.index)].body = editData.description;
        setData(updatedData);
        setButtonTitle("Submit");
      }, 1000);
      setButtonTitle("Loading");
    }
  };
  const handleTitleChange = (event) => {
    setEditData({
      title: event.target.value,
      description: editData.description,
      id: editData.id,
      index: editData.index,
    });
  };
  const handleDescriptionChange = (event) => {
    setEditData({
      title: editData.title,
      description: event.target.value,
      id: editData.id,
      index: editData.index,
    });
  };
  function handleDelete(id, index) {
    fetch(`https://usman-fake-api.herokuapp.com/api/recipes/${id}`, {
      method: "DELETE",
    });
    const updateddata = data.filter((current, i) => i !== index);
    setData(updateddata);
  }
  function handleEdit(item, index) {
    setEditData({
      title: item.title,
      description: item.body,
      id: item._id,
      index: index,
    });
  }
  function f() {
    setIsLoading(true);
    fetch("https://usman-fake-api.herokuapp.com/api/recipes/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    setTimeout(() => {
      f();
    }, 2000);
  }, []);

  // return (
  //   <>
  //     <div className="boxes">
  //       {data.length === 0 ? (
  //         <h1>No Recipies Found. Enter a new one.</h1>
  //       ) : (
  //         data.map((current, index) => {
  //           return (
  //             <div key={index} className="box">
  //               <p>
  //                 <strong>Title: </strong>
  //                 {current.title}
  //               </p>
  //               <p>
  //                 <strong>Description: </strong>
  //                 {current.body}
  //               </p>
  //               <button
  //                 className="btn dlt"
  //                 onClick={() => handleDelete(current._id, index)}
  //               >
  //                 Delete
  //               </button>
  //               <button
  //                 className="btn edit"
  //                 onClick={() => handleEdit(current, index)}
  //               >
  //                 Edit
  //               </button>
  //             </div>
  //           );
  //         })
  //       )}
  //     </div>
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         width: "100%",
  //       }}
  //     >
  //       <div className="container ">
  //         <h1>Add New Recipie</h1>
  //         <form onSubmit={handleAddNew}>
  //           <div>
  //             <label htmlFor="">Title</label>
  //             <input
  //               id="title"
  //               type="text"
  //               value={newData.title}
  //               placeholder="Enter Title"
  //               onChange={newhandleTitleChange}
  //               required
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="">Description</label>
  //             <input
  //               id="description"
  //               type="text"
  //               value={newData.description}
  //               placeholder="Enter Description"
  //               onChange={newhandleDescriptionChange}
  //               required
  //             />
  //           </div>
  //           <input type="submit" onSubmit={handleAddNew} value={buttonTitle} />
  //         </form>
  //       </div>
  //       <div className="container">
  //         <h1>Edit Recipie</h1>
  //         <form onSubmit={SubmitEdit}>
  //           <div>
  //             <label htmlFor="">Title</label>
  //             <input
  //               id="edittitle"
  //               type="text"
  //               placeholder="Enter Title"
  //               value={editData.title}
  //               onChange={handleTitleChange}
  //               required
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="">Description</label>
  //             <input
  //               id="editdescription"
  //               type="text"
  //               value={editData.description}
  //               placeholder="Enter Description"
  //               onChange={handleDescriptionChange}
  //               required
  //             />
  //           </div>
  //           <input type="submit" onSubmit={SubmitEdit} value={buttonTitle} />
  //         </form>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="boxes">
            {data.length === 0 ? (
              <h1>No Recipies Found. Enter a new one.</h1>
            ) : (
              data.map((current, index) => {
                return (
                  <div key={index} className="box">
                    <p>
                      <strong>Title: </strong>
                      {current.title}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {current.body}
                    </p>
                    <button
                      className="btn dlt"
                      onClick={() => handleDelete(current._id, index)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn edit"
                      onClick={() => handleEdit(current, index)}
                    >
                      Edit
                    </button>
                  </div>
                );
              })
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="container ">
              <h1>Add New Recipie</h1>
              <form onSubmit={handleAddNew}>
                <div>
                  <label htmlFor="">Title</label>
                  <input
                    id="title"
                    type="text"
                    value={newData.title}
                    placeholder="Enter Title"
                    onChange={newhandleTitleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">Description</label>
                  <input
                    id="description"
                    type="text"
                    value={newData.description}
                    placeholder="Enter Description"
                    onChange={newhandleDescriptionChange}
                    required
                  />
                </div>
                <input
                  type="submit"
                  onSubmit={handleAddNew}
                  value={buttonTitle}
                />
              </form>
            </div>
            <div className="container">
              <h1>Edit Recipie</h1>
              <form onSubmit={SubmitEdit}>
                <div>
                  <label htmlFor="">Title</label>
                  <input
                    id="edittitle"
                    type="text"
                    placeholder="Enter Title"
                    value={editData.title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">Description</label>
                  <input
                    id="editdescription"
                    type="text"
                    value={editData.description}
                    placeholder="Enter Description"
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>
                <input
                  type="submit"
                  onSubmit={SubmitEdit}
                  value={buttonTitle}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
