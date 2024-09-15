import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  IconButton,
  Tooltip,
  Skeleton,
  Chip,
} from '@mui/material';
import { Lock, Group, Person } from '@mui/icons-material';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import React, { useState, Fragment, FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import EnterFSMPasswordDialog from 'commons/components/organisms/dialogs/EnterFSMPasswordDialog';
import { FSMType, FSMUserPermissions } from 'commons/types/models';
import { useEnterFSMMutation } from 'apps/website-display/redux/features/program/PlayerSlice';

type VerticalFSMCardPropsType = {
  fsm: Partial<FSMType>;
  isLoading?: boolean;
  userPermissions?: FSMUserPermissions;
}

export const FSMVerticalCard: FC<VerticalFSMCardPropsType> = ({
  fsm,
  isLoading = false,
  userPermissions,
}) => {
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const [openPassword, setOpenPassword] = useState(false);
  const [enterFSM, result] = useEnterFSMMutation();

  useEffect(() => {
    if (result.isSuccess)
      navigate(`fsm/${fsm.id}/`)
  }, [result])

  const handleCardClick = () => {
    if (!isLoading && fsm?.is_active) {
      if (fsm?.has_entrance_lock) {
        setOpenPassword(true);
      } else if (fsm.id) {
        enterFSM({ fsmId: fsm.id });
      }
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: 380, // Set a fixed height for consistency
        cursor: fsm?.is_active ? 'pointer' : 'default',
        opacity: fsm?.is_active ? 1 : 0.6,
        transition: 'opacity 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: fsm?.is_active ? 6 : 3,
        },
      }}
      onClick={handleCardClick}
    >
      {isLoading ? (
        <Skeleton
          width='100%'
          height='100%'
          animation="wave"
          variant="rectangular"
        />
      ) : (
        <Fragment>
          {fsm.cover_page && (
            <CardMedia
              component="img"
              sx={{ height: 240, objectFit: 'cover' }}
              image={fsm.cover_page}
              title={fsm.name}
            />
          )}
          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              height: 160, // Fixed height for content area
              padding: 2,
              '&:last-child': { paddingBottom: 2 }, // Override MUI's default padding
            }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Stack direction="row" alignItems="center">
                <Typography component="h2" variant="h4" noWrap sx={{ maxWidth: { xs: '160px', sm: '140px', md: '160px' } }}>
                  {fsm.name}
                </Typography>
                {userPermissions?.is_mentor && (
                  <Tooltip title='ورود به بخش همیاران' arrow>
                    <IconButton
                      component={Link}
                      to={`/program/${programSlug}/fsm/${fsm?.id}/manage/`}
                      onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the button
                      size="small"
                    >
                      <ModeEditTwoToneIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </Stack>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                flexGrow: 1,
              }}
            >
              {fsm.description}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {fsm?.has_entrance_lock && <Lock fontSize="small" />}
              <Chip
                icon={fsm?.fsm_p_type === 'Team' ? <Group /> : <Person />}
                label={fsm?.fsm_p_type === 'Team' ? 'تیمی' : 'فردی'}
                size="small"
                variant="outlined"
              />
            </Stack>
          </CardContent>
        </Fragment>
      )}
      <EnterFSMPasswordDialog
        open={openPassword}
        handleClose={() => setOpenPassword(false)}
        fsmId={fsm?.id}
      />
    </Card>
  );
};

export default FSMVerticalCard;