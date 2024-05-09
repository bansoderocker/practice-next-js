"use client";
import React, { useEffect, useState } from "react";
import _party from "../Interface/Party";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";
import { database } from "../firebaseConfig";
import { child, push, ref, set, get, remove } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";
import _account from "../Interface/Account";
import Lookup from "../Interface/Lookup";

export default function Account() {
  const [inputs, setInputs] = useState({
    key: "",
    searchText: "",
    PartyName: "",
    CreatedOn: "",
    PaymentMode: "",
    Remark: "",
    Amount: "",
  });
  const [lstParty, setParty] = useState<_party[]>([]);
  const [lstAccount, setAccount] = useState<_account[]>([]);
  const [lstPaymentMode, setPaymentMode] = useState<Lookup[]>([]);

  useEffect(() => {
    const partyRef = ref(database, "party");
    get(partyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as _party),
          }));
          setParty(_array);
        }
      })
      .catch((err) => console.log(err));

    const accountRef = ref(database, "account");
    get(accountRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as _account),
          }));
          setAccount(_array);
        }
      })
      .catch((err) => console.log(err));

    const paymentModeRef = ref(database, "paymentMode");

    get(paymentModeRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as Lookup),
          }));
          setPaymentMode(_array);
        }
      })
      .catch((err) => console.log(err));
  }, [lstAccount.length]);
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

  const savePaymentEntryDetailsToFirebase = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (inputs.PartyName) {
      let UniqueIDkey = "";
      if (inputs.key) {
        UniqueIDkey = inputs.key;
      } else {
        UniqueIDkey = "account-" + new Date().getTime().toString();
      }
      const db_ref = child(ref(database), "account/" + UniqueIDkey);

      set(db_ref, {
        PartyName: inputs.PartyName,
        PaymentMode: inputs.PaymentMode,
        Amount: inputs.Amount,
        CreatedOn: inputs.CreatedOn,
        key: UniqueIDkey,
      });
      setAccount([]);
      setInputs({
        key: "",
        searchText: "",
        PartyName: "",
        CreatedOn: "",
        PaymentMode: "",
        Amount: "",
        Remark: "",
      });

      alert("Account Data added successfully");
    } else {
      alert("Please enter Account Name");
    }
    sessionStorage.clear();
  };

  const deleteAccount = (key: string) => {
    console.log(key);
    remove(ref(database, "account/" + key)).then;

    const index = lstAccount.findIndex((x) => x.key == key);
    if (index > -1) {
      let x = lstAccount.splice(index, 1);
      setAccount(x);
    }
    // setAccount(lstAccount.filter((x) => x.key != key));
  };

  const AccountList = () => {
    if (lstAccount.length > 0) {
      return lstAccount.map((x, index) => (
        <tr key={index}>
          <td scope="col">{index + 1}</td>
          <td scope="col">{x.PartyName}</td>
          <td scope="col">{x.PaymentMode}</td>
          <td scope="col">{x.Amount}</td>
          <td scope="col">
            {/* <button
              className="from-control btn btn-warning"
              style={{ marginRight: "10px" }}
              onClick={(event) => editAccount(x)}
            >
              Edit
            </button> */}
            <button
              className="from-control btn btn-danger"
              onClick={() => deleteAccount(x.key)}
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
              {/* <div className="col-md-3"></div> */}
              <div className="col-md-3">
                <label>Party Name</label>
                <input
                  type="text"
                  className="from-control"
                  id="txtPartyName"
                  {...register("PartyName", {
                    required: "This is required.",
                  })}
                  value={inputs.PartyName}
                  onChange={handleChange}
                  placeholder="Select Party Name"
                  list="listParty"
                />
                <datalist id="listParty">
                  {lstParty.length > 0 &&
                    lstParty.map((e, index) => (
                      <option key={e.partyName}>{e.partyName}</option>
                    ))}
                </datalist>
              </div>
              <div className="col-md-3">
                <label>Payment Mode</label>
                <input
                  type="text"
                  className="from-control"
                  id="txtPaymentMode"
                  {...register("PaymentMode", {
                    required: "This is required.",
                  })}
                  value={inputs.PaymentMode}
                  onChange={handleChange}
                  placeholder="Select Payment Mode"
                  list="listPaymentMode"
                />
                <datalist id="listPaymentMode">
                  {lstPaymentMode.length > 0 &&
                    lstPaymentMode.map((e, index) => (
                      <option key={e.Text}>{e.Text}</option>
                    ))}
                </datalist>
              </div>
              <div className="col-md-3">
                <label>Amount</label>
                <br />
                <input
                  type="number"
                  className="from-control"
                  id="txtPageNo"
                  {...register("Amount", {
                    required: "This is required.",
                  })}
                  value={inputs.Amount}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                />
                {errors.txtPartyName && <span> Please enter Amount</span>}
              </div>
              <div className="col-md-3">
                <input
                  type="button"
                  className="from-control btn btn-primary"
                  name="btnAddEditPaymentEntry"
                  value="Add Payment Entry"
                  id="btnAddEditPaymentEntry"
                  onClick={(event) => savePaymentEntryDetailsToFirebase(event)}
                />
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th colSpan={2}>Records found : {lstAccount.length}</th>
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
                    <th scope="col">sr No</th>
                    <th scope="col">Party Name</th>
                    <th scope="col">Payment Mode</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AccountList />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
