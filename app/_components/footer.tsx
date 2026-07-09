export const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-[#FAFAFA] w-full justify-around flex items-center">
      <div className="w-full h-[200px] flex items-center justify-around">
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-row gap-2 ">
            <img src="/icons/film.svg" alt="film" width={16} height={16} />
            <p className="font-bold -italic">Movie Z</p>
          </div>
          <p className="text-sm font-normal">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div>
          <div className="flex flex-col ">
            <p>Contact Information</p>
            <div className="flex flex-row items-center  gap-2">
              <img
                src="/icons/mail.png"
                alt="mail"
                className="w-[14px] h-[13px]"
              />
              <p className="cursor-pointer">
                Email: <br />
                support@movieZ.com
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <img
                src="/icons/contact.png"
                alt="contact"
                className="w-[14px] h-[13px]"
              />
              <p>
                Phone: <br />
                +976 (11) 123-4567
              </p>
            </div>
          </div>
          <div>
            <p>Follow us</p>
            <p className="cursor-pointer flex gap-3">
              Facebook <span>Instagram </span>Twitter
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
