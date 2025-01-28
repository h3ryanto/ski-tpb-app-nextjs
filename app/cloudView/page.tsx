import CldImage from "@/components/ui/cloudinary";


const Views = () => {
    return (
        <CldImage
            src="https://res.cloudinary.com/h3ry4nt0/image/upload/v1737355668/cld-sample-4.jpg"
            width="200"
            height="150"
            alt="Description of my image"
            sizes="100vw"
        />
    )
}

export default Views