import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, ConfigProvider } from 'antd';

const items: MenuProps['items'] = [
    { label: 'Lệnh thị trường (MP)', key: 'MP' },
    { label: 'Lệnh giới hạn (LO)', key: 'LO' },
    { label: 'Lệnh GTD', key: 'GTD' },
    { type: 'divider' },
    { label: 'Lệnh ATO', key: 'ATO' },
];

export const OrderType = () => {
    const [selectedType, setSelectedType] = useState<string>('Lệnh thị trường (MP)');

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const item = items?.find((i) => i && 'key' in i && i.key === e.key);
        if (item && 'label' in item) {
            setSelectedType(item.label as string);
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
        selectable: true,
        defaultSelectedKeys: ['MP'],
        // 1. Thêm chiều rộng tối thiểu cho Menu xổ xuống để không bị quá bé
        style: { minWidth: '220px' } 
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Dropdown: {
                        colorBgElevated: '#1f1f1f',
                        controlItemBgHover: '#333333',
                        colorText: '#ffffff',
                    },
                },
            }}
        >
            <Dropdown menu={menuProps} trigger={['click']}>
                {/* 2. Sửa style của nút bấm cho giống hệt ô Input số lượng */}
                <div 
                    style={{ 
                        background: '#333',       // Nền tối
                        border: '1px solid #555', // Viền xám nhạt
                        color: '#fff',            // Chữ trắng
                        padding: '8px 12px',      // Khoảng cách đệm
                        cursor: 'pointer',
                        display: 'flex',          // Dùng Flex để căn chỉnh
                        justifyContent: 'space-between', // Đẩy chữ sang trái, mũi tên sang phải
                        alignItems: 'center',
                        minWidth: '220px'         // Cố định chiều rộng nút để không bị nhảy khi đổi lệnh
                    }}
                    className='rounded-2'
                >
                    <span style={{ fontWeight: 500 }}>{selectedType}</span>
                    <DownOutlined style={{ fontSize: '12px', color: '#aaa' }} />
                </div>
            </Dropdown>
        </ConfigProvider>
    );
};