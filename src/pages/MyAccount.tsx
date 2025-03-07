import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ShoppingCartContext } from '../contexts';

function MyAccount() {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.user) {
      navigate('/'); // Redirect to login page if user is not logged in
    }
  }, [context.user, navigate]);

  if (!context.user) {
    return <p>Loading...</p>; // Display a loading message while checking authentication
  }

  return (
    <Layout>
      <p className="m-4">My Account</p>
      <div className="flex flex-col items-center justify-center w-2/4 h-3/4 border border-black rounded-lg p-8">
        <figure className="flex items-center justify-center flex-col">
          <p className="mb-5 mt-5 font-medium">Welcome, {context.user.displayName}!</p>
          <img
            src={context.user.photoURL || "/default-avatar.png"}
            alt={context.user.displayName || "User"}
            className="border border-slate-950 rounded-full"
          />
          <p className="font-bold mt-2 mb-2">{context.user.displayName}</p>
          <p className="font-light">{context.user.email}</p>
        </figure>
      </div>
    </Layout>
  );
}

export default MyAccount;
