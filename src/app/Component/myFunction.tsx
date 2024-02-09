import { useState } from "react";
import _truck from "../Interface/Truck";
import { database } from "../firebaseConfig";
import { child, push, ref, set } from "firebase/database";

const editTruck = (x: _truck) => {
  console.log(x);
};


const [inputs, setInputs] = useState({ txtTruckNumber: "" });

const saveTruckDetailsToFirebase = (
  event: React.MouseEvent<HTMLInputElement, MouseEvent>
) => {
  console.log("inputs");
  console.log(inputs);
  let UniqueIDkey = "truck-" + new Date().getTime().toString();

  const db_ref = child(ref(database), "truck/" + UniqueIDkey);

  //let new_ref = push(db_ref);
  // if (new_ref) {
  //   new_ref = new_ref.;
  // }

  set(db_ref, { TruckNumber: inputs.txtTruckNumber, key: UniqueIDkey });
  setInputs({ txtTruckNumber: "" });

  alert("Truck Data added successfully");
  sessionStorage.clear();
};

export default editTruck;
