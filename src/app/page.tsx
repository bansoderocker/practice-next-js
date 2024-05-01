"use client";
import { useState } from "react";
import styles from "./page.module.css";
// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import _truck from "./Interface/Truck";
import _expense from "./Interface/Expense";
import { format } from "date-fns";
import _party from "./Interface/Party";

export default function Home() {
  // const [user, setUser] = useState([]);

  const [truck, setTruck] = useState<_truck>({
    key: "",
    TruckNumber: "",
    CreatedOn: "",
  });

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
    newParty: { key: "", CreatedOn: "", pageNumber: 0, partyName: "" },
    Expense: [],
    partyKey: "",
    filterPartyName: "",
    pageStatus: 0,
  });
  return (
    <main className={styles.main}>
      <div className={styles.description}></div>
    </main>
  );
}
