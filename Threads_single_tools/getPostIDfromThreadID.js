require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

const fetchPostIDfromThreadID = () => {
    const threadsAPI = new ThreadsAPI({ verbose: true });
    const threadID = 'C3Qyx5HOWaE';

    // 嘗試從ThreadID獲取PostID
    let postID;
    try {
        postID = threadsAPI.getPostIDfromThreadID(threadID);
        console.log('獲取到的貼文ID:', postID);

        // 檢查獲取到的貼文ID是否符合預期
        if (postID === '3301361857766975108') {
            console.log('貼文ID符合預期。');
        } else {
            console.log('貼文ID不符合預期。');
        }
    } catch (error) {
        console.error('獲取貼文ID時發生錯誤:', error);
    }
};

fetchPostIDfromThreadID();