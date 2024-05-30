import { useState, useEffect } from "react";

/**
 * useWindowSize 是一个自定义 Hook 函数，用于获取浏览器窗口的大小。
 * 该函数内部使用了 React 的 useState 和 useEffect 钩子。
 *
 * @returns {Object} 返回一个包含窗口宽度和高度的对象。
 */
const useWindowSize = () => {
  // 使用 useState 定义窗口大小的初始状态
  const [windowSize, setWindowsSize] = useState({
    width: undefined,
    height: undefined,
  });

  // 使用 useEffect 监听窗口大小的变化
  useEffect(() => {
    /**
     * 处理浏览器窗口大小改变事件的函数。
     * 当浏览器窗口大小发生变化时，此函数被调用，
     * 并更新窗口大小的状态。
     */
    const handleResize = () => {
      // 调用 setWindowsSize 更新状态，以反映当前窗口的宽度和高度
      setWindowsSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // 初始化时调用 handleResize，确保状态正确初始化
    handleResize();

    // 通过 addEventListener 监听窗口的 resize 事件
    window.addEventListener("resize", handleResize);

    // 清理函数，用于移除 resize 事件监听器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 返回当前窗口的大小
  return windowSize;
};

export default useWindowSize;
