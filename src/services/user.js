import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) =>{
        return {
            url:'loginuser/',
            method:'POST',
            body:user,
            headers:{
                'Content-type':'application/json',
            }}
        }
      } 
    ),
    getUserProfile: builder.query({
      query:(access_token)=>{
        return{
          url:'loggeduserprofile/',
          method:'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      }
    }),
    refreshToken: builder.mutation({
      query:(refresh_token)=>{
        return{
          url:'refreshtoken/',
          method:'POST',
          body:{"refresh":refresh_token},
          headers:{
            'Content-type':'application/json',
          }
        }
      }
    }),
    getAllUserProfile: builder.query({
      query:(access_token)=>{
        return{
          url:'alluserprofile/',
          method:'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      }
    }),
    getSingleUserProfile: builder.query({
      query:({id,access_token})=>{
        return{
          url:`getuserprofile/${id}/`,
          method:'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      }
    }),
    getLoggedUserProfile: builder.query({
      query:(access_token)=>{
        return{
          url:`loggeduserprofile/`,
          method:'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      }
    }),
    changeUserProfilePhoto: builder.mutation({
      query:({id,access_token,ProfileData})=>{
        return{
          url:`userprofileupdate/${id}/`,
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:ProfileData,
        }
      }
    }),
    changeLoggedUserProfilePhoto: builder.mutation({
      query:({access_token,ProfileData})=>{
        return{
          url:`userprofileupdate/`,
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:ProfileData,
        }
      }
    }),
    updateUserInfo: builder.mutation({
      query:({id,access_token,actualData})=>{
        return{
          url:`updateuser/${id}/`,
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:actualData,
        }
      }
    }),
    changeUserPassword: builder.mutation({
      query:({id,access_token,actualData})=>{
        return{
          url:`changeuserpassword/${id}/`,
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:actualData,
        }
      }
    }),
    deleteUser: builder.mutation({
      query:({id,access_token})=>{
        return{
          url:`deleteuser/${id}/`,
          method:'DELETE',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      }
    }),
    registerUser: builder.mutation({
      query:({access_token,data})=>{
        return{
          url:`registeruser/`,
          method:'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:data,
        }
      }
    }),
    getAllUserLeave: builder.query({
      query:(access_token)=>{
        return{
          url:`getalluserleave/`,
          method:'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      }
    }),
    changeUserLeave: builder.mutation({
      query:({access_token,id,data})=>{
        return{
          url:`changeuserleave/${id}/`,
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:data,
        }
      }
    }),
    getAllResumeDetails: builder.query({
      query:(access_token)=>{
        return{
          url:`getresumedetail/`,
          method:'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      }
    }),
    createNewApplication: builder.mutation({
      query:({access_token,data})=>{
        return{
          url:`createnewapplication/`,
          method:'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:data,
        }
      }
    }),
    newAnnouncement: builder.mutation({
      query:({access_token,data})=>{
        return{
          url:`newannouncement/`,
          method:'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:data,
        }
      }
    }),
    getAllAnnouncement: builder.query({
      query:(access_token)=>{
        return{
          url:`getallannouncement/`,
          method:'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      }
    }),
    changeLoggedUserpassword: builder.mutation({
      query:({access_token,actualData})=>{
        return{
          url:`changeuserpassword/`,
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:actualData,
        }
      }
    }),
    getLoggedUserLeave: builder.query({
      query:(access_token)=>{
        return{
          url:`getloggeduserleave/`,
          method:'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      }
    }),
    applyNewLeave: builder.mutation({
      query:({access_token,data})=>{
        return{
          url:`applynewleave/`,
          method:'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
          body:data,
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query:(data)=>{
        return{
          url:`sendresetpasswordemail/`,
          method:'POST',
          headers:{
            'Content-type':'application/json',
          },
          body:data,
        }
      }
    }),
    resetPassword: builder.mutation({
      query:({actualData,uid,token})=>{
        return{
          url:`resetpassword/${uid}/${token}/ `,
          method:'POST',
          headers:{
            'Content-type':'application/json',
          },
          body:actualData,
        }
      }
    }),
    getDashboardData: builder.query({
      query:(access_token)=>{
        return{
          url:`getdashboarddata/`,
          method:'GET',
          headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${access_token}`,
          },
        }
      }
    }),
    putNewApplicantDetails: builder.mutation({
      query:({uid,data})=>{
        return{
          url:`putapplicantdetail/${uid}/`,
          method:'PUT',
          headers:{
            'Content-type':'application/json'
          },
          body: data,
        }
      }
    }),
  }),
})
export const { useLoginUserMutation,useGetUserProfileQuery,useGetAllUserProfileQuery,useRefreshTokenMutation,useGetSingleUserProfileQuery,useChangeUserProfilePhotoMutation,useUpdateUserInfoMutation,useChangeUserPasswordMutation,useGetLoggedUserProfileQuery,useChangeLoggedUserProfilePhotoMutation,useDeleteUserMutation,useRegisterUserMutation,useGetAllUserLeaveQuery,useChangeUserLeaveMutation,useGetAllResumeDetailsQuery,useCreateNewApplicationMutation,useNewAnnouncementMutation,useGetAllAnnouncementQuery,useChangeLoggedUserpasswordMutation,useGetLoggedUserLeaveQuery,useApplyNewLeaveMutation,useSendPasswordResetEmailMutation,useResetPasswordMutation,useGetDashboardDataQuery,usePutNewApplicantDetailsMutation } = userApi