import React from "react";
import { useState } from "react";

function AlbumForm({ addAlbumDummyRequest }) {
    const [value, setValue] = useState("");
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addAlbumDummyRequest(value)
      setValue("");
    };
  
    return (
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button className="submitbtn" onClick={() => handleSubmit}>Add Album<img alt="albumimage" src="https://cdn-icons-png.flaticon.com/512/3309/3309002.png" /></button>
        {/* <button className="submitbtn" onClick={addAlbumDummyRequest}>Post Call</button> */}
      </form>
    );
  }

  export default AlbumForm; 