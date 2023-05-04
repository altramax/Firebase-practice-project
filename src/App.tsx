import { useState, useEffect } from "react";
import { Auth } from "./Components/auth";
import { auth, db } from "./configure/Firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import "./App.css";

type movieType = {
  grammy: number;
  title: string;
  year: number;
  id: string;
};

function App() {
  const [movies, setMovies] = useState<Array<movieType>>([]);
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<number | string>("");
  const [grammy, setGrammy] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>("");

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const arr: Array<movieType> = [];
      data.docs.forEach((items) => {
        arr.push({ ...items.data(), id: items.id } as movieType);
      });

      setMovies(arr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const yearHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = Number(e.target.value);
    if (isNaN(num) === true) {
      // console.log(e.target.value);
      setYear("Enter valid year")
      setTimeout(() => {
        setYear(" ");
      }, 1500);
    } else if (isNaN(num) === false) {
      setYear(Number(e.target.value));
    }
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrammy(e.target.checked);
    if (e.target.checked === true) {
      console.log("checked");
    } else {
      console.log("unchecked");
    }
  };

  const submitHandler = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: title,
        grammy: grammy,
        year: year,
        userId: auth.currentUser?.uid,
      });
    } catch (err) {
      console.log(err);
    }
    getMovieList();
  };

  const deleteHandler = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateHandler = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: newTitle });
    getMovieList();
  };

  return (
    <>
      <Auth></Auth>
      <div>
        <input
          type="text"
          placeholder="Title"
          onChange={titleHandler}
          value={title}
        />
        <input
          type="text"
          placeholder="year"
          onChange={yearHandler}
          value={year}
        />
        <div>
          <input type="checkbox" checked={grammy} onChange={checkHandler} />
          <label htmlFor="checkbox">Reacived grammy</label>
        </div>
        <button onClick={submitHandler}>Submit</button>
      </div>
      <div>
        {movies?.map((item: movieType) => {
          return (
            <>
              <div>
                <h1 style={{ color: item.grammy ? "Green" : "red" }}>
                  {item.title}
                </h1>
                <div>{item.year}</div>
                <button
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                >
                  Delete Movie
                </button>
                <div>
                  <input
                    type="text"
                    placeholder="New Title"
                    // value={newTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setNewTitle(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateHandler(item.id);
                    }}
                  >
                    Update Title
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;
