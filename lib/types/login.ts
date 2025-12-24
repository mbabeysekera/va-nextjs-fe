enum ResponseStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

interface LoginResponse {
  status: ResponseStatus;
  access_token: string;
  time: Date;
}

interface StdErrorResponse {
  status: ResponseStatus;
  message: string;
  error_id: string;
  time: Date;
}

interface StdSuccessResponse {
  status: ResponseStatus;
  message: string;
  error_id: string;
  time: Date;
}

interface AuthErrorResponse {
  status: number;
  message: string;
}
