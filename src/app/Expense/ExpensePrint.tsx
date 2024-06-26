import { BillFooter } from "../Component/BillFooter";
import { BillHeader } from "../Component/BillHeader";
import { getInitialChar } from "../Component/CommonFunction";
import _expense from "../Interface/Expense";
import _party from "../Interface/Party";
import "../css/common.css";

import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

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

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    margin: "auto",
    marginVertical: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

const ExpensePrint = (
  lstExpenseList: _expense[],
  BillName: string,
  PartyName: string
) => {
  // let lstExpenseList: _expense[] = props.lstExpenseList;
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
  // let BillName: string = BillName;
  // console.log(BillName);
  // let PartyName: string = props.PartyName;
  // console.log(BillName);
  let columnList = ["", "Date", "Truck Number", "Particular", "Amount"];
  return (
    // <Document>
    //   <Page
    //     orientation="portrait"
    //     style={{
    //       border: "1px",
    //       color: "red",
    //       width: "100%",
    //       height: "100%",
    //     }}
    //   >
    //     {/* <center>
    //       <div style={{ width: "80%" }}>
    //         <BillHeader Name={BillName} partyName={PartyName} />

    //         <table style={{ width: "80%" }}>
    //           {TRBillList.length > 0 && (
    //             <tr className="addBorder">
    //               <td className="addBorder" colSpan={5}>
    //                 {TRBillList[0].BillName}
    //               </td>
    //             </tr>
    //           )}

    //           {TRBillList.length > 0 && (
    //             <tr className="addBorder">
    //               <td className="addBorder"></td>
    //               <td className="addBorder">Date</td>
    //               <td className="addBorder">Truck Number</td>
    //               <td className="addBorder">Particular</td>
    //               <td className="addBorder">Amount</td>
    //             </tr>
    //           )}

    //           {TRBillList.length > 0 &&
    //             TRBillList.map((x, index) => (
    //               <tr key={index} className="addBorder">
    //                 <td className="addBorder">{x.BillNumber}</td>
    //                 <td className="addBorder">{x.TripDate}</td>
    //                 <td className="addBorder">{x.TruckNumber}</td>
    //                 <td className="addBorder">{x.Particular}</td>
    //                 <td className="addBorder">{x.TripAmount}</td>
    //               </tr>
    //             ))}
    //         </table>
    //       </div>
    //       <br />

    //       <div style={{ width: "80%" }}>
    //         <table style={{ width: "80%" }}>
    //           {AVBillList.length > 0 && (
    //             <tr className="addBorder">
    //               <td className="addBorder" colSpan={5}>
    //                 {AVBillList[0].BillName}
    //               </td>
    //             </tr>
    //           )}
    //           {AVBillList.length > 0 && (
    //             <tr className="addBorder">
    //               <td className="addBorder"></td>
    //               <td className="addBorder">Date</td>
    //               <td className="addBorder">Truck Number</td>
    //               <td className="addBorder">Particular</td>
    //               <td className="addBorder">Amount</td>
    //             </tr>
    //           )}
    //           {AVBillList.length > 0 &&
    //             AVBillList.map((x, index) => (
    //               <tr key={index} className="addBorder">
    //                 <td className="addBorder">{x.BillNumber}</td>
    //                 <td className="addBorder">{x.TripDate}</td>
    //                 <td className="addBorder">{x.TruckNumber}</td>
    //                 <td className="addBorder">{x.Particular}</td>
    //                 <td className="addBorder">{x.TripAmount}</td>
    //               </tr>
    //             ))}
    //         </table>
    //       </div>
    //       <br />

    //       <div style={{ width: "80%" }}>
    //         <table style={{ width: "80%" }}>
    //           {TRBBillList.length > 0 && (
    //             <tr className="addBorder">
    //               <td className="addBorder" colSpan={5}>
    //                 Tanaji R Bansode
    //               </td>
    //             </tr>
    //           )}
    //           {TRBBillList.length > 0 && (
    //             <tr className="addBorder">
    //               <td className="addBorder"></td>
    //               <td className="addBorder">Date</td>
    //               <td className="addBorder">Truck Number</td>
    //               <td className="addBorder">Particular</td>
    //               <td className="addBorder">Amount</td>
    //             </tr>
    //           )}
    //           {TRBBillList.length > 0 &&
    //             TRBBillList.map((x, index) => (
    //               <tr key={index} className="addBorder">
    //                 <td className="addBorder">{x.BillNumber}</td>
    //                 <td className="addBorder">{x.TripDate}</td>
    //                 <td className="addBorder">{x.TruckNumber}</td>
    //                 <td className="addBorder">{x.Particular}</td>
    //                 <td className="addBorder">{x.TripAmount}</td>
    //               </tr>
    //             ))}
    //         </table>
    //         <BillFooter />
    //       </div>
    //     </center> */}
    //   </Page>
    // </Document>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
          <View style={styles.table}>
            {/* th open */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>Column 1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Column 2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Column 3</Text>
              </View>
            </View>
            {/* th close */}

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>Data 1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Data 2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Data 3</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ExpensePrint;
