import { useEffect, useState } from "react";
import Element from "./components/Elements";
import "./App.css";

const colors = {
  "alkali metal": "#FF6666",
  "alkaline earth metal": "#FFDEAD",
  "post-transition metal": "#FFD700",
  "transition metal": "#FFD700",
  "post transition metal": "#CCCCCC",
  "metalloid": "#66FF66",
  "halogen": "#E0FFFF",
  "noble gas": "#FFDAB9",
  "polyatomic nonmetal": "#7FFFD4",
  "diatomic nonmetal": "#7FFFD4",
  "lanthanide": "#FFB6C1",
  "actinide": "#FFA07A",
  "unknown": "rgba(200, 200, 200, 0.3)",
  "default": "rgba(100, 100, 100, 0.1)",
};

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      fetch("http://localhost:3333/periodictable")
        .then((response) => response.json())
        .then((data) => {
          const promises = data.map((element) =>
            fetch(`http://localhost:3333/periodictable/${element}`)
              .then((response) => response.json())
              .catch((error) => {
                console.error(`Error fetching data for ${element}:`, error);
              })
          );

          Promise.all(promises).then((results) => {
            setData(results);
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  return (
    <div style={{ margin: "0" }}>
      <h1>Periodic Table</h1>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            {Object.entries(colors).map(([category, color]) => (
              <div
                key={category}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                  marginBottom: "5px",
                  width: "10vw",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color,
                    border: "1px solid black",
                    marginRight: "5px",
                  }}
                ></div>
                <span style={{ textTransform: "capitalize" }}>
                  {category.replace(/-/g, " ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18, 1fr)",
            gridAutoRows: "minmax(60px, auto)",
            gap: "6px",
            alignContent: "start",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((element, index) => (
              <Element key={index} element={element} colors={colors} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;