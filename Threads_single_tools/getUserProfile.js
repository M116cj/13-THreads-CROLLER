require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

const getUserProfile = async () => {
    const threadsAPI = new ThreadsAPI();

    try {
        const username = 'a5100996';
        const userID = '2935671211';


        const user = await threadsAPI.getUserProfile(userID);

        if (user.username === username) {
            console.log('測試成功：用戶名匹配。');
        } else {
            console.log(`測試失敗：期望的用戶名為${username}，但獲取到的是${user.username}。`);
        }
    } catch (error) {
        console.error('測試失敗，發生錯誤：', error);
    }
};

getUserProfile();