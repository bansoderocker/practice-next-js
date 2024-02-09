"use client";
import React, { useEffect, useState } from "react";
import _truck from "../Interface/Truck";
import { database } from "../firebaseConfig";
import { get, ref } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";
import editTruck from "./page";

// async function getTruckList() {}

// export default
const TruckList = () => {
  const [trucks, setTrucks] = useState<_truck[]>([]);
  useEffect(() => {
    const truckRef = ref(database, "truck");
    get(truckRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var truckGridList: _truck[] = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            truckGridList.push(childData);
          });
          setTrucks(truckGridList);
          console.log(truckGridList);
        } else {
          console.log("no data found");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (trucks.length > 0) {
    return trucks.map((x, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{x.TruckNumber}</td>
        <td>
          <button
            className="from-control btn btn-warning"
            style={{ marginRight: "10px" }}
            //  onClick={(event) => editTruck(x)}
          >
            Edit
          </button>
          <button className="from-control btn btn-danger">Delete</button>
        </td>
      </tr>
    ));
  } else {
    <h1>no records found</h1>;
  }
};

export default TruckList;
