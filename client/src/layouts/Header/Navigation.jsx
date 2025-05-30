import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

const Navigation = () => {
    const [activeMainMenu, setActiveMainMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMainMenuEnter = (menu) => {
        setActiveMainMenu(menu);
    };

    const handleMainMenuLeave = () => {
        setActiveMainMenu(null);
    };

    const handleSubMenuEnter = (menu) => {
        setActiveSubMenu(menu);
    };

    const handleSubMenuLeave = () => {
        setActiveSubMenu(null);
    };

    const handleLinkHover = (item) => {
        setHoveredItem(item);
    };

    const handleLinkLeave = () => {
        setHoveredItem(null);
    };

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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-0">
            <div className="container-fluid px-4">
                {/* Logo */}
                <Link className="navbar-brand me-5" to="/">
                    <img src={logo} alt="Li-Ning Logo" height="70" width="70" />
                </Link>

                {/* Hamburger menu for mobile */}
                <button
                    className="navbar-toggler"
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
                    <ul className="navbar-nav me-auto mb-0">

                        {/* Dropdown THỂ THAO with hover */}
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

                        {/* Dropdown THỜI TRANG with hover */}
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

                    {/* Right side icons */}
                    <div className="d-flex align-items-center">
                        <Link className="nav-link px-3" to="/account" aria-label="Account">
                            <i className="fa-solid fa-user"></i>
                        </Link>
                        <Link className="nav-link px-3" to="/search" aria-label="Search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                        <Link className="nav-link px-3 position-relative" to="/cart" aria-label="Cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                0
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
