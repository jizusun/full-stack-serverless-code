import { useState, useEffect } from 'react';
import {
  withAuthenticator,
  AmplifySignOut,
} from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';

const Profile = () => {
  useEffect(() => {
    checkUser();
  });
  const [user, setUser] = useState({});
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = {
        username: data.username,
        ...data.attributes,
      };
      setUser(userInfo);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <h2>Username: </h2>
      <h3>Email: </h3>
      <h4>Phone: </h4>
      <AmplifySignOut />
    </div>
  );
};

export default withAuthenticator(Profile);
