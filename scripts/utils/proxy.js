const axios = require('axios');

async function getProxyInfo() {
  try {
    const apiUrl = `https://api.mojinyun.com/api/ip/extract?key=${process.env.MOJINYUN_API_KEY}&signature=${process.env.MOJINYUN_SIGNATURE}&count=1&protocol=http&format=json`;
    
    const response = await axios.get(apiUrl);
    const data = response.data.data.list[0];
    
    return {
      server: data.server,
      port: data.port,
      username: data.user,
      password: data.pw,
      ip: data.ip
    };
  } catch (error) {
    console.warn('获取代理信息失败，继续无代理运行:', error.message);
    return null;
  }
}

async function setProxy(page) {
  try {
    const proxyInfo = await getProxyInfo();
    
    if (proxyInfo) {
      // 通过启动参数设置代理
      const proxyUrl = `http://${proxyInfo.username}:${proxyInfo.password}@${proxyInfo.server}:${proxyInfo.port}`;
      
      // 重新启动浏览器并设置代理
      await page.browser().close();
      
      const newBrowser = await puppeteer.launch({
        headless: true,
        args: [
          `--proxy-server=${proxyUrl}`,
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
      
      return newBrowser;
    }
  } catch (error) {
    console.warn('代理设置失败，继续无代理运行:', error.message);
  }
  
  return null;
}

module.exports = { setProxy, getProxyInfo };
