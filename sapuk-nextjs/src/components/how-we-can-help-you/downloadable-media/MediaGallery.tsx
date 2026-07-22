import Image from "next/image";
import Link from "next/link";
import { mediaItems } from "./media-data";

export default function MediaGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mediaItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="relative w-full max-w-[300px] aspect-square mb-4 mx-auto">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow object-cover"
              priority
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">{item.alt}</h3>
          <Link
            href={item.src}
            download={item.downloadName}
            target="_blank"
            className="bg-violet-600 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded-full inline-block transition-colors text-sm"
          >
            Download
          </Link>
        </div>
      ))}
    </div>
  );
}
