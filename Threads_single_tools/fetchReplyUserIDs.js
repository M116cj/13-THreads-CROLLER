require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

// 定義一個函式來獲取帖子回覆者的ID
const fetchReplyUserIDs = async (postURL) => {
    const threadsAPI = new ThreadsAPI({ verbose: true });
    let postID;
    try {
        postID = threadsAPI.getPostIDfromURL(postURL);
        console.log('獲取到的貼文ID:', postID);
    } catch (error) {
        console.error('獲取貼文ID時發生錯誤:', error);
    }

    try {
        const thread = await threadsAPI.getThreads(postID);
        console.log('獲取到的thread:', thread);

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
            const replyThreadUsername = thread.reply_threads?.map(v => v.thread_items.map(v => v.post.user?.username)).flat();
            console.log('回覆貼文的用戶名稱:', replyThreadUsername);
        }
    } catch (error) {
        console.error('獲取貼文時發生錯誤:', error);
    }
};

// 
const postURL = 'https://www.threads.net/@4foodie/post/CuXp8qfyi8O';
fetchReplyUserIDs(postURL);