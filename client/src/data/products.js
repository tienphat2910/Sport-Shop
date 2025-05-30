const products = [
    // Football products
    {
        id: 'fb1',
        name: 'Áo Manchester United 2023-24',
        price: 1500000,
        discountedPrice: 1350000,
        discount: 10,
        image: 'https://aobongda.net/pic/Product/bo-thi-dau-jogarbola-mj-e4054-01-ban-fan-1_8560_HasThumb.png',
        category: 'football',
        subcategory: 'jerseys',
        isNew: true,
        brand: 'Adidas'
    },
    {
        id: 'fb2',
        name: 'Áo Real Madrid Home 2023-24',
        price: 1500000,
        discountedPrice: 1350000,
        discount: 10,
        image: 'https://via.placeholder.com/300x300?text=Real+Madrid',
        category: 'football',
        subcategory: 'jerseys',
        isNew: false,
        brand: 'Adidas'
    },
    {
        id: 'fb3',
        name: 'Giày đá bóng Nike Mercurial',
        price: 2200000,
        discountedPrice: 1980000,
        discount: 10,
        image: 'https://via.placeholder.com/300x300?text=Mercurial',
        category: 'football',
        subcategory: 'shoes',
        isNew: false,
        brand: 'Nike'
    },
    {
        id: 'fb4',
        name: 'Bóng đá FIFA World Cup 2022',
        price: 850000,
        discountedPrice: 680000,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=World+Cup+Ball',
        category: 'football',
        subcategory: 'equipment',
        isNew: false,
        brand: 'Adidas'
    },
    {
        id: 'fb5',
        name: 'Áo Barcelona Home 2023-24',
        price: 1500000,
        discountedPrice: 0,
        discount: 0,
        image: 'https://via.placeholder.com/300x300?text=Barcelona',
        category: 'football',
        subcategory: 'jerseys',
        isNew: true,
        brand: 'Nike'
    },

    // Basketball products
    {
        id: 'bb1',
        name: 'Giày Nike LeBron 18',
        price: 4500000,
        discountedPrice: 3600000,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=LeBron+18',
        category: 'basketball',
        subcategory: 'shoes',
        isNew: true,
        brand: 'Nike'
    },
    {
        id: 'bb2',
        name: 'Áo Lakers NBA 2023',
        price: 1900000,
        discountedPrice: 1520000,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=Lakers+Jersey',
        category: 'basketball',
        subcategory: 'jerseys',
        isNew: false,
        brand: 'Nike'
    },
    {
        id: 'bb3',
        name: 'Bóng rổ Spalding NBA',
        price: 750000,
        discountedPrice: 750000,
        discount: 0,
        image: 'https://via.placeholder.com/300x300?text=Spalding+Ball',
        category: 'basketball',
        subcategory: 'equipment',
        isNew: false,
        brand: 'Spalding'
    },
    {
        id: 'bb4',
        name: 'Áo Chicago Bulls NBA 2023',
        price: 1900000,
        discountedPrice: 1710000,
        discount: 10,
        image: 'https://via.placeholder.com/300x300?text=Bulls+Jersey',
        category: 'basketball',
        subcategory: 'jerseys',
        isNew: true,
        brand: 'Nike'
    },
    {
        id: 'bb5',
        name: 'Quần short NBA Lakers',
        price: 950000,
        discountedPrice: 950000,
        discount: 0,
        image: 'https://via.placeholder.com/300x300?text=Lakers+Shorts',
        category: 'basketball',
        subcategory: 'apparel',
        isNew: false,
        brand: 'Nike'
    },

    // Running products
    {
        id: 'rn1',
        name: 'Giày chạy bộ Nike Air Zoom',
        price: 3200000,
        discountedPrice: 2560000,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=Nike+Air+Zoom',
        category: 'running',
        subcategory: 'shoes',
        isNew: true,
        brand: 'Nike'
    },
    {
        id: 'rn2',
        name: 'Quần chạy bộ Adidas',
        price: 850000,
        discountedPrice: 850000,
        discount: 0,
        image: 'https://via.placeholder.com/300x300?text=Adidas+Pants',
        category: 'running',
        subcategory: 'apparel',
        isNew: false,
        brand: 'Adidas'
    },
    {
        id: 'rn3',
        name: 'Áo chạy bộ Under Armour',
        price: 780000,
        discountedPrice: 624000,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=UA+Shirt',
        category: 'running',
        subcategory: 'apparel',
        isNew: false,
        brand: 'Under Armour'
    },
    {
        id: 'rn4',
        name: 'Đồng hồ Garmin Forerunner',
        price: 8500000,
        discountedPrice: 7650000,
        discount: 10,
        image: 'https://via.placeholder.com/300x300?text=Garmin+Watch',
        category: 'running',
        subcategory: 'accessories',
        isNew: true,
        brand: 'Garmin'
    },
    {
        id: 'rn5',
        name: 'Giày chạy bộ Adidas Ultraboost',
        price: 4200000,
        discountedPrice: 3360000,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=Ultraboost',
        category: 'running',
        subcategory: 'shoes',
        isNew: false,
        brand: 'Adidas'
    }
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
};

// Helper function to get featured products 
export const getFeaturedProducts = () => {
    return products.filter(product => product.isNew || product.discount >= 20).slice(0, 5);
};

export default products;
