import { useState } from "react";
import _expense from "../Interface/Expense";
import _party from "../Interface/Party";
import { child, push, ref, set, get, remove } from "firebase/database";
import { database } from "../firebaseConfig";
import tripExpense from "../Interface/tripExpense";
import _truck from "../Interface/Truck";
import Expense from "./page";

// export const TripRef = ref(database, "Trip");
// export const partyRef = ref(database, "party");
// export const truckRef = ref(database, "truck");
// export const expenseTypeRef = ref(database, "expenseType");

// export const lstTransport = [
//   "Tushar Roadlines",
//   "Ajay Vijay Roadlines",
//   "Tanaji R Bansode",
// ];

export const editExpense = (props: any) => {
  // openExpenseAddEdit(true);
  debugger;
  props.setInputs((values: _expense[]) => ({
    ...values,
    key: props.data.key,
    tempExpenseName: "",
    tempExpenseAmount: 0,
    amount: props.data.amount,
    Particular: props.data.Particular,
    ParticularFrom: props.data.ParticularFrom,
    ParticularTo: props.data.ParticularTo,
    TripAmount: props.data.TripAmount,
    TruckNumber: props.data.TruckNumber,
    BillNumber: props.data.BillNumber,
    BillName: props.data.BillName,
    Remark: props.data.Remark,
    //  TripDate: format(data.TripDate, "dd-MM-yyyy"),
    newParty: props.data.newParty as _party,
    tripExpenseList: [],
    partyKey: props.data.partyKey,
  }));
  props.setIsOpened(true);
};

//   export const deleteBill = (key: string) => {
//     remove(ref(database, "Trip/" + key)).then;

//     const index = lstTrip.findIndex((x) => x.key == key);
//     if (index > -1) {
//       let x = lstTrip.splice(index, 1);
//       setTrip(x);
//     }
//     setTrip(lstTrip.filter((x) => x.key != key));
//   };
//};
