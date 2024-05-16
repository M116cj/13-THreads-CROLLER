require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
};

const fetchToken = async () => {
    const threadsAPI = new ThreadsAPI({
        verbose: true,
        //deviceID: DEVICE_ID,
        ...credentials,
    });

    try {
        // 嘗試獲取Token
        const token = await threadsAPI.getToken();
        console.log('獲取到的Token:', token);

        // 檢查Token類型
        if (typeof token === 'string') {
            console.log('Token類型正確。');
        } else {
            console.log('Token類型不正確。');
        }
    } catch (error) {
        console.error('獲取Token時發生錯誤:', error);
    }
};



fetchToken();
