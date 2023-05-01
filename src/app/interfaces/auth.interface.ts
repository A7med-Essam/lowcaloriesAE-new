export interface loginResponse {
  id: number;
  role: string;
  first_name: string;
  last_name: string;
  type: string;
  gender: string;
  birthday: Date;
  email: string;
  height: string;
  Weight: string;
  phone_number: string;
  second_phone_number: string;
  land_line: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  emirate_id: number;
  area: string;
  address: string;
  floor: string;
  flat_number: string;
  access_token: string;
  image: null;
  cids: any[];
}

export interface signInData {
  email: string;
  password: string;
}
