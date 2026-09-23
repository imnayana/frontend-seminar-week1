import { useState } from "react";

import cafeLatteImage from "./assets/cafe-latte.jpeg";
import chocolateEclairImage from "./assets/chocolate-eclair.jpg";
import espressoImage from "./assets/espresso.jpg";
import flatWhiteImage from "./assets/flat-white.jpg";
import longBlackImage from "./assets/long-black.jpeg";
import sacherTorteImage from "./assets/sacher-torte.jpg";
import strawberryCakeImage from "./assets/strawberry-cake.jpg";
import tiramisuImage from "./assets/tiramisu.jpeg";
import vanillaEclairImage from "./assets/vanilla-eclair.jpeg";
import vanillaLatteImage from "./assets/vanilla-latte.jpeg";

import "./App.css";

const products = [
  {
    id: 1,
    name: "자허토르테",
    price: 7500,
    category: "디저트",
    image: sacherTorteImage,
  },
  {
    id: 2,
    name: "티라미수",
    price: 7000,
    category: "디저트",
    image: tiramisuImage,
  },
  {
    id: 3,
    name: "초코 에끌레어",
    price: 5500,
    category: "디저트",
    image: chocolateEclairImage,
  },
  {
    id: 4,
    name: "바닐라 에끌레어",
    price: 5500,
    category: "디저트",
    image: vanillaEclairImage,
  },
  {
    id: 5,
    name: "딸기케이크",
    price: 7500,
    category: "디저트",
    image: strawberryCakeImage,
  },
  {
    id: 6,
    name: "카페라떼",
    price: 5000,
    category: "음료",
    image: cafeLatteImage,
  },
  {
    id: 7,
    name: "플랫화이트",
    price: 5000,
    category: "음료",
    image: flatWhiteImage,
  },
  {
    id: 8,
    name: "롱블랙",
    price: 4500,
    category: "음료",
    image: longBlackImage,
  },
  {
    id: 9,
    name: "에스프레소",
    price: 4000,
    category: "음료",
    image: espressoImage,
  },
  {
    id: 10,
    name: "바닐라 라떼",
    price: 5500,
    category: "음료",
    image: vanillaLatteImage,
  },
];

type CartItem = (typeof products)[number] & {
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const addToCart = (product: (typeof products)[number]) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    const item = cart.find((item) => item.id === id);

    if (item?.quantity === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    }
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleOrder = () => {
    alert("주문이 완료되었습니다!");
    setCart([]);
  };

  const filteredProducts =
    selectedCategory === "전체"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main>
      <h1>미니 키오스크</h1>

      <section className="menu-section">
        <h2>메뉴</h2>

        <div className="category-buttons">
          <button type="button" onClick={() => setSelectedCategory("전체")}>
            {" "}
            전체
          </button>
          <button type="button" onClick={() => setSelectedCategory("디저트")}>
            {" "}
            디저트
          </button>
          <button type="button" onClick={() => setSelectedCategory("음료")}>
            {" "}
            음료
          </button>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <button
              type="button"
              className="product-card"
              key={product.id}
              onClick={() => addToCart(product)}
            >
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price.toLocaleString()}원</p>
            </button>
          ))}
        </div>
      </section>

      <section className="cart-section">
        <h2>장바구니</h2>

        {cart.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>{item.price.toLocaleString()}원</p>

                <button type="button" onClick={() => decreaseQuantity(item.id)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => increaseQuantity(item.id)}>
                  +
                </button>
              </div>
            ))}
          </div>
        )}

        <div>
          <p>총 수량: {totalQuantity}개</p>
          <p>총 금액: {totalPrice.toLocaleString()}원</p>

          <button
            type="button"
            disabled={cart.length === 0}
            onClick={handleOrder}
          >
            주문하기
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
