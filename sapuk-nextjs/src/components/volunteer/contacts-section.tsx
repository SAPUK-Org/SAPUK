import Image from "next/image";

export default function ContactsSection() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
      <div className="flex justify-center">
        <Image
          src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwNk3KRTQLGyq2FvWcOJZQXkdB7Eis9A0ehKwI"
          alt="thank you - SAPUK"
          width={300}
          height={300}
          className="w-full max-w-[300px] mx-auto lg:mx-0 pointer-events-none select-none"
          priority
        />
      </div>

      <div className="lg:col-span-2 flex flex-col gap-4 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold">
          Key People Services Contacts:
        </h2>
        <ul className="list-disc list-inside text-zinc-800">
          <li>Danielle Shaw (Founder) - danielle@suicideapuk.co.uk</li>
          <li>
            Jordeey O&apos;Hanlon (People Services Coordinator) -
            jordeey@suicideapuk.co.uk
          </li>
          <li>
            Helena, Tom, Louise and the team (People Services) -
            hr@suicideapuk.co.uk
          </li>
          <li>
            Sophia, Louise and the team (Recruitment) -
            volunteer@suicideapuk.co.uk
          </li>
        </ul>
      </div>
    </div>
  );
}
