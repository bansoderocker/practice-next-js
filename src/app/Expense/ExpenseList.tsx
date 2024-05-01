import { getInitialChar } from "../Component/CommonFunction";
import _expense from "../Interface/Expense";
import _party from "../Interface/Party";

const ExpenseList = (props: any) => {
  console.log("lstTrip list");
  console.log(props.lstExpenseList);
  let lstExpenseList: _expense[] = props.lstExpenseList;
  if (lstExpenseList.length > 0) {
    return lstExpenseList.map((x, index) => (
      <tr key={index}>
        <td>
          {getInitialChar(x.BillName)} - {x.BillNumber}
        </td>
        <td>{x.TripDate}</td>
        <td>{x.TruckNumber}</td>
        <td>{x.Particular}</td>
        <td>{x.TripAmount}</td>
        <td>
          <button
            className="from-control btn btn-warning"
            style={{ marginRight: "10px" }}
            onClick={(event) => {
              props.setInputs((values: _expense[]) => ({
                ...values,
                key: x.key,
                tempExpenseName: "",
                tempExpenseAmount: 0,
                amount: x.amount,
                Particular: x.Particular,
                ParticularFrom: x.ParticularFrom,
                ParticularTo: x.ParticularTo,
                TripAmount: x.TripAmount,
                TruckNumber: x.TruckNumber,
                BillNumber: x.BillNumber,
                BillName: x.BillName,
                Remark: x.Remark,
                TripDate: x.TripDate,
                tripExpenseList: [],
                partyKey: x.partyKey,
                isList: false,
                pageStatus: 1,
              }));
            }}
          >
            Edit
          </button>
          <button
            className="from-control btn btn-danger"
            //   onClick={() => deleteBill(x.key)}
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

export default ExpenseList;
