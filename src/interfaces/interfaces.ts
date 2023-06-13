import { string } from "yup";

export interface PersonResquet {
    name: string | null;
    surname: string | null;
    documentNumber: number | null;
    documentType: string | null;
    birthdate: Date | null;
}

export interface PersonResponse {
    id: number | null;
    name: string | null;
    surname: string | null;
    document_number: number | null;
    document_type: string | null;
    birthdate: string | null;
}

export interface FilterRequest {
    name?: string;
    documentType?: string;
}

export interface FormikFindPerson {
    name: string;
    documentType: string;
}

export interface FormPerson {
    name: string;
    surname: string
    document: number
    documentType: string;
    birthdate: Date | null;
}