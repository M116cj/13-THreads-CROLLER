require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

const fetchThreads = async () => {
    const threadsAPI = new ThreadsAPI();
    const postID = '3140957200974444958'; // https://www.threads.net/t/CuW6-7KyXme

    try {
        // 嘗試獲取貼文
        const thread = await threadsAPI.getThreads(postID);

        // 檢查thread是否具有特定屬性
        if (thread && thread.hasOwnProperty('reply_threads') && thread.hasOwnProperty('containing_thread')) {
            console.log('獲取的thread具有回覆貼文和包含貼文的屬性。');
            if (thread.containing_thread.id === postID) {
                console.log('包含貼文的ID匹配。');
            }

            if (Array.isArray(thread.reply_threads)) {
                console.log('回覆貼文是一個陣列。');
            }

            // 檢查包含貼文的標題
            const containingThreadCaptions = thread.containing_thread.thread_items.map(v => v.post.caption?.text);
            console.log('貼文的標題:', containingThreadCaptions);

            // 檢查回覆貼文的標題
            const replyThreadCaptions = thread.reply_threads?.map(v => v.thread_items.map(v => v.post.caption?.text)).flat();
            console.log('回覆貼文的標題:', replyThreadCaptions);
        }
    } catch (error) {
        console.error('獲取貼文時發生錯誤:', error);
    }
};

fetchThreads();