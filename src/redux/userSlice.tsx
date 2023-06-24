import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonRedux, PersonResponse } from '../interfaces/interfaces';


const initialState:PersonResponse[] = ([
    {
        id:0,
        name: '',
        surname: '',
        document_number: 0,
        document_type: '',
        birthdate: '',
    }

]);

export const userSlice = createSlice ({
    name: 'users',
    initialState,
    reducers: {
        addUsers: (state, action: PayloadAction<PersonResponse[]>) => {
            return action.payload;
        }
    }
})

export const {addUsers} = userSlice.actions;

export default userSlice.reducer;