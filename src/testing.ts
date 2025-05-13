const manager = new ProductManager();

// Mahsulot qo'shish
manager.createProduct({ id: 1, name: "iPhone 12", price: 999, category: "Smartphone" });
manager.createProduct({ id: 2, name: "Samsung Galaxy S21", price: 899, category: "Smartphone" });

// Barcha mahsulotlarni olish
console.log("Barcha mahsulotlar:", manager.getAllProducts());

// ID bo'yicha mahsulotni olish
console.log("ID 1 mahsulot:", manager.getProductById(1));

// Mahsulotni yangilash
manager.updateProduct(2, { price: 799 });
console.log("Yangi narx bilan mahsulot 2:", manager.getProductById(2));

// Mahsulotni o'chirish
manager.deleteProduct(1);
console.log("1-mahsulot o'chirilgandan keyin:", manager.getAllProducts());
