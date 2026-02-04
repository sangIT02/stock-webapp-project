import React, { useEffect, useState, useRef } from 'react';
import mqtt from 'mqtt';
import type { IClientOptions, MqttClient } from 'mqtt';
import {
    createChart,
    ColorType,
    type IChartApi,
    type ISeriesApi,
    CandlestickSeries,
    type CandlestickData
} from 'lightweight-charts';
import { OrderForm } from '../components/OrderForm';

// --- CẤU HÌNH ---
const BROKER_HOST = 'datafeed-lts-krx.dnse.com.vn';
const BROKER_PORT = 443;

// Cấu hình mã và khung thời gian
const SYMBOL_ID = 'VCB';
const RESOLUTION = '1'; // 1D = 1 Ngày

// Topic MQTT (Realtime)
const TOPIC_OHLC = `plaintext/quotes/krx/mdds/v2/ohlc/stock/${RESOLUTION}/${SYMBOL_ID}`;

// Base URL API (Lấy từ link bạn gửi)
const API_BASE_URL = "https://api.dnse.com.vn/chart-api/v2/ohlcs/stock";

const DNSEChart: React.FC = () => {
    const [status, setStatus] = useState<string>('Init...');
    const [lastPrice, setLastPrice] = useState<number | null>(null);

    // 👇 Token (Giữ nguyên Token của bạn)
    const [credentials] = useState({
        investorId: '1002207962',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZGVudGlmaWNhdGlvbkNvZGUiOiIwMTcyMDQwMDAzMTMiLCJzdWIiOiIxMDAyMjA3OTYyIiwiYXV0aFNvdXJjZSI6bnVsbCwicm9sZXMiOlsiaW52ZXN0b3IiXSwiaXNzIjoiRE5TRSIsImludmVzdG9ySWQiOiIxMDAyMjA3OTYyIiwiZnVsbE5hbWUiOiJOZ3V54buFbiBWxINuIFPDoW5nIiwic2Vzc2lvbklkIjoiOTc1MTMzNTEtMGY5NC00YTcyLWE5Y2ItZjQ3N2Y0NjM1MzFjIiwidXNlcklkIjoiZmQwY2U1ZjctOGU1NS00NWQyLTliYzAtYzkxNGEwMWY4NjYyIiwiYXVkIjpbImF1ZGllbmNlIl0sImN1c3RvbWVyRW1haWwiOiJzYW5nbnYxMjE0QGdtYWlsLmNvbSIsImN1c3RvZHlDb2RlIjoiMDY0Q0pYUDkzOSIsImN1c3RvbWVySWQiOiIwMDAzNDQ1MTY3IiwiZXhwIjoxNzY5Njc5NjYwLCJjdXN0b21lck1vYmlsZSI6IjAzNjkyOTgwMzciLCJpYXQiOjE3Njk2NTA4NjAsInVzZXJuYW1lIjoiMDY0Q0pYUDkzOSIsInN0YXR1cyI6IkFDVElWRSJ9.LqAuq00oNtTqPiM5TaylN8MHCtvRCS1-vPwxEXSieayYrUJBytJldFMFwFOqhPDH3zsjNudx-GAc-iTiurua8BeDrxQoeQ8uwqVTX8ze0V-4imKDspMC_RguI3AKYYDypKOKpARL32-5o3M5J6crY14PVC1XhotZR2svctVtTXA'
    });

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const clientRef = useRef<MqttClient | null>(null);

    // --- 1. SETUP CHART ---
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: { background: { type: ColorType.Solid, color: '#121212' }, textColor: '#D9D9D9' },
            width: 1000, //chartContainerRef.current.clientWidth,
            height: 600,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderColor: '#2B2B43',
            },
            rightPriceScale: {
                borderColor: '#2B2B43',
            },
            grid: {
                vertLines: { color: '#242424' }, // Màu lưới dọc (Rất mờ)
                horzLines: { color: '#242424' }, // Màu lưới ngang
            },
        });

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#089981', downColor: '#f23645',
            borderVisible: false, wickUpColor: '#089981', wickDownColor: '#f23645',
        });

        chartRef.current = chart;
        candleSeriesRef.current = candleSeries;

        const handleResize = () => chart.applyOptions({ width: chartContainerRef.current?.clientWidth || 0 });
        window.addEventListener('resize', handleResize);

        // Gọi hàm tải lịch sử ngay khi tạo chart
        loadHistoryData(candleSeries);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    // --- 2. LOAD HISTORY TỪ API BẠN GỬI ---
    const loadHistoryData = async (series: ISeriesApi<"Candlestick">) => {
        setStatus('Fetching History...');

        try {
            // Tự động tính thời gian (Lấy 1 năm gần nhất)
            const to = Math.floor(Date.now() / 1000) + 86400; // Cộng thêm 1 ngày cho chắc
            const from = to - (365 * 24 * 60 * 60); // Lùi lại 365 ngày

            // Ghép URL hoàn chỉnh
            const url = `${API_BASE_URL}?symbol=${SYMBOL_ID}&resolution=${RESOLUTION}&from=${from}&to=${to}`;

            console.log("🔗 Calling API:", url);

            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const json = await response.json();

            // Xử lý dữ liệu trả về: { t: [], o: [], h: [], l: [], c: [] }
            if (json.t && json.t.length > 0) {
                const historyData: CandlestickData[] = [];
                const len = json.t.length;

                for (let i = 0; i < len; i++) {
                    // Bỏ qua nến lỗi
                    if (json.o[i] === undefined || json.c[i] === undefined) continue;

                    historyData.push({
                        time: Number(json.t[i]) as any,
                        open: Number(json.o[i]),
                        high: Number(json.h[i]),
                        low: Number(json.l[i]),
                        close: Number(json.c[i])
                    });
                }

                // Đổ dữ liệu vào Chart
                series.setData(historyData);

                // Lấy giá cuối cùng để hiển thị
                if (historyData.length > 0) {
                    setLastPrice(historyData[historyData.length - 1].close);
                }

                chartRef.current?.timeScale().fitContent();
                setStatus('History Loaded. Connecting MQTT...');
            } else {
                console.warn("API trả về rỗng");
            }

        } catch (error) {
            console.error("Lỗi tải lịch sử (Khả năng cao do CORS):", error);
            setStatus('History Error (Check CORS). Connecting MQTT...');
        } finally {
            // Luôn kết nối MQTT dù API lịch sử có lỗi hay không
            connectMQTT();
        }
    };

    // --- 3. KẾT NỐI MQTT (Realtime) ---
    const connectMQTT = () => {
        console.log(clientRef.current);
        if (clientRef.current) return;

        const options: IClientOptions = {
            protocol: 'wss', host: BROKER_HOST, port: BROKER_PORT, path: '/wss',
            username: credentials.investorId, password: credentials.token,
            protocolVersion: 5, clientId: `dnse-web-${Math.random()}`,
            clean: true, reconnectPeriod: 2000,
        };

        try {
            const mqttClient = mqtt.connect(options);

            mqttClient.on('connect', () => {
                if (mqttClient.disconnecting) return;
                setStatus('Connected (Realtime)');
                // Subscribe đúng topic theo mã ACB
                mqttClient.subscribe(TOPIC_OHLC, { qos: 1 });
            });

            mqttClient.on('message', (topic, message) => {
                try {
                    const payload = JSON.parse(message.toString());
                    const timeInSeconds = Number(payload.time);
                    console.log(payload);
                    if (isNaN(timeInSeconds)) return;

                    const candle: CandlestickData = {
                        time: timeInSeconds as any,
                        open: Number(payload.open),
                        high: Number(payload.high),
                        low: Number(payload.low),
                        close: Number(payload.close),
                    };

                    if (candleSeriesRef.current) {
                        candleSeriesRef.current.update(candle);
                        setLastPrice(candle.close);
                    }
                } catch (e) { }
            });

            clientRef.current = mqttClient;
        } catch (error) { }
    };

    useEffect(() => {
        return () => { clientRef.current?.end(true); };
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#121212', // Màu nền tối cho toàn trang
            color: '#fff',
            display: 'flex',            // Sử dụng Flexbox
            flexDirection: 'column'
        }}>

            {/* Header nhỏ hiển thị trạng thái */}
            <div style={{ padding: '10px 20px', borderBottom: '1px solid #333' }}>
                
            </div>

            {/* CONTAINER CHÍNH: Chia 2 cột */}
            <div style={{
                display: 'flex',
                flex: 1, // Chiếm hết chiều cao còn lại
                width: '100%',
                padding: '10px',
                gap: '10px' // Khoảng cách giữa 2 cột
            }}>

                {/* --- CỘT TRÁI: BIỂU ĐỒ (Chiếm 75% ~ 9 Cols) --- */}
                <div style={{
                    flex: '0 0 75%', // Cố định 75% chiều rộng
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div
                        ref={chartContainerRef}
                        style={{
                            flex: 1, // Chart chiếm hết chiều cao của cột trái
                            width: '100%',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}
                    />
                    <p style={{ fontSize: '0.8em', color: '#888', marginTop: '5px' }}>
                        *Dữ liệu realtime từ DNSE MQTT
                    </p>
                </div>

                {/* --- CỘT PHẢI: ĐẶT LỆNH (Chiếm 25% ~ 3 Cols) --- */}
                <OrderForm
                    symbol={SYMBOL_ID}
                    currentPrice={lastPrice}
                    balance={0}
                    onSubmit={() => {

                    }}
                />

            </div>
        </div>
    );
};

export default DNSEChart;