import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    email: string;
    serviceInterest: ServiceType;
    message: string;
    timestamp: bigint;
    phone: string;
}
export enum ServiceType {
    entertainment = "entertainment",
    security = "security",
    networking = "networking",
    climateControl = "climateControl",
    lighting = "lighting",
    energyManagement = "energyManagement"
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    submitContactForm(name: string, email: string, phone: string, message: string, serviceInterest: ServiceType): Promise<void>;
}
