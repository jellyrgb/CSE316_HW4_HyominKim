// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This file contains the types used in the application.
export interface Facility {
    id: number;
    name: string;
    description: string;
    available_days: string;
    min_capacity: number;
    max_capacity: number;
    location: string;
    only_for_suny: boolean;
    image_source: string;
}

export interface Reservation {
    id: number;
    reservation_date: string;
    user_number: number;
    is_suny_korea: boolean;
    purpose: string;
    facility_id: number;
    user_name: string;
}

export interface ReservedItemInterface {
    reservation_date: string;
    user_number: number;
    is_suny_korea: boolean;
    purpose: string;
    facility_id: number;
    user_name: string;

    facility_image_source: string;
    facility_name: string;
    facility_location: string;
    facility_only_for_suny: boolean;
}