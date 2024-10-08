import React, { FC, Fragment, useState } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';

import HelpDialog from 'commons/components/organisms/dialogs/FSMStateHelpDialog';

type WidgetHintPropsType = {
  hints: any[],
}

const WidgetHint: FC<WidgetHintPropsType> = ({ hints }) => {
  const [openViewHintDialog, setViewHintDialog] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <Fragment>
      <Box sx={{ position: 'absolute', right: -10, top: -18, rotate: '-24deg', zIndex: 1 }}>
        <Tooltip arrow title='راهنمایی'>
          <IconButton
            sx={{
              opacity: 0.4,
              ":hover": { opacity: 1 },
            }}
            disableRipple
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            onClick={() => { setViewHintDialog(true); }}>
            <img width={40} src={process.env.PUBLIC_URL + ((isHover || openViewHintDialog) ? '/images/idea-on.png' : '/images/idea-off.png')} />
          </IconButton>
        </Tooltip>
      </Box>
      <HelpDialog
        open={openViewHintDialog}
        handleClose={() => setViewHintDialog(false)}
        helps={hints}
      />
    </Fragment >
  );
};

export default WidgetHint;
