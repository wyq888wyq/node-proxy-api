const express = require('express');
const axios = require('axios');
const app = express();

// 允许解析 JSON 请求体
app.use(express.json());

// 开启 CORS (允许任何网站访问你的接口，避免跨域问题)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// 定义一个路由 /api/data
app.get('/api/data', async (req, res) => {
    const targetUrl = 'http://sjzt.nyjiuyishan.com/prod-api/bigscreen/guestDetection/getScenicPersonNum';
    
    try {
        // 这里帮你发起 POST 请求
        // 如果对方接口需要传递参数，可以在第二个参数 {} 中填入
        const response = await axios.post(targetUrl, {});
        
        // 将获取的数据返回给调用者
        res.json({
            success: true,
            source: 'Vercel Proxy',
            data: response.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: '请求目标接口失败',
            error: error.message
        });
    }
});

// 默认路由
app.get('/', (req, res) => {
    res.send('Node.js 服务正在运行！请访问 /api/data 获取数据');
});

// 适配 Vercel 的关键：导出 app
module.exports = app;

// 本地运行时监听端口
if (require.main === module) {
    app.listen(3000, () => {
        console.log('本地服务已启动: http://localhost:3000');
    });
}