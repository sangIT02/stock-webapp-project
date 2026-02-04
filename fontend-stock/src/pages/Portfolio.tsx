import React from 'react'

export const Portfolio = () => {
    const getValueColor = (val: number) => {
        if (val > 0) return 'text-success';
        if (val < 0) return 'text-danger';
        return 'text-light';
    };
    return (
        <div className='container' style={{ marginTop: '20px', marginBottom: '100px' }}>
            <div className='row g-4 justify-content-between'>

                {/* CỘT 1: Vẫn là col-8 */}
                <div className='col-12 col-md-8'>
                    {/* Tạo div con để chứa Border và Background */}
                    <div className='rounded-3 h-100' style={{ border: "1px solid #F1E9E9", padding: '20px' }}>
                        <div>
                            <p style={{ fontSize: '30px' }}>Tổng giá trị ước tính</p>
                            <h2 style={{ fontWeight: 'bold' }}>100.000 VNĐ</h2>
                        </div>
                        <button className="btn bg-dark rounded-5 text-white mx-2">Nạp tiền</button>
                        <button className="btn bg-white rounded-5 text-dark border">Rút tiền</button>

                        <div className='rounded-3' style={{ backgroundColor: '#1E1E1E', marginTop: '20px', border: "1px solid #333", overflow: 'hidden' }}>
                            <div className="p-3 border-bottom border-secondary">
                                <h5 className="text-light m-0">Danh mục nắm giữ</h5>
                            </div>

                            <div className="table-responsive" style={{}}>

                                <div className="p-3 sticky-top" style={{ backgroundColor: '#1E1E1E', top: 0, zIndex: 5 }}>
                                    <h5 className="text-light m-0 fs-6">Danh mục nắm giữ</h5>
                                </div>

                                <table className="table table-dark table-hover mb-0 text-end" style={{ fontSize: '0.95rem' }}>
                                    {/* 2. Làm Sticky Header (Ghim tiêu đề) */}
                                    <thead className="text-secondary sticky-top" style={{
                                        top: '0',              // Dính lên đỉnh
                                        zIndex: 1,             // Nổi lên trên nội dung
                                        backgroundColor: '#2A2A2A' // Bắt buộc phải có màu nền, nếu không chữ sẽ bị trôi xuyên qua
                                    }}>
                                        <tr>
                                            <th className="text-start ps-4">Mã CK</th>
                                            <th>Tổng KL</th>
                                            <th>Giá vốn</th>
                                            <th>Giá TT</th>
                                            <th>Lãi/Lỗ</th>
                                            <th className="pe-4">% Lãi/Lỗ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Mình tăng số lượng dòng lên 20 để test cuộn */}
                                        {[...Array(10)].map((_, index) => (
                                            <tr key={index} style={{ cursor: 'pointer', borderBottom: '1px solid #333' }}>
                                                <td className="text-start ps-4 fw-bold text-info">HPG</td>
                                                <td className="text-light">10,000</td>
                                                <td className="text-secondary">28.5</td>
                                                <td className="text-light">30.2</td>
                                                <td className={getValueColor(-17000000)}>-17,000,000</td>
                                                <td className={`pe-4 ${getValueColor(-5.96)}`}>-5.96%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CỘT 2: Vẫn là col-4 */}
                <div className='col-12 col-md-4'>
                    {/* Tạo div con tương tự */}
                    <div className='rounded-3 h-100 p-3' style={{ border: "1px solid #F1E9E9" }}>
                        <h3>Lịch sử giao dịch</h3>
                        {[...Array(5)].map((_, index) => (
                            <tr key={index} style={{ cursor: 'pointer', borderBottom: '1px solid #333' }}>
                                <td className="text-start ps-4 fw-bold text-info">Nạp 10.000vnd</td>
                
                            </tr>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
