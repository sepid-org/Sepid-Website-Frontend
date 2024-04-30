import { createApi } from '@reduxjs/toolkit/query/react'
import CustomBaseQuery from './CustomBaseQuery';
import { MCS_URL } from 'configs/Constants';

export const ManageContentServiceApi = createApi({
  reducerPath: 'manage-content-service',
  tagTypes: ['program', 'programs', 'fsm', 'fsms'],
  baseQuery: CustomBaseQuery({ baseUrl: MCS_URL + 'api/' }),
  endpoints: build => ({
  })
})
