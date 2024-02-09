"use client";
import React, { useEffect, useState } from "react";
import _party from "../Interface/Party";
import { database } from "../firebaseConfig";
import { get, ref } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";
import editParty from "./page";

// async function getPartyList() {}

// export default
const PartyList = () => {
  const [partys, setPartys] = useState<_party[]>([]);
  useEffect(() => {
    const partyRef = ref(database, "party");
    get(partyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var partyGridList: _party[] = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            partyGridList.push(childData);
          });
          setPartys(partyGridList);
          console.log(partyGridList);
        } else {
          console.log("no data found");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (partys.length > 0) {
    return partys.map((x, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{x.partyName}</td>
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

export default PartyList;
