import { PropertyProps } from '@/types'
import { generateImageURL } from '@/utils';
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment } from 'react'



interface PropertyDetailProps {
    isOpen: boolean;
    closeCard: ()=> void;
    property: PropertyProps
}

function PropertyDetail({ isOpen, closeCard, property}: PropertyDetailProps) {

    const keysToRender = [
        'id',
        'name',
        'bathrooms',
        'bedrooms',
        'beds',
        'city',
        'persons',
        'type',
        'address'
    ];

    return (
        <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeCard}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                    <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-out duration-300'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                    >
                    <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                        <button
                        type='button'
                        className='absolute top-2 right-2 z-10 w-fit p-2  bg-primary-blue-100  rounded-full'
                        onClick={closeCard}
                        >
                        <Image
                            src='/close.svg'
                            alt='close'
                            width={20}
                            height={20}
                            className='object-contain'
                        />
                        </button>

                        <div className='flex-1 flex flex-col gap-3'>
                        <div className='relative w-full h-40 bg-cover bg-center rounded-lg'>
                            <Image src={generateImageURL(property, 1)} alt='property' fill priority className='object-contain' />
                        </div>

                        <div className='flex gap-3'>
                            <div className='flex-1 relative w-full h-24  bg-primary-blue-100 rounded-lg'>
                            <Image src={generateImageURL(property, 2)} alt='property type' fill priority className='object-contain' />
                            </div>
                            <div className='flex-1 relative w-full h-24  bg-primary-blue-100 rounded-lg'>
                            <Image src={generateImageURL(property, 3)} alt='property type' fill priority className='object-contain' />
                            </div>
                            <div className='flex-1 relative w-full h-24  bg-primary-blue-100 rounded-lg'>
                            <Image  src={generateImageURL(property, 4)} alt='property type' fill priority className='object-contain' />
                            </div>
                        </div>
                        </div>

                        <div className='flex-1 flex flex-col gap-2'>
                        <h2 className='font-semibold text-xl capitalize'>
                            {property.name}
                        </h2>

                        <div className='mt-3 flex flex-wrap gap-4'>
                        {keysToRender.map((key) => (
                                <div className='flex justify-between gap-5 w-full text-right' key={key}>
                                    <h4 className='text-grey capitalize'>{key.split('_').join(' ')}</h4>
                                    <p className='text-black-100 font-semibold'>
                                        {typeof property[key] === 'object' ? (
                                            <div>
                                                <p>Rate: {property[key].rate}</p>
                                                <p>Currency: {property[key].currency}</p>
                                                {property[key].total && <p>Total: {property[key].total}</p>}
                                            </div>
                                        ) : (
                                            property[key]
                                        )}
                                    </p>
                                </div>
                            ))}

                        </div>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition>
        </>
    )
}

export default PropertyDetail
