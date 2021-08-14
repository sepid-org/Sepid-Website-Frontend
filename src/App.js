import './Theme/Styles/App.css';

import { CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
// import Pushe from 'pushe-webpush';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { useHistory } from 'react-router';

import Notifier from './components/Notifications/Notifications';
import { initParseServer } from './parse/init';
import { initRedirectAction } from './redux/slices/redirect';
import Root from './root';
import WorkshopRoot from './root/Workshop';
import MuiTheme from './Theme/MuiThemes/MuiTheme';
import ZeroJourneyerMuiTheme from './Theme/MuiThemes/ZeroJourneyerMuiTheme';
import translations from './translations';
import jss from './utils/jssRTL';
// Pushe.init('ld838ykvn2n75poe');
// Pushe.subscribe();


const App = ({ dir, redirectTo, forceRedirect, initRedirect }) => {
  const history = useHistory();
  useEffect(() => {
    if (redirectTo !== null) {
      history.push(redirectTo);
      if (forceRedirect) {
        history.push(redirectTo);
        history.push('/loading/');
        history.goBack();
      } else {
        history.push(redirectTo);
      }
      initRedirect();
    }
  }, [redirectTo, forceRedirect, initRedirect, history]);

  useEffect(() => {
    initParseServer();
  }, []);

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  return (
    <IntlProvider translations={translations}>
      {dir === 'rtl' ? (
        <>
          <ThemeProvider theme={ZeroJourneyerMuiTheme}>
            <StylesProvider jss={jss}>
              <SnackbarProvider>
                <Notifier />
                <CssBaseline />
                <Root />
              </SnackbarProvider>
            </StylesProvider>
          </ThemeProvider>
        </>
      ) : (
          <>
            <ThemeProvider theme={MuiTheme}>
              <SnackbarProvider>
                <Notifier />
                <CssBaseline />
                <Root />
              </SnackbarProvider>
            </ThemeProvider>
          </>
        )}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
  redirectTo: state.redirect.redirectTo,
  forceRedirect: state.redirect.force,
});

export default connect(mapStateToProps, { initRedirect: initRedirectAction })(App);
