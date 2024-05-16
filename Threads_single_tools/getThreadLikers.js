require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

const fetchThreadLikers = async () => {
    const threadsAPI = new ThreadsAPI();
    const postID = '3306095142658189280';

    try {
        // 嘗試獲取帖子點讚者
        const likers = await threadsAPI.getThreadLikers(postID);

        // 檢查likers是否為陣列
        if (Array.isArray(likers.users)) {
            console.log('likers是一個陣列。');
            if (likers.users.length > 0) {
                if (likers.users[0].hasOwnProperty('pk') && likers.users[0].hasOwnProperty('full_name')) {
                    console.log('第一個點讚者具有pk和full_name屬性。');
                } else {
                    console.log('第一個點讚者不具有期望的屬性。');
                }
            } else {
                console.log('沒有找到任何點讚者。');
            }
        } else {
            console.log('獲取的likers不是一個陣列。');
        }
    } catch (error) {
        console.error('獲取帖子點讚者時發生錯誤:', error);
    }
};

fetchThreadLikers();