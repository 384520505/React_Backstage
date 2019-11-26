// 时间格式化文件

import moment from 'moment';

// 格式化当前时间
export const getFormatDate = () => moment().format("YYYY-M-D HH:mm:ss a");

// 格式化传入的时间
export const getDate = (time) => moment(time).format('YYYY-M-D HH:mm:ss')