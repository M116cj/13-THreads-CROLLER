require('dotenv').config();
const { ThreadsAPI } = require('threads-api');

const credentials = {
    username: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
};

const threadsAPI = new ThreadsAPI({
    verbose: true,
    ...credentials,
});

const fetchTimeline = async () => {
    try {
        // 當獲取時間線        
        let { items: threads, next_max_id } = await threadsAPI.getTimeline();
        console.log('[第一頁]', next_max_id);
        const firstPageNextMaxID = next_max_id;

        // 檢查獲取到的項目是否為陣列
        if (Array.isArray(threads)) {
            console.log('時間線為陣列。');
            if (threads.length > 0 && threads[0].hasOwnProperty('thread_items')) {
                console.log('第一個項目包含 thread_items。');
                if (threads[0].thread_items.length > 0 && threads[0].thread_items[0].hasOwnProperty('post')) {
                    console.log('第一個 thread_items 包含 post。');
                }
            }
        }

        // 獲取下一頁
        const res = await threadsAPI.getTimeline(next_max_id);
        threads = res.items;
        next_max_id = res.next_max_id;
        console.log('[第二頁]', next_max_id);

        // 進行相應的檢查
        if (Array.isArray(threads)) {
            console.log('第二頁時間線為陣列。');
            if (threads.length > 0 && threads[0].hasOwnProperty('thread_items')) {
                console.log('第二頁第一個項目包含 thread_items。');
                if (threads[0].thread_items.length > 0 && threads[0].thread_items[0].hasOwnProperty('post')) {
                    console.log('第二頁第一個 thread_items 包含 post。');
                }
            }
        }

        if (next_max_id && next_max_id !== firstPageNextMaxID) {
            console.log('下一頁標識存在且與第一頁不同。');
        } else {
            console.log('下一頁標識不存在或未變化。');
        }
    } catch (error) {
        console.error('獲取時間線時發生錯誤:', error);
    }
};

fetchTimeline();