import React, { useState } from 'react';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';

function App() {
  const [cart, setCart] = useState({});
  const [orderSent, setOrderSent] = useState(false);

  // Пример данных товаров (замените на свои)
  const products = [
    { id: 1, name: "Айран 0,5% 900г бутылка ", image: "/images/v1.webp" },
    { id: 2, name: "Ряженка 4% 900гр. пэт. бутылка", image: "/images/v2.webp" },
    { id: 3, name: "Молоко ультрапастеризованное 3,2%", image: "/images/v3.webp" },
    { id: 4, name: "Ряженка 2,5%", image: "/images/v4.webp" },
    { id: 5, name: "Сыр. ч-шипок", image: "/images/v5.webp" },
    { id: 6, name: "Кефир 3,2% 900гр пэт.бутылка", image: "/images/v6.webp" },
    { id: 7, name: "Молоко ультрапастеризованное 2,5%", image: "/images/v7.webp" },
    { id: 8, name: "Ряженка 4%", image: "/images/v8.webp" },
    { id: 9, name: "Ряженка 4%", image: "/images/v9.webp" },
    { id: 10, name: "масло", image: "/images/v10.webp" },
    { id: 11, name: "Айран", image: "/images/v11.webp" },
    { id: 12, name: "Сливки", image: "/images/v12.webp" },
    { id: 13, name: "кефир 2.5%", image: "/images/v13.webp" },
    { id: 14, name: "молоко", image: "/images/v14.webp" },
    { id: 15, name: "кефир 1%", image: "/images/v15.webp" },
    { id: 16, name: "Айран", image: "/images/v16.webp" },
    { id: 17, name: "молоко 3.2%", image: "/images/v17.webp" },
    
  ];

  const updateQuantity = (productId, quantity) => {
    setCart(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const handleSubmitOrder = (address) => {
    const message = generateTelegramMessage(address, cart, products);
    sendTelegramMessage(message);
    setOrderSent(true);
    setCart({});
    setTimeout(() => {
  setOrderSent(false);
}, 5000);
  };

  return (
    <div className="app">
      
      
      <ProductList 
        products={products} 
        cart={cart} 
        updateQuantity={updateQuantity} 
      />
      
      <OrderForm 
        onSubmit={handleSubmitOrder} 
        orderSent={orderSent} 
      />
    </div>
  );
}

// Генерация сообщения для Telegram
function generateTelegramMessage(address, cart, products) {
  let message = `🛒 Новый заказ!\n\n📍 Адрес: ${address}\n\n📦 Товары:\n`;
  
  Object.entries(cart).forEach(([productId, quantity]) => {
    if (quantity > 0) {
      const product = products.find(p => p.id === parseInt(productId));
      message += `- ${product.name}: ${quantity} шт.\n`;
    }
  });
  
  message += `\n💰 Итого: ${calculateTotal(cart, products)} руб.`;
  return message;
}

// Отправка в Telegram (замените на свой токен и chat_id)
function sendTelegramMessage(message) {
  const token = "8058137136:AAHZnTgSPxjx6D872ZhMPwMib0sP_pY4d9U";
  const chatId = "-1002254350247";
  
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    })
  });
}

// Расчет общей суммы
function calculateTotal(cart, products) {
  return Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find(p => p.id === parseInt(productId));
    return total + (product?.price || 0) * quantity;
  }, 0);
}

export default App;
