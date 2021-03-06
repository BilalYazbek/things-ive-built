import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { useAuthState } from "react-firebase-hooks/auth";

import { AuthAction } from "./AuthAction";
import { getFirebaseAuth } from "src/utils/get-firebase";
import { Separator } from "./Separator";

export const Header = () => {
  const [user] = useAuthState(getFirebaseAuth());
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" data-testid="header">
        <Toolbar>
          <a
            href={"/"}
            style={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
          >
            <div>
              <Button>
                <Typography variant="h6">Things I've Built</Typography>
              </Button>
            </div>
          </a>
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href={"/explore"}
          >
            <Button variant="outlined" data-testid="explore">
              Explore
            </Button>
          </a>
          <Separator horizontal space={4} />
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href={"/add-thing"}
          >
            <Button variant="outlined" data-testid="explore">
              Add thing
            </Button>
          </a>

          {user && (
            <a
              style={{ color: "inherit", textDecoration: "none" }}
              href={`/things-list?uid=${user.uid}`}
            >
              <Button>My Things</Button>
            </a>
          )}

          <AuthAction />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
