import React, {useEffect, useState } from "react";

function AlbumList({ Album, index, updateAlbumDummyRequest, deleteAlbumDummyRequest}) {
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => { 
    setTitle(Album.title)
  }, [Album])

  const editAlbum = () => {
    setEdit(true)
  }
  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  const saveAlbum =() => {
    setEdit(false)
    updateAlbumDummyRequest(Album, title)
  }
    return (
      <div className="Album">
        <div className="titleBox"><i class="fa-solid fa-compact-disc"></i>{edit ?(<input className="inputAlbum" value={title} onChange={handleChange} />):<div className="title">{title}</div>}</div>
        <div className="buttons">
          <div  className="editbtn" onClick={() => editAlbum()}><i class="fa-regular fa-pen-to-square"></i></div>
          {edit?(<div  className="savebtn" onClick={() => saveAlbum(index)}><i class="fa-regular fa-floppy-disk"></i></div>):null}
          <div className="deletebtn" onClick={() => deleteAlbumDummyRequest(Album.id)}><i class="fa-regular fa-trash-can"></i></div>
        </div>
      </div>
    );
  }
export default AlbumList;