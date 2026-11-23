export interface ContaStorage {
  name: string;
  email: string;
  password: string;
  accountNumber: string;
  balance: number;
  logged: boolean;
}

export interface TransacaoStorage {
  id: string;
  date: string;
  type: string;
  transferValue: number;
  description: string;
}
