import Image from "next/image";
interface Props {
  videoSource: string;
  placeholderImage: string;
}

const BackgroundVideoNavbar = ({ videoSource, placeholderImage }: Props) => {
  return (
    <div className="hidden md:block">
      <Image
        src={placeholderImage}
        className="w-full h-full object-cover absolute"
        alt="placeholder image"
        width={0}
        height={0}
        sizes="100vw"
        quality={100}
        priority={true}
      />

      <video
        loop
        muted
        playsInline
        autoPlay
        preload="metadata"
        className="w-full h-full object-cover  absolute"
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideoNavbar;
