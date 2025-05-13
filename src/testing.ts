import {ProductManager, ProductError} from './ProductManager';

// ProductManager yaratish
const manager = new ProductManager();

try {
    console.log("=== Mahsulot qo'shish ===");
    // Mahsulot qo'shish
    const product1 = manager.createProduct({ 
        id: 1, 
        name: "iPhone 12", 
        price: 999, 
        category: "Smartphone",
        description: "Apple kompaniyasining flagman smartfoni" 
    });
    console.log("Qo'shildi:", product1);

    const product2 = manager.createProduct({ 
        id: 2, 
        name: "Samsung Galaxy S21", 
        price: 899, 
        category: "Smartphone" 
    });
    console.log("Qo'shildi:", product2);

    // Xatolikni tekshirish - mavjud ID bilan qo'shish
    try {
        manager.createProduct({ id: 1, name: "Duplicate", price: 100, category: "Test" });
    } catch (error: any) {
        console.log("Kutilgan xatolik:", error.message);
    }

    console.log("\n=== Barcha mahsulotlarni olish ===");
    // Barcha mahsulotlarni olish
    console.log("Barcha mahsulotlar:", manager.getAllProducts());

    console.log("\n=== Filtrlash imkoniyatlari ===");
    // Kategoriya bo'yicha filtrlash
    console.log("Smartphone kategoriyasidagi mahsulotlar:", 
        manager.getAllProducts("Smartphone"));

    // Narx diapazoni bo'yicha filtrlash
    console.log("500-950 narx oralig'idagi mahsulotlar:", 
        manager.getAllProducts(undefined, 500, 950));

    console.log("\n=== ID bo'yicha mahsulotni olish ===");
    // ID bo'yicha mahsulotni olish
    console.log("ID 1 mahsulot:", manager.getProductById(1));

    console.log("\n=== Mahsulotni yangilash ===");
    // Mahsulotni yangilash
    const updatedProduct = manager.updateProduct(2, { 
        price: 799,
        description: "Yangilangan tavsif" 
    });
    console.log("Yangilangan mahsulot:", updatedProduct);

    // ID o'zgartirish xatoligini tekshirish
    try {
        manager.updateProduct(2, { id: 3 });
    } catch (error: any) {
        console.log("Kutilgan xatolik:", error.message);
    }

    console.log("\n=== Mahsulotni o'chirish ===");
    // Mahsulotni o'chirish
    const deletedProduct = manager.deleteProduct(1);
    console.log("O'chirilgan mahsulot:", deletedProduct);
    console.log("Qolgan mahsulotlar:", manager.getAllProducts());

    // Mavjud bo'lmagan mahsulotni o'chirish
    try {
        manager.deleteProduct(999);
    } catch (error: any) {
        console.log("Kutilgan xatolik:", error.message);
    }

} catch (error: any) {
    if (error instanceof ProductError) {
        console.error("Mahsulot xatoligi:", error.message);
    } else {
        console.error("Kutilmagan xatolik:", error);
    }
}
