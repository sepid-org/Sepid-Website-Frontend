import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';
import { useEnterFSMMutation } from 'redux/features/program/PlayerSlice';

function EnterFSMPasswordDialog({
  open,
  handleClose,
  programId,
  fsmId,
}) {
  const navigate = useNavigate();
  const t = useTranslate();
  const [password, setPassword] = useState('');
  const [enterFSM, result] = useEnterFSMMutation();

  useEffect(() => {
    if (result.isSuccess)
      navigate(`fsm/${fsmId}/`)
  }, [result])

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        برای ورود به این کارگاه باید رمز آن را وارد کنید!
      </DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          fullWidth
          autoFocus
          label={t('رمز')}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => enterFSM({ fsmId, password })}>
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EnterFSMPasswordDialog;