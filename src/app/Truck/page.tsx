"use client";
import React, { useEffect, useMemo, useState } from "react";
import _truck from "../Interface/Truck";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";
import { database } from "../firebaseConfig";
import { child, push, ref, set, get, remove } from "firebase/database";
import "bootstrap/dist/css/bootstrap.css";
import { Bounce, toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { event } from "jquery";

export default function Truck() {
  const [inputs, setInputs] = useState({
    key: "",
    txtTruckNumber: "",
    searchText: "",
  });

  const [trucks, setTrucks] = useState<_truck[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    setInputs((values) => ({ ...values, [targetName]: targetValue }));
  };

  const SearchTextChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
  };

  const saveTruckDetailsToFirebase = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (inputs.txtTruckNumber.length > 0) {
      let UniqueIDkey = "";
      if (inputs.key.length > 0) {
        UniqueIDkey = inputs.key;
      } else {
        UniqueIDkey = "truck-" + new Date().getTime().toString();
      }
      const db_ref = child(ref(database), "truck/" + UniqueIDkey);

      set(db_ref, { TruckNumber: inputs.txtTruckNumber, key: UniqueIDkey });
      let obj: _truck = {
        TruckNumber: inputs.txtTruckNumber,
        key: UniqueIDkey,
        CreatedOn: "",
        Id: trucks.length + 1,
      };
      setTrucks(trucks.concat(obj));
      setInputs({ key: "", txtTruckNumber: "", searchText: "" });

      alert("Truck Data added successfully");
      sessionStorage.clear();
    } else {
      alert("Truck Number should not be blank.");
    }
  };

  const editTruck = (data: _truck) => {
    setInputs({
      key: data.key,
      txtTruckNumber: data.TruckNumber,
      searchText: "",
    });
  };
  const deleteTruck = (key: string) => {
    remove(ref(database, "truck/" + key)).then;

    const index = trucks.findIndex((x) => x.key == key);
    if (index > -1) {
      let x = trucks.splice(index, 1);
      setTrucks(x);
    }
    setTrucks(trucks.filter((x) => x.key != key));
  };
  useEffect(() => {
    const truckRef = ref(database, "truck");
    get(truckRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let truckGridList: _truck[] = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            childData.Id = truckGridList.length + 1;
            truckGridList.push(childData);
          });
          setTrucks(truckGridList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const TruckList = () => {
    if (trucks.length > 0) {
      return trucks.map((x, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{x.TruckNumber}</td>
          <td>
            <button
              className="from-control btn btn-warning"
              style={{ marginRight: "10px" }}
              onClick={(event) => editTruck(x)}
            >
              Edit
            </button>
            <button
              className="from-control btn btn-danger"
              onClick={() => deleteTruck(x.key)}
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

  const truck_columns = useMemo(
    () => [
      { field: "Id", headerName: "Id", width: 100 },
      { field: "TruckNumber", headerName: "Truck Number", width: 200 },
      // {
      //   field: "Edit",
      //   renderCell: (cellValues) => {
      //     return (
      //       <Button
      //         variant="contained"
      //         color="warning"
      //         onClick={(event) => {
      //           handleClick(event, cellValues);
      //         }}
      //       >
      //         Edit
      //       </Button>
      //     );
      //   },
      // },
      // {
      //   field: "Delete",
      //   renderCell: () => {
      //     return (
      //       <Button variant="contained" color="error">
      //         Delete
      //       </Button>
      //     );
      //   },
      // },
    ],
    []
  );

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="content">
          <div className="container h-100">
            <div className="row table table-striped thead-light">
              <div className="col-md-3"></div>
              <div className="col-md-2">
                <label>Truck Number</label>
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="from-control"
                  id="txtTruckNumber"
                  {...register("txtTruckNumber", {
                    required: "This is required.",
                  })}
                  value={inputs.txtTruckNumber}
                  onChange={handleChange}
                  placeholder="Enter Truck Number"
                />
                {errors.txtTruckNumber && (
                  <span> Please enter Truck Number</span>
                )}
              </div>
              <div className="col-md-2">
                <input
                  type="button"
                  className="from-control btn btn-primary"
                  name="btnAddEditTruck"
                  value="Add Truck"
                  id="btnAddEditTruck"
                  onClick={(event) => saveTruckDetailsToFirebase(event)}
                />
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th colSpan={2}>Records found : {trucks.length}</th>
                    <th>
                      <input
                        type="text"
                        className="from-control"
                        id="searchText"
                        {...register("searchText")}
                        value={inputs.searchText}
                        onChange={SearchTextChange}
                        placeholder="Search"
                      />
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">sr No</th>
                    <th scope="col">Truck Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <TruckList />
                </tbody>
              </table>
              {/* <DataGrid
                columns={truck_columns}
                rows={trucks}
                getRowId={(row: any) => generateRandom()}
                onRowClick={(event) => setInputs(event.row)}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
function generateRandom() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
