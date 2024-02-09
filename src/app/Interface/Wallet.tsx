interface _wallet {
  Key: string;
  T_Type: string;
  T_Amount: number;
  T_To: string;
  T_From: string;
  T_Date: Date; // new Date().toString().substring(0,24);
  T_Date_string: string; // new Date().toString().substring(0,24);
  BankName: string;
}

export default _wallet;
