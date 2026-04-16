import Image from "next/image";
import { SocialIcon } from "react-social-icons";

type SemicolonStudioCardProps = {
  name: string;
  location?: string;
  description?: React.ReactNode;
  imageSrc: string;
  socialLinks: Array<{
    network: string;
    url: string;
  }>;
};

export default function SemicolonStudioCard({
  name,
  location,
  description,
  imageSrc,
  socialLinks,
}: SemicolonStudioCardProps) {
  return (
    <div className="mb-8 text-center space-y-3">
      <Image
        src={imageSrc}
        alt={name}
        width={150}
        height={150}
        className="mx-auto rounded-full mb-2"
        priority
      />
      <h4 className="font-light text-xl mb-1">{name}</h4>
      {location && <p className="mb-2">{location}</p>}
      {description && <div className="mb-2">{description}</div>}
      <div className="flex justify-center gap-2">
        {socialLinks.map((link) => (
          <SocialIcon
            key={link.url}
            network={link.network}
            url={link.url}
            bgColor="#2695d6"
            className="hover:scale-110 transition-transform duration-300"
            style={{ height: 40, width: 40 }}
          />
        ))}
      </div>
    </div>
  );
}

