import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Sparkles,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { CraftImage } from './CraftImage';

export const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    isCartOpen, 
    setIsCartOpen, 
    totalItems, 
    subtotal 
  } = useCart();
  const { addToWishlist } = useWishlist();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya.sharma@example.com',
    address: 'Flat 402, Heritage Residency, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    paymentMethod: 'upi'
  });

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HERITAGE10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "HERITAGE10" for 10% off.');
    }
  };

  const finalTotal = Math.max(0, subtotal - discount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `SS-GI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-amber-900/20 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-900" />
              <h3 className="font-serif-heritage font-bold text-lg text-stone-900">
                Your Shopping Bag ({totalItems})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 text-base">Your bag is empty</h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                    Explore authentic GI-certified crafts from master artisans across India and the globe.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Fair Trade Promise Banner */}
                <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">100% Direct Artisan Payout</span>
                    <span className="text-[11px] text-amber-800">
                      Your purchase directly supports master artisans without middleman commission deductions.
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map(({ craft, quantity }) => (
                    <div 
                      key={craft.id}
                      className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs flex gap-3 relative group"
                    >
                      <CraftImage
                        src={craft.imageUrl}
                        alt={craft.name}
                        fallbackCategory={craft.originState}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                              {craft.category}
                            </span>
                            <button
                              onClick={() => removeFromCart(craft.id)}
                              className="text-stone-400 hover:text-rose-600 transition p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h5 className="font-bold text-stone-900 text-xs truncate leading-snug">
                            {craft.name}
                          </h5>
                          <span className="text-[10px] text-stone-500 block truncate">
                            By {craft.artisanName} &bull; {craft.originState}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 mt-1 border-t border-stone-100">
                          {/* Price */}
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-stone-900 text-sm font-mono">
                              ₹{(craft.recommendedFairPrice * quantity).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-stone-400 line-through font-mono">
                              ₹{(craft.traditionalMiddlemanRetailPrice * quantity).toLocaleString('en-IN')}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                            <button
                              onClick={() => updateQuantity(craft.id, -1)}
                              className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-bold text-stone-800 font-mono">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(craft.id, 1)}
                              className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Save for later / Move to Wishlist */}
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => {
                              addToWishlist(craft);
                              removeFromCart(craft.id);
                            }}
                            className="text-[10px] text-stone-500 hover:text-rose-600 flex items-center gap-1 font-medium transition"
                            title="Save to Wishlist for later"
                          >
                            <Heart className="w-3 h-3 text-rose-500" />
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try HERITAGE10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white uppercase focus:outline-none focus:ring-1 focus:ring-amber-800"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                      ✨ HERITAGE10 applied! You saved ₹{discount.toLocaleString('en-IN')}.
                    </span>
                  )}
                  {promoError && (
                    <span className="text-[11px] text-rose-600 font-medium mt-1 block">
                      {promoError}
                    </span>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount (10%)</span>
                    <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" /> Insured GI Shipping
                  </span>
                  <span className="text-emerald-700 font-bold font-mono">FREE</span>
                </div>
                <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span className="font-mono text-base text-amber-950">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3 bg-amber-900 hover:bg-amber-850 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified GI Authenticity
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" /> Fair Trade Certified
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5 relative">
            {!orderPlaced ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif-heritage font-bold text-xl text-stone-900">
                      Complete Your Order
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Direct delivery from artisan cluster to your doorstep.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700 block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700 block">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-stone-700 block">Shipping Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-800"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700 block">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700 block">State</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700 block">PIN Code</label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-amber-800"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2 pt-2">
                    <label className="font-semibold text-stone-800 text-xs block">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'upi', label: 'UPI / GPay / PhonePe' },
                        { id: 'card', label: 'Credit / Debit Card' },
                        { id: 'cod', label: 'Cash on Delivery' }
                      ].map((method) => (
                        <button
                          type="button"
                          key={method.id}
                          onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                          className={`p-2.5 rounded-xl border text-xs text-center transition ${
                            formData.paymentMethod === method.id
                              ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Total summary */}
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                    <span className="text-stone-600">Total Payable:</span>
                    <span className="font-bold text-amber-950 text-base font-mono">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-900 hover:bg-amber-850 text-white font-bold rounded-xl text-sm shadow-sm transition"
                  >
                    Confirm & Place Order
                  </button>
                </form>
              </>
            ) : (
              /* Success confirmation */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif-heritage font-bold text-2xl text-stone-900">
                    Order Confirmed!
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                    Thank you, {formData.name}. Your order has been placed directly with the master artisan cluster.
                  </p>
                </div>

                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 max-w-sm mx-auto text-xs space-y-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Order ID:</span>
                    <span className="font-mono font-bold text-amber-950">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Amount Paid:</span>
                    <span className="font-mono font-bold text-stone-900">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Estimated Delivery:</span>
                    <span className="font-medium text-stone-800">4-6 Business Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment:</span>
                    <span className="uppercase font-mono text-[11px] text-emerald-700 font-bold">
                      {formData.paymentMethod} (Verified)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsCartOpen(false);
                    setOrderPlaced(false);
                  }}
                  className="px-6 py-2.5 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
