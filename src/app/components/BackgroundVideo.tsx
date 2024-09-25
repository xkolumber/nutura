import Image from "next/image";
interface Props {
  videoSource: string;
  placeholderImage: string;
}

const BackgroundVideo = ({ videoSource, placeholderImage }: Props) => {
  return (
    <div>
      <Image
        src={placeholderImage}
        className="w-full h-full object-cover absolute"
        alt="placeholder image"
        width={900}
        height={900}
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 90vw, 90vw"
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

export default BackgroundVideo;
