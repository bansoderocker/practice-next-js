import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  container: {
    position: "relative",
    textAlign: "center",
    color: "white",
  },
});

const PDFFile = (data: object) => {
  return (
    <Document pageMode="fullScreen">
      <Page orientation="landscape">
        <center>
          <Text
            style={{
              marginTop: "-40%",
              // marginLeft: "45%",
              position: "absolute",
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* {data.StudentName} */}
          </Text>

          <Text
            style={{
              marginTop: "-30%",
              // marginLeft: "45%",
              position: "absolute",
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* {data.CourseName}

            {" in " + data.Year} */}
          </Text>
        </center>
      </Page>
    </Document>
  );
};

export default PDFFile;
