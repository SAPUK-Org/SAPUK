import Image from "next/image";
import Link from "next/link";

export default function FeaturedContent() {
  return (
    <section className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center items-center">
          <Link
            href="http://www.danisace.com"
            target="_blank"
            className="block w-full"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <Image
                src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwdo0eWUJbL4gc3lW6mErD8QxRv72fCtPpujIJ"
                alt="Dani's Ace Blog"
                fill
                style={{ objectFit: "contain" }}
                className="hover:opacity-90 transition-opacity"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-900 max-w-xl">
            Our founder&apos;s blog, if you click the image will direct you there.
            <br />
            Began in 2016 to guide individuals on numerous topics.
            <br />
            www.danisace.com
          </h1>
        </div>
      </div>
    </section>
  );
}
