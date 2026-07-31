export const Footer = () => {
  return (
    <footer className="bg-indigo-700 dark:bg-indigo-950 w-full text-[#FAFAFA] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/film.svg" alt="film" width={18} height={18} />
            <p className="font-bold text-lg">Movie Z</p>
          </div>
          <p className="text-xs text-indigo-200">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* Contacts & Socials */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-indigo-100">Contact Information</p>
            <div className="flex items-center gap-2">
              <img src="/icons/mail.png" alt="mail" className="w-3.5 h-3.5" />
              <p className="text-xs">
                Email: support@movieZ.com
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icons/contact.png" alt="contact" className="w-3.5 h-3.5" />
              <p className="text-xs">
                Phone: +976 (11) 123-4567
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-indigo-100">Follow us</p>
            <div className="flex gap-3 text-xs text-indigo-200">
              <span className="hover:underline cursor-pointer">Facebook</span>
              <span className="hover:underline cursor-pointer">Instagram</span>
              <span className="hover:underline cursor-pointer">Twitter</span>
              <span className="hover:underline cursor-pointer">Youtube</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};