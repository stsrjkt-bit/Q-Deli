import React from 'react';
import Navigation from '../components/Navigation';
import PropTypes from 'prop-types';

function ProfilePage({ user }){
  const { name = 'Alex Student', email = 'alex@example.com' } = user || {};
  return (
    <div>
      <Navigation userName={name} />
      <div style={{ padding:16 }}>
        <h2 style={{ marginTop:0 }}>Profile</h2>
        <div>Name: {name}</div>
        <div>Email: {email}</div>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default ProfilePage;
