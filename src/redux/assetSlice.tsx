import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface TagState{
    selectedTagType: string | null;
    widthTypeModal: string;
}

const initialState: TagState ={
    selectedTagType: null,
    widthTypeModal: "40%",
}

const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers:{
        setSelectedTagType(state, action: PayloadAction<string | null>){
            state.selectedTagType = action.payload;
        },
        setWidthTypeModal(state, action: PayloadAction<string >){
            state.widthTypeModal = action.payload;
        }
    }
})

export const {setSelectedTagType , setWidthTypeModal} = assetSlice.actions;
export default assetSlice.reducer;