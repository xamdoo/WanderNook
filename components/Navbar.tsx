import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

export const Navbar = () => {
    return (
        <header className='w-full  absolute z-10'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
                <Link href='/' className='flex justify-center items-center'>
                    <Image
                        src='/logo.png'
                        alt='logo'
                        width={160}
                        height={18}
                        className='object-contain'
                    />
                </Link>

                <CustomButton
                    title='Sign in'
                    btnType='button'
                    containerStyles='bg-orange-700 text-white rounded-full min-w-[10px]'
                />
            </nav>
        </header>
    )
}


