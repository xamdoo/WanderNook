import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
}


export interface PriceProps {
    rate: number;
    currency: string;
    total?: number;
}

export interface PropertyProps {
    id: number;
    deeplink: string;
    name:string;
    bathrooms: number;
    bedrooms: number;
    beds: number;
    city:string;
    images:string;
    persons: number;
    price?: PriceProps;
    type:string;
    address: string;
    [key: string]: any;
}

export interface FilterProps {
    location: string;
    checkin: Date;
    checkout: Date;
    adults: number;
    limit: number;
}

export interface HomeProps {
    searchParams: FilterProps;
}

export interface OptionProps {
    title: string;
    value: string;

}

export interface filterProps {
    title: string;
    options: OptionProps[];
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}