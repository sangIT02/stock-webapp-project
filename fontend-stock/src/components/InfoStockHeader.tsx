import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const TABS = {
    CHART: 'chart',
    PRICE: 'price',
    PORTFOLIO: 'portfolio'
};

export const InfoStockHeader = () => {
    const nav = useNavigate();
    const location = useLocation(); // Lấy URL hiện tại để highlight đúng tab khi F5
    const [activeTab, setActiveTab] = useState(TABS.CHART);

    // 1. Đồng bộ URL với Tab (Fix lỗi F5 mất active)
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('price')) setActiveTab(TABS.PRICE);
        else if (path.includes('portfolio')) setActiveTab(TABS.PORTFOLIO);
        else setActiveTab(TABS.CHART);
    }, [location]);

    // 2. Hàm xử lý chuyển tab (Nhận trực tiếp key và path)
    const handleTabChange = (tabKey: string, routePath: string) => {
        setActiveTab(tabKey); // Đổi màu vàng
        nav(routePath);       // Chuyển trang
    };

    return (
        <div className="d-flex flex-column h-100 bg-black">

            <div
                className='d-flex align-items-center border-bottom border-secondary'
                style={{ marginTop: "5px", borderColor: '#333 !important' }}
            >
                {/* 1. Tab Biểu đồ */}
                <div
                    // 👇 GỌI HÀM KIỂU NÀY: Truyền Key và Route tương ứng
                    onClick={() => handleTabChange(TABS.CHART, '/home/chart')}
                    className={`py-2 mx-3 fw-bold ${activeTab === TABS.CHART ? 'text-warning border-bottom border-warning border-3' : 'text-secondary'}`}
                    style={{ cursor: 'pointer', transition: '0.2s' }}
                >
                    Biểu đồ
                </div>

                {/* 2. Tab Bảng giá */}
                <div
                    onClick={() => handleTabChange(TABS.PRICE, '/home/price')}
                    className={`py-2 mx-3 fw-bold ${activeTab === TABS.PRICE ? 'text-warning border-bottom border-warning border-3' : 'text-secondary'}`}
                    style={{ cursor: 'pointer', transition: '0.2s' }}
                >
                    Bảng giá
                </div>

                {/* 3. Tab Danh mục */}
                <div
                    onClick={() => handleTabChange(TABS.PORTFOLIO, '/home/portfolio')}
                    className={`py-2 mx-3 fw-bold ${activeTab === TABS.PORTFOLIO ? 'text-warning border-bottom border-warning border-3' : 'text-secondary'}`}
                    style={{ cursor: 'pointer', transition: '0.2s' }}
                >
                    Danh mục của tôi
                </div>
            </div>

        </div>
    );
};