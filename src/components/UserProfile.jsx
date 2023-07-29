import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getToken, removeToken, storeToken } from '../services/localStorageService';
import { useGetUserProfileQuery, useRefreshTokenMutation } from '../services/user';
import { setUserToken, unSetUserToken } from '../features/authSlice';
import { setUserInfo, unSetUserInfo } from '../features/userSlice';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const dispatch = useDispatch();
    const { access_token, refresh_token } = getToken();
    const [refreshToken] = useRefreshTokenMutation();
    const { data, isSuccess, isError } = useGetUserProfileQuery(access_token);
    const navigate=useNavigate()
    const RefreshToken=useCallback(async()=>{
        const res=await refreshToken(refresh_token);
        if (res.data){
          storeToken(res.data)
          let {access_token,refresh_token}=getToken()
          dispatch(setUserToken({access_token:access_token,refresh_token:refresh_token})) 
        }
        if (res.error){
          dispatch(unSetUserToken)
          dispatch(unSetUserInfo)
          removeToken()
          navigate('/')
        }
      },[refresh_token, refreshToken, dispatch,navigate]);
  
    useEffect(() => {
      if (isSuccess) {
        dispatch(
          setUserInfo({
            id: data.id,
            username: data.username,
            email: data.email,
            profile_image: data.profile_image,
            is_admin: data.is_admin,
            contact: data.contact,
            department: data.department,
            created_at: data.created_at,
            updated_at: data.updated_at
          })
          );
        }
    }, [data, isSuccess, dispatch, RefreshToken]);
  
    useEffect(() => {
      if (isError) {
        RefreshToken();
      }
    }, [isError, RefreshToken]);   
    return null;
}

export default UserProfile


