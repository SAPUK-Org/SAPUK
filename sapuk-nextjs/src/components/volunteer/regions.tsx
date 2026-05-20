import Link from "next/link";

export default function RegionsSection() {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        We cover the following areas:
      </h2>
      <ul className="list-disc list-inside text-zinc-800 space-y-1.5 flex flex-wrap gap-2 pr-4">
        <li>Blackburn</li>
        <li>Stafford</li>
        <li>
          <Link
            href="/how-we-can-help-you/local/dewsbury"
            className="text-link hover:underline"
          >
            Dewsbury
          </Link>
        </li>
        <li>Somerset</li>
        <li>Gwynedd</li>
        <li>Rommey Marsh</li>
        <li>Aberdeen</li>
        <li>Kent</li>
        <li>Dorset</li>
        <li>Cheshire</li>
        <li>West Lothian</li>
        <li>Liverpool</li>
        <li>Peterborough</li>
        <li>Nuneaton</li>
        <li>Middlesbrough</li>
        <li>Nelson</li>
        <li>Harrow</li>
        <li>Swansea</li>
        <li>Bolton</li>
        <li>Orpington</li>
        <li>Chelmsford</li>
        <li>Darwen</li>
        <li>Manchester</li>
        <li>Colchester</li>
        <li>Stoke on Trent</li>
        <li>London</li>
        <li>Newark</li>
        <li>Greenford</li>
        <li>Derby</li>
        <li>Halifax</li>
        <li>Accrington</li>
        <li>Hull</li>
        <li>Sawbridgeworth</li>
        <li>Basingstoke</li>
      </ul>
    </>
  );
}
