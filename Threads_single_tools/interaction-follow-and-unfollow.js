require('dotenv').config();
const { ThreadsAPI } = require('threads-api'); // 確保這裡的路徑正確指向您的`threads-api`模組

const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
    // 添加其他必要的憑證字段
};

const followUnfollow = async () => {
    try {
        const threadsAPI = new ThreadsAPI({
            verbose: true,
            ...credentials,
        });

        console.log('獲取用戶ID...');
        const userID = (await threadsAPI.getUserIDfromUsername('exchangesky')) || '';

        // 關注
        console.log('正在執行關注操作...');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 延遲1秒以確保安全性
        let success = (await threadsAPI.follow(userID)).status === 'ok';
        console.log('關注操作成功:', success);

        // 取消關注
        console.log('正在執行取消關注操作...');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 延遲1秒以確保安全性
        success = (await threadsAPI.unfollow(userID)).status === 'ok';
        console.log('取消關注操作成功:', success);

    } catch (error) {
        console.error('發生錯誤：', error);
    }
};

followUnfollow();