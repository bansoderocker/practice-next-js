"use client";
import React, { useEffect, useState } from "react";
import _wallet from "../Interface/Wallet";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";
import { database } from "../firebaseConfig";
import { child, push, ref, set, get, remove } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";

export default function Wallet() {
  const [inputs, setInputs] = useState({
    Key: "",
    txtPartyName: "",
    searchText: "",
  });
  const [wallets, setParty] = useState<_wallet[]>([]);

  useEffect(() => {
    const walletRef = ref(database, "wallet");
    let walletGridList: _wallet[] = [];
    get(walletRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as _wallet),
          }));
          // snapshot.forEach(function (childSnapshot) {
          //   let childData = childSnapshot.val();
          //   walletGridList.push(childData);
          //   console.log(childData);
          // });
          setParty(_array);
        }
      })
      .catch((err) => console.log(err));

    //PartyList();
  }, []);

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
    let UniqueIDkey = "";
    if (inputs.Key) {
      UniqueIDkey = inputs.Key;
      deleteParty(inputs.Key);
    } else {
      UniqueIDkey = "wallet-" + new Date().getTime().toString();
    }
    const db_ref = child(ref(database), "wallet/" + UniqueIDkey);

    set(db_ref, { walletName: inputs.txtPartyName, Key: UniqueIDkey });
    let obj: _wallet = {
      T_Type: "Debit",
      T_Amount: 0,
      BankName: inputs.txtPartyName,
      Key: UniqueIDkey,
      T_Date: new Date(),
      T_To: "",
      T_From: "",
      T_Date_string: "",
    };

    setParty(wallets.concat(obj));
    setInputs({ Key: "", txtPartyName: "", searchText: "" });

    alert("Party Data added successfully");
    sessionStorage.clear();
  };

  const editParty = (data: _wallet) => {
    setInputs({
      Key: data.Key,
      txtPartyName: data.BankName,
      searchText: "",
    });
  };
  const deleteParty = (Key: string) => {
    remove(ref(database, "wallet/" + Key)).then;

    const index = wallets.findIndex((x) => x.Key == Key);
    if (index > -1) {
      let x = wallets.splice(index, 1);
      setParty(x);
    }
    setParty(wallets.filter((x) => x.Key != Key));
  };

  const PartyList = () => {
    console.log("wallets list");
    console.log(wallets);
    if (wallets.length > 0) {
      return wallets.map((x, index) => (
        <tr key={index}>
          <td style={{ tableLayout: "fixed", width: "10%" }}>{index + 1}</td>
          <td>{x.BankName}</td>
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
              onClick={() => deleteParty(x.Key)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td rowSpan={3}>no records found</td>
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
              <div className="col-md-2">
                <label>Party Name</label>
              </div>

              <div className="col-md-3">
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
                    <th colSpan={2}>Records found : {wallets.length}</th>
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
