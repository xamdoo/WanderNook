"use client";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";



function SearchBar() {
    const [location, setLocation] = useState('')
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [person, setPerson] = useState();
    const router = useRouter();
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };
    
    const handleDateChange = (date, dateType) => {
        if (dateType === 'start') {
            setCheckIn(date);
        } else {
            setCheckOut(date);
        }
    };

    const updateSearchParams = (location: string, checkin: Date, checkout: Date, adults: number)=>{
        const searchParams = new URLSearchParams(window.location.search);
        
        if(location){
            searchParams.set("location", location)
        }else{
            searchParams.delete('location')
        }
        if (checkin) {
            searchParams.set("checkin", formatDate(checkin));
        } else {
            searchParams.delete('checkin');
        }
    
        if (checkout) {
            searchParams.set("checkout", formatDate(checkout));
        } else {
            searchParams.delete('checkout');
        }
    
        if (adults) {
            searchParams.set("adults", adults); 
        } else {
            searchParams.delete('adults');
        }
        
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newUrl)
    
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!location.trim() && !checkIn && !checkOut) {
            return alert("Please fill in the search bar!")
        }

        updateSearchParams(location, checkIn, checkOut, person)
    
    }

    

    return (
        <form className='searchbar ml-2' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <Image
                    src='/city-svg.svg'
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                    alt=''
                />
                <input
                    type='text'
                    name='city'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Antonio..."
                    className='searchbar__input rounded-full'
                /> 
            </div>
            
            <div className='searchbar__item flex ml-10 gap-3 text-gray-800'>
                <div className="flex flex-col">
                    <label className="font-bold">Check-in:</label>
                    <DatePicker
                        selected={checkIn}
                        onChange={(date) => handleDateChange(date, 'start')}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Start"
                    />
                </div>
            
                <div className=" flex flex-col">
                    <label className="font-semibold">Check-out:</label>
                    <DatePicker
                        selected={checkOut}
                        onChange={(date) => handleDateChange(date, 'end')}
                        selectsEnd
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={checkIn}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="End"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Persons:</label>
                    <input
                        type="number"
                        value={person}
                        onChange={(e) => setPerson(parseInt(e.target.value, 10))}
                        placeholder="Number"
                        className='w-20'
                    />
                </div>
            </div>

            <button type="submit" className="object-contain max-sm:hidden ml-6 mt-2"> 
                <Image 
                    src={"/search.svg"} 
                    alt={"magnifying glass"}
                    width={30}
                    height={20}
                /> 
            </button>

        </form>
    )
}

export default SearchBar
