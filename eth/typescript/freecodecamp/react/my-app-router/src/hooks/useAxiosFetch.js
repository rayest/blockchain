import { useState, useEffect } from "react";

import axios from "axios";

/**
 * 使用axios进行数据抓取的自定义hook。
 * @param {string} dataUrl - 用于获取数据的URL。
 * @returns {Object} 返回一个包含数据、错误信息和加载状态的对象。
 */
const useAxiosFetch = (dataUrl) => {
  // 初始化状态：数据为空数组，加载状态为false，没有错误信息。
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // 使用effect来执行数据抓取操作。
  useEffect(() => {
    let isMounted = true; // 用于检查组件是否已卸载。
    const source = axios.CancelToken.source(); // 创建取消令牌，以便在组件卸载时取消axios请求。
    
    // 数据抓取函数。
    const fetchData = async (url) => {
      setLoading(true); // 设置加载状态为true。
      try {
        const response = await axios.get(url, { cancelToken: source.token }); // 发起axios GET请求。
        if (isMounted) {
          setData(response.data); // 如果组件还未卸载，更新数据状态。
          setFetchError(null); // 清除错误信息。
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error.message); // 设置错误信息。
          setData([]); // 清空数据。
        }
      } finally {
         isMounted && setLoading(false); // 如果组件还未卸载，设置加载状态为false。
      }
    };

    fetchData(dataUrl); // 调用fetchData，开始数据抓取。

    // 清理函数，组件卸载时调用，用于取消axios请求。
    const cleanUp = () => {
      isMounted = false; // 标记组件为已卸载。
      source.cancel(); // 取消axios请求。
    };

    return cleanUp; // 返回清理函数，以在组件卸载时调用。
  }, [dataUrl]); // 监听dataUrl的变化，以在变化时重新执行数据抓取。

  return { data, fetchError, loading }; // 返回数据、错误信息和加载状态。
};

export default useAxiosFetch;
