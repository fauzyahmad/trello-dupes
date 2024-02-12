export interface Board {
  columns: Map<StatusColumn, Column>;

}

export interface Column {
  id: StatusColumn;
  tickets: Ticket[];
}

export interface Ticket {
  $id: string;
  $createdAt?: string;
  title: string;
  description: string;
  status: StatusColumn;
}

export type StatusColumn = "open" | "in-progress" | "completed";

export interface User {
  $id: string;
  $createdAt?: string;
  $updatedAt?: string;
  name: string;
  hashOptions?: object;
  registration: string;
  status: boolean;
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  accessedAt: string;
}
