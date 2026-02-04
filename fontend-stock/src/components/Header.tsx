import React, { useState, useEffect } from 'react';

export const Header = () => {
    // --- STATE CHO ĐỒNG HỒ ---
    const [currentTime, setCurrentTime] = useState(new Date());
    const [marketStatus, setMarketStatus] = useState<string>('CLOSED'); // OPEN, BREAK, CLOSED
    const [showAssetMenu, setShowAssetMenu] = useState<boolean>(false);
    // --- STATE CHO THEME ---
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Effect: Cập nhật giờ mỗi giây
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            checkMarketStatus(now);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Hàm kiểm tra trạng thái thị trường (Giờ VN)
    const checkMarketStatus = (date: Date) => {
        const hour = date.getHours();
        const minute = date.getMinutes();
        const totalMinutes = hour * 60 + minute;

        // 9:00 (540) - 11:30 (690): Sáng
        // 13:00 (780) - 14:45 (885): Chiều
        if ((totalMinutes >= 540 && totalMinutes <= 690) || (totalMinutes >= 780 && totalMinutes <= 885)) {
            setMarketStatus('OPEN');
        } else if (totalMinutes > 690 && totalMinutes < 780) {
            setMarketStatus('BREAK');
        } else {
            setMarketStatus('CLOSED');
        }
    };

    // Hàm format giờ HH:mm:ss
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('vi-VN', { hour12: false });
    };

    // Hàm lấy màu sắc theo trạng thái
    const getStatusColor = () => {
        if (marketStatus === 'OPEN') return 'text-success'; // Xanh lá
        if (marketStatus === 'BREAK') return 'text-warning'; // Vàng
        return 'text-secondary'; // Xám tối
    };

    return (
        <div className='d-flex justify-content-between align-items-center bg-black py-2 px-3 border-bottom border-secondary'>
            {/* --- LOGO --- */}
            <h1
                className='text-light m-0 user-select-none'
                style={{
                    fontFamily: "'Kanit', sans-serif",
                    fontWeight: 900,
                    fontSize: '2rem',
                    letterSpacing: '-1px',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    cursor: 'pointer'
                }}
                onClick={() => window.location.href = "/"}
            >
                FUTU
            </h1>

            {/* --- RIGHT ACTION GROUP --- */}
            <div className='d-flex align-items-center gap-4'>

                {/* 1. ĐỒNG HỒ GIAO DỊCH (Mới) */}
                <div className='d-none d-lg-flex flex-column align-items-end me-2'>
                    <span className={`fw-bold small ${getStatusColor()}`} style={{ fontSize: '0.75rem' }}>
                        {marketStatus === 'OPEN' ? '● Đang giao dịch' : (marketStatus === 'BREAK' ? '○ Nghỉ trưa' : '○ Đóng cửa')}
                    </span>
                    <span className='text-light font-monospace fw-bold'>
                        {formatTime(currentTime)}
                    </span>
                </div>

                {/* Vách ngăn nhỏ cho đẹp */}
                <div className="vr text-secondary d-none d-lg-block" style={{ height: '25px' }}></div>

                {/* 2. Search */}
                <i
                    className="bi bi-bell text-light fs-5 hover-effect"
                    style={{ cursor: 'pointer' }}
                    title="Tìm kiếm mã chứng khoán"
                ></i>

                {/* 3. Theme Toggle (Mới) */}
                <div
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    style={{ cursor: 'pointer' }}
                    title="Đổi giao diện Sáng/Tối"
                >
                    {isDarkMode ? (
                        <i className="bi bi-moon-stars-fill text-warning fs-5"></i>
                    ) : (
                        <i className="bi bi-sun-fill text-warning fs-5"></i>
                    )}
                </div>


                <div
                    className='position-relative py-2' // position-relative để menu con bám theo
                    onMouseEnter={() => setShowAssetMenu(true)} // Chuột vào -> Hiện
                    onMouseLeave={() => setShowAssetMenu(false)} // Chuột ra -> Ẩn
                    style={{ cursor: 'pointer' }}
                >
                    {/* Nút hiển thị chính */}
                    <div className='d-flex align-items-center text-light gap-2'>
                        <i className="bi bi-wallet2 fs-5"></i>
                        <span className='fw-bold d-none d-md-block'>Tài sản</span>
                        {/* Mũi tên nhỏ chỉ xuống cho UX */}
                        <i className={`bi bi-chevron-down small transition-icon ${showAssetMenu ? 'rotate-180' : ''}`} style={{ fontSize: '0.7rem' }}></i>
                    </div>

                    {/* --- MENU XỔ XUỐNG --- */}
                    {showAssetMenu && (
                        <div
                            className='position-absolute bg-dark border border-secondary rounded shadow-lg p-2'
                            style={{
                                top: '100%',     // Nằm ngay dưới
                                right: 0,        // Canh lề phải thẳng hàng với nút cha
                                width: '200px',  // Chiều rộng menu
                                zIndex: 1000     // Đè lên mọi thứ khác
                            }}
                        >
                            {/* Mũi tên tam giác nhỏ chỉ lên (Trang trí) */}
                            <div style={{
                                position: 'absolute', top: '-6px', right: '20px',
                                width: 0, height: 0,
                                borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                                borderBottom: '6px solid #212529' // Màu trùng bg-dark
                            }}></div>

                            {/* Các Item trong menu */}
                            <DropdownItem icon="bi-pie-chart-fill" text="Tổng quan tài sản" />
                            <DropdownItem icon="bi-cash-coin" text="Nạp tiền" />
                            <DropdownItem icon="bi-bank" text="Rút tiền" />
                            <hr className='text-secondary my-1' />
                            <DropdownItem icon="bi-clock-history" text="Lịch sử giao dịch" />
                        </div>
                    )}
                </div>
                {/* 5. User */}
                <div style={{ cursor: 'pointer' }}>
                    <i className="bi bi-person-circle text-light fs-4"></i>
                </div>
            </div>
        </div>
    )
}
const DropdownItem = ({ icon, text }: { icon: string, text: string }) => {
    return (
        <div 
            className='d-flex align-items-center gap-2 text-light p-2 rounded hover-bg-gray'
            style={{ transition: '0.2s' }}
            onClick={() => console.log("Click " + text)}
        >
            <i className={`bi ${icon} text-secondary`}></i>
            <span style={{ fontSize: '0.9rem' }}>{text}</span>
        </div>
    );
}