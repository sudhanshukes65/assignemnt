import React from 'react';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {

    const {userInfo} = useSelector((state) => state.auth)
    console.log(userInfo)
  

  return (
   userInfo? (
    <div className='d-flex '>

    <img className='mx-5' src={userInfo.image} alt="Profile" style={{ width: '150px', borderRadius: '50%' }} />

    <div>
      <h2>{userInfo.username}</h2>
      <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
      <p>Email: {userInfo.email}</p>
      <p>Gender: {userInfo.gender}</p>
    </div> 

  </div>
   ) : (
    <div>Loading...</div>
   )
  );
};

export default ProfileScreen;
