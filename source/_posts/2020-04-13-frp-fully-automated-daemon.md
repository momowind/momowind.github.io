---
title: frp全自动化守护进程
date: 2020-04-13 15:19:06
tags: [Frp,树莓派,守护进程]
categories: [网站]
---
![](/images/2020/04/frp.png)
一觉睡醒后发现树莓派上的博客无法访问了，通过检查日志找到了原因，原来是一向乖巧的frp服务被莫名中断，看起来它也有脆弱的一面呀。世间万物都在进化，是时候实现frp的自我管理了，让它可以在各种原因中断后自行检查并自行恢复。这篇文章记录了我是如何高效且快速创建一个frp全自动化守护进程的。
<!--more-->
frp分为frpc客户端和frps服务器端，这里以frpc为例，frps是一样的，只需要把以下目录或代码frpc或frpcd改成frps或frpsd。

## 1. 创建frpc开机启动
创建一个systemctl文件
```
nano /lib/systemd/system/frpc.service
```
保存以下内容
```
[Unit]
Description=frpc service
#设置网络启动后依赖
After=network.target syslog.target network-online.target
Wants=network.target
Requires=network-online.target

[Service]
Type=simple
#启动服务的命令（此处写你的frps(frpc)的实际安装目录）
ExecStart=/usr/local/frp/frpc -c /usr/local/frp/frpc.ini
#设置失败5秒后重启
Restart=on-failure
RestartSec=5s
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```
开启frpc开机启动
`systemctl enable frpc.service`

## 2. 创建frpcd守护进程
接下来需要实现实时检查frpc状态，如果frpc运行失败则重启服务，以免你睡觉的时候frp因各种原因中断服务。
首先创建一个frpcd.sh文件
```
nano /usr/local/frp/frpcd.sh
```
保存以下内容
```
#!/bin/bash
while true; do

str1="service frpc status"
str2="start proxy success"
result=$($str1 | grep "${str2}")
if [[ "$result" != "" ]]
then
#    echo "frpc 正在工作中..."
：
else
#    echo "frpc 运行失败，正在重启..."
service frpc restart
fi
sleep 5
done
```

给它设置执行权限
chmod -x /usr/local/frp/frpcd.sh

启动试试`./frpcd.sh`
你可以先停止frpc服务然后看看守护程序能否实现自动检测并重启frcp，通过以下三个命令。
service frpc stop #停止frpc服务
/usr/local/frp/frpcd.sh #启动frpcd守护
service frpc status #检查frpc服务状态
如果看到`proxy start success`就是成功了

## 3. 开机启动frpcd守护进程
创建一个systemctl文件
```
nano /lib/systemd/system/frpcd.service
```
保存以下内容
```
[Unit]
Description=frpc daemon service
After=network.target syslog.target
Wants=network.target
Requires=network-online.target

[Service]
Type=simple
#启动服务的命令（此处写你的frps的实际安装目录）
ExecStart=/usr/local/frp/frpcd.sh
Restart=on-failure
RestartSec=5s
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true

[Install]
WantedBy=multi-user.target

```
把守护进程设为开机启动
`systemctl enable frpcd.service`
最后别忘了重新加载systemctl服务
`systemctl daemon-reload`
## 4. 设置frps的注意事项
frps服务器端也是同理，但是要注意systemctl的路径，尽量避免路径不准确造成的重定向反馈。用于锚定返回值的str2建议设为`running`更为合理，避免frps一直在重启从而导致连接失败的问题。
## 5. reboot
Ok，至此Frp已经完成了自我进化，再也不用担心它什么时候断掉了服务，当然你可以`reboot`来测试一下我的这套frp自我管理系统是否对你的小可爱奏效。