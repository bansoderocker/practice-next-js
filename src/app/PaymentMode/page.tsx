"use client";
import React, { useEffect, useState } from "react";
import LookUp from "../Interface/Lookup";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";
import { database } from "../firebaseConfig";
import { child, push, ref, set, get, remove } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";
import { lookup } from "dns";

export default function PaymentMode() {
  const [inputs, setInputs] = useState({
    key: "",
    txtPaymentModeName: "",
    searchText: "",
  });

  const [paymentMode, setPaymentMode] = useState<LookUp[]>([]);

  useEffect(() => {
    const paymentModeRef = ref(database, "paymentMode");
    get(paymentModeRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as LookUp),
          }));
          setPaymentMode(_array);
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

  const savePaymentModeDetailsToFirebase = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    console.log("inputs");
    console.log(inputs);
    if (inputs.txtPaymentModeName) {
      let UniqueIDkey = "";
      if (inputs.key) {
        UniqueIDkey = inputs.key;
        deletePaymentMode(inputs.key);
      } else {
        UniqueIDkey = "paymentMode-" + new Date().getTime().toString();
      }
      const db_ref = child(ref(database), "paymentMode/" + UniqueIDkey);

      let obj: LookUp = {
        Text: inputs.txtPaymentModeName,
        Key: UniqueIDkey,
        CreatedOn: "",
      };
      set(db_ref, obj);

      setPaymentMode(paymentMode.concat(obj));
      setInputs({ key: "", txtPaymentModeName: "", searchText: "" });

      alert("payment Mode Data added successfully");
    } else {
      alert("Please enter Payment Mode Name");
    }
    sessionStorage.clear();
  };

  const editPaymentMode = (data: LookUp) => {
    setInputs({
      key: data.Key,
      txtPaymentModeName: data.Text,
      searchText: "",
    });
  };
  const deletePaymentMode = (key: string) => {
    remove(ref(database, "paymentMode/" + key)).then;

    const index = paymentMode.findIndex((x) => x.Key == key);
    if (index > -1) {
      let x = paymentMode.splice(index, 1);
      setPaymentMode(x);
    }
    setPaymentMode(paymentMode.filter((x) => x.Key != key));
  };

  const PaymentModeList = () => {
    console.log("paymentMode list");
    console.log(paymentMode);
    if (paymentMode.length > 0) {
      return paymentMode.map((x, index) => (
        <tr key={index}>
          <td style={{ tableLayout: "fixed", width: "10%" }}>{index + 1}</td>
          <td>{x.Text}</td>
          <td>
            <button
              className="from-control btn btn-warning"
              style={{ marginRight: "10px" }}
              onClick={(event) => editPaymentMode(x)}
            >
              Edit
            </button>
            <button
              className="from-control btn btn-danger"
              onClick={() => deletePaymentMode(x.Key)}
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
                <label>paymentMode Name</label>
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="from-control"
                  id="txtPaymentModeName"
                  {...register("txtPaymentModeName", {
                    required: "This is required.",
                  })}
                  value={inputs.txtPaymentModeName}
                  onChange={handleChange}
                  placeholder="Enter Payment Mode Name"
                />
                {errors.txtPaymentModeName && (
                  <span> Please enter payment Mode Name</span>
                )}
              </div>
              <div className="col-md-2">
                <input
                  type="button"
                  className="from-control btn btn-primary"
                  name="btnAddEditPaymentMode"
                  value="Add Payment Mode"
                  id="btnAddEditPaymentMode"
                  onClick={(event) => savePaymentModeDetailsToFirebase(event)}
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
                    <th colSpan={2}>Records found : {paymentMode.length}</th>
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
                    <th scope="col">paymentMode Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <PaymentModeList />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
