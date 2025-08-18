import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface FileViewState {
  open: boolean;
  files: string[];
}

// Define the initial state using that type
const initialState: FileViewState = {
  open: false,
  files: [],
};

// Actual Slice
export const fileViewSlice = createSlice({
  name: 'fileView',
  initialState,
  reducers: {
    openFileViewModal(state, action: PayloadAction<{ files: string[] }>) {
      state.open = true;
      state.files = action.payload.files;
    },
    closeFileViewModal(state) {
      state.open = false;
    },
  },
});

export const { closeFileViewModal, openFileViewModal } = fileViewSlice.actions;

export default fileViewSlice.reducer;
