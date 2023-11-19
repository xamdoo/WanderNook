import { FilterProps, PropertyProps } from "@/types";

export async function fetchProperties(filters: FilterProps){
    const { location, checkin, checkout, adults } = filters
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkin}&checkout=${checkout}&adults=${adults}`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
            'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const dataArray = data.results;

        const properties = dataArray.slice(0, 10)

        return properties;
    } catch (error) {
        console.error(error);
    }

}

export const generateImageURL = (property: PropertyProps, index = 0) => {
    if (!property.images || !Array.isArray(property.images) || property.images.length === 0) return '';
    
    const selectedImage = property.images[index];
    const imageURL = `${selectedImage}`;

    return imageURL;
};


export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    return newPathname;
};
    


