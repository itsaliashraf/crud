return (
  <>
    {isLoading ? (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    ) : (
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
    )}
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
          <input type="submit" onSubmit={handleAddNew} value={buttonTitle} />
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
          <input type="submit" onSubmit={SubmitEdit} value={buttonTitle} />
        </form>
      </div>
    </div>
  </>
);
