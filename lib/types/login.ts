interface LoginResponse {
  status: ResponseStatus;
  access_token: string;
  time: Date;
}

interface AuthErrorResponse {
  status: number;
  message: string;
}
