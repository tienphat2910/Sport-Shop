import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../data/image';

const Footer = () => {
    const [hovered, setHovered] = useState(null);

    const getLinkStyle = (id) => ({
        color: hovered === id ? '#22a7e0' : '#666',
        textDecoration: hovered === id ? 'underline' : 'none',
        transition: 'color 0.2s',
        fontSize: '13px',
        display: 'block',
        marginBottom: '0.5rem'
    });

    const getIconStyle = (id) => ({
        color: hovered === id ? '#22a7e0' : '#666',
        fontSize: '18px',
        transition: 'color 0.2s',
        marginRight: '1rem'
    });

    const headingStyle = {
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '20px',
        color: '#000'
    };

    return (
        <footer className="bg-white pt-4 pt-md-5 text-dark" style={{ fontSize: '14px' }}>
            <div className="container">
                {/* Mobile accordion footer */}
                <div className="d-block d-sm-none">
                    <div className="accordion accordion-flush" id="footerAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    SPORT SHOP IN VIET NAM
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#footerAccordion">
                                <div className="accordion-body">
                                    {['intro', 'stores', 'contact'].map((key, index) => (
                                        <Link
                                            key={key}
                                            to={['/gioi-thieu', '/he-thong-cua-hang', '/lien-he'][index]}
                                            style={{ ...getLinkStyle(key), marginBottom: '0.75rem' }}
                                            onMouseEnter={() => setHovered(key)}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                                            {['GIỚI THIỆU', 'HỆ THỐNG CỬA HÀNG', 'THÔNG TIN LIÊN HỆ'][index]}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                    CHÍNH SÁCH BÁN HÀNG
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#footerAccordion">
                                <div className="accordion-body">
                                    {[
                                        { to: '/bao-mat', label: 'BẢO MẬT', id: 'privacy' },
                                        { to: '/thanh-toan', label: 'THANH TOÁN', id: 'payment' },
                                        { to: '/van-chuyen', label: 'VẬN CHUYỂN', id: 'shipping' },
                                        { to: '/doi-tra-online', label: 'ĐỔI TRẢ HÀNG MUA ONLINE', id: 'returnOnline' },
                                        { to: '/doi-tra-tai-cua-hang', label: 'ĐỔI TRẢ HÀNG MUA TẠI CỬA HÀNG', id: 'returnStore' }
                                    ].map(item => (
                                        <Link
                                            key={item.id}
                                            to={item.to}
                                            style={getLinkStyle(item.id)}
                                            onMouseEnter={() => setHovered(item.id)}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                    HỖ TRỢ KHÁCH HÀNG
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#footerAccordion">
                                <div className="accordion-body">
                                    {[
                                        { to: '/dieu-khoan', label: 'ĐIỀU KHOẢN DỊCH VỤ', id: 'terms' },
                                        { to: '/huong-dan-mua-hang', label: 'HƯỚNG DẪN MUA HÀNG', id: 'buyGuide' },
                                        { to: '/huong-dan-size', label: 'HƯỚNG DẪN ĐO SIZE VÀ BẢO QUẢN', id: 'sizeGuide' },
                                        { to: '/huong-dan-thanh-toan', label: 'HƯỚNG DẪN THANH TOÁN', id: 'paymentGuide' }
                                    ].map(item => (
                                        <Link
                                            key={item.id}
                                            to={item.to}
                                            style={getLinkStyle(item.id)}
                                            onMouseEnter={() => setHovered(item.id)}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter for mobile */}
                    <div className="mt-4 px-2">
                        <div style={headingStyle} className="text-center">
                            <div>
                                NEWSLETTER
                                <span className="d-block mt-2 mx-auto" style={{ width: '40px', height: '2px', backgroundColor: '#22a7e0' }}></span>
                            </div>
                        </div>
                        <p className="text-center small">Đăng ký nhận bản tin để cập nhật những tin tức mới nhất</p>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Địa chỉ email của bạn" />
                            <button className="btn text-white" style={{ backgroundColor: '#22a7e0' }}>Đăng ký</button>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            {['facebook', 'instagram', 'youtube', 'tiktok'].map((platform) => (
                                <a
                                    key={platform}
                                    href={`https://www.${platform}.com/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={getIconStyle(platform)}
                                    onMouseEnter={() => setHovered(platform)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    <i className={`fab fa-${platform === 'tiktok' ? 'tiktok' : platform}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop footer - keep existing layout */}
                <div className="row gy-4 d-none d-sm-flex">
                    {/* Column 1 */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div style={headingStyle} className="d-flex justify-content-center justify-content-sm-start">
                            <div>
                                SPORT SHOP IN VIET NAM
                                <span className="d-block mt-2" style={{ width: '40px', height: '2px', backgroundColor: '#22a7e0' }}></span>
                            </div>
                        </div>
                        <div className="text-center text-sm-start">
                            {['intro', 'stores', 'contact'].map((key, index) => (
                                <Link
                                    key={key}
                                    to={['/gioi-thieu', '/he-thong-cua-hang', '/lien-he'][index]}
                                    style={getLinkStyle(key)}
                                    onMouseEnter={() => setHovered(key)}
                                    onMouseLeave={() => setHovered(null)}
                                    className="d-inline-block d-sm-block"
                                >
                                    {['GIỚI THIỆU', 'HỆ THỐNG CỬA HÀNG', 'THÔNG TIN LIÊN HỆ'][index]}
                                    {index !== 2 && <span className="d-inline d-sm-none mx-2">|</span>}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div style={headingStyle} className="d-flex justify-content-center justify-content-sm-start">
                            <div>
                                CHÍNH SÁCH BÁN HÀNG
                                <span className="d-block mt-2" style={{ width: '40px', height: '2px', backgroundColor: '#22a7e0' }}></span>
                            </div>
                        </div>
                        <div className="text-center text-sm-start">
                            {[
                                { to: '/bao-mat', label: 'BẢO MẬT', id: 'privacy' },
                                { to: '/thanh-toan', label: 'THANH TOÁN', id: 'payment' },
                                { to: '/van-chuyen', label: 'VẬN CHUYỂN', id: 'shipping' },
                                { to: '/doi-tra-online', label: 'ĐỔI TRẢ HÀNG MUA ONLINE', id: 'returnOnline' },
                                { to: '/doi-tra-tai-cua-hang', label: 'ĐỔI TRẢ HÀNG MUA TẠI CỬA HÀNG', id: 'returnStore' }
                            ].map(item => (
                                <Link
                                    key={item.id}
                                    to={item.to}
                                    style={getLinkStyle(item.id)}
                                    onMouseEnter={() => setHovered(item.id)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div style={headingStyle} className="d-flex justify-content-center justify-content-sm-start">
                            <div>
                                HỖ TRỢ KHÁCH HÀNG
                                <span className="d-block mt-2" style={{ width: '40px', height: '2px', backgroundColor: '#22a7e0' }}></span>
                            </div>
                        </div>
                        <div className="text-center text-sm-start">
                            {[
                                { to: '/dieu-khoan', label: 'ĐIỀU KHOẢN DỊCH VỤ', id: 'terms' },
                                { to: '/huong-dan-mua-hang', label: 'HƯỚNG DẪN MUA HÀNG', id: 'buyGuide' },
                                { to: '/huong-dan-size', label: 'HƯỚNG DẪN ĐO SIZE VÀ BẢO QUẢN', id: 'sizeGuide' },
                                { to: '/huong-dan-thanh-toan', label: 'HƯỚNG DẪN THANH TOÁN', id: 'paymentGuide' }
                            ].map(item => (
                                <Link
                                    key={item.id}
                                    to={item.to}
                                    style={getLinkStyle(item.id)}
                                    onMouseEnter={() => setHovered(item.id)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 4 */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div style={headingStyle} className="d-flex justify-content-center justify-content-sm-start">
                            <div>
                                NEWSLETTER
                                <span className="d-block mt-2" style={{ width: '40px', height: '2px', backgroundColor: '#22a7e0' }}></span>
                            </div>
                        </div>
                        <div className="text-center text-sm-start">
                            <p>Đăng ký nhận bản tin để cập nhật những tin tức mới nhất về Sport Shop in Vietnam</p>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Địa chỉ email của bạn" />
                                <button className="btn text-white" style={{ backgroundColor: '#22a7e0' }}>Đăng ký</button>
                            </div>
                            <div className="d-flex justify-content-center justify-content-sm-start mt-4">
                                {['facebook', 'instagram', 'youtube', 'tiktok'].map((platform) => (
                                    <a
                                        key={platform}
                                        href={`https://www.${platform}.com/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={getIconStyle(platform)}
                                        onMouseEnter={() => setHovered(platform)}
                                        onMouseLeave={() => setHovered(null)}
                                    >
                                        <i className={`fab fa-${platform === 'tiktok' ? 'tiktok' : platform}`}></i>
                                    </a>
                                ))}
                            </div>
                            <div className="mt-4 text-center text-sm-start">
                                <img src={images.bct} alt="Bộ Công Thương" height="40" className="img-fluid" style={{ maxHeight: '60px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer - clean up for mobile */}
            <div className="py-3 border-top mt-4">
                <div className="container">
                    <p className="mb-2 text-center" style={{ fontSize: '13px' }}>Sport Shop in Vietnam</p>
                    <div className="row justify-content-between align-items-center small">
                        <div className="col-12 col-md-8 text-center text-md-start mb-3 mb-md-0">
                            <span className="d-block d-md-inline me-md-3">Hotline: 0376549230</span>
                            <span className="d-block d-md-inline me-md-3">Email: tienphat29102003@gmail.com</span>
                            <span className="d-block d-md-inline">Địa chỉ: Gò Vấp, TPHCM, Việt Nam</span>
                        </div>
                        <div className="col-12 col-md-4 text-center text-md-end" style={{ fontSize: '12px' }}>
                            © Bản quyền thuộc về Sport Shop in Vietnam | Powered by TienPhat
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
