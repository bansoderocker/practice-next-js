"use client";
import React, { useEffect, useState } from "react";
import _expense from "../Interface/Expense";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "../css/common.css";
import Lookup from "../Interface/Lookup";
import _party from "../Interface/Party";
import _truck from "../Interface/Truck";
import tripExpense from "../Interface/tripExpense";
import { format } from "date-fns";
import ExpenseList from "../Expense/ExpenseList";
import { child, get, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";
import ExpensePrint from "./ExpensePrint";
import CommonButton from "../Component/CommonButton";
import { tripDateYearFormat } from "../Component/CommonFunction";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function Expense() {
  //const [inputs, setAddEdit] = useState<_expense>();
  const lstTransport = [
    "Tushar Roadlines",
    "Ajay Vijay Roadlines",
    "Tanaji R Bansode",
  ];
  const TripRef = ref(database, "Trip");
  const partyRef = ref(database, "party");
  const truckRef = ref(database, "truck");
  const expenseTypeRef = ref(database, "expenseType");
  const [lstTripExpense, setTripExpense] = useState<tripExpense[]>([]);
  const [lstParty, setParty] = useState<_party[]>([]);
  const [lstTruck, setTruck] = useState<_truck[]>([]);
  const [lstExpenseType, setExpenseType] = useState<Lookup[]>([]);
  // const [, setIsOpened] = useState(true);
  const [lstTrip, setTrip] = useState<_expense[]>([]);
  const [lstDisplayTrip, setDisplayTrip] = useState<_expense[]>([]);

  const [inputs, setInputs] = useState<_expense>({
    key: "",
    searchText: "",
    tempExpenseName: "",
    tempExpenseAmount: 0,
    amount: 0,
    Particular: "",
    ParticularFrom: "",
    ParticularTo: "",
    TripAmount: 0,
    TruckNumber: "",
    BillName: "",
    BillNumber: "",
    Remark: "",
    CreatedOn: "",
    TripDate: format(new Date(), "dd-MM-yyyy"),
    Expense: [],
    partyKey: "",
    pageStatus: 0,
    filterPartyName: "",
    newParty: { key: "", CreatedOn: "", pageNumber: 0, partyName: "" },
  });
  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // set trip list
    get(TripRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as _expense),
          }));
          setTrip(_array);
          setDisplayTrip(_array);
        }
      })
      .catch((err) => console.log(err));
    //end
    // set party list
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
    //end
    // set truck list
    get(truckRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as _truck),
          }));
          setTruck(_array);
        }
      })
      .catch((err) => console.log(err));

    get(expenseTypeRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...(data as Lookup),
          }));
          setExpenseType(_array);
        }
      })
      .catch((err) => console.log(err));
    //end
  }, [inputs.pageStatus]);
  const handleChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log(`target Name ${targetName}`);
    console.log(`target Value ${targetValue}`);

    if (targetName == "amount") {
      let num1 = targetValue;
      console.log(num1);
      setInputs((values) => ({
        ...values,
        TripAmount: num1,
      }));
    }
    let updateDate = "";
    if (targetName == "TripDate") {
      debugger;
      if (
        (targetValue.length == 2 && !isNaN(targetValue)) ||
        targetValue.length == 5
      ) {
        updateDate = targetValue + "-";
        setInputs((values) => ({ ...values, [targetName]: updateDate }));
        return;
      }
    }
    if (targetName == "TripDate" && targetValue.length == 12) {
      // targetValue =  format(targetValue, "dd/MM/yyyy"),
    }

    setInputs((values) => ({ ...values, [targetName]: targetValue }));
  };

  const SearchTextChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log("targetValue");
    console.log(targetValue);
    let list = lstTrip;
    // list = list.filter((x) => x.BillName == targetValue);
    list = list.filter(
      (x) =>
        x.BillName == targetValue ||
        x.partyKey.toLowerCase().includes(targetValue.toLowerCase())
    );
    setInputs((values) => ({ ...values, [targetName]: targetValue }));
    if (targetValue.length > 0) setDisplayTrip(list);
    else setDisplayTrip(lstTrip);
  };

  const openExpenseAddEdit = (event: number) => {
    setInputs((values) => ({
      ...values,
      pageStatus: event,
    }));
    if (event) {
      get(TripRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const _array = Object.entries(snapshot.val()).map(([id, data]) => ({
              id,
              ...(data as _expense),
            }));
            setTrip(_array);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const AddBillExpense = (event: any) => {
    console.log(inputs);
    let Title = inputs?.tempExpenseName;
    let Amount = inputs?.tempExpenseAmount ? inputs?.tempExpenseAmount : 0;

    let obj = {
      Title: inputs?.tempExpenseName,
      Amount: inputs?.tempExpenseAmount,
    };

    if (Title && Amount > 0) {
      setTripExpense(lstTripExpense.concat(obj as tripExpense));
      let num1 =
        parseFloat(inputs.TripAmount.toString()) +
        parseFloat(Amount.toString());
      setInputs((values) => ({
        ...values,
        tempExpenseName: "",
        tempExpenseAmount: 0,
        TripAmount: num1,
      }));
    } else {
      alert(" enter proper expense reason or amount");
    }
    // setInputs(_inputs);
  };
  const saveBillDetailsToFirebase = (event: any) => {
    console.log("inputs");
    console.log(inputs);
    if (inputs.TripDate.split("-").length == 3) {
      let UniqueIDkey = "";
      if (inputs.key) {
        UniqueIDkey = inputs.key;
      } else {
        UniqueIDkey = "Trip-" + new Date().getTime().toString();
      }
      const db_ref = child(ref(database), "Trip/" + UniqueIDkey);
      let obj: _expense = inputs;
      obj.key = UniqueIDkey;
      obj.Particular = obj.ParticularFrom + " To " + obj.ParticularTo;
      obj.Expense = lstTripExpense;
      obj.TripDate = tripDateYearFormat(inputs.TripDate);
      setTripExpense([]);
      set(db_ref, obj);

      setInputs((values) => ({
        ...values,
        key: "",
        searchText: "",
        tempExpenseName: "",
        tempExpenseAmount: 0,
        amount: 0,
        Particular: "",
        ParticularFrom: "",
        ParticularTo: "",
        TripAmount: 0,
        TruckNumber: "",
        BillNumber: "",
        Remark: "",
        CreatedOn: "",
        TripDate: format(new Date(), "dd-MM-yyyy"),
        newParty: {} as _party,
        tripExpenseList: [],
      }));
    } else {
      alert("Please enter proper date");
    }

    alert("Bill Data added successfully");
  };

  const openExpenseView = () => {};
  // const editExpense = (data: _expense) => {
  //   // openExpenseAddEdit(true);
  //   debugger;
  //   setInputs((values) => ({
  //     ...values,
  //     key: data.key,
  //     tempExpenseName: "",
  //     tempExpenseAmount: 0,
  //     amount: data.amount,
  //     Particular: data.Particular,
  //     ParticularFrom: data.ParticularFrom,
  //     ParticularTo: data.ParticularTo,
  //     TripAmount: data.TripAmount,
  //     TruckNumber: data.TruckNumber,
  //     BillNumber: data.BillNumber,
  //     BillName: data.BillName,
  //     Remark: data.Remark,
  //     //  TripDate: format(data.TripDate, "dd-MM-yyyy"),
  //     tripExpenseList: [],
  //     partyKey: data.partyKey,
  //   }));
  // };

  // const ExpenseList = () => {
  //   console.log("lstTrip list");
  //   console.log(lstTrip);
  //   if (lstTrip.length > 0) {
  //     return lstTrip.map((x, index) => (
  //       <tr key={index}>
  //         <td>
  //           {getInitialChar(x.BillName)} - {x.BillNumber}
  //         </td>
  //         <td>{x.TripDate}</td>
  //         <td>{x.TruckNumber}</td>
  //         <td>{x.Particular}</td>
  //         <td>{x.TripAmount}</td>
  //         <td>
  //           <button
  //             className="from-control btn btn-warning"
  //             style={{ marginRight: "10px" }}
  //             onClick={(event) => editExpense(x)}
  //           >
  //             Edit
  //           </button>
  //           <button
  //             className="from-control btn btn-danger"
  //             onClick={() => deleteBill(x.key)}
  //           >
  //             Delete
  //           </button>
  //         </td>
  //       </tr>
  //     ));
  //   } else {
  //     return (
  //       <tr>
  //         <td rowSpan={3}>no records found</td>
  //       </tr>
  //     );
  //   }
  // };

  return (
    <main className={styles.main}>
      <div style={{ marginLeft: "5%", width: "90%" }}>
        <div className="row">
          {inputs.pageStatus == 0 && (
            <div className="col-md-2">Records found : {lstTrip.length}</div>
          )}
          {!(inputs.pageStatus == 0) && <div className="col-md-3"></div>}
          <div className="col-md-3">
            {inputs.pageStatus == 0 && (
              <input
                type="text"
                className="from-control"
                id="searchText"
                {...register("searchText")}
                value={inputs.searchText}
                onChange={SearchTextChange}
                placeholder="Search"
              />
            )}
          </div>
          <div className="col-md-2">
            <input
              type="text"
              id="BillName"
              name="BillName"
              list="TransportList"
              className="form-control"
              placeholder="Select Transport"
              value={inputs?.BillName || ""}
              onChange={handleChange}
            />
            <datalist id="TransportList">
              {lstTransport.length > 0 &&
                lstTransport.map((e, index) => (
                  <option id={index + e}>{e}</option>
                ))}
            </datalist>
          </div>

          <div className="col-md-2">
            {!(inputs.pageStatus == 0) && (
              <input
                type="button"
                className="from-control btn btn-primary"
                name="btnAddEditExpense"
                value="View Expense"
                onClick={(event) => openExpenseAddEdit(0)}
                style={{ width: "150px" }}
              />
            )}
            {inputs.pageStatus == 0 && (
              <input
                type="button"
                className="from-control btn btn-primary"
                name="btnAddEditExpense"
                value="Add Expense"
                id="btnAddEditExpense"
                onClick={(event) => openExpenseAddEdit(1)}
                style={{ width: "150px" }}
              />
            )}
          </div>
          {/* <div className="col-md-2">
            {inputs.pageStatus != 2 &&
              lstDisplayTrip.length > 0 &&
              inputs.BillName.length > 0 && (
                <PDFDownloadLink
                  document={ExpensePrint(
                    lstDisplayTrip,
                    inputs.BillName,
                    inputs.filterPartyName
                  )}
                  fileName={inputs.BillName}
                  aria-orientation="vertical"
                >
                  <button className="btn btn-primary">PDF</button>
                </PDFDownloadLink>
              )}
            <CommonButton btnName={"my btn"} />
          </div> */}
        </div>
        {inputs.pageStatus == 0 && (
          <center>
            <div id="divExpenseList" className={styles.description}>
              <div className="content">
                <div className="container h-100">
                  {/* <div className="row table table-striped thead-light">
              <div className="col-md-3"></div>
              <div className="col-md-2">
                <label>Expense Name</label>
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="from-control"
                  id="txtExpenseName"
                  {...register("txtExpenseName", {
                    required: "This is required.",
                  })}
                  value={inputs.txtExpenseName}
                  onChange={handleChange}
                  placeholder="Enter Expense Name"
                />
                {errors.txtExpenseName && (
                  <span>  enter Expense Name</span>
                )}
              </div>
              <div className="col-md-2">
                <input
                  type="button"
                  className="from-control btn btn-primary"
                  name="btnAddEditExpense"
                  value="Add Expense"
                  id="btnAddEditExpense"
                  //    onClick={(event) => saveExpenseDetailsToFirebase(event)}
                  style={{ width: "150px" }}
                />
              </div>
              <div className="col-md-3"></div>
            </div> */}
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <br />
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col"> Type - Bill No</th>
                          <th scope="col">Date</th>
                          <th scope="col">Truck Number</th>
                          <th scope="col">Particular</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <ExpenseList
                          lstExpenseList={lstDisplayTrip}
                          setInputs={setInputs}
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </center>
        )}
        {inputs.pageStatus == 1 && (
          <center>
            <div id="divEXpenseAddEdit" className={styles.description}>
              <div className="content">
                <div className="container h-100"></div>

                <br />
                {/* <div className="row">
              <div className="col-md-3">
                <FormControl>
                  <InputLabel htmlFor="my-input">Email address</InputLabel>
                  <Input id="my-input" aria-describedby="my-helper-text" />
                  <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText>
                </FormControl>
              </div>
            </div> */}
                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="text"
                        id="partyKey"
                        name="partyKey"
                        list="listParty"
                        className="form-control"
                        placeholder="Select Party Name"
                        value={inputs?.partyKey}
                        onChange={handleChange}
                      />
                      <datalist id="listParty">
                        {lstParty.length > 0 &&
                          lstParty.map((e, index) => (
                            <option id={index + e.partyName}>
                              {e.partyName}
                            </option>
                          ))}
                      </datalist>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="number"
                        name="BillNumber"
                        className="form-control"
                        placeholder="Bill No *"
                        value={inputs?.BillNumber || ""}
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="text"
                        name="TripDate"
                        className="form-control"
                        pattern="\d{2}/\d{2}/\d{4}"
                        placeholder="dd/MM/YYYY"
                        value={inputs?.TripDate || ""}
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="text"
                        id="TruckNumber"
                        name="TruckNumber"
                        list="TruckList"
                        className="form-control"
                        placeholder="Select Truck Number"
                        value={inputs?.TruckNumber || ""}
                        onChange={handleChange}
                      />
                      <datalist id="TruckList">
                        {lstTruck.length > 0 &&
                          lstTruck.map((e, index) => (
                            <option id={index + e.TruckNumber}>
                              {e.TruckNumber}
                            </option>
                          ))}
                      </datalist>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="text"
                        name="ParticularFrom"
                        className="form-control"
                        placeholder="From *"
                        value={inputs?.ParticularFrom || ""}
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="text"
                        name="ParticularTo"
                        className="form-control"
                        placeholder="To *"
                        value={inputs?.ParticularTo || ""}
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="number"
                        name="amount"
                        className="form-control"
                        placeholder="Trip Amount*"
                        value={inputs?.amount?.toString() || ""}
                        required={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="text"
                        name="Remark"
                        className="form-control"
                        placeholder="Your Remarks"
                        onChange={handleChange}
                        value={inputs?.Remark || ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="select"
                        id="tempExpenseName"
                        name="tempExpenseName"
                        list="expenseTypeList"
                        className="form-control"
                        placeholder="select Expense"
                        value={inputs?.tempExpenseName}
                        onChange={handleChange}
                      />
                      <datalist id="expenseTypeList">
                        {lstExpenseType.length > 0 &&
                          lstExpenseType.map((e, index) => (
                            <option id={index + e.Text}>{e.Text}</option>
                          ))}
                      </datalist>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="number"
                        id="tempExpenseAmount"
                        name="tempExpenseAmount"
                        className="form-control"
                        placeholder="Amount"
                        onChange={handleChange}
                        value={inputs?.tempExpenseAmount?.toString() || ""}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="button"
                        className="from-control btn btn-primary"
                        name="btnAddBillExpense"
                        value="Add Bill Expense"
                        onClick={(event) => AddBillExpense(event)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="number"
                        name="TripAmount"
                        className="form-control"
                        placeholder="Total Amount*"
                        readOnly={true}
                        value={inputs?.TripAmount.toString() || ""}
                        required={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <div className="col-md-3">
                      <br />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {lstTripExpense.length > 0 && (
                      <table>
                        <tr>
                          <th>Name</th>
                          <th>Amount</th>
                        </tr>
                        {lstTripExpense.map((x) => (
                          <tr>
                            <td>{x.Title}</td>
                            <td>{x.Amount}</td>
                          </tr>
                        ))}
                      </table>
                    )}
                  </div>
                  <div className="col-md-3"></div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <input
                        type="button"
                        className="from-control btn btn-primary"
                        value="Save Bill"
                        onClick={(event) => saveBillDetailsToFirebase(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </center>
        )}
        {/* {inputs.pageStatus == 2 && (
          <center>
            <div id="divEXpenseView" className={styles.description}>
              <div className="content">
                <div className="container h-100">
                  <table
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                    }}
                  >
                    <ExpensePrint
                      lstExpenseList={lstDisplayTrip}
                      BillName={inputs.BillName}
                      PartyName={inputs.filterPartyName}
                    />
                  </table>
                </div>
              </div>
            </div>
          </center>
        )} */}
        {/* <div id="printableArea">
          {ExpensePrint(
            lstDisplayTrip,
            inputs.BillName,
            inputs.filterPartyName
          )}
        </div> */}
      </div>
    </main>
  );
}
