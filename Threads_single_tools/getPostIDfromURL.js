require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

const fetchPostIDfromURL = () => {
    const threadsAPI = new ThreadsAPI({ verbose: true });
    const postURL = 'https://www.threads.net/@ikea_milk/post/C3hnAQLySfg';

    // 嘗試從貼文URL獲取貼文ID
    let postID;
    try {
        postID = threadsAPI.getPostIDfromURL(postURL);
        console.log('獲取到的貼文ID:', postID);

        // 檢查獲取到的貼文ID是否符合預期
        if (postID === '3141257742204189435') {
            console.log('貼文ID符合預期。');
        } else {
            console.log('貼文ID不符合預期。');
        }
    } catch (error) {
        console.error('獲取貼文ID時發生錯誤:', error);
    }
};

fetchPostIDfromURL();