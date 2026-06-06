import { Link } from 'react-router-dom';

export default function FloatingCart() {
  return (
    <Link
      to="/cart"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#6366f1] shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center"
      aria-label="Go to cart"
    >
      <img src="/images/cart.png" alt="Cart" className="w-2/5 h-2/5 object-contain" />
    </Link>
  );
}
