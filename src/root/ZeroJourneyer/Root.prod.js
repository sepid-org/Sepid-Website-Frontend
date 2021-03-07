import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/zero-journeyer" component={ZeroJourneyer} />
      </Switch>
    </>
  );
};
export default Root;
