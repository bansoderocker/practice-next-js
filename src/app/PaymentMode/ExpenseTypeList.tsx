"use client";
import React, { useEffect, useState } from "react";
import _party from "../Interface/Party";
import { database } from "../firebaseConfig";
import { get, ref } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";
import editParty from "./page";
import Lookup from "../Interface/Lookup";

// async function getpaymentModeList() {}

// export default
const paymentModeList = () => {
  const [paymentMode, setPaymentMode] = useState<Lookup[]>([]);
  useEffect(() => {
    const partyRef = ref(database, "PaymentMode");
    get(partyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var partyGridList: Lookup[] = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            partyGridList.push(childData);
          });
          setPaymentMode(partyGridList);
          console.log(partyGridList);
        } else {
          console.log("no data found");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (paymentMode.length > 0) {
    return paymentMode.map((x, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{x.Text}</td>
        <td>
          <button
            className="from-control btn btn-warning"
            style={{ marginRight: "10px" }}
            //  onClick={(event) => editParty(x)}
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

export default paymentModeList;
