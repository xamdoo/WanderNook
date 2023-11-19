"use client";
import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'

function Hero() {
    const handleScroll = () => {

    }
    return (
        <div className='hero'>
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    Discover, book, and experience unique stays.
                </h1>

                <p className="hero__subtitle">
                Simplify your travel adventure with our seamless booking process.
                </p>

                <CustomButton
                    title="Explore Airbnb"
                    containerStyles="bg-orange-700 text-white rounded-full mt-10"
                    handleClick={handleScroll}
                />
            </div>
            <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/hero.png" alt="hero" fill className="object-contain" />
                </div>
            </div>
        </div>
    )
}

export default Hero
