import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { get, ref } from "firebase/database";
import _bill from "../Interface/Bill";
import { format } from "date-fns";

export const BillHeader = (props: any) => {
  let billName = props.Name;
  let partyName = props.partyName;
  const BillRef = ref(database, "bill");
  const [bill, setBill] = useState<_bill>();

  useEffect(() => {
    // set trip list
    get(BillRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _array = Object.entries(snapshot.val())
            .map(([id, data]) => ({
              id,
              ...(data as _bill),
            }))
            .filter((x) => x.billName == billName);
          console.log(_array);
          setBill(_array[0]);
        }
      })
      .catch((err) => console.log(err));
    //end
  }, []);
  return (
    <center>
      <div>
        <div>
          <div className="billHeader1">{billName}</div>
          <div className="billHeader2">
            TRANSPORT CONTRACTOR & COMMISSION AGENT
          </div>
          <div>{bill?.address1}</div>
          <div>{bill?.address2}</div>
        </div>
        <div style={{ float: "right", marginRight: "11%", marginTop: "20px" }}>
          Date: {format(new Date(), "dd-MM-yyyy")}
        </div>
        <div style={{ float: "left", marginLeft: "11%", marginTop: "20px" }}>
          To:
          {partyName}
        </div>
        <div style={{ marginTop: "40px" }}>
          <strong>Subject : </strong>
        </div>
        <div>Body</div>
      </div>
    </center>
  );
};
