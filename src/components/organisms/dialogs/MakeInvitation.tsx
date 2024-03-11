import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import isNumber from 'utils/validators/isNumber';

type MakeInvitationDialogPropsType = {
  inviteSomeone: any;
  handleClose: any;
  invitee?: string;
  teamId: string;
  open: boolean;
}

const MakeInvitationDialog: FC<MakeInvitationDialogPropsType> = ({ inviteSomeone, handleClose, invitee, teamId, open }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const sendInvitation = () => {
    if (!phoneNumber) return;
    inviteSomeone({ teamId, invitee, username: phoneNumber }).then((response) => {
      if (response.type?.endsWith('fulfilled')) {
        handleClose();
      }
    });
    ;
  };

  return (
    <Dialog disableScrollLock maxWidth="sm" open={open} onClose={handleClose}>
      <DialogContent>
        <Typography gutterBottom>
          {'شماره تلفن فرد مورد نظر را وارد کنید.'}
        </Typography>
        <TextField
          fullWidth
          placeholder='مثال: 09123456789'
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => {
            if (isNumber(e.target.value)) {
              setPhoneNumber(e.target.value);
            }
          }}
          inputProps={{ className: 'ltr-input' }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={sendInvitation}>
          {'ارسال دعوت‌نامه'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MakeInvitationDialog;
