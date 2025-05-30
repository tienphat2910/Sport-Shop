import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
    return (
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

            {/* Account section for mobile */}
            <div className="mt-3 pt-3 border-top">
                <Link to="/login" className="btn btn-outline-primary d-block mb-2">
                    <i className="fa-solid fa-right-to-bracket me-2"></i>Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-outline-secondary d-block mb-2">
                    <i className="fa-solid fa-user-plus me-2"></i>Đăng ký
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
        </div>
    );
};

export default MobileMenu;
