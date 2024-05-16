require('dotenv').config();
const { ThreadsAPI } = require('threads-api'); // 確保這裡的路徑正確指向您的`threads-api`模組

const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
};

const threadsAPI = new ThreadsAPI({
    verbose: true,
    ...credentials,
});

const fetchUserFollowers = async (userID) => {
    try {
        // 獲取用戶粉絲
        let { users, next_max_id: cursor } = await threadsAPI.getUserFollowers(userID);
        console.log('用戶粉絲:', users.length);
        console.log('下一頁標識:', cursor);

        // 獲取下一頁粉絲
        let nextPage = await threadsAPI.getUserFollowers(userID, { maxID: cursor });
        console.log('下一頁用戶粉絲:', nextPage.users.length);
        console.log('下一頁標識:', nextPage.next_max_id);
    } catch (error) {
        console.error('獲取用戶粉絲時發生錯誤:', error);
    }
};

const fetchUserFollowings = async (userID) => {
    try {
        // 獲取用戶關注
        let { users, next_max_id: cursor } = await threadsAPI.getUserFollowings(userID);
        console.log('用戶關注:', users.length);
        console.log('下一頁標識:', cursor);

        // 獲取下一頁關注
        let nextPage = await threadsAPI.getUserFollowings(userID, { maxID: cursor });
        console.log('下一頁用戶關注:', nextPage.users.length);
        console.log('下一頁標識:', nextPage.next_max_id);
    } catch (error) {
        console.error('獲取用戶關注時發生錯誤:', error);
    }
};

const userID = '2935671211';

// 執行獲取粉絲和關注的函數
fetchUserFollowers(userID);
fetchUserFollowings(userID);