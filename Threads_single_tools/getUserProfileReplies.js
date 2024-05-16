require('dotenv').config();
const { ThreadsAPI } = require('threads-api'); // 確保這裡的路徑正確指向您的`threads-api`模組

const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
};

const fetchUserReplies = async () => {
    const threadsAPI = new ThreadsAPI();

    console.log('未授權下獲取用戶回覆...');
    const userID = '2935671211';

    // 未授權獲取  
    // let posts = await threadsAPI.getUserProfileReplies(userID);
    // console.log('Posts:', posts);

    // 假設授權是後續部分所需
    const authenticatedAPI = new ThreadsAPI({
        verbose: true,
        ...credentials,
    });

    console.log('授權下使用分頁獲取用戶回覆...');
    // 授權獲取
    let { threads, next_max_id } = await authenticatedAPI.getUserProfileRepliesLoggedIn(userID);
    console.log('[第一頁] Threads:', threads);
    console.log('[第一頁] 下一頁最大ID:', next_max_id);

    // 獲取下一頁
    let res = await authenticatedAPI.getUserProfileRepliesLoggedIn(userID, next_max_id);
    threads = res.threads;
    next_max_id = res.next_max_id;
    console.log('[第二頁] Threads:', threads);
    console.log('[第二頁] 下一頁最大ID:', next_max_id);
};

fetchUserReplies();