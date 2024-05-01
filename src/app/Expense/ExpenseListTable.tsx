import _expense from "../Interface/Expense";

export default function ExpenseListTable(props: _expense[]) {
  return (
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
