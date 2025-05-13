/**
 * Product interfeysi - mahsulot ma'lumotlari uchun
 */
export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
}

/**
 * ProductError - mahsulot bilan bog'liq xatoliklar uchun
 */
export class ProductError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProductError';
    }
}

/**
 * ProductManager sinfi - mahsulotlarni boshqarish uchun
 */
export class ProductManager {
    // Mahsulotlarni saqlash uchun Map (ID bo'yicha tez qidirish uchun)
    private productsMap = new Map<number, Product>();

    /**
     * Yangi mahsulot qo'shish
     * @param product Qo'shiladigan mahsulot
     * @returns Qo'shilgan mahsulot
     * @throws ProductError agar mahsulot ID allaqachon mavjud bo'lsa
     */
    createProduct(product: Product): Product {
        // Mahsulot ma'lumotlarini tekshirish
        this.validateProduct(product);

        if (this.productsMap.has(product.id)) {
            throw new ProductError(`Mahsulot ID ${product.id} allaqachon mavjud`);
        }

        this.productsMap.set(product.id, { ...product });
        return product;
    }

    /**
     * Barcha mahsulotlarni olish
     * @param category Ixtiyoriy kategoriya filtri
     * @param minPrice Ixtiyoriy minimal narx filtri
     * @param maxPrice Ixtiyoriy maksimal narx filtri
     * @returns Mahsulotlar ro'yxati
     */
    getAllProducts(category?: string, minPrice?: number, maxPrice?: number): Product[] {
        let products = Array.from(this.productsMap.values());

        // Kategoriya bo'yicha filtrlash
        if (category) {
            products = products.filter(p => p.category === category);
        }

        // Narx bo'yicha filtrlash
        if (minPrice !== undefined) {
            products = products.filter(p => p.price >= minPrice);
        }

        if (maxPrice !== undefined) {
            products = products.filter(p => p.price <= maxPrice);
        }

        return products;
    }

    /**
     * ID bo'yicha mahsulotni olish
     * @param id Mahsulot ID
     * @returns Mahsulot yoki undefined
     */
    getProductById(id: number): Product | undefined {
        return this.productsMap.get(id);
    }

    /**
     * Mahsulotni yangilash
     * @param id Mahsulot ID
     * @param updatedData Yangilanadigan ma'lumotlar
     * @returns Yangilangan mahsulot
     * @throws ProductError agar mahsulot topilmasa
     */
    updateProduct(id: number, updatedData: Partial<Product>): Product {
        const product = this.productsMap.get(id);

        if (!product) {
            throw new ProductError(`Mahsulot ID ${id} topilmadi`);
        }

        // ID o'zgartirilmasligi kerak
        if (updatedData.id !== undefined && updatedData.id !== id) {
            throw new ProductError('Mahsulot ID o\'zgartirilishi mumkin emas');
        }

        const updatedProduct = { ...product, ...updatedData };
        this.productsMap.set(id, updatedProduct);

        return updatedProduct;
    }

    /**
     * Mahsulotni o'chirish
     * @param id Mahsulot ID
     * @returns O'chirilgan mahsulot
     * @throws ProductError agar mahsulot topilmasa
     */
    deleteProduct(id: number): Product {
        const product = this.productsMap.get(id);

        if (!product) {
            throw new ProductError(`Mahsulot ID ${id} topilmadi`);
        }

        this.productsMap.delete(id);
        return product;
    }

    /**
     * Mahsulot ma'lumotlarini tekshirish
     * @param product Tekshiriladigan mahsulot
     * @throws ProductError agar ma'lumotlar noto'g'ri bo'lsa
     */
    private validateProduct(product: Product): void {
        if (!product.id || typeof product.id !== 'number') {
            throw new ProductError('Mahsulot ID raqam bo\'lishi kerak');
        }

        if (!product.name || typeof product.name !== 'string') {
            throw new ProductError('Mahsulot nomi bo\'sh bo\'lmasligi kerak');
        }

        if (typeof product.price !== 'number' || product.price < 0) {
            throw new ProductError('Mahsulot narxi musbat raqam bo\'lishi kerak');
        }

        if (!product.category || typeof product.category !== 'string') {
            throw new ProductError('Mahsulot kategoriyasi bo\'sh bo\'lmasligi kerak');
        }
    }
}
