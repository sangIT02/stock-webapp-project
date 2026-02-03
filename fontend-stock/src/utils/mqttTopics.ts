// utils/mqttTopics.ts

// 1. Thông tin giá cơ bản (Trần/Sàn/TC)
export const getStockInfoTopic = (symbol: string) =>
    `plaintext/quotes/krx/mdds/stockinfo/v1/roundlot/symbol/${symbol}`;

// 2. Bảng giá (3 bước giá, Dư mua/Dư bán)
export const getTopPriceTopic = (symbol: string) =>
    `plaintext/quotes/krx/mdds/topprice/v1/roundlot/symbol/${symbol}`;

// 3. Khớp lệnh (Tick by tick - dùng cho cột khớp lệnh)
export const getTickTopic = (symbol: string) =>
    `plaintext/quotes/krx/mdds/tick/v1/roundlot/symbol/${symbol}`;

// 4. Nến (OHLC - dùng vẽ Chart)
// resolution: '1', '1H', '1D', 'W'
export const getStockOhlcTopic = (symbol: string, resolution: string = '1D') =>
    `plaintext/quotes/krx/mdds/v2/ohlc/stock/${resolution}/${symbol}`;

// 5. Chỉ số thị trường (VNINDEX, VN30)
export const getIndexTopic = (indexName: string) =>
    `plaintext/quotes/krx/mdds/index/${indexName}`;