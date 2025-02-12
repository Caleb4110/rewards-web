export interface Auth0User {
  name: string;
  nickname: string;
  phone_number: string | undefined;
  phone_verified: boolean | undefined;
  email: string | undefined;
  email_verified: boolean | undefined;
  picture: string;
  updated_at: string;
  user_id: string;
  user_metadata: {
    cafe_name: string | undefined;
    reward_freq: number | undefined;
    dob: string | undefined;
    suburb: string | undefined;
  };
}
