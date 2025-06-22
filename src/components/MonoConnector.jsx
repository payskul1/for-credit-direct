import React, { useCallback, useEffect, useState } from 'react'

const MonoConnector = ( { customer, 
  publicKey, 
  bvn,
  onSuccess, 
  onError, 
  onClose,
  buttonText = "Connect Bank Account" 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [connect, setConnect] = useState(null);
    const [isMonoReady, setIsMonoReady] = useState(false);
    const API_BASE_URL = "https://api.withmono.com"; 
    const secret = 'test_sk_b70y8f5d7cc04nj27fj1';


  // Initialize Mono Connect
  const initializeConnect = useCallback(() => {
    if (!window.Connect || !customer || !publicKey) {
      setError('Missing required parameters or Connect not available');
      return;
    }

    try {
      const config = {
        key: publicKey,
        data: { customer },
        onLoad: () => {
          console.log('Mono Connect initialized successfully');
          setIsReady(true);
          setError(null);
          if(!bvn){
            alert('enter bvn')
          }
        },
        onSuccess: async ({ data }) => {
          console.log('Connection successful:', data);
          if (onSuccess) onSuccess(data);
        try {
            const response = await fetch(`${API_BASE_URL}/v2/accounts/id`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${'publicKey'}`,
                    // 'X-API-Key': publicKey, 
                    "mono-sec-key": publicKey,
                },
                body: JSON.stringify({
                    customer: {
                        name: customer.name,
                        email: customer.email,
                        identity: {
                            type: "bvn",
                            number: bvn,  //changed
                        },
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
        },
        onError: (error) => {
          console.error('Mono Connect error:', error);
          setError(error.message || 'Connection failed');
          if (onError) onError(error);
        },
        onClose: () => {
          console.log('Mono Connect closed');
          if (onClose) onClose();
        }
      };

      const connectInstance = new window.Connect(config);
      connectInstance.setup();
      setConnect(connectInstance);
    } catch (err) {
      console.error('Error initializing Mono Connect:', err);
      setError('Failed to initialize Mono Connect');
    }
  }, [customer, publicKey, onSuccess, onError, onClose]);

  useEffect(() => {
      const loadMonoScript = () => {
        return new Promise((resolve, reject) => {
          if (document.querySelector('script[src*="connect.withmono.com"]')) {
            resolve();
            return;
          }
  
          const script = document.createElement('script');
          script.src = 'https://connect.withmono.com/connect.js';
          script.type = 'application/javascript';
          // script.onload = resolve;
          script.onerror = reject;
          script.onload = () => {
            window.MonoConnect.setup({
              onLoad: () => {
                setIsMonoReady(true);
              },
            });
          };
          document.head.appendChild(script);
        });
      };
  
      loadMonoScript()
        .then(() => {
          console.log('Mono Connect script loaded successfully');
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load Mono Connect script:', err);
          setError('Failed to load Mono Connect');
          setIsLoading(false);
        });
  
    }, []);
  

  // Initialize when script is loaded
  useEffect(() => {
    if (!isLoading && window.Connect && customer && publicKey) {
      initializeConnect();
    }
  }, [isLoading, customer, publicKey, initializeConnect]);

  const handleOpenConnect = () => {
    if (connect && isReady) {
      connect.open();
    } else {
      setError('Mono Connect is not ready yet. Please wait a moment and try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading Mono Connect...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <div className="text-red-800 text-sm">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-red-600 underline text-sm hover:text-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!bvn ? <p>Enter BVN</p>:
      <button
        onClick={handleOpenConnect}
        disabled={!isReady}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          isReady 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isReady ? buttonText : 'Initializing...'}
      </button>
}
      
      {!isReady && (
        <p className="text-sm text-gray-500">
          Please wait while we initialize your connection...
        </p>
      )}
    </div>
  );
};

export default MonoConnector;
