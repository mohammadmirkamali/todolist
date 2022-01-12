import { ApiResponse } from 'apisauce';

export type ResType<DataType> = ApiResponse<{
  data: DataType;
  message: string;
  status: string;
}>;
