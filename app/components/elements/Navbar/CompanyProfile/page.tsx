import Image from 'next/image'


const CompanyProfile = () => {
    return (

        <div className="flex flex-shrink-0 items-center">
            <Image
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg"
                width={30}
                height={30}
                className="block h-8 w-auto lg:hidden"

            />
        </div>
    )
}

export default CompanyProfile;