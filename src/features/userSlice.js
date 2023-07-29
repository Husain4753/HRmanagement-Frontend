import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'user',
  initialState:{
    id: null,
    username: "",
    email: "",
    contact: "",
    department:'',
    profile_image: null,
    is_admin: null,
    created_at: "",
    updated_at: ""
  },
  reducers: {
    setUserInfo:(state,action)=>{
      state.id=action.payload.id
      state.username=action.payload.username
      state.email=action.payload.email
      state.contact=action.payload.contact
      state.department=action.payload.department
      state.profile_image=action.payload.profile_image
      state.is_admin=action.payload.is_admin
      state.created_at=action.payload.created_at
      state.updated_at=action.payload.updated_at
    },
    unSetUserInfo:(state)=>{
      state.id=null
      state.username=''
      state.email=''
      state.contact=''
      state.department=''
      state.profile_image=''
      state.is_admin=null
      state.created_at=''
      state.updated_at=''
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo,unSetUserInfo } = counterSlice.actions

export default counterSlice.reducer