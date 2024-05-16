require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

// 假設憑證是從環境變量或直接定義的常量中獲取
const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
    // 添加其他必要的憑證字段
};

const threadsAPI = new ThreadsAPI({
    verbose: true,
    ...credentials,
});

async function publishPosts() {
    try {
        // 延遲1秒以確保安全性
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 發布純文字帖子
        const textPostSuccess = !!(await threadsAPI.publish('🤖 Hello World!'));
        console.log('Text post success:', textPostSuccess);

        // 發布帶有圖片的帖子
        const imageURL = 'https://github.com/junhoyeo/threads-api/blob/main/.github/logo.jpg?raw=true';
        const imagePostSuccess = !!(await threadsAPI.publish({ text: '🤖 Hello World with Image!', image: imageURL }));
        console.log('Image post success:', imagePostSuccess);

        // 發布帶有URL附件的帖子
        const url = 'https://github.com/junhoyeo/threads-api';
        const urlPostSuccess = !!(await threadsAPI.publish({ text: '🤖 Hello World with URL!', url }));
        console.log('URL post success:', urlPostSuccess);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

publishPosts();