import _party from "./Party";
import tripExpense from "./tripExpense";

interface _expense {
  amount: number;
  ParticularFrom: string;
  ParticularTo: string;
  Particular: string;
  TripAmount: number;
  TruckNumber: string;
  key: string;
  CreatedOn: string;
  BillName: string;
  BillNumber: string;
  TripDate: string;
  partyKey: string;
  Remark: string;
  tempExpenseName: string;
  tempExpenseAmount: number;
  Expense: tripExpense[];
  searchText: string;
  pageStatus: number;
  filterPartyName: string;
}

export default _expense;
