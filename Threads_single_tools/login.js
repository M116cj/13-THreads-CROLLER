require('dotenv').config();
const { ThreadsAPI } = require('threads-api'); // 確保這裡的路徑正確指向您的`threads-api`模塊

const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
};


const loginAndPublish = async () => {
    try {
        const threadsAPI = new ThreadsAPI({
            verbose: true,
            ...credentials,
        });

        console.log('嘗試登錄...');
        await threadsAPI.login();
        console.log('登錄成功。');

        const text = "🤖 I'm back, Threads.";
        console.log('發布消息：', text);

        // 添加延遲以確保操作的安全性
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const success = !!(await threadsAPI.publish({ text }));
        if (success) {
            console.log('消息發布成功。');
        } else {
            console.log('發布消息失敗。');
        }
    } catch (error) {
        console.error('發生錯誤：', error);
    }
};

loginAndPublish();