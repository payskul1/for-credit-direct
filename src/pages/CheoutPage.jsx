import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { useSearchParams } from 'react-router-dom';

// const sampleProducts = [
//   {
//     productAmount: 25000,
//     productId: 'sample1',
//     productName: 'Sample Product 1',
//     quantity: 1,
//     description: 'Sample product description',
//   },
//   {
//     productAmount: 25000,
//     productId: 'sample2',
//     productName: 'Sample Product 2',
//     quantity: 1,
//     description: 'Another sample product',
//   },
// ];

function generateUniqueSessionId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function signTransaction(transaction) {
  const privateKey = '4612fc72101514678745ac11720bd833fdd5e575cc79f3d57e2c48b92afe4b87';
  const sm = transaction.sessionId + transaction.customerEmail + transaction.totalAmount;
  const key = CryptoJS.enc.Utf8.parse(privateKey);
  // First
  const messageData = CryptoJS.enc.Utf8.parse(sm);
  const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(messageData, key));
  return signature;
}

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const amt = parseInt(searchParams.get('amount'));
    if (amt && amt >= 1000) {
      setAmount(amt);
    }

    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
    const productsParam = searchParams.get('products');
    const productAmount = searchParams.get('productAmount');
    const productId = searchParams.get('productId');
    const productName = searchParams.get('productName');

    if (productsParam) {
      try {
        // Decode and parse products JSON
        const decodedProducts = decodeURIComponent(productsParam);
        const parsedProducts = JSON.parse(decodedProducts);
        
        // Validate products array and required fields
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          const validProducts = parsedProducts.filter(product => 
            product.productAmount && product.productId && product.productName && product.productAmount > 0
          );
          if (validProducts.length > 0) {
            setProducts(validProducts);
          } else {
            setMessage({ type: 'error', text: 'Invalid products data - missing required fields' });
          }
        } else {
          setMessage({ type: 'error', text: 'Invalid products data' });
        }
      } catch (error) {
        console.error('Error parsing products:', error);
        setMessage({ type: 'error', text: 'Failed to parse products data' });
      }
    } else if (productAmount && productId && productName) {
      // Handle individual product parameters
      const amount = parseInt(productAmount);
      if (amount && amount > 0) {
        setProducts([{
          productAmount: amount,
          productId: productId,
          productName: productName
        }]);
      } else {
        setMessage({ type: 'error', text: 'Invalid product amount' });
      }
    } else {
      setMessage({ type: 'error', text: 'No products specified' });
    }


  }, [searchParams]);

  const openCheckout = () => {
    if (!amount || amount < 1000) return setMessage({ type: 'error', text: 'Invalid amount (min ₦1,000)' });
    if (!email.includes('@')) return setMessage({ type: 'error', text: 'Invalid email' });
    if (!phone.trim()) return setMessage({ type: 'error', text: 'Invalid phone number' });

    setLoading(true);
    setMessage({ type: '', text: '' });

    const sessionId = generateUniqueSessionId(15);

    const transaction = {
      totalAmount: amount,
      customerEmail: email,
      customerPhone: phone,
      sessionId,
      metaData: email,
        // source: 'check-out',
      products: products,
    };

    const config = {
      publicKey: '028d174dc1d1485a82fc75a2588f03f9',
      signature: signTransaction(transaction),
      transaction,
      isLive: false,
      onSuccess: () => setMessage({ type: 'success', text: 'Payment completed successfully!' }),
      onClose: () => setLoading(false),
      onError: (error) => setMessage({ type: 'error', text: `Payment failed: ${error.message || 'Unknown error'}` }),
      onPopup: () => console.log('Popup opened'),
    };

    try {
      const connect = new window.Connect(config);
      connect.setup();
      connect.open();
    } catch (error) {
      console.error('Checkout init error:', error);
      setMessage({ type: 'error', text: `Failed to initialize: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Payskul Checkout</h1>

        <p className="text-sm text-gray-500">Secure Buy Now, Pay Later Solution</p>

      </div>

      <div className="bg-white p-5 rounded-xl shadow mb-4">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Total Amount (₦)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={amount}
            readOnly
            // onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Customer Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Customer Phone</label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="text-lg font-bold text-purple-700">₦{amount.toLocaleString()}</div>
      </div>

      <button
        onClick={openCheckout}
        disabled={loading}
        className="w-full py-3 rounded-xl text-white text-lg bg-purple-800 hover:bg-purple-900 disabled:bg-gray-400 transition"
      >
        {loading ? 'Initializing checkout...' : 'Proceed to Checkout'}
      </button>

      {message.text && (
        <div
          className={`mt-4 p-3 rounded text-sm font-medium ${message.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
            }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}