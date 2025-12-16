enum LoginResponseStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

interface LoginResponse {
  status: LoginResponseStatus;
  access_token: string;
  time: Date;
}

interface StdErrorResponse {
  status: LoginResponseStatus;
  message: string;
  error_id: string;
  time: Date;
}

interface AuthErrorResponse {
  status: number;
  message: string;
}
