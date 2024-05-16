const axios = require('axios');
const { ThreadsAPI } = require('threads-api');

const getUserIDfromUsername = async () => {
    const threadsAPI = new ThreadsAPI({ verbose: true });
    const username = 'a5100996';
    threadsAPI.fbLSDToken = 'mocked-default-lsd-token';
    const previousLSDToken = threadsAPI.fbLSDToken;

    // 嘗試獲取用戶ID
    let userID;
    try {
        userID = await threadsAPI.getUserIDfromUsername(username);
        console.log(`獲取到的用戶ID：${userID}`);
    } catch (error) {
        console.error('獲取用戶ID時發生錯誤：', error);
    }

    // 檢查LSD token是否更新
    if (threadsAPI.fbLSDToken !== previousLSDToken) {
        console.log('LSD token已更新。');
    } else {
        console.log('LSD token未更新。');
    }
};

getUserIDfromUsername();