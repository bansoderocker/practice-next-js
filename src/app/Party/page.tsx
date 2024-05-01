"use client";
import React, { useEffect, useState } from "react";
import _party from "../Interface/Party";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";
import { database } from "../firebaseConfig";
import { child, push, ref, set, get, remove } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";

export default function Party() {
  const [inputs, setInputs] = useState({
    key: "",
    txtPartyName: "",
    pageNumber: 0,
    searchText: "",
    pageState: 0,
  });
  const [partys, setParty] = useState<_party[]>([]);

  useEffect(() => {
    const partyRef = ref(database, "party");
    let partyGridList: _party[] = [];
    get(partyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as _party),
          }));
          // snapshot.forEach(function (childSnapshot) {
          //   let childData = childSnapshot.val();
          //   partyGridList.push(childData);
          //   console.log(childData);
          // });
          setParty(_array);
        }
      })
      .catch((err) => console.log(err));

    //PartyList();
  }, [inputs.pageState]);
  console.log(inputs.pageState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    setInputs((values) => ({ ...values, [targetName]: targetValue }));
  };

  const SearchTextChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log(targetValue);
    setInputs((values) => ({ ...values, [targetName]: targetValue }));
  };

  const savePartyDetailsToFirebase = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    console.log("inputs");
    console.log(inputs);
    if (inputs.txtPartyName) {
      let UniqueIDkey = "";
      if (inputs.key) {
        UniqueIDkey = inputs.key;
        const db_ref = child(ref(database), "party/" + UniqueIDkey);
        set(db_ref, {
          partyName: inputs.txtPartyName,
          pageNumber: inputs.pageNumber,
          key: UniqueIDkey,
        });
      } else {
        UniqueIDkey = "party-" + new Date().getTime().toString();
        const db_ref = child(ref(database), "party/" + UniqueIDkey);
        set(db_ref, {
          partyName: inputs.txtPartyName,
          pageNumber: inputs.pageNumber,
          key: UniqueIDkey,
        });
      }

      // let obj: _party = {
      //   partyName: inputs.txtPartyName,
      //   key: UniqueIDkey,
      //   pageNumber: inputs.pageNumber,
      //   CreatedOn: "",
      // };

      // setParty(partys.concat(obj));
      setInputs({
        key: "",
        txtPartyName: "",
        searchText: "",
        pageNumber: partys.length + 1,
        pageState: inputs.pageState + 1,
      });

      alert("Party Data added successfully");
    } else {
      alert("Please enter Party Name");
    }
    sessionStorage.clear();
  };

  const editParty = (data: _party) => {
    setInputs({
      key: data.key,
      txtPartyName: data.partyName,
      searchText: "",
      pageNumber: data.pageNumber,
      pageState: inputs.pageState + 1,
    });
  };
  const deleteParty = (key: string) => {
    remove(ref(database, "party/" + key)).then;

    const index = partys.findIndex((x) => x.key == key);
    if (index > -1) {
      let x = partys.splice(index, 1);
      setParty(x);
    }
    setParty(partys.filter((x) => x.key != key));
  };

  const PartyList = () => {
    console.log("partys list");
    console.log(partys);
    if (partys.length > 0) {
      return partys.map((x, index) => (
        <tr key={index}>
          <td style={{ tableLayout: "fixed", width: "10%" }}>{index + 1}</td>
          <td>{x.partyName}</td>
          <td style={{ tableLayout: "fixed", width: "10%" }}>{x.pageNumber}</td>
          <td>
            <button
              className="from-control btn btn-warning"
              style={{ marginRight: "10px" }}
              onClick={(event) => editParty(x)}
            >
              Edit
            </button>
            <button
              className="from-control btn btn-danger"
              onClick={() => deleteParty(x.key)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td rowSpan={4}>no records found</td>
        </tr>
      );
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="content">
          <div className="container h-100">
            <div className="row table table-striped thead-light">
              <div className="col-md-3"></div>
              <div className="col-md-3">
                <label>Party Name</label>
                <input
                  type="text"
                  className="from-control"
                  id="txtPartyName"
                  {...register("txtPartyName", {
                    required: "This is required.",
                  })}
                  value={inputs.txtPartyName}
                  onChange={handleChange}
                  placeholder="Enter Party Name"
                />
              </div>

              <div className="col-md-3">
                <label>Page No</label>
                <br />
                <input
                  type="text"
                  className="from-control"
                  id="txtPageNo"
                  {...register("pageNumber", {
                    required: "This is required.",
                  })}
                  value={inputs.pageNumber}
                  onChange={handleChange}
                  placeholder="Enter Page No"
                />
                {errors.txtPartyName && <span> Please enter Party Name</span>}
              </div>
              <div className="col-md-2">
                <input
                  type="button"
                  className="from-control btn btn-primary"
                  name="btnAddEditParty"
                  value="Add Party"
                  id="btnAddEditParty"
                  onClick={(event) => savePartyDetailsToFirebase(event)}
                  style={{ width: "150px" }}
                />
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <table className="table">
                <thead>
                  <tr>
                    <th colSpan={2}>Records found : {partys.length}</th>
                    <th>
                      <input
                        type="text"
                        className="from-control"
                        id="searchText"
                        {...register("searchText")}
                        value={inputs.searchText}
                        onChange={SearchTextChange}
                        placeholder="Search"
                      />
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      style={{ tableLayout: "fixed", width: "10%" }}
                    >
                      sr No
                    </th>
                    <th scope="col">Party Name</th>
                    <th
                      scope="col"
                      style={{ tableLayout: "fixed", width: "10%" }}
                    >
                      Page No
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <PartyList />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
