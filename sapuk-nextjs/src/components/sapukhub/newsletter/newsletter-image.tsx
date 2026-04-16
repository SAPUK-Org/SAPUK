import Image from "next/image";

export default function NewsletterImage() {
  return (
    <div className="relative aspect-[4/3] sm:aspect-square w-full max-w-sm sm:max-w-md mx-auto transform hover:scale-[1.02] sm:hover:scale-105 transition duration-300">
      <Image
        src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwOQBw1hD8NQwMH653xlI4dYPbUV9vmJRzgcES"
        alt="Newsletter signup"
        fill
        className="object-cover rounded-2xl shadow-2xl"
        priority
      />
    </div>
  );
}
