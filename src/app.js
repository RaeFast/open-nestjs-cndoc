import "../src/userScriptHeader.js";
// ...existing code...

class DomainSwitcher {
  /**
   * @param {{ targetDomain: string; buttonColor: string; buttonSize: number; buttonText: string; topOffset: string; leftOffset: string; }} config
   */
  constructor(config) {
    this.config = config;
    this.styleElement = null;
    this.buttonElement = null;
  }

  init() {
    if (!this.shouldRun()) {
      return;
    }
    this.createStyles();
    this.createButton();
    this.attachEventListeners();
  }

  shouldRun() {
    // @match 已经保证了域名，这里作为双重检查
    return window.location.hostname.includes("docs.nestjs.com");
  }

  createStyles() {
    const { leftOffset, topOffset, buttonSize, buttonColor } = this.config;
    this.styleElement = document.createElement("style");
    this.styleElement.textContent = `
      .domain-switcher-btn {
        position: fixed;
        left: ${leftOffset};
        top: ${topOffset};
        width: ${buttonSize}px;
        height: ${buttonSize}px;
        border-radius: 50%;
        background-color: ${buttonColor};
        color: white;
        border: none;
        cursor: pointer;
        z-index: 10000;
        font-size: ${buttonSize * 0.6}px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        transition: transform 0.2s, opacity 0.2s;
        display: none; /* 初始隐藏 */
      }
      .domain-switcher-btn:hover {
        transform: scale(1.1);
        opacity: 0.9;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  createButton() {
    this.buttonElement = document.createElement("button");
    this.buttonElement.className = "domain-switcher-btn";
    this.buttonElement.title = "在新标签页打开修改域名后的页面";
    this.buttonElement.textContent = this.config.buttonText;
    document.body.appendChild(this.buttonElement);
  }

  handleButtonClick() {
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.hostname = this.config.targetDomain;
      window.open(currentUrl.href, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("域名切换失败:", error);
      alert("无法打开中文文档，请检查网络连接。");
    }
  }

  attachEventListeners() {
    if (!this.buttonElement) {
      return;
    }
    this.buttonElement.addEventListener("click", this.handleButtonClick.bind(this));

    const showButton = () => {
      if (this.buttonElement) {
        this.buttonElement.style.display = "block";
      }
    };

    // 页面加载完成后显示按钮
    if (document.readyState === "complete") {
      showButton();
    } else {
      window.addEventListener("load", showButton);
    }

    // 页面卸载时自动清理
    window.addEventListener("beforeunload", () => {
      this.styleElement?.remove();
      this.buttonElement?.remove();
    });
  }
}

// --- 脚本启动 ---
(function () {
  "use strict";

  const CONFIG = {
    targetDomain: "nest.nodejs.cn", // 目标域名
    buttonColor: "#2196F3", // 按钮颜色
    buttonSize: 40, // 按钮尺寸 (px)
    buttonText: "↗", // 按钮文本
    topOffset: "15px",
    leftOffset: "15px",
  };

  const switcher = new DomainSwitcher(CONFIG);
  switcher.init();
})();
