enum ResponseStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
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
