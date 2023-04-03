import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import travelogueLogo from "../../images/travelogue-logo-wt.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = async() => {
   await dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    //code to logout automatic if user token time expires
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (token !== storedProfile?.token) {
      setUser(storedProfile);
    }
  }, [location, user]);

  return (
    <AppBar className={classes.appBar} position="static">
      <div className={classes.brandContainer}>
        <Link to="/">
          <img
            className={classes.image}
            src={travelogueLogo}
            alt="memories"
            height="20"
          />
        </Link>
      </div>
      {/* search bar starts */}

      {/* search bar ends  */}
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              onClick={logout}
            >
              Logout{" "}
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
