import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import DesktopMenu from '../../components/Header/DesktopMenu';
import MobileMenu from '../../components/Header/MobileMenu';
import UserDropdown from '../../components/Header/UserDropdown';
import SearchOverlay from '../../components/Header/SearchOverlay';

const Navigation = () => {
    const [activeMainMenu, setActiveMainMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Check if the viewport is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 992);
        };

        // Initial check
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Handle hover and click events
    const handleMainMenuEnter = (menu) => {
        if (!isMobile) {
            setActiveMainMenu(menu);
        }
    };

    const handleMainMenuLeave = () => {
        if (!isMobile) {
            setActiveMainMenu(null);
        }
    };

    const handleMainMenuToggle = (menu) => {
        if (isMobile) {
            setActiveMainMenu(activeMainMenu === menu ? null : menu);
        }
    };

    const handleSubMenuEnter = (menu) => {
        setActiveSubMenu(menu);
    };

    const handleSubMenuLeave = () => {
        setActiveSubMenu(null);
    };

    const handleSubMenuToggle = (menu) => {
        if (isMobile) {
            setActiveSubMenu(activeSubMenu === menu ? null : menu);
        }
    };

    const handleLinkHover = (item) => {
        setHoveredItem(item);
    };

    const handleLinkLeave = () => {
        setHoveredItem(null);
    };

    // Toggle search overlay
    const toggleSearch = (e) => {
        if (e) e.preventDefault();
        setSearchOpen(!searchOpen);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-0 sticky-top shadow-sm">
                <div className="container-fluid px-2 px-sm-3 px-md-4">
                    {/* Logo - make it smaller on mobile */}
                    <Link className="navbar-brand me-2 me-md-4" to="/">
                        <img
                            src={logo}
                            alt="Sport Shop Logo"
                            className="img-fluid"
                            style={{
                                height: isMobile ? '40px' : '60px',
                                width: 'auto'
                            }}
                        />
                    </Link>

                    {/* Cart and Search quick access for mobile - shown on the right of logo */}
                    {isMobile && (
                        <div className="d-flex align-items-center ms-auto me-2">
                            <Link className="nav-link px-2 position-relative" to="/cart" aria-label="Cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                                    0
                                </span>
                            </Link>
                            <button
                                className="nav-link px-2 ms-3 btn border-0 p-0"
                                onClick={toggleSearch}
                                aria-label="Search"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    )}

                    {/* Hamburger menu for mobile */}
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navigation Links */}
                    <div className="collapse navbar-collapse" id="navbarContent">
                        {/* Desktop Navigation */}
                        <DesktopMenu
                            activeMainMenu={activeMainMenu}
                            activeSubMenu={activeSubMenu}
                            hoveredItem={hoveredItem}
                            handleMainMenuEnter={handleMainMenuEnter}
                            handleMainMenuLeave={handleMainMenuLeave}
                            handleSubMenuEnter={handleSubMenuEnter}
                            handleSubMenuLeave={handleSubMenuLeave}
                            handleLinkHover={handleLinkHover}
                            handleLinkLeave={handleLinkLeave}
                        />

                        {/* Mobile Navigation */}
                        <MobileMenu />

                        {/* Right side icons for desktop */}
                        {!isMobile && (
                            <div className="d-flex align-items-center">
                                {/* Use the UserDropdown without passing any props */}
                                <UserDropdown />
                                <button
                                    className="nav-link px-2 px-md-3 btn border-0 p-0"
                                    onClick={toggleSearch}
                                    aria-label="Search"
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                                <Link className="nav-link px-2 px-md-3 position-relative" to="/cart" aria-label="Cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        0
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Search Overlay */}
            <SearchOverlay isOpen={searchOpen} onClose={toggleSearch} />
        </>
    );
};

export default Navigation;
