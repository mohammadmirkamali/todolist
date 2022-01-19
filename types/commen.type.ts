import { ApiResponse } from 'apisauce';

export type ResType = ApiResponse<{
  data: any; // eslint-disable-line
  workshops: any; // eslint-disable-line
  message: string;
  status: string;
}>;
