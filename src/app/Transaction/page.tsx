"use client";
import React, { useEffect, useState } from "react";
import LookUp from "../Interface/Lookup";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";
import { database } from "../firebaseConfig";
import { child, push, ref, set, get, remove } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";

export default function Transaction() {
  const [inputs, setInputs] = useState({
    key: "",
    txtPartyName: "",
    searchText: "",
  });

  const [partys, setParty] = useState<LookUp[]>([]);

  useEffect(() => {
    const expenseTypeRef = ref(database, "expenseType");
    get(expenseTypeRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as LookUp),
          }));
          setParty(_array);
        }
      })
      .catch((err) => console.log(err));
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
    if (inputs.txtPartyName) {
      let UniqueIDkey = "";
      if (inputs.key) {
        UniqueIDkey = inputs.key;
        deleteParty(inputs.key);
      } else {
        UniqueIDkey = "expenseType-" + new Date().getTime().toString();
      }
      const db_ref = child(ref(database), "expenseType/" + UniqueIDkey);

      let obj: LookUp = {
        Text: inputs.txtPartyName,
        Key: UniqueIDkey,
        CreatedOn: "",
      };
      set(db_ref, obj);

      setParty(partys.concat(obj));
      setInputs({ key: "", txtPartyName: "", searchText: "" });

      alert("expenseType Data added successfully");
    } else {
      alert("Please enter expenseType Name");
    }
    sessionStorage.clear();
  };

  const editParty = (data: LookUp) => {
    setInputs({
      key: data.Key,
      txtPartyName: data.Text,
      searchText: "",
    });
  };
  const deleteParty = (key: string) => {
    remove(ref(database, "expenseType/" + key)).then;

    const index = partys.findIndex((x) => x.Key == key);
    if (index > -1) {
      let x = partys.splice(index, 1);
      setParty(x);
    }
    setParty(partys.filter((x) => x.Key != key));
  };

  const PartyList = () => {
    console.log("partys list");
    console.log(partys);
    if (partys.length > 0) {
      return partys.map((x, index) => (
        <tr key={index}>
          <td style={{ tableLayout: "fixed", width: "10%" }}>{index + 1}</td>
          <td>{x.Text}</td>
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
                <label>expenseType Name</label>
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
                  placeholder="Enter Expense Type Name"
                />
                {errors.txtPartyName && (
                  <span> Please enter expenseType Name</span>
                )}
              </div>
              <div className="col-md-2">
                <input
                  type="button"
                  className="from-control btn btn-primary"
                  name="btnAddEditParty"
                  value="Add Expense Type"
                  id="btnAddEditParty"
                  onClick={(event) => savePartyDetailsToFirebase(event)}
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
                    <th scope="col">expenseType Name</th>
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
