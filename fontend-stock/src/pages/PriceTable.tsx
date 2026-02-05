import React from 'react'

export const PriceTable = () => {
    return (
        <div className="table-responsive bg-black" style={{ height: '750px', overflowY: 'auto' }}>
            <table className="table table-dark table-bordered table-sm text-center mb-0" style={{ fontSize: '0.85rem', verticalAlign: 'middle' }}>

                {/* --- PHẦN HEADER (QUAN TRỌNG) --- */}
                <thead className="sticky-top" style={{ zIndex: 10 }}>
                    {/* HÀNG 1: Tên Nhóm Lớn */}
                    <tr className="align-middle" style={{ backgroundColor: '#2A2A2A' }}>

                        {/* 1. Mã CK (Không gộp ngang, nhưng gộp dọc 2 dòng) */}
                        <th rowSpan={2} style={{ backgroundColor: '#2A2A2A', width: '60px' }}>Mã</th>
                        <th rowSpan={2} style={{ backgroundColor: '#2A2A2A', width: '60px' }}>Trần</th>
                        <th rowSpan={2} style={{ backgroundColor: '#2A2A2A', width: '60px' }}>Sàn</th>
                        <th rowSpan={2} style={{ backgroundColor: '#2A2A2A', width: '60px' }}>Tham chiếu</th>

                        {/* 2. BÊN MUA (Gộp 6 cột: G3, KL3, G2, KL2, G1, KL1) */}
                        <th colSpan={6} style={{ color: '#00F4B0', borderBottom: '2px solid #00F4B0' }}>
                            Bên Mua
                        </th>

                        {/* 3. KHỚP LỆNH (Gộp 3 cột: Giá, KL, +/-) */}
                        <th colSpan={3} style={{ color: '#FFD900', borderBottom: '2px solid #FFD900' }}>
                            Khớp Lệnh
                        </th>

                        {/* 4. BÊN BÁN (Gộp 6 cột) */}
                        <th colSpan={6} style={{ color: '#FF4560', borderBottom: '2px solid #FF4560' }}>
                            Bên Bán
                        </th>

                        {/* 5. TỔNG KL (Gộp dọc) */}
                        <th rowSpan={2} style={{ backgroundColor: '#2A2A2A' }}>T.KL</th>
                    </tr>

                    {/* HÀNG 2: Tên Cột Chi Tiết */}
                    <tr className="small" style={{ backgroundColor: '#2A2A2A' }}>
                        {/* Chi tiết Bên Mua (Thứ tự ưu tiên thấp -> cao) */}
                        <th className="fw-light text-secondary">Giá 3</th>
                        <th className="fw-light text-secondary">KL 3</th>
                        <th className="fw-light text-secondary">Giá 2</th>
                        <th className="fw-light text-secondary">KL 2</th>
                        <th className="fw-light text-secondary">Giá 1</th>
                        <th className="fw-light text-secondary">KL 1</th>

                        {/* Chi tiết Khớp Lệnh */}
                        <th className="fw-bold">Giá</th>
                        <th className="fw-bold">KL</th>
                        <th className="fw-bold">+/-</th>

                        {/* Chi tiết Bên Bán (Thứ tự ưu tiên cao -> thấp) */}
                        <th className="fw-light text-secondary">Giá 1</th>
                        <th className="fw-light text-secondary">KL 1</th>
                        <th className="fw-light text-secondary">Giá 2</th>
                        <th className="fw-light text-secondary">KL 2</th>
                        <th className="fw-light text-secondary">Giá 3</th>
                        <th className="fw-light text-secondary">KL 3</th>
                    </tr>
                </thead>

                {/* --- PHẦN DỮ LIỆU (BODY) --- */}
                <tbody>
                    {[...Array(30)].map((_, index) => (
                        <tr key={index} className="hover-highlight">
                            <td className="fw-bold">
                                <i className="bi bi-star me-1"></i>HPG
                            </td>
                            <td className="text-success">28.00</td>
                            <td className="text-success">28.00</td>
                            <td className="text-success">28.00</td>

                            {/* Bên Mua */}
                            <td className="text-success">28.00</td>
                            <td>10.5</td>
                            <td className="text-success">28.05</td>
                            <td>5.2</td>
                            <td className="text-success fw-bold">28.10</td>
                            <td className="fw-bold">120</td>

                            {/* Khớp Lệnh (Nổi bật nhất) */}
                            <td className="bg-dark text-warning fw-bold border-start border-end border-secondary">28.15</td>
                            <td className="bg-dark text-warning fw-bold border-end border-secondary">50</td>
                            <td className="bg-dark text-warning fw-bold border-end border-secondary">+0.5</td>

                            {/* Bên Bán */}
                            <td className="text-danger fw-bold">28.20</td>
                            <td className="fw-bold">8.4</td>
                            <td className="text-danger">28.25</td>
                            <td>15.0</td>
                            <td className="text-danger">28.30</td>
                            <td>22.1</td>

                            <td>1,500</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
