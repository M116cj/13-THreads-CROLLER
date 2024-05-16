require('dotenv').config();
const { ThreadsAPI } = require('threads-api'); // 確保這裡的路徑正確指向您的`threads-api`模組

const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
    // 添加其他必要的憑證字段
};

async function likeUnlikeThread() {
    const threadsAPI = new ThreadsAPI({
        verbose: true,
        ...credentials,
    });

    try {
        const threadURL = 'https://www.threads.net/@jayfeather_1005/post/C3g-aqorSUE';
        const postID = threadsAPI.getPostIDfromURL(threadURL) || '';

        // 延遲1秒以確保安全性
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 點贊操作
        let success = await threadsAPI.like(postID);
        console.log('Like operation successful:', success);

        // 延遲1秒以確保安全性
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 取消點贊操作
        success = await threadsAPI.unlike(postID);
        console.log('Unlike operation successful:', success);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

likeUnlikeThread();