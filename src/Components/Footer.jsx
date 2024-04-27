export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-[14px]">
            <p>Email: contact@busbooking.com</p>
            <p>123 Main Street, City, Country</p>
          </div>
          <div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1">
                <span>
                  <a href="#" className="text-white hover:text-gray-400">
                    About Us
                  </a>
                </span>
                <span>
                  <a href="#" className="text-white hover:text-gray-400">
                    Terms of Service
                  </a>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span>
                  <a href="#" className="text-white hover:text-gray-400">
                    Privacy Policy
                  </a>
                </span>
                <span>
                  <a href="#" className="text-white hover:text-gray-400">
                    Follow Us
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
