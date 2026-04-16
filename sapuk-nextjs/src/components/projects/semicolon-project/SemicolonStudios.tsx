import SemicolonStudioCard from "./SemicolonStudioCard";

export default function SemicolonStudios() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
      <div>
        <SemicolonStudioCard
          name="Ye Olde Ink"
          location="Shropshire, Oswestry"
          imageSrc="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwlY4twFYAZb5Xryae7tWf2Spogm6i8CYUDB0P"
          socialLinks={[
            {
              network: "facebook",
              url: "https://www.facebook.com/yeoldeinkinn",
            },
          ]}
        />

        <SemicolonStudioCard
          name="Black Sheep Tattoo"
          imageSrc="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwUfbqIJetinpwI7DH5JGrocqOKWEvkyB38hLX"
          description={
            <>
              <div className="mb-1">Welshpool</div>
              <p className="mb-2">
                Welshpool, Powys, Wales
                <br />
                Formally glow, Jennie has been participating since we started
                the project;
              </p>
            </>
          }
          socialLinks={[
            {
              network: "facebook",
              url: "https://www.facebook.com/profile.php?id=61557431706777",
            },
          ]}
        />
      </div>

      <div>
        <SemicolonStudioCard
          name="Leeds Ink & Beauty Parlour"
          location="Leeds, West Yorkshire"
          imageSrc="https://dju754gknh.ufs.sh/f/Uv1WD6etinpw17Jwp8gKR0g23FTfWvJU47naCq9ltMSxu8ho"
          socialLinks={[
            {
              network: "facebook",
              url: "https://www.facebook.com/leedsinkandbeauty1",
            },
          ]}
        />

        <SemicolonStudioCard
          name="Ancient Art"
          imageSrc="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwqg0M9L5N5weoZT7nX0E83VGLBvSPJhs94i6C"
          description={
            <p className="mb-2">
              Uxbridge,
              <br />
              Warm, family run studio;
            </p>
          }
          socialLinks={[
            {
              network: "facebook",
              url: "https://www.facebook.com/AncientArtTattoos",
            },
          ]}
        />
      </div>

      <div>
        <SemicolonStudioCard
          name="Indelible Ink"
          location="Thornton Cleaveleys, Blackpool"
          imageSrc="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwkAMV1GPjBYWZ1mXwgkcO3AKat4oGFrMNz6f8"
          socialLinks={[
            {
              network: "facebook",
              url: "https://www.facebook.com/indelibleinkuk",
            },
            {
              network: "instagram",
              url: "https://www.instagram.com/indelible_ink_tattoos/?hl=en",
            },
          ]}
        />

        <SemicolonStudioCard
          name="Ace of Hearts"
          description={
            <p className="mb-2">Father & Daughter duo, really welcoming;</p>
          }
          imageSrc="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwYGRYqIEKZWV7EfTUcFQBkb96LShOxA480Czq"
          socialLinks={[
            {
              network: "facebook",
              url: "https://www.facebook.com/aceofheartstattoostudio",
            },
          ]}
        />
      </div>
    </div>
  );
}

