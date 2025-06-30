export interface User {
    email: string;
    role: 'employee' | 'manager';
    username: string;
}

export interface AuthContextTypeProps {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export type Role = 'employee' | 'manager';

export type Position =
    | 'Software Developer'
    | 'Data Analyst'
    | 'QA Engineer'
    | 'Designer'
    | 'Manager';
