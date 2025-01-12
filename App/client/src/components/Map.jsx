import React, { useEffect, useState } from "react";
import "./Map.css";
import axios from "axios";

function Map() {
  const APIMap = "https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/analytics";
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    // Load the Google Charts library dynamically
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.async = true;

    script.onload = () => {
      // After the library loads, initialize and draw the GeoChart
      window.google.charts.load("current", {
        packages: ["geochart"],
      });
      window.google.charts.setOnLoadCallback(drawRegionsMap);
    };

    document.body.appendChild(script);

    const fetchMapData = async () => {
      try {
        const response = await axios.get(APIMap);
        let statewiseReportCount = response.data.statewise_report_count;
        statewiseReportCount = {"Maharashtra": 2, "Punjab": 4, "Assam": 1};

        console.log(statewiseReportCount);
        const formattedData = [
          ["State", "Issue's"],
          ...Object.entries(statewiseReportCount).map(([state, count]) => [state, count])
        ];
        setMapData(formattedData);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMapData();
  }, []);

  useEffect(() => {
    if (mapData.length > 0) {
      drawRegionsMap();
    }
  }, [mapData]);

  function drawRegionsMap() {
    const data = window.google.visualization.arrayToDataTable(mapData);

    const options = {
      region: "IN",
      displayMode: "regions",
      resolution: "provinces",
      colorAxis: { colors: ["brown", "black"] },
      backgroundColor: "#FBF5E5",
    };

    const chart = new window.google.visualization.GeoChart(
      document.getElementById("visualization")
    );
    chart.draw(data, options);
  }

  return (
    <div className="main-map">
      <h3 className="map-title">Map</h3>
      <div
        id="visualization"
        // style={{ width: "200px", height: "300px", margin: "0 auto" }}
        className="map-img"
      ></div>
    </div>
  );
}

export default Map;
