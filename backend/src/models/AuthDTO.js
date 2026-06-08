export class LoginRequest {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

export class LoginResponse {
  constructor(username, token) {
    this.username = username;
    this.token = token;
  }
}
