import { ProgramType } from 'types/models';
import { ManageContentServiceApi } from './ManageContentServiceApiSlice';

export const ProgramSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getPrograms: builder.query<ProgramType[], { partyUuid: string | undefined, pageNumber?: number }>({
      providesTags:['programs'],
      query: ({ partyUuid, pageNumber = 1 }) => `fsm/event/?party=${partyUuid}&page=${pageNumber}&is_private=False`,
      transformResponse: (respons: any): ProgramType[] => {
        return respons.results;
      },
    })
  })
});

export const { useGetProgramsQuery } = ProgramSlice;