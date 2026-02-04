import React, { useState } from 'react'

type OrderFormProps = {
    symbol: string;           // Mã CK (VD: VCB)
    currentPrice: number | null; // Giá thị trường hiện tại
    balance?: number;         // Sức mua (Optional)
    onSubmit: (type: 'BUY' | 'SELL', quantity: number, price: number) => void; // Hàm callback gửi lên cha
}
export const OrderForm = ({ symbol, currentPrice, onSubmit }:OrderFormProps) => {
    const [quantity, setQuantity] = useState<number>(100);
    const [price, setPrice] = useState<number>(currentPrice || 0); 
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
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Khối lượng</label>
                    <input type="number" placeholder="100" style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #555', color: '#fff' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Giá đặt</label>
                    <input type="number" placeholder={currentPrice ? currentPrice.toString() : "0"} style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #555', color: '#fff' }} />
                </div>

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
