import React, { useState, useEffect } from 'react';

const ShippingForm = ({ data, updateData }) => {
    const [formData, setFormData] = useState(data);
    const [errors, setErrors] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState({
        provinces: false,
        districts: false,
        wards: false
    });
    const [error, setError] = useState(null);

    // Fetch provinces when component mounts
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                setLoading(prev => ({ ...prev, provinces: true }));
                const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
                if (!response.ok) {
                    throw new Error('Failed to fetch provinces');
                }

                const responseData = await response.json();
                console.log('Province API response:', responseData);

                // The API returns an object with province data in the 'data' property
                if (responseData && responseData.data && Array.isArray(responseData.data)) {
                    setProvinces(responseData.data);
                } else {
                    console.error('Unexpected data format:', responseData);
                    setProvinces([]);
                    setError('Dữ liệu tỉnh/thành không hợp lệ');
                }
            } catch (err) {
                setError('Không thể tải dữ liệu tỉnh/thành. Vui lòng thử lại sau.');
                console.error('Error fetching provinces:', err);
                setProvinces([]);
            } finally {
                setLoading(prev => ({ ...prev, provinces: false }));
            }
        };

        fetchProvinces();
    }, []);

    // Fetch districts when province changes
    useEffect(() => {
        if (!formData.province) {
            setDistricts([]);
            return;
        }

        const fetchDistricts = async () => {
            try {
                setLoading(prev => ({ ...prev, districts: true }));
                // Find the province object to get ID
                const selectedProvince = provinces.find(p => p.name === formData.province);
                if (!selectedProvince) {
                    setDistricts([]);
                    return;
                }

                const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince.id}.htm`);
                if (!response.ok) {
                    throw new Error('Failed to fetch districts');
                }

                const responseData = await response.json();
                console.log('District API response:', responseData);

                // The API returns an object with district data in the 'data' property
                if (responseData && responseData.data && Array.isArray(responseData.data)) {
                    setDistricts(responseData.data);

                    // Clear district and ward when province changes
                    if (formData.province !== selectedProvince.name) {
                        setFormData(prev => ({
                            ...prev,
                            district: '',
                            ward: ''
                        }));
                    }
                } else {
                    console.error('Unexpected district data format:', responseData);
                    setDistricts([]);
                    setError('Dữ liệu quận/huyện không hợp lệ');
                }
            } catch (err) {
                setError('Không thể tải dữ liệu quận/huyện. Vui lòng thử lại sau.');
                console.error('Error fetching districts:', err);
                setDistricts([]);
            } finally {
                setLoading(prev => ({ ...prev, districts: false }));
            }
        };

        // Only run if provinces is an array and has items
        if (Array.isArray(provinces) && provinces.length > 0) {
            fetchDistricts();
        }
    }, [formData.province, provinces]);

    // Fetch wards when district changes
    useEffect(() => {
        if (!formData.district) {
            setWards([]);
            return;
        }

        const fetchWards = async () => {
            try {
                setLoading(prev => ({ ...prev, wards: true }));
                // Find the district object to get ID
                const selectedDistrict = districts.find(d => d.name === formData.district);
                if (!selectedDistrict) {
                    setWards([]);
                    return;
                }

                const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.id}.htm`);
                if (!response.ok) {
                    throw new Error('Failed to fetch wards');
                }

                const responseData = await response.json();
                console.log('Ward API response:', responseData);

                // The API returns an object with ward data in the 'data' property
                if (responseData && responseData.data && Array.isArray(responseData.data)) {
                    setWards(responseData.data);

                    // Clear ward when district changes
                    if (formData.district !== selectedDistrict.name) {
                        setFormData(prev => ({
                            ...prev,
                            ward: ''
                        }));
                    }
                } else {
                    console.error('Unexpected ward data format:', responseData);
                    setWards([]);
                    setError('Dữ liệu phường/xã không hợp lệ');
                }
            } catch (err) {
                setError('Không thể tải dữ liệu phường/xã. Vui lòng thử lại sau.');
                console.error('Error fetching wards:', err);
                setWards([]);
            } finally {
                setLoading(prev => ({ ...prev, wards: false }));
            }
        };

        // Only run if districts is an array and has items
        if (Array.isArray(districts) && districts.length > 0) {
            fetchWards();
        }
    }, [formData.district, districts]);

    // Send form data to parent when it changes - USE A REF TO PREVENT INFINITE LOOPS
    const isFirstRender = React.useRef(true);
    useEffect(() => {
        // Skip the first render to prevent unnecessary updates
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Avoid calling updateData too frequently
        const timeoutId = setTimeout(() => {
            updateData(formData);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [formData, updateData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Clear error when field is changed
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'fullName':
                return value.trim() ? '' : 'Vui lòng nhập họ tên';
            case 'phone':
                return /^[0-9]{10}$/.test(value) ? '' : 'Số điện thoại không hợp lệ';
            case 'email':
                return /\S+@\S+\.\S+/.test(value) ? '' : 'Email không hợp lệ';
            case 'address':
                return value.trim() ? '' : 'Vui lòng nhập địa chỉ';
            case 'province':
                return value ? '' : 'Vui lòng chọn tỉnh/thành';
            case 'district':
                return value ? '' : 'Vui lòng chọn quận/huyện';
            case 'ward':
                return value ? '' : 'Vui lòng chọn phường/xã';
            default:
                return '';
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    // Make sure provinces is always an array
    const safeProvinces = Array.isArray(provinces) ? provinces : [];
    const safeDistricts = Array.isArray(districts) ? districts : [];
    const safeWards = Array.isArray(wards) ? wards : [];

    return (
        <div>
            <h4 className="mb-3">Thông tin giao hàng</h4>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button
                        type="button"
                        className="btn-close float-end"
                        onClick={() => setError(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            <div className="row g-3">
                {/* Full Name */}
                <div className="col-12">
                    <label htmlFor="fullName" className="form-label">Họ và tên <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>

                {/* Phone and Email */}
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Số điện thoại <span className="text-danger">*</span></label>
                    <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Số điện thoại 10 số"
                        required
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Address selects */}
                <div className="col-md-4">
                    <label htmlFor="province" className="form-label">Tỉnh/Thành <span className="text-danger">*</span></label>
                    <select
                        className={`form-select ${errors.province ? 'is-invalid' : ''}`}
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading.provinces}
                        required
                    >
                        <option value="">Chọn tỉnh/thành</option>
                        {loading.provinces ? (
                            <option disabled>Đang tải...</option>
                        ) : (
                            safeProvinces.map(province => (
                                <option key={province.id} value={province.name}>
                                    {province.name}
                                </option>
                            ))
                        )}
                    </select>
                    {errors.province && <div className="invalid-feedback">{errors.province}</div>}
                </div>

                <div className="col-md-4">
                    <label htmlFor="district" className="form-label">Quận/Huyện <span className="text-danger">*</span></label>
                    <select
                        className={`form-select ${errors.district ? 'is-invalid' : ''}`}
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!formData.province || loading.districts}
                        required
                    >
                        <option value="">Chọn quận/huyện</option>
                        {loading.districts ? (
                            <option disabled>Đang tải...</option>
                        ) : (
                            safeDistricts.map(district => (
                                <option key={district.id} value={district.name}>
                                    {district.name}
                                </option>
                            ))
                        )}
                    </select>
                    {errors.district && <div className="invalid-feedback">{errors.district}</div>}
                </div>

                <div className="col-md-4">
                    <label htmlFor="ward" className="form-label">Phường/Xã <span className="text-danger">*</span></label>
                    <select
                        className={`form-select ${errors.ward ? 'is-invalid' : ''}`}
                        id="ward"
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!formData.district || loading.wards}
                        required
                    >
                        <option value="">Chọn phường/xã</option>
                        {loading.wards ? (
                            <option disabled>Đang tải...</option>
                        ) : (
                            safeWards.map(ward => (
                                <option key={ward.id} value={ward.name}>
                                    {ward.name}
                                </option>
                            ))
                        )}
                    </select>
                    {errors.ward && <div className="invalid-feedback">{errors.ward}</div>}
                </div>

                {/* Detailed Address */}
                <div className="col-12">
                    <label htmlFor="address" className="form-label">Địa chỉ chi tiết <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Số nhà, tên đường..."
                        required
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                {/* Notes */}
                <div className="col-12">
                    <label htmlFor="notes" className="form-label">Ghi chú (tùy chọn)</label>
                    <textarea
                        className="form-control"
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Hướng dẫn giao hàng, thời gian nhận hàng..."
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default ShippingForm;
