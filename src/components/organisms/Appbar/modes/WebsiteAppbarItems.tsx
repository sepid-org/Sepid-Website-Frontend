import React from 'react';
import WebsiteLogo from 'components/atoms/logos/WebsiteLogo';

const WebsiteAppbarItems = () => {
  const websiteLogo = <WebsiteLogo />;

  const desktopLeftItems = [];
  const desktopRightItems = [websiteLogo];
  const mobileRightItems = [websiteLogo];

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems: [],
    mobileRightItems,
    mobileMenuListItems: [],
  };
};

export default WebsiteAppbarItems;