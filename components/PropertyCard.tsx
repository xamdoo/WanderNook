"use client";
import Image from "next/image";
import { PropertyProps } from "@/types";
import CustomButton from "./CustomButton";
import { useState } from "react";
import PropertyDetail from "./PropertyDetail";
import { generateImageURL } from "@/utils";


interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard = ({ property }: PropertyCardProps ) => {
  const {
    name,
    beds,
    city,
    persons,
    price,
    deeplink,
  } = property;
  
  const { rate, currency } = price;

  const url = new URL(deeplink);
  const checkinDate = url.searchParams.get('check_in');
  const checkoutDate = url.searchParams.get('check_out');
  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);
  const oneDay = 24 * 60 * 60 * 1000; 
  const stayingDays = Math.round(Math.abs((checkout - checkin) / oneDay));

  const perDayRate = stayingDays !== 0 ? Math.round(rate / stayingDays) : 0;
  const [isOpen, setIsOpen] = useState(false);
  
  
  return (
      <div className="property-card group">
        <div className="property-card__content">
          <h2 className="property-card__content-title">
            {name}
          </h2>
        </div>

        <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
          <span className='self-start text-[14px] leading-[17px] font-semibold text-orange-700 '>{currency == 'USD' ? '$' : currency}</span> 
          {perDayRate}
          <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
        </p>

        <div className='relative w-full h-40 my-3 object-contain'>
          <Image src={generateImageURL(property)} alt='property' fill priority className='object-contain' />
        </div>

        <div className='relative flex w-full mt-2'>
          <div className='flex group-hover:invisible w-full justify-between text-grey'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <Image src='/city-svg.svg' width={20} height={20} alt='city' />
              <p className='text-[14px] leading-[17px]'>
                {city}
              </p>
            </div>
            <div className="property-card__icon">
              <Image src="/beds-svg.svg" width={20} height={20} alt="beds" />
              <p>{beds} bed/s</p>
            </div>
            <div className="property-card__icon">
              <Image src="/people-svg.svg" width={20} height={20} alt="people" />
              <p className="property-card__icon-text">{persons} person/s</p>
            </div>
          </div>

          <div className="property-card__btn-container">
            <CustomButton
              title='View More'
              containerStyles='w-full py-[16px] rounded-full bg-orange-700'
              textStyles='text-white text-[14px] leading-[17px] font-bold'
              rightIcon='/right-arrow.svg'
              handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>

        <PropertyDetail isOpen={isOpen} closeCard={() => setIsOpen(false)} property={property} />
    </div>
    
  )
}

export default PropertyCard
