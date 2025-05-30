import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const DesktopMenu = ({
    activeMainMenu,
    activeSubMenu,
    hoveredItem,
    handleMainMenuEnter,
    handleMainMenuLeave,
    handleSubMenuEnter,
    handleSubMenuLeave,
    handleLinkHover,
    handleLinkLeave
}) => {
    const [closeTimeout, setCloseTimeout] = useState(null);
    const menuRefs = useRef({});

    // Clear timeout when component unmounts
    useEffect(() => {
        return () => {
            if (closeTimeout) clearTimeout(closeTimeout);
        };
    }, [closeTimeout]);

    // Handle hover with delay for better user experience
    const handleMenuEnter = (menu) => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }
        handleMainMenuEnter(menu);
    };

    const handleMenuLeave = () => {
        const timeout = setTimeout(() => {
            handleMainMenuLeave();
        }, 300); // 300ms delay before closing
        setCloseTimeout(timeout);
    };

    // Handle submenu hover with delay
    const handleSubmenuEnter = (menu) => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }
        handleSubMenuEnter(menu);
        handleLinkHover(menu);
    };

    const handleSubmenuLeave = () => {
        const timeout = setTimeout(() => {
            handleSubMenuLeave();
            handleLinkLeave();
        }, 300); // 300ms delay before closing
        setCloseTimeout(timeout);
    };

    // Dropdown styles
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

    const getDropdownItemStyle = (item) => {
        return {
            color: hoveredItem === item ? '#22a7e0' : '',
            textDecoration: hoveredItem === item ? 'underline' : 'none',
            textUnderlineOffset: '3px',
            transition: 'color 0.2s ease'
        }
    }

    // Define common dropdown menu styles with improved spacing
    const mainDropdownStyle = {
        margin: '0',
        padding: '10px 0', // Increased padding
        borderRadius: '4px',
        border: 'none',
        minWidth: '220px', // Wider dropdown
        zIndex: 1000,
        marginTop: '0', // Remove margin to eliminate gap
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)' // Better shadow
    };

    const subDropdownStyle = {
        left: 'calc(100% - 5px)', // Overlap slightly to prevent losing hover
        top: '0',
        margin: '0',
        padding: '10px 0', // Increased padding
        borderRadius: '4px',
        border: 'none',
        minWidth: '220px',
        zIndex: 1001,
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)' // Better shadow
    };

    // Create better padding for dropdown items
    const dropdownItemClass = "dropdown-item py-2 px-4"; // More padding

    return (
        <ul className="navbar-nav me-auto mb-0 d-none d-lg-flex">
            {/* Dropdown THỂ THAO with hover for desktop */}
            <li
                className="nav-item dropdown"
                onMouseEnter={() => handleMenuEnter('theThao')}
                onMouseLeave={handleMenuLeave}
                ref={el => menuRefs.current['theThao'] = el}
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
                        ...mainDropdownStyle,
                        display: activeMainMenu === 'theThao' ? 'block' : 'none'
                    }}
                >
                    {/* Bóng Đá dropdown with hover */}
                    <li
                        className="dropend"
                        onMouseEnter={() => handleSubmenuEnter('bongDa')}
                        onMouseLeave={handleSubmenuLeave}
                    >
                        <Link
                            className={dropdownItemClass + " dropdown-toggle"}
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
                                ...subDropdownStyle,
                                display: activeSubMenu === 'bongDa' ? 'block' : 'none'
                            }}
                        >
                            <li>
                                <Link
                                    className={dropdownItemClass}
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
                                    className={dropdownItemClass}
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
                                    className={dropdownItemClass}
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
                            className={dropdownItemClass}
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
                            className={dropdownItemClass}
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
                onMouseEnter={() => handleMenuEnter('thoiTrang')}
                onMouseLeave={handleMenuLeave}
                ref={el => menuRefs.current['thoiTrang'] = el}
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
                        ...mainDropdownStyle,
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
                                ...subDropdownStyle,
                                display: activeSubMenu === 'nike' ? 'block' : 'none'
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
                                ...subDropdownStyle,
                                display: activeSubMenu === 'adidas' ? 'block' : 'none'
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
    );
};

export default DesktopMenu;
