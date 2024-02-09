import _truck from '@/app/Interface/Truck';
import {createSlice,PayloadAction} from '@reduxjs/toolkit';

type InitialState ={
    value : _truck;
}
const initialState = {
    value : {
        key : "",
        TruckNumber : ""
    } as _truck,
} as InitialState;

export const truckState = createSlice({
    name : "truckState",
    initialState ,
    reducers:{
        editTruck:(state,action:PayloadAction<_truck>)=>{
                return;
            },
        addTruck:()=>{
            return initialState;
        },

        },
    });