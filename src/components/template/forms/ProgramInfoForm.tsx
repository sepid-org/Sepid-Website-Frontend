import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import UploadImage from 'components/molecules/UploadImage';
import React, { FC } from 'react';

import { ProgramType } from 'types/models';

type ProgramInfoFormPropsType = {
  data: Partial<ProgramType>;
  setData: any;
  showCoverImage?: boolean;
}

const ProgramInfoForm: FC<ProgramInfoFormPropsType> = ({
  data,
  setData,
  showCoverImage = false,
}) => {

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const toggleValue = (name: string) => {
    setData(properties => ({
      ...properties,
      [name]: !properties[name],
    }));
  }

  console.log(data)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          value={data.name}
          fullWidth
          variant='outlined'
          label={'نام'}
          name='name'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6} alignItems={'stretch'} justifyContent={'stretch'}>
        <UploadImage showImageSelf={showCoverImage} file={data.cover_page} setFile={(file) => setData(properties => ({ ...properties, cover_page: file }))} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={data.description}
          variant='outlined'
          label={'توضیحات کارگاه'}
          name='description'
          onChange={putData}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>وضعیت گروه</InputLabel>
          <Select
            value={data.event_type}
            onChange={(event) => {
              setData(data => ({
                ...data,
                event_type: event.target.value,
                team_size: null,
              }))
            }}
            name='event_type'
            label='وضعیت گروه'>
            <MenuItem value={'Individual'}>{'انفرادی'}</MenuItem>
            <MenuItem value={'Team'}>{'گروهی'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        {data.event_type === 'Team' &&
          <TextField
            value={data.team_size}
            fullWidth
            variant='outlined'
            label={'تعداد نفرات هر گروه'}
            name='team_size'
            onChange={putData}
          />
        }
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>وضعیت گروه</InputLabel>
          <Select
            value={data.audience_type}
            onChange={putData}
            name='audience_type'
            label='وضعیت مخاطبین'>
            <MenuItem value={'IndiviAllAlldual'}>{'همگانی'}</MenuItem>
            <MenuItem value={'Student'}>{'دانش‌آموزی'}</MenuItem>
            <MenuItem value={'Academic'}>{'دانش‌جویی'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          value={data.maximum_participant}
          fullWidth
          variant='outlined'
          label={'حداکثر ظرفیت دوره'}
          name='maximum_participant'
          onChange={putData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='is_active'
          checked={data.is_active}
          onChange={() => toggleValue('is_active')}
          control={<Switch color="primary" />}
          label="فعال بودن ورود به کارگاه:"
          labelPlacement='start'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='accessible_after_closure'
          checked={data.accessible_after_closure}
          onChange={() => toggleValue('accessible_after_closure')}
          control={<Switch color="primary" />}
          label="قابل مشاهده بودن بعد از اتمام دوره:"
          labelPlacement='start'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          name='is_visible'
          checked={data.is_visible}
          onChange={() => toggleValue('is_visible')}
          control={<Switch color="primary" />}
          label="قابل مشاهده برای کاربران:"
          labelPlacement='start'
        />
      </Grid>
    </Grid>
  );
}

export default ProgramInfoForm;