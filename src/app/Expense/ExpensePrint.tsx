import { BillFooter } from "../Component/BillFooter";
import { BillHeader } from "../Component/BillHeader";
import { getInitialChar } from "../Component/CommonFunction";
import _expense from "../Interface/Expense";
import _party from "../Interface/Party";
import "../css/common.css";

// const tblList = (list:) => {
//   let list: _expense[] = props.list;
//   return (
//     list.length > 0 &&
//     list.map((x, index) => (
//       <tr key={index} className="addBorder">
//         <td className="addBorder">
//           {getInitialChar(x.BillName)} - {x.BillNumber}
//         </td>
//         <td className="addBorder">{x.TripDate}</td>
//         <td className="addBorder">{x.TruckNumber}</td>
//         <td className="addBorder">{x.Particular}</td>
//         <td className="addBorder">{x.TripAmount}</td>
//       </tr>
//     ))
//   );
// };

const ExpensePrint = (props: any) => {
  let lstExpenseList: _expense[] = props.lstExpenseList;
  //   console.log(lstExpenseList);
  let lstUsedBillName = lstExpenseList
    .map((x) => x.BillName)
    .filter(
      (value, index, current_value) => current_value.indexOf(value) === index
    );
  //   console.log(lstUsedBillName);
  let TRBillList = lstExpenseList.filter(
    (x) => x.BillName == "Tushar Roadlines"
  );
  let AVBillList = lstExpenseList.filter(
    (x) => x.BillName == "Ajay Vijay Roadlines"
  );
  let TRBBillList = lstExpenseList.filter(
    (x) => x.BillName == "Tanaji R Bansode"
  );
  let BillName: string = props.BillName;
  console.log(BillName);
  let PartyName: string = props.PartyName;
  console.log(BillName);

  return (
    <center>
      <br />

      <div style={{ width: "80%" }}>
        <BillHeader Name={BillName} partyName={PartyName} />

        <table style={{ width: "80%" }}>
          {TRBillList.length > 0 && (
            <tr className="addBorder">
              <td className="addBorder" colSpan={5}>
                Tushar Roadlines
              </td>
            </tr>
          )}

          {TRBillList.length > 0 && (
            <tr className="addBorder">
              <td className="addBorder"></td>
              <td className="addBorder">Date</td>
              <td className="addBorder">Truck Number</td>
              <td className="addBorder">Particular</td>
              <td className="addBorder">Amount</td>
            </tr>
          )}

          {TRBillList.length > 0 &&
            TRBillList.map((x, index) => (
              <tr key={index} className="addBorder">
                <td className="addBorder">{x.BillNumber}</td>
                <td className="addBorder">{x.TripDate}</td>
                <td className="addBorder">{x.TruckNumber}</td>
                <td className="addBorder">{x.Particular}</td>
                <td className="addBorder">{x.TripAmount}</td>
              </tr>
            ))}
        </table>
      </div>
      <br />

      <div style={{ width: "80%" }}>
        <table style={{ width: "80%" }}>
          {AVBillList.length > 0 && (
            <tr className="addBorder">
              <td className="addBorder" colSpan={5}>
                Ajay Vijay Roadlines
              </td>
            </tr>
          )}
          {AVBillList.length > 0 && (
            <tr className="addBorder">
              <td className="addBorder"></td>
              <td className="addBorder">Date</td>
              <td className="addBorder">Truck Number</td>
              <td className="addBorder">Particular</td>
              <td className="addBorder">Amount</td>
            </tr>
          )}
          {AVBillList.length > 0 &&
            AVBillList.map((x, index) => (
              <tr key={index} className="addBorder">
                <td className="addBorder">{x.BillNumber}</td>
                <td className="addBorder">{x.TripDate}</td>
                <td className="addBorder">{x.TruckNumber}</td>
                <td className="addBorder">{x.Particular}</td>
                <td className="addBorder">{x.TripAmount}</td>
              </tr>
            ))}
        </table>
      </div>
      <br />

      <div style={{ width: "80%" }}>
        <table style={{ width: "80%" }}>
          {TRBBillList.length > 0 && (
            <tr className="addBorder">
              <td className="addBorder" colSpan={5}>
                Tanaji R Bansode
              </td>
            </tr>
          )}
          {TRBBillList.length > 0 && (
            <tr className="addBorder">
              <td className="addBorder"></td>
              <td className="addBorder">Date</td>
              <td className="addBorder">Truck Number</td>
              <td className="addBorder">Particular</td>
              <td className="addBorder">Amount</td>
            </tr>
          )}
          {TRBBillList.length > 0 &&
            TRBBillList.map((x, index) => (
              <tr key={index} className="addBorder">
                <td className="addBorder">{x.BillNumber}</td>
                <td className="addBorder">{x.TripDate}</td>
                <td className="addBorder">{x.TruckNumber}</td>
                <td className="addBorder">{x.Particular}</td>
                <td className="addBorder">{x.TripAmount}</td>
              </tr>
            ))}
        </table>
        <BillFooter />
      </div>
    </center>
  );
};

export default ExpensePrint;
