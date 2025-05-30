import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

const Navigation = () => {
    const [activeMainMenu, setActiveMainMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

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
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Link hover styles
    const getLinkStyle = (item) => {
        return {
            color: hoveredItem === item ? '#22a7e0' : '',
            textDecoration: hoveredItem === item ? 'underline' : 'none',
            textUnderlineOffset: '6px',
            fontWeight: 600,
            padding: '1.5rem 1rem',
            transition: 'color 0.2s ease'
        }
    }

    // Dropdown item hover styles
    const getDropdownItemStyle = (item) => {
        return {
            color: hoveredItem === item ? '#22a7e0' : '',
            textDecoration: hoveredItem === item ? 'underline' : 'none',
            textUnderlineOffset: '3px',
            transition: 'color 0.2s ease'
        }
    }

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

    return (
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
                        <Link className="nav-link px-2 ms-3" to="/search" aria-label="Search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
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
                    <ul className="navbar-nav me-auto mb-0 d-none d-lg-flex">
                        {/* Dropdown THỂ THAO with hover for desktop */}
                        <li
                            className="nav-item dropdown"
                            onMouseEnter={() => handleMainMenuEnter('theThao')}
                            onMouseLeave={handleMainMenuLeave}
                        >
                            <Link
                                className="nav-link dropdown-toggle fw-semibold"
                                to="#"
                                style={getLinkStyle('theThao')}
                                onMouseEnter={() => handleLinkHover('theThao')}
                                onMouseLeave={handleLinkLeave}
                            >
                                THỂ THAO
                            </Link>
                            <ul
                                className="dropdown-menu shadow"
                                style={{
                                    display: activeMainMenu === 'theThao' ? 'block' : 'none'
                                }}
                            >
                                {/* Bóng Đá dropdown with hover */}
                                <li
                                    className="dropend"
                                    onMouseEnter={() => {
                                        handleSubMenuEnter('bongDa');
                                        handleLinkHover('bongDa');
                                    }}
                                    onMouseLeave={() => {
                                        handleSubMenuLeave();
                                        handleLinkLeave();
                                    }}
                                >
                                    <Link
                                        className="dropdown-item dropdown-toggle"
                                        to="#"
                                        style={getDropdownItemStyle('bongDa')}
                                        onMouseEnter={() => handleLinkHover('bongDa')}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Bóng Đá
                                    </Link>
                                    <ul
                                        className="dropdown-menu shadow"
                                        style={{
                                            display: activeSubMenu === 'bongDa' ? 'block' : 'none',
                                            left: '100%',
                                            top: '0',
                                            margin: '0'
                                        }}
                                    >
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('aoCLB')}
                                                onMouseEnter={() => handleLinkHover('aoCLB')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Áo CLB
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('aoTuyen')}
                                                onMouseEnter={() => handleLinkHover('aoTuyen')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Áo Tuyển Quốc Gia
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('giayDaBong')}
                                                onMouseEnter={() => handleLinkHover('giayDaBong')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Giày Đá bóng
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        style={getDropdownItemStyle('bongRo')}
                                        onMouseEnter={() => handleLinkHover('bongRo')}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Bóng rổ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        style={getDropdownItemStyle('cauLong')}
                                        onMouseEnter={() => handleLinkHover('cauLong')}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Cầu lông
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Dropdown THỜI TRANG with hover for desktop */}
                        <li
                            className="nav-item dropdown"
                            onMouseEnter={() => handleMainMenuEnter('thoiTrang')}
                            onMouseLeave={handleMainMenuLeave}
                        >
                            <Link
                                className="nav-link dropdown-toggle fw-semibold"
                                to="#"
                                style={getLinkStyle('thoiTrang')}
                                onMouseEnter={() => handleLinkHover('thoiTrang')}
                                onMouseLeave={handleLinkLeave}
                            >
                                THỜI TRANG
                            </Link>
                            <ul
                                className="dropdown-menu shadow"
                                style={{
                                    display: activeMainMenu === 'thoiTrang' ? 'block' : 'none'
                                }}
                            >
                                {/* Nike dropdown with hover */}
                                <li
                                    className="dropend"
                                    onMouseEnter={() => {
                                        handleSubMenuEnter('nike');
                                        handleLinkHover('nike');
                                    }}
                                    onMouseLeave={() => {
                                        handleSubMenuLeave();
                                        handleLinkLeave();
                                    }}
                                >
                                    <Link
                                        className="dropdown-item dropdown-toggle"
                                        to="#"
                                        style={getDropdownItemStyle('nike')}
                                        onMouseEnter={() => handleLinkHover('nike')}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Nike
                                    </Link>
                                    <ul
                                        className="dropdown-menu shadow"
                                        style={{
                                            display: activeSubMenu === 'nike' ? 'block' : 'none',
                                            left: '100%',
                                            top: '0',
                                            margin: '0'
                                        }}
                                    >
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('nikeAo')}
                                                onMouseEnter={() => handleLinkHover('nikeAo')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Áo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('nikeQuan')}
                                                onMouseEnter={() => handleLinkHover('nikeQuan')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Quần
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('nikeGiay')}
                                                onMouseEnter={() => handleLinkHover('nikeGiay')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Giày
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                {/* Adidas dropdown with hover */}
                                <li
                                    className="dropend"
                                    onMouseEnter={() => {
                                        handleSubMenuEnter('adidas');
                                        handleLinkHover('adidas');
                                    }}
                                    onMouseLeave={() => {
                                        handleSubMenuLeave();
                                        handleLinkLeave();
                                    }}
                                >
                                    <Link
                                        className="dropdown-item dropdown-toggle"
                                        to="#"
                                        style={getDropdownItemStyle('adidas')}
                                        onMouseEnter={() => handleLinkHover('adidas')}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Adidas
                                    </Link>
                                    <ul
                                        className="dropdown-menu shadow"
                                        style={{
                                            display: activeSubMenu === 'adidas' ? 'block' : 'none',
                                            left: '100%',
                                            top: '0',
                                            margin: '0'
                                        }}
                                    >
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('adidasAo')}
                                                onMouseEnter={() => handleLinkHover('adidasAo')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Áo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('adidasQuan')}
                                                onMouseEnter={() => handleLinkHover('adidasQuan')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Quần
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                                style={getDropdownItemStyle('adidasGiay')}
                                                onMouseEnter={() => handleLinkHover('adidasGiay')}
                                                onMouseLeave={handleLinkLeave}
                                            >
                                                Giày
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold"
                                to="#"
                                style={getLinkStyle('phuKien')}
                                onMouseEnter={() => handleLinkHover('phuKien')}
                                onMouseLeave={handleLinkLeave}
                            >
                                PHỤ KIỆN
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold"
                                to="#"
                                style={getLinkStyle('heThong')}
                                onMouseEnter={() => handleLinkHover('heThong')}
                                onMouseLeave={handleLinkLeave}
                            >
                                HỆ THỐNG CỬA HÀNG
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold"
                                to="#"
                                style={getLinkStyle('tinTuc')}
                                onMouseEnter={() => handleLinkHover('tinTuc')}
                                onMouseLeave={handleLinkLeave}
                            >
                                TIN TỨC
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Navigation - Accordion Style */}
                    <div className="d-lg-none w-100">
                        <div className="accordion accordion-flush" id="mobileNavAccordion">
                            {/* THỂ THAO Accordion Item */}
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed py-3 fw-semibold"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTheThao"
                                        aria-expanded="false"
                                    >
                                        THỂ THAO
                                    </button>
                                </h2>
                                <div id="collapseTheThao" className="accordion-collapse collapse" data-bs-parent="#mobileNavAccordion">
                                    <div className="accordion-body p-0">
                                        {/* Nested Accordion for Bóng Đá */}
                                        <div className="accordion accordion-flush" id="footballAccordion">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button
                                                        className="accordion-button collapsed ps-4 py-2"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseBongDa"
                                                    >
                                                        Bóng Đá
                                                    </button>
                                                </h2>
                                                <div id="collapseBongDa" className="accordion-collapse collapse" data-bs-parent="#footballAccordion">
                                                    <div className="accordion-body p-0">
                                                        <ul className="list-unstyled ps-5 py-1">
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Áo CLB</Link></li>
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Áo Tuyển Quốc Gia</Link></li>
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Giày Đá bóng</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="list-unstyled ps-4 py-1">
                                            <li className="py-2"><Link to="#" className="text-decoration-none text-dark">Bóng rổ</Link></li>
                                            <li className="py-2"><Link to="#" className="text-decoration-none text-dark">Cầu lông</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* THỜI TRANG Accordion Item */}
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed py-3 fw-semibold"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThoiTrang"
                                        aria-expanded="false"
                                    >
                                        THỜI TRANG
                                    </button>
                                </h2>
                                <div id="collapseThoiTrang" className="accordion-collapse collapse" data-bs-parent="#mobileNavAccordion">
                                    <div className="accordion-body p-0">
                                        {/* Nike Accordion */}
                                        <div className="accordion accordion-flush" id="nikeAccordion">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button
                                                        className="accordion-button collapsed ps-4 py-2"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseNike"
                                                    >
                                                        Nike
                                                    </button>
                                                </h2>
                                                <div id="collapseNike" className="accordion-collapse collapse" data-bs-parent="#nikeAccordion">
                                                    <div className="accordion-body p-0">
                                                        <ul className="list-unstyled ps-5 py-1">
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Áo</Link></li>
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Quần</Link></li>
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Giày</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Adidas Accordion */}
                                        <div className="accordion accordion-flush" id="adidasAccordion">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button
                                                        className="accordion-button collapsed ps-4 py-2"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseAdidas"
                                                    >
                                                        Adidas
                                                    </button>
                                                </h2>
                                                <div id="collapseAdidas" className="accordion-collapse collapse" data-bs-parent="#adidasAccordion">
                                                    <div className="accordion-body p-0">
                                                        <ul className="list-unstyled ps-5 py-1">
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Áo</Link></li>
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Quần</Link></li>
                                                            <li className="py-1"><Link to="#" className="text-decoration-none text-dark">Giày</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PHỤ KIỆN Menu Item */}
                            <div className="py-3 ps-3 border-bottom">
                                <Link to="#" className="text-decoration-none text-dark fw-semibold">PHỤ KIỆN</Link>
                            </div>

                            {/* HỆ THỐNG CỬA HÀNG Menu Item */}
                            <div className="py-3 ps-3 border-bottom">
                                <Link to="#" className="text-decoration-none text-dark fw-semibold">HỆ THỐNG CỬA HÀNG</Link>
                            </div>

                            {/* TIN TỨC Menu Item */}
                            <div className="py-3 ps-3 border-bottom">
                                <Link to="#" className="text-decoration-none text-dark fw-semibold">TIN TỨC</Link>
                            </div>
                        </div>
                    </div>

                    {/* Right side icons for desktop */}
                    {!isMobile && (
                        <div className="d-flex align-items-center">
                            <Link className="nav-link px-2 px-md-3" to="/account" aria-label="Account">
                                <i className="fa-solid fa-user"></i>
                            </Link>
                            <Link className="nav-link px-2 px-md-3" to="/search" aria-label="Search">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Link>
                            <Link className="nav-link px-2 px-md-3 position-relative" to="/cart" aria-label="Cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    0
                                </span>
                            </Link>
                        </div>
                    )}

                    {/* Account section for mobile - at the bottom of menu */}
                    {isMobile && (
                        <div className="mt-3 pt-3 border-top">
                            <Link to="/account" className="btn btn-outline-primary d-block mb-2">
                                <i className="fa-solid fa-user me-2"></i>Đăng nhập / Đăng ký
                            </Link>
                            <div className="d-flex justify-content-between mt-3">
                                <Link to="/wishlist" className="text-decoration-none text-secondary small">
                                    <i className="fa-regular fa-heart me-1"></i> Yêu thích
                                </Link>
                                <Link to="/orders" className="text-decoration-none text-secondary small">
                                    <i className="fa-solid fa-box me-1"></i> Đơn hàng
                                </Link>
                                <Link to="/support" className="text-decoration-none text-secondary small">
                                    <i className="fa-solid fa-headset me-1"></i> Hỗ trợ
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
