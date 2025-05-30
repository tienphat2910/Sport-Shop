import React from 'react';

const CategorySection = ({ loading }) => {
    return (
        <div className="mb-4">
            <h4 className="text-center mb-3">
                {loading ? <span className="placeholder col-4"></span> : "Browse Categories"}
            </h4>
            <div className="row g-2 row-cols-4">
                {['Football', 'Basketball', 'Running', 'Tennis'].map((category, index) => (
                    <div key={index} className="col text-center">
                        {loading ? (
                            <div className="placeholder-glow d-flex flex-column align-items-center">
                                <div className="placeholder rounded-circle" style={{ width: '60px', height: '60px' }}></div>
                                <span className="placeholder col-8 mt-2"></span>
                            </div>
                        ) : (
                            <a href="#" className="text-decoration-none">
                                <div
                                    className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                                    style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0' }}
                                >
                                    <i className={`fa-solid fa-${['futbol', 'basketball', 'person-running', 'table-tennis-paddle-ball'][index]}`}></i>
                                </div>
                                <span className="small d-block text-dark">{category}</span>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
