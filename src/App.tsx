import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pictures, setPictures] = useState<Image[]>([]);

  useEffect(() => {
    // This code runs when the component is mounted

    // You can perform your data fetching here
    fetchData();

    // Optionally, you can return a cleanup function to cancel any ongoing processes
    return () => {
      // Cleanup code (if needed)
    };
  }, []); // The empty array [] as the second argument makes this effect run only on mount

  const fetchData = async () => {
    await fetch("http://localhost:5207/Image")
      .then((response) => response.json())
      .then((data) => setPictures(data));
  };

  let imgList = pictures.map((image) => (
    <li key={image.name}>
      <img src={image.uri} alt={image.name} />
    </li>
  ));

  const imgCount = imgList.length;

  if (imgCount % 3 !== 0) {
    let trailingImg = [<li key={`empty li ${imgCount}`}></li>];

    if (imgCount % 3 === 2) {
      trailingImg = [
        ...trailingImg,
        <li key={`empty li ${imgCount + 1}`}></li>,
      ];
    }

    imgList = [...imgList, ...trailingImg];
  }

  return (
    <>
      <div>
        <ul>{imgList}</ul>
      </div>
    </>
  );
}

export default App;
