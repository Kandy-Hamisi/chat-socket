import { createSlice } from "@reduxjs/toolkit";


const initialState =  {
    messageList: []
}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messageList = [...state.messageList, action.payload];
        }
    }
});


export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;