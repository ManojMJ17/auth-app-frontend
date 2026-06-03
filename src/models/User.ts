export interface User {
  id: number;
  name?: string;
  email: string;
  image?: string;
  enable: boolean;
  provider: string;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
}
