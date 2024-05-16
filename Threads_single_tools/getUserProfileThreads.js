require('dotenv').config();
const { ThreadsAPI } = require('threads-api'); // 確保這裡的路徑正確指向您的`threads-api`模組

const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
};

const fetchUserThreads = async () => {
    const threadsAPI = new ThreadsAPI();

    console.log('Fetching user profile threads without authentication...');
    const userID = '2935671211';

    // Fetch without authentication    
    let posts = await threadsAPI.getUserProfileThreads(userID);
    console.log('Posts:', posts);

    // Assuming authentication is required for the next part
    const authenticatedAPI = new ThreadsAPI({
        verbose: true,
        ...credentials,
    });

    console.log('Fetching user threads with pagination with authentication...');
    // Fetch with authentication
    let { threads, next_max_id } = await authenticatedAPI.getUserProfileThreadsLoggedIn(userID);
    console.log('[FIRST PAGE] Threads:', threads);
    console.log('[FIRST PAGE] Next Max ID:', next_max_id);

    // Fetch next page
    let res = await authenticatedAPI.getUserProfileThreadsLoggedIn(userID, next_max_id);
    threads = res.threads;
    next_max_id = res.next_max_id;
    console.log('[SECOND PAGE] Threads:', threads);
    console.log('[SECOND PAGE] Next Max ID:', next_max_id);
};

fetchUserThreads();