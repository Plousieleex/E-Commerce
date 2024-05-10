export default function Footer() {
  return (
    <footer>
      <div
        className="flex px-12 md:px-16 lg:px-20 border-y-[1px]"
        style={{ backgroundColor: `var(--surface-50)` }}
      >
        <div className="flex-1 p-6 border-r-[1px]">
          <span className="font-medium text-lg">Company</span>
          <ul className="text-gray-400 text-sm">
            <li className="mt-8">
              <a href="#">About Peak</a>
            </li>
            <li className="mt-4">
              <a href="#">Factories</a>
            </li>
            <li className="mt-4">
              <a href="#">Careers</a>
            </li>
            <li className="mt-4">
              <a href="#">Environmental Initiatives</a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-6 border-r-[1px]">
          <span className="font-medium text-lg">Account</span>
          <ul className="text-gray-400 text-sm">
            <li className="mt-8">
              <a href="#">Manage Account</a>
            </li>
            <li className="mt-4">
              <a href="#">Saved Items</a>
            </li>
            <li className="mt-4">
              <a href="#">My Cart</a>
            </li>
            <li className="mt-4">
              <a href="#">Wishlist</a>
            </li>
            <li className="mt-4">
              <a href="#">Orders & Returns</a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-6 border-r-[1px]">
          <span className="font-medium text-lg">Legal</span>
          <ul className="text-gray-400 text-sm">
            <li className="mt-8">
              <a href="#">Investor Relations</a>
            </li>
            <li className="mt-4">
              <a href="#">Data Privacy</a>
            </li>
            <li className="mt-4">
              <a href="#">Terms of Service</a>
            </li>
            <li className="mt-4">
              <a href="#">Legal Information</a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-6 ">
          <span className="font-medium text-lg">Subscribe</span>
          <p className="p-component mt-8 text-gray-400">
            Join our community to receieve the latest updates and special
            promotions.
          </p>
          <div className="p-inputgroup mt-4"></div>
        </div>
      </div>
      <div className="flex px-12 md:px-16 lg:px-20"></div>
    </footer>
  );
}
