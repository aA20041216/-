# -# GitHub Actions 浏览器自动化脚本

## 功能描述
自动化登录、签到和页面内容获取的浏览器脚本

## 环境变量设置
在 GitHub Secrets 中设置以下变量：
- `PHONE_NUMBER`: 登录手机号
- `PASSWORD`: 登录密码
- `MOJINYUN_API_KEY`: 摩金云 API Key
- `MOJINYUN_SIGNATURE`: 摩金云签名
- `PUSH_API_URL`: 推送通知 API 地址

## 运行方式
脚本会自动在每天 UTC 时间 8:00 运行，也可手动触发
