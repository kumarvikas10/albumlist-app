import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import AlbumForm from "./AlbumForm";
import AlbumList from "./AlbumList";
import Loader from "./Loader";
import axios from "axios";
import ShortUniqueId from "short-unique-id";

function App() {
  const [Albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = new ShortUniqueId({ length: 8 });
  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const data = await response.json();
      const AlbumArray = data.slice(0, 10);
      console.log(AlbumArray);
      setAlbums(AlbumArray);
      setLoading(false);
    };
    fetchAlbums();
  }, []);

  //POST REQUEST TO ADD ALBUM
  const addAlbumDummyRequest = async (value) => {
    console.log("Dummy Post Call");
    const request = {
      id: uid(),
      title: value,
    };
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/albums",
      request
    );
    console.log(response);
    const newAlbums = [...Albums, response.data];
    setAlbums(newAlbums);
  };

  // PUT REQUEST To UPDATE ALBUM
  const updateAlbumDummyRequest = async (Album, title) => {
    console.log("PUT REQUEST DUMMY CALL");
    const request = {
      id: Album.id,
      title,
    };
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/albums/${Album.id}`,
      request
    );
    console.log(response.data);
    const { id } = response.data;
    setAlbums((Album) => {
      return Album.id === id ? { ...response.data } : Album;
    });
  };

  // DELETE REQUEST To UPDATE ALBUM
  const deleteAlbumDummyRequest = async (id) => {
    console.log("DELTE REQUEST DUMMY CALL");
    await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
    const newAlbums = Albums.filter((album) => {
      return album.id !== id;
    });
    setAlbums(newAlbums);
  };

  if (loading) {
    return <Loader />;
  }
  console.log(Albums);
  return (
    <div className="App">
      <div className="heading">
          <img
            alt="albumcollectionimage"
            src="https://cdn-icons-png.flaticon.com/512/526/526471.png"
          />
          <span>Album List App</span>
      </div>
      <div className="Album-list">
        <AlbumForm addAlbumDummyRequest={addAlbumDummyRequest} />
        {Albums.map((Album, index) => {
          return (
            <AlbumList
              key={index}
              index={index}
              Album={Album}
              updateAlbumDummyRequest={updateAlbumDummyRequest}
              deleteAlbumDummyRequest={deleteAlbumDummyRequest}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
