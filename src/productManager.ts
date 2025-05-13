// Product interfeysi
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
}

// ProductManager sinfi
class ProductManager {
    private products: Product[] = [];

    // Mahsulot qo'shish
    createProduct(product: Product): void {
        const exists = this.products.some(p => p.id === product.id);
        if (exists) {
            console.log(`Product with id ${product.id} already exists.`);
            return;
        }
        this.products.push(product);
    }

    // Barcha mahsulotlarni olish
    getAllProducts(): Product[] {
        return this.products;
    }

    // ID bo'yicha mahsulotni olish
    getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    // Mahsulotni yangilash
    updateProduct(id: number, updatedData: Partial<Product>): void {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.log(`Product with id ${id} not found.`);
            return;
        }
        this.products[index] = { ...this.products[index], ...updatedData };
    }

    // Mahsulotni o'chirish
    deleteProduct(id: number): void {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.log(`Product with id ${id} not found.`);
            return;
        }
        this.products.splice(index, 1);
    }
}
