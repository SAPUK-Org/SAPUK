import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-xl">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwkgSFOAPjBYWZ1mXwgkcO3AKat4oGFrMNz6f8"
            alt="Community Banner"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
