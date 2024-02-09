import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function CommonButton(props: any) {
  return <Button variant="contained">{props.btnText}</Button>;
}
