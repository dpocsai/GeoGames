import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import { Tooltip } from "@mui/material";
import { LogoutTwoTone } from "@mui/icons-material";

import { signIn, signOut } from "../actions/index";

const GoogleAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const signInBtn = useRef();
  const dispatch = useDispatch();

  const handleSignIn = useCallback(
    (response) => {
      let payload = jwt_decode(response.credential);
      dispatch(signIn(payload));
    },
    [dispatch]
  );

  const handleSignOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENTID,
      callback: handleSignIn,
      auto_select: true,
    });

    window.google.accounts.id.renderButton(signInBtn.current, {
      type: "standard",
      text: "signin",
      size: "small",
      theme: "outline",
    });
  }, [user, handleSignIn]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!user && <div ref={signInBtn}></div>}

      {user && (
        <Tooltip title="Log out">
          <LogoutTwoTone
            sx={{ cursor: "pointer" }}
            onClick={() => handleSignOut()}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default GoogleAuth;

//link google signin confirmation and create a new user in database
