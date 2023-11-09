import {
  Workshop, 
  ProgramType, 
  Invitation, 
  RegistrationReceipt, 
  Widget, 
  Team, 
  Request, 
  RegistrationFormType,
  Merchandise, 
  UploadedFile,
  Mentor
} from '../models'

export type InitialState = {
  isFetching: boolean,
  getWorkshopsLoading: boolean,
  workshops: Workshop[],
  workshopsCount: number,
  events: ProgramType[],
  event: Event,
  registeredEvents: ProgramType[],
  uploadedFile: UploadedFile,
  myInvitations: Invitation[],
  teamInvitations: Invitation[],
  allRegistrationReceipts: RegistrationReceipt[],
  registrationReceipt: RegistrationReceipt,
  widgets: Widget,
  allEventTeams: Team[],
  teamsRequests: object,
  myWorkshops: Workshop[],
  registrationForm: RegistrationFormType,
  merchandise: Merchandise,
  discountedPrice: Number,
  team: Team,
  certificateLink: String,
  playerId: Object,
  teamCurrentState: { uuid: string, paperId: string, currentStateName: string, teamEnterTimeToState: string },
};

