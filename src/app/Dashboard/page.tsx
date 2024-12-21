import React from "react";

const Dashboard = () => {
  const vehicleData = [
    {
      vehicleNumber: "MH46CL6730",
      registrationDate: null,
      tax: {
        fromDate: null,
        toDate: null,
      },
      puc: {
        fromDate: "14 May 2024",
        toDate: "13 May 2025",
      },
      insurance: {
        fromDate: null,
        toDate: null,
      },
      permit: {
        fromDate: null,
        toDate: null,
      },
      fitness: {
        fromDate: null,
        toDate: null,
      },
    },
    {
      vehicleNumber: "MH46CL5578",
      registrationDate: "19 Sept 2023",
      tax: {
        fromDate: "19 Jul 2023",
        toDate: "One Time",
      },
      puc: {
        fromDate: "06 Aug 2024",
        toDate: "05 Aug 2025",
      },
      insurance: {
        fromDate: "20 Jun 2024",
        toDate: "19 Jun 2025",
      },
      permit: {
        fromDate: "21 Jul 2023",
        toDate: "20 Jul 2028",
      },
      fitness: {
        fromDate: "18 Jul 2023",
        toDate: "17 Jul 2025",
      },
    },
    {
      vehicleNumber: "MH46AR6253",
      registrationDate: "07 Jan 2016",
      tax: {
        fromDate: "01 Oct 2024",
        toDate: "31 Dec 2024",
      },
      puc: {
        fromDate: "19 Dec 2024",
        toDate: "18 Jun 2025",
      },
      insurance: {
        fromDate: "19 Nov 2024",
        toDate: "18 Nov 2025",
      },
      permit: {
        fromDate: null,
        toDate: null,
      },
      fitness: {
        fromDate: "19 Jan 2024",
        toDate: "18 Jan 2025",
      },
    },
    {
      vehicleNumber: "MH46AR3513",
      registrationDate: "11 May 2016",
      tax: {
        fromDate: "01 Sept 2024",
        toDate: "31 Aug 2025",
      },
      puc: {
        fromDate: "29 April 2024",
        toDate: "28 April 2025",
      },
      insurance: {
        fromDate: "06 April 2024",
        toDate: "05 April 2025",
      },
      permit: {
        fromDate: "21 Oct 2021",
        toDate: "20 Oct 2026",
      },
      fitness: {
        fromDate: "10 Jul 2023",
        toDate: "12 Jul 2025",
      },
    },
    {
      vehicleNumber: "MH46BM4282",
      registrationDate: null,
      tax: {
        fromDate: null,
        toDate: "31 Dec 2024",
      },
      puc: {
        fromDate: null,
        toDate: "19 Jul 2025",
      },
      insurance: {
        fromDate: null,
        toDate: "22 Jan 2025",
      },
      permit: {
        fromDate: null,
        toDate: "12 Mar 2025",
      },
      fitness: {
        fromDate: null,
        toDate: "28 Mar 2026",
      },
    },
  ];

  const getdateDetails = (targetDateStr: string | null) => {
    targetDateStr = targetDateStr ?? "";

    const targetDate: Date = new Date(targetDateStr);
    const currentDate: Date = new Date();

    if (isNaN(targetDate.getTime())) {
      return 0;
    }
    const differenceInMs = targetDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  return (
    <div className="container">
      <div className="table-container">
        <h2 className="text-center mb-4">Vehicle Dashboard</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th className="col-2">Vehicle Number</th>
              <th>Registration Date</th>
              <th colSpan={2}>TAX</th>
              <th colSpan={2}>PUC</th>
              <th colSpan={2}>Insurance</th>
              <th colSpan={2}>Permit</th>
              <th colSpan={2}>Fitness</th>
            </tr>
            <tr>
              <th className="col-2"></th>
              <th></th>
              <th>From Date</th>
              <th>To Date</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>From Date</th>
              <th>To Date</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((vehicle, index) => (
              <tr key={index}>
                <td className="col-2">{vehicle.vehicleNumber}</td>
                <td>{vehicle.registrationDate}</td>
                <td>{vehicle.tax.fromDate}</td>
                <td
                  className={
                    getdateDetails(vehicle.tax.toDate) < 30 ? "text-danger" : ""
                  }
                >
                  {vehicle.tax.toDate}
                </td>
                <td>{vehicle.puc.fromDate}</td>
                <td
                  className={
                    getdateDetails(vehicle.puc.toDate) < 30 ? "text-danger" : ""
                  }
                >
                  {vehicle.puc.toDate}
                </td>
                <td>{vehicle.insurance.fromDate}</td>
                <td
                  className={
                    getdateDetails(vehicle.insurance.toDate) < 30
                      ? "text-danger"
                      : ""
                  }
                >
                  {vehicle.insurance.toDate}
                </td>
                <td>{vehicle.permit.fromDate}</td>
                <td
                  className={
                    getdateDetails(vehicle.permit.toDate) < 30
                      ? "text-danger"
                      : ""
                  }
                >
                  {vehicle.permit.toDate}
                </td>
                <td>{vehicle.fitness.fromDate}</td>
                <td
                  className={
                    getdateDetails(vehicle.fitness.toDate) < 30
                      ? "text-danger"
                      : ""
                  }
                >
                  {vehicle.fitness.toDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
