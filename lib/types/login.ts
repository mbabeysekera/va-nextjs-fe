type UserRole = "ADMIN" | "USER" | "MODERATOR";

interface LoginResponse {
  status: ResponseStatus;
  full_name: string;
  id: number;
  role: UserRole;
  access_token: string;
  time: Date;
}

interface UserRequiredFields {
  full_name: string;
  id: number;
  role: UserRole;
}

interface AuthErrorResponse {
  status: number;
  message: string;
}
