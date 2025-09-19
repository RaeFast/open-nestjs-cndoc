import "../src/userScriptHeader.js";
// ...existing code...

(function () {
  "use strict";

  // 配置参数（按需修改）
  const CONFIG = {
    targetDomain: "nest.nodejs.cn", // 需要切换的目标域名
    buttonColor: "#2196F3", // 按钮背景颜色
    buttonSize: 40, // 按钮尺寸（像素）
    buttonText: "↗", // 按钮显示文本
    topOffset: "15px",
    leftOffset: "15px",
  };

  // 工具函数：创建样式
  function createStyles() {
    const style = document.createElement("style");
    style.textContent = `
        .domain-switcher-btn {
            position: fixed;
            left: ${CONFIG.leftOffset};
            top: ${CONFIG.topOffset};
            width: ${CONFIG.buttonSize}px;
            height: ${CONFIG.buttonSize}px;
            border-radius: 50%;
            background-color: ${CONFIG.buttonColor};
            color: white;
            border: none;
            cursor: pointer;
            z-index: 10000;
            font-size: ${CONFIG.buttonSize * 0.6}px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            transition: transform 0.2s, opacity 0.2s;
            display: none; /* 初始隐藏，等待页面加载 */
        }
        .domain-switcher-btn:hover {
            transform: scale(1.1);
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
    return style;
  }

  // 工具函数：创建按钮
  function createButton() {
    const button = document.createElement("button");
    button.className = "domain-switcher-btn";
    button.title = "在新标签页打开修改域名后的页面";
    button.textContent = CONFIG.buttonText;
    return button;
  }

  // 工具函数：处理按钮点击
  function handleButtonClick() {
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.hostname = CONFIG.targetDomain;
      // 使用noopener noreferrer 提高安全性
      window.open(currentUrl.href, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("域名切换失败:", error);
      alert("无法打开中文文档，请检查网络连接。");
    }
  }

  // 主函数：初始化脚本
  function init() {
    // 检查是否在正确页面
    if (!window.location.hostname.includes("docs.nestjs.com")) {
      return;
    }

    const style = createStyles();
    const button = createButton();

    // 添加事件监听器
    button.addEventListener("click", handleButtonClick);

    // 将按钮添加到页面
    document.body.appendChild(button);

    // 页面加载完成后显示按钮
    window.addEventListener("load", () => {
      button.style.display = "block";
    });

    // 清理函数（可选，用于脚本卸载）
    window.addEventListener("beforeunload", () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    });
  }

  // 启动脚本
  init();
})();
