import React,{ useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as allApis from "./api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(8),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'center',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [heading,setCount] = useState();
    {allApis.callAPI1(setCount)}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h3" noWrap>
            <b>{heading}</b>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
