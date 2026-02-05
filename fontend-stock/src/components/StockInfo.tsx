import React from 'react';

// 1. Định nghĩa bảng màu (Dùng 'const' để TS tự infer type)
const COLORS = {
    up: '#00c076',      // Xanh tăng
    down: '#ff4d4f',    // Đỏ giảm
    ceil: '#ce22ca',    // Tím trần
    floor: '#00c5c5',   // Xanh lơ sàn
    ref: '#ffd900',     // Vàng tham chiếu
    text: '#ffffff',    // Chữ trắng
    label: '#aaaaaa'    // Chữ nhãn mờ
};

// 2. Định nghĩa Interface cho Component con
interface StatItemProps {
    label: string;
    value: string | number; // Giá trị có thể là số hoặc chuỗi đã format
    color?: string;         // Màu sắc (không bắt buộc, có default)
    hasBorder?: boolean;    // Có hiện vạch ngăn cách bên phải không?
}

// 3. Component con: StatItem
const StatItem: React.FC<StatItemProps> = ({
    label,
    value,
    color = COLORS.text,
    hasBorder = true
}) => (
    <div
        className='d-flex flex-column justify-content-center px-3 mx-2'
        style={{
            borderRight: hasBorder ? '1px solid #444' : 'none'
        }}
    >
        <span style={{ fontSize: '0.75rem', color: COLORS.label, marginBottom: '2px' }}>
            {label}
        </span>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: color }}>
            {value}
        </span>
    </div>
);

// 4. Component chính: StockTicker
export const StockTicker: React.FC = () => {
    return (
        <div
            className='d-flex align-items-center'
            style={{
                padding: '12px 20px',
                borderBottom: '1px solid #333',
                backgroundColor: '#1f1f1f',
                color: '#fff',
                whiteSpace: 'nowrap',
                overflowX: 'auto',
                width: '100%' // Đảm bảo full width
            }}
        >
            {/* --- Phần 1: Mã CK & Giá Hiện Tại --- */}
            <div className='d-flex align-items-center me-4'>
                <div className='me-3'>
                    <div className='d-flex align-items-center gap-2'>
                        <h4 className='m-0 fw-bold' style={{ fontSize: '1.5rem', color: '#fff' }}>VCB</h4>
                        <i className="bi bi-star-fill" style={{ color: '#fadb14', cursor: 'pointer', fontSize: '1rem' }}></i>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Vietcombank</span>
                </div>

                <div className='d-flex flex-column align-items-end'>
                    <h4 className='m-0 fw-bold' style={{ color: COLORS.up, fontSize: '1.5rem' }}>76.10</h4>
                    <small style={{ color: COLORS.up, fontSize: '0.85rem' }}>+0.30 (+0.5%)</small>
                </div>
            </div>

            {/* --- Phần 2: Các chỉ số phụ --- */}
            <div className='d-flex'>
                <StatItem label="Trần" value="81.40" color={COLORS.ceil} />
                <StatItem label="Sàn" value="70.60" color={COLORS.floor} />
                <StatItem label="TC" value="76.00" color={COLORS.ref} />

                <StatItem label="Mở cửa" value="76.10" color={COLORS.up} />
                <StatItem label="Cao nhất" value="76.50" color={COLORS.up} />
                <StatItem label="Thấp nhất" value="75.90" color={COLORS.down} />

                {/* Item cuối cùng: truyền hasBorder={false} để bỏ vạch kẻ */}
                <StatItem
                    label="KL (CP)"
                    value="1,234,500"
                    hasBorder={false}
                />
            </div>
        </div>
    );
};