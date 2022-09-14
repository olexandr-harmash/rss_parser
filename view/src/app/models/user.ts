export interface IUserRegister {
  email: string;
  password: string;
  name: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}
