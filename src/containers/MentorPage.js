import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Grid,
  Paper,
  Typography,
  ButtonGroup,
  CssBaseline,
  Hidden,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  rightBox: {
    padding: theme.spacing(2),
  }
}));



const BackButton = ({ }) => {
  return (
    <Grid item>
      <Button variant='outlined' fullWidth color='primary' startIcon={<ExitToAppIcon />}>
        بازگشت
      </Button>
    </Grid>
  )
}

const MentorPage = ({ }) => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0);


  console.log(tabNumber)


  return (
    <Container className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2} direction='row' justify='space-around'>
        <Grid container item sm={3} xs={12} direction='column' justify='space-between'>
          <Grid item>
            <ButtonGroup orientation='vertical' variant="contained" color="primary" fullWidth>
              <Button startIcon={<ClassIcon />}>
                کارگاه‌ها
              </Button>
              <Button startIcon={<GroupIcon />}>
                تیم‌ها
              </Button>
              <Button>درخواست‌ها</Button>
            </ButtonGroup>
          </Grid>
          <Hidden xsDown>
            <Grid item fullWidth>
              <BackButton />
            </Grid>
          </Hidden>
        </Grid>

        <Grid item sm={9} xs={12} justify='center'>
          <Paper elevation={3} classNames={classes.rightBox}>
            
          </Paper>
        </Grid>

        <Hidden smUp>
          <Grid item fullWidth>
            <BackButton />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => {

}

export default connect(
  mapStateToProps,
  {

  }
)(MentorPage)