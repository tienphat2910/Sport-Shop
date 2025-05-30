import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const inputRef = useRef(null);

    // Focus input when overlay opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        }
    }, [isOpen]);

    // Load recent searches from localStorage
    useEffect(() => {
        if (isOpen) {
            const recent = JSON.parse(localStorage.getItem('recentSearches')) || [];
            setRecentSearches(recent);
        }
    }, [isOpen]);

    // Save recent searches to localStorage
    const saveRecentSearch = (term) => {
        if (!term.trim()) return;

        const recent = JSON.parse(localStorage.getItem('recentSearches')) || [];
        // Remove if already exists
        const filteredRecent = recent.filter(item => item.toLowerCase() !== term.toLowerCase());
        // Add to beginning of array and limit to 5 items
        const updatedRecent = [term, ...filteredRecent].slice(0, 5);

        localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
        setRecentSearches(updatedRecent);
    };

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setIsLoading(true);

        // Here you would normally make an API call to search for products
        // For now, we'll simulate a search with a timeout
        setTimeout(() => {
            // Mock search results
            const mockResults = [
                { id: 1, name: 'Nike Air Max', price: 120, discount: 10, image: 'https://via.placeholder.com/100x100?text=Nike' },
                { id: 2, name: 'Adidas Ultraboost', price: 150, image: 'https://via.placeholder.com/100x100?text=Adidas' },
                { id: 3, name: 'Football Jersey', price: 80, discount: 15, image: 'https://via.placeholder.com/100x100?text=Jersey' },
            ];

            setSearchResults(mockResults);
            setIsLoading(false);
            saveRecentSearch(searchTerm);
        }, 800);
    };

    // Clear a single recent search
    const clearRecentSearch = (term, e) => {
        e.stopPropagation();
        const updated = recentSearches.filter(item => item !== term);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        setRecentSearches(updated);
    };

    // Clear all recent searches
    const clearAllRecentSearches = (e) => {
        e.preventDefault();
        localStorage.removeItem('recentSearches');
        setRecentSearches([]);
    };

    // Handle clicks on recent search items
    const handleRecentSearchClick = (term) => {
        setSearchTerm(term);
        // Trigger search immediately
        setIsLoading(true);
        setTimeout(() => {
            // Mock search results
            const mockResults = [
                { id: 1, name: 'Nike Air Max', price: 120, discount: 10, image: 'https://via.placeholder.com/100x100?text=Nike' },
                { id: 2, name: 'Adidas Ultraboost', price: 150, image: 'https://via.placeholder.com/100x100?text=Adidas' },
            ];

            setSearchResults(mockResults);
            setIsLoading(false);
            saveRecentSearch(term);
        }, 500);
    };

    // Handle ESC key press
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            // Disable body scroll when search is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            // Re-enable body scroll when search is closed
            if (isOpen) {
                document.body.style.overflow = '';
            }
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-white" style={{ zIndex: 1050 }}>
            <div className="container-fluid border-bottom shadow-sm py-3">
                <div className="row align-items-center">
                    <div className="col-10 col-md-11">
                        <form onSubmit={handleSearch} className="d-flex">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="fa-solid fa-magnifying-glass text-muted"></i>
                                </span>
                                <input
                                    type="search"
                                    ref={inputRef}
                                    className="form-control border-start-0"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary border-start-0 border-end-0"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isLoading || !searchTerm.trim()}
                                >
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        'Tìm kiếm'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-2 col-md-1 text-end">
                        <button
                            className="btn btn-link text-dark fs-4"
                            onClick={onClose}
                            aria-label="Đóng tìm kiếm"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container py-4" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 85px)' }}>
                {/* Recent searches */}
                {recentSearches.length > 0 && !searchResults.length && (
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="mb-0">Tìm kiếm gần đây</h6>
                            <button
                                className="btn btn-sm text-primary border-0"
                                onClick={clearAllRecentSearches}
                            >
                                Xóa tất cả
                            </button>
                        </div>
                        <div className="list-group">
                            {recentSearches.map((term, index) => (
                                <div
                                    key={index}
                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => handleRecentSearchClick(term)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div>
                                        <i className="fa-solid fa-clock-rotate-left me-2 text-muted"></i>
                                        {term}
                                    </div>
                                    <button
                                        className="btn btn-sm border-0"
                                        onClick={(e) => clearRecentSearch(term, e)}
                                    >
                                        <i className="fa-solid fa-xmark text-muted"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading indicator */}
                {isLoading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tìm kiếm...</span>
                        </div>
                        <p className="mt-3">Đang tìm kiếm sản phẩm...</p>
                    </div>
                )}

                {/* Search results */}
                {searchResults.length > 0 && !isLoading && (
                    <div>
                        <h5 className="mb-3">Kết quả tìm kiếm cho "{searchTerm}"</h5>
                        <div className="row g-3">
                            {searchResults.map(product => (
                                <div key={product.id} className="col-12 col-md-6 col-lg-4">
                                    <div className="card h-100 shadow-sm">
                                        <div className="row g-0">
                                            <div className="col-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="img-fluid rounded-start h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="col-8">
                                                <div className="card-body">
                                                    <h6 className="card-title">{product.name}</h6>
                                                    <div className="d-flex align-items-center mb-2">
                                                        {product.discount ? (
                                                            <>
                                                                <span className="text-danger fw-bold me-2">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                                                                <span className="text-decoration-line-through text-muted small">${product.price.toFixed(2)}</span>
                                                            </>
                                                        ) : (
                                                            <span className="fw-bold">${product.price.toFixed(2)}</span>
                                                        )}
                                                    </div>
                                                    <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-primary">
                                                        Xem chi tiết
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No results */}
                {searchTerm && !isLoading && searchResults.length === 0 && (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-search fa-3x text-muted mb-3"></i>
                        <h5>Không tìm thấy sản phẩm</h5>
                        <p className="text-muted">Vui lòng thử từ khóa khác hoặc duyệt danh mục sản phẩm.</p>
                        <Link to="/products" className="btn btn-outline-primary mt-2">Xem tất cả sản phẩm</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchOverlay;
