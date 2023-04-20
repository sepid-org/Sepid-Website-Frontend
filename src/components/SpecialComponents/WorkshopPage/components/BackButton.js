import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from '../../../../containers/Workshop';
import {
  goBackwardAction,
  mentorMoveBackwardAction,
} from '../../../../redux/slices/currentState';

function BackButton({ inwardEdges = [], goBackward, mentorMoveBackward }) {
  const { isMentor, teamId } = useContext(StatePageContext);

  if (inwardEdges.length === 0) {
    return <></>;
  }

  const backEdge = inwardEdges[0];

  const handleClick = () => {
    if (isMentor) {
      mentorMoveBackward({
        id: backEdge.id,
        teamId,
      });
    } else {
      if (backEdge.is_back_enabled) {
        goBackward({
          id: inwardEdges[0].id,
          teamId,
        });
      }
    }
  };

  return (
    <Button disabled={!backEdge.is_back_enabled} fullWidth variant="outlined" color="primary" onClick={handleClick}>
      قبلی
    </Button>
  );
}

export default connect(null, {
  goBackward: goBackwardAction,
  mentorMoveBackward: mentorMoveBackwardAction,
})(BackButton);
