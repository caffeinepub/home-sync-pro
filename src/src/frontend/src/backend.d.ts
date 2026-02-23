import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactInquiry {
    name: string;
    email: string;
    serviceInterest: ServiceType;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum ServiceType {
    entertainment = "entertainment",
    security = "security",
    networking = "networking",
    climateControl = "climateControl",
    lighting = "lighting",
    energyManagement = "energyManagement"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllInquiries(): Promise<Array<ContactInquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchInquiries(searchTerm: string): Promise<Array<ContactInquiry>>;
    submitContactInquiry(name: string, email: string, phone: string, message: string, serviceInterest: ServiceType): Promise<void>;
}
