import { ListItem } from '@material-ui/core';
import React from 'react';
import AuthItem from './components/AuthItem';
import LogoButton from './components/LogoButton';

export default () => ({
  desktopLeftItems: [<AuthItem />],
  desktopRightItems: [<LogoButton />],
  mobileLeftItems: [<LogoButton />],
  mobileRightItems: [],
  mobileMenuListItems: [
    <ListItem>
      <AuthItem />
    </ListItem>,
  ],
});