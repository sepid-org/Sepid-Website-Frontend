import { Card, Chip, Grid, Typography, Skeleton } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React, { FC } from 'react';

const EventSkeletonCard: FC = () => {
  return (
      <Grid
        container
        alignItems='stretch'
        sx={(theme) => ({
          height: '100%',
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
          },
        })}>
        <Grid sx={{ padding: 0 }} item container justifyContent="center" alignItems="center" xs={12} md={5}>
            <Skeleton variant="rectangular" width="100%" height={310} />
        </Grid>
        
        <Grid item container xs={12} md={7}
          direction="column"
          justifyContent="space-between" spacing={2}
          sx={(theme) => ({
            padding: theme.spacing(2),
            paddingLeft: theme.spacing(2),
          })}>
          <Grid item>
            <Skeleton width="50%" />
          </Grid>
          <Grid item>
            <Skeleton width="80%" />
            <Skeleton width="80%" />
            <Skeleton width="80%" />
            <Skeleton width="80%" />
            <Skeleton width="80%" />
          </Grid>
          <Grid item>
            <Skeleton width="40%" />
          </Grid>
          <Grid item>
            <Skeleton width="80%" />
          </Grid>
        </Grid>
      </Grid>
  );
};

export default EventSkeletonCard;