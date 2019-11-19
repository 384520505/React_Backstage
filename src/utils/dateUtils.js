// 时间格式化文件

import moment from 'moment';

// 格式化当前时间
export const getFormatDate = () => moment().format("YYYY-M-D HH:mm:ss a");