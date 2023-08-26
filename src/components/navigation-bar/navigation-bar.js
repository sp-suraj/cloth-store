import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase";
import { UserContext } from "../../contexts/user-context";
import { useContext } from "react";
import { ReactComponent as Logo } from "../../assets/clothes-store-svgrepo-com.svg";

export default function NavigationBar() {
  const { currentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" width={40} height={40} />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to="/signIn">
              Sign In
            </Link>
          )}
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
