import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Container from './Container';

function Protected(props) {
  useEffect(() => {
    Auth.currentAuthenticatedUser().catch(() => {
      props.history.push('/profile');
    });
  }, []);
  return (
    <Container>
      <h1>Protected Route</h1>
    </Container>
  );
}

export default Protected;
