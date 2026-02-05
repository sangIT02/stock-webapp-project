import React, { useState } from 'react'
import { OrderType } from './OrderType';
import { ConfigProvider, theme } from 'antd';

type OrderFormProps = {
    symbol: string;           // Mã CK (VD: VCB)
    currentPrice: number | null; // Giá thị trường hiện tại
    balance?: number;         // Sức mua (Optional)
    onSubmit: (type: 'BUY' | 'SELL', quantity: number, price: number) => void; // Hàm callback gửi lên cha
}
export const OrderForm = ({ symbol, currentPrice, onSubmit }: OrderFormProps) => {
    const [quantity, setQuantity] = useState<number>(100);
    const [price, setPrice] = useState<number>(currentPrice || 0);
    const [showSltp, setShowSltp] = useState<boolean>(false);
    const inputStyle = {
        background: '#333',
        border: '1px solid #555',
        color: '#fff',
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        outline: 'none'
    };
    return (
        <div style={{
            flex: 1, // Chiếm phần còn lại (25%)
            backgroundColor: '#1E1E1E',
            borderRadius: '4px',
            padding: '15px',
            border: '1px solid #333'
        }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '10px' }}>Đặt lệnh</h3>

            {/* Form giả lập */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Mã CK</label>
                    <input type="text" value={symbol} disabled style={{ width: '100%', padding: '8px', background: '#333', border: 'none', color: '#fff' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '15px', fontSize: '0.9em' }}>Loại lệnh </label>
                    <OrderType />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Khối lượng</label>
                    {/* <input type="number" placeholder="100" style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #555', color: '#fff' }} /> */}
                    <div className='rounded-2 d-flex justify-content-between' style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #555', color: '#fff' }}>
                        <button style={{ backgroundColor: "transparent", border: 'none' }}>
                            <i className="bi bi-dash fw-bold text-white"></i>
                        </button>
                        <input
                            type="number"
                            className="text-center fw-bold text-white no-spinner" // <--- Thêm class no-spinner
                            placeholder="0"
                            style={{
                                backgroundColor: "transparent",
                                border: 'none',
                                outline: 'none', // <--- Dòng này để tắt viền khi click vào
                                width: '100%'    // Nên thêm width 100% để full ô
                            }}
                        />
                        <button style={{ backgroundColor: "transparent", border: 'none' }}>
                            <i className="bi bi-plus text-white fw-bold"></i>
                        </button>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Giá đặt</label>
                    <div className='rounded-2 d-flex justify-content-between' style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #555', color: '#fff' }}>
                        <input
                            type="number"
                            className="text-center fw-bold text-white no-spinner" // <--- Thêm class no-spinner
                            placeholder="0"
                            style={{
                                backgroundColor: "transparent",
                                border: 'none',
                                outline: 'none', // <--- Dòng này để tắt viền khi click vào
                                width: '100%'    // Nên thêm width 100% để full ô
                            }}
                        />
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <input type="checkbox" name="" id="sltp-checkbox" checked={showSltp}
                        onChange={(e) => setShowSltp(e.target.checked)} />
                    <p className="m-0 ms-2">SL/TP</p>
                </div>
                {showSltp && (
                    <div className="d-flex gap-2 animate-fade-in">

                        {/* Ô Stop Loss (SL) */}
                        <div style={{ width: '50%' }}>
                            <label style={{ fontSize: '0.8em', color: '#aaa', display: 'block', marginBottom: '4px' }}>
                                Stop Loss
                            </label>
                            <input
                                type="number"
                                placeholder="Giá cắt lỗ"
                                style={inputStyle}
                            />
                        </div>

                        {/* Ô Take Profit (TP) */}
                        <div style={{ width: '50%' }}>
                            <label style={{ fontSize: '0.8em', color: '#aaa', display: 'block', marginBottom: '4px' }}>
                                Take Profit
                            </label>
                            <input
                                type="number"
                                placeholder="Giá chốt lời"
                                style={inputStyle}
                            />
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button style={{ flex: 1, padding: '10px', backgroundColor: '#089981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        MUA
                    </button>
                    <button style={{ flex: 1, padding: '10px', backgroundColor: '#f23645', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        BÁN
                    </button>
                </div>
            </div>

        </div>
    )
}
