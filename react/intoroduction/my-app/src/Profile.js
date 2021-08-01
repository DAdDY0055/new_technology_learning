import React from 'react';

const Profile = (props) =>  {
  return (
    <ul>
      <li>名前: { props.name }</li>
      <li>誕生日: { props.birthDay }</li>
    </ul>
  )
};

export default Profile;