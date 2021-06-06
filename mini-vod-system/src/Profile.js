import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  withAuthenticator,
  AmplifySignOut,
} from '@aws-amplify/ui-react';

const Profile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    checkUser();
  }, []);
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
      <h2>Username: {user.username} </h2>
      <h3>Email: {user.email} </h3>
      <h4>Phone: {user.phone_number} </h4>
      <AmplifySignOut />
    </div>
  );
};

// https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#custom-form-fields
// https://aws-amplify.github.io/amplify-js/api/globals.html#withauthenticator
// https://aws.amazon.com/premiumsupport/knowledge-center/cognito-change-user-pool-attributes/
// https://docs.amplify.aws/lib/auth/manageusers/q/platform/jss
// https://www.youtube.com/watch?v=OxrHplxZ8BA
export default withAuthenticator(Profile, true);
