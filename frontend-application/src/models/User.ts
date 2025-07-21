export interface Address {
    street: string;
    number: string;
    city: string;
    postalCode: string;
};

export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: "Admin" | "User";
    status: "Active" | "Inactive";
    address: Address;
    profilePicture?: URL | null | string;
}