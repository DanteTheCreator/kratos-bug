import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { V0alpha2Api, Configuration, Session, Identity, SubmitSelfServiceLoginFlowBody } from "@ory/client"

const basePath = process.env.REACT_APP_ORY_URL || "http://localhost:4433"

const ory = new V0alpha2Api(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  }),
)

export interface AuthState {
  isLoggedIn: boolean,
  ory: any;

}

const initialState: AuthState = {
  isLoggedIn: false, //
  ory,

}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    increment: (state) => {
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment } = authSlice.actions

export default authSlice.reducer