import Image from "next/image";

export default function FoodPantrySection() {
  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto px-4">
      <Image
        src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwqODGwpV5N5weoZT7nX0E83VGLBvSPJhs94i6"
        alt="Food Pantry"
        width={400}
        height={400}
        className="w-full h-auto object-cover rounded-lg shadow-lg"
        priority
      />
    </div>
  );
}
