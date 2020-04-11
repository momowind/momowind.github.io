---
title: 树莓派：装在口袋里的量子云实验室（软件篇）
type: post
date: 2020-03-19T08:11:56+00:00
categories: 
           - 树梅派
tags:
           - 树梅派
           - Frp
           - 内网穿透
           - WIFI
           - SSH
           - root
           - SSR
---
![alt text](/images/2020/03/IMG_2391-scaled.jpg "Title")
小的时候父母工作很忙，经常把我一个人留在家里，那个时候的杀手锏就是玩具。因为我可以一直玩一整天，完全沉浸其中忘记时间。
<!--more-->
### 前言

那时候父母工作很忙经常把我一个人留在家里，但我一点也不觉得孤独，因为我有各式各样的玩具陪伴。每次父母出差回家都会给我带新的玩具，所以我跟其他小朋友最大的不同就是我总期待父母出差，因为这意味着我又会有新的玩具了。玩具总能令我发散思维并启发探索精神，似乎通过它们可以打开生命和宇宙的无限可能。

Raspberry Pi 帮我找回了这种感觉，作为开发板它小小的身躯并不能跟各个商售的电脑比拼性能，但是却从物联网领域给了我们更多的想象空间，这正是这个世界未来的趋势。

抛开华丽的图形界面拥抱Linux指令，让自己融入一种全新的语言环境，这种语言环境甚至会改变大脑的思维方式。当你越了解了计算机语言就越会发现除了吃喝拉撒睡以外，人和计算机并没有什么本质的区别，当然计算机还摆脱了妄想、分别和执念……

## 1.启动

最终我还是把3.5寸触摸屏摘掉了，因为是在没什么用，并且会导致整台机器发热量很大，摘掉屏幕后清爽了很多，这是Pi本该有的样子～

首先让我们从配置WIFI开始，SD卡根目录下新建一个名为`wpa_supplicant.conf`的文件：
`sudo nano /Volumes/boot/wpa_supplicant.conf`
#### 写入WIFI配置
```
country=CN #如果非CN国家代码可能导致5G-Wifi不能被识别
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
ssid=<YOUR-NETWORK-NAME>
psk=<YOUR-NETWORK-PASSWORD>
}
```

#### 开启SSH
只需在SD卡根目录下新建一个名为ssh的空文件：
`nano /Volumes/boot/ssh`
在Macbookl登录树莓派的ssh时遇到了密钥冲突，
输入`ssh-keygen -R 192.168.1.121`清空之前该IP地址储存在本机的密钥。

第一次用`pi`登录后默认密码为`raspberry`，应使用`sudo raspi-config`通过树莓派管理工具修改密码、主机名等信息，或是直接使用`passwd`修改密码。我是直接开启了root权限`sudo passwd root`然后切换为root用户`su root`。

#### 允许ROOT权限远程登录
`sudo nano /etc/ssh/sshd_config`
找到 `PermitRootLogin without-password` 前面加`#`注释掉，在下面添加`PermitRootLogin yes` 然后通过 `service ssh restart` 重启ssh服务生效。

## 2.环境部署

无论是人还是机器，只有部署在合适的环境才能够发挥最大的生产力。

#### 最适合树莓派的系统

唯一让我纠结的是Raspbian这个64位的cpu却跑着32位系统，意味着Pi的性能大打折扣，于是开始探索在Pi上装64位Ubuntu的可能性，目前官方只给出了Server版，但这就意味着我必须手动安装图形桌面，事实证明官方的Raspbian就是最合适的，树莓派的工程师在论坛给出了切换kernel到64 bit内核的临时方案用于测试，不过这又牵扯到在终端使用`rpi-update`命令来更新系统环境。输入`uname -a`会得到以下信息：
```
Linux pi 4.19.108-v7l+ #1298 SMP Fri Mar 6 18:09:54 GMT 2020 armv7l GNU/Linux
```
通过`rpi-update`更新后在/boot/config.txt中加入`arm_64bit=1`可以切换内核到64版本，再开机时输入`uname -a` 得到`aarch64`。这个方法可以临时装一下64位的程序，不过我安装最新版本的宝塔面板仍人提示不支持32位版本而失败……

这一周对于私有云的部署让我重新找到小时候的感觉，光是切换到不同的系统去体验Linux就花费了两天时间，最终还是确定用Raspbian原版系统。绕了一大圈回到原点的过程确实是必要的，它会让我知道什么是重要的，什么是需要的，以及各个系统的优势劣势。

#### 部署LNMP网站环境

环境安装的是Nginx+Mysql+Php7.3，从安装到运行都没出现任何问题，LNMP适合我对网站部署的全部需求。这是一套非常成熟的环境，推荐使用OneInStack一键部署lnmp环境指令。打开[OneInStack官方网站](https://oneinstack.com/auto/)自定义自己的一键部署指令非常方便。

## 3.部署量子云实验室

#### Nextcloud部署

Nextcloud的安装没什么好记录的，之前在韩国服务器使用自动官方的安装文件setup-nextcloud.php顺利一键搞定，但由于网络原因在树莓派这样行不通，于是下载了最新版本解压安装的，依然比较顺利，除了要注意nextcloud所在目录的用户和用户组权限问题，在参阅了ngnix.conf文件后确认了ngnix的默认用户和用户组是`www-data`，于是修改了在root下创建的nextcloud目录权限后可以完美运行。

使用过程中偶尔会出现502 Bad Gateway的错误提示，只有重启才能修复，于是想干脆升级到php7.4试试看。但是当升级之后发现nextcloud提示Internet Server 500错误无法打开，直觉告诉我将config.php文件修改为config1.php会得到真正信息，果然再刷新页面提示未安装php dom模块，于是敲入` sudo apt-get install php-xml`解决～

关于nextcloud后台**安全与设置警告**检测出来的一些问题，逐一Google即可解决，比如`在数据表 oc_calendarobjects_props 中无法找到索引 calendarobject_calid_index。`
通过SSH输入下面代码解决。
```
sudo -u www-data php occ db:add-missing-indices
```
其他的警告处理起来也是同理。关于nginx、php-fpm以及mysql的配置文件方面需要多多参考官方建议进行配置。

#### 挂载移动硬盘

挂载外接硬盘出现了一个小插曲，确实应该记录下来。
为了打造私有云盘，我需要更大的存储空间，于是利用之前一直吃灰的1T移动硬盘作为外部挂载。
通过`fdisk -l` 指令检查发现我的1T硬盘挂在/dev/sda2的位置，于是通过如下指令进行重新挂载。
```
mkdir /media/lab #在media目录下创建lab目录
umount /dev/sda2 #卸载移动硬盘
mount /dev/sda2 /media/lab #重新挂载到刚刚创建的lab目录
```
现在它挂载到了`/media/lab`，这样便可以在nextcloud中作为外部存储添加使用了。

#### 格式化移动硬盘到Ext4

先查看UUID`sudo blkid` 然后格式化为Linux的格式
```
sudo mkfs.ext4 /dev/sda
```
linux下的格式普遍为`ext2`、`ext3`和`ext4`，并且版本高的可以向下兼容，这里我选择`ext4`，
之前也考虑用Windows的Fat或者MacOS的NTFS，但是发现在Pi下面接Nextcloud无法顺利使用，
好在Ext4在其他系统中也都有很好的识别办法，比如通过下载相应的软件实现。

![](/images/2020/03/7552A5D8.jpeg "blood & etc/fstab")

为了让它开机自动挂载，而不是挂载到某个用户文件夹下，需要修改`/etc/fstab`文件，
但是由于误把PARTUUID当作UUID使用，而且设置了开机自检造成无法开机，这就是拿别人代码不检查就用所付出的代价。
于是拔出SD卡插入我的Macbook在/cmdlIne.txt中最后一行加入`“ S”`，再次重启顺利进入维护模式。
```
dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait S
```
回到熟悉的命令行重新`sudo nano /etc/fstab`加入了正确的指令是这样子的，中间的空格可以随意增减但是必须要有。
```
UUID=c690611e-42cc-471d-bbab-f718c8961014 /media/disk ext4 defaults 0 0
```
这里备注一下,后面两个0第一个代表dump即不备份。第二个代表fsck检查的顺序0表示不检查，跳过开机检查避免不必要的麻烦。

## 4.科学上网

互联网将人们的学习能力提升了N级，我们与知识之间最近的距离就是Google一下。在国内完全没有可替代的环境，作为Google、Youtube、Netflix的重度使用患者，让自己的派科学上网是非常必要的，这是与世界连接的第一步，就像是学习英文可以帮助我们更好的理解这个世界是一样的道理。

#### 树莓派部署酸酸乳

首先确认一下自己自己安装了Git。
```
sudo apt-get install git #ubuntu
sudo yum install git #CentOS
```
然后在具有写权限的目录执行如下命令获取到ssr脚本仓库
`git clone http://git.mrwang.pw/Reed/Linux_ssr_script.git`
进入刚刚克隆的仓库目录并赋予ssr脚本执行权限
`cd Linux_ssr_script && chmod +x ./ssr`
然后将脚本放入可执行脚本的目录，这样就完成了脚本的安装
`sudo mv ./ssr /usr/local/sbin/`
使用时只需要输入`ssr`就会看到支持的命令列表。输入`ssr config`开始配置ssr。
我使用的是韩国服务器，不差钱的朋友也可以根据自己需求购置云VPS部署酸酸乳服务端。

#### 部署ProxyChains代理指定程序

ProxyChains是一个使用方便的代理工具，它只会代理指定的程序。
下载：
`git clone https://github.com/rofl0r/proxychains-ng`
安装：
```
cd proxychains-ng/
./configure --prefix=/usr --sysconfdir=/etc
make
sudo make install
sudo make install-config
```
配置：
将`/etc/proxychains.conf`最后一行修改为酸酸乳端口：`socks5 127.0.0.1 1080`，测试`wget`，返回网页源码：`proxychains4 wget -qO- https://www.google.com`

#### http代理

有些程序并不像`curl`那样能够直接支持socks5代理，有时，按照情况需要配置http代理。
安装`privoxy`，开启全局http代理，其默认代理地址为`http://127.0.0.1:8118`：

```
sudo apt-get install privoxy
sudo -s
echo 'forward-socks5 / 127.0.0.1:1080 .' >>/etc/privoxy/config
systemctl status privoxy.service #查看代理状态
systemctl enable privoxy.service #开机自动启动
systemctl start privoxy.service #开启http代理`
systemctl restart privoxy.service #重启http代理
```
测试http代理：`wget -qO- -e use_proxy=yes -e http_proxy=127.0.0.1:8118 http://google.com`
我一般是配合sudo apt指令使用，特别是rpi-update，通过http代理可以很好的实现更新加速。
```
sudo http_proxy=http://127.0.0.1:8118 apt-get update
sudo http_proxy=http://127.0.0.1:8118 apt-get upgrade
sudo http_proxy=http://127.0.0.1:8118 apt-get dist-upgrade
sudo http_proxy=http://127.0.0.1:8118 rpi-update
```

## 5.FRP内网穿透

如果有一对带电粒子相互间量子纠缠，一个在地球而另一个被发射到月球，这两个粒子因量子纠缠效应会完全同步。FRP就是这样一个工具，它帮助我们实现通过互联网直接访问本地主机的网站或资源。安装与配置直接采用[官方指南](https://github.com/fatedier/frp/blob/master/README_zh.md)，非常明晰。
```
https://github.com/fatedier/frp/blob/master/README_zh.md
```

#### 开机自动启动FRP

`sudo nano /lib/systemd/system/frps.service `
填入以下代码并Ctrl+O保存，Ctrl+X退出

```
[Unit]
Description=frapc service
After=network.target syslog.target
Wants=network.target
[Service]
Type=simple
ExecStart=/your/path/frpc -c /your/path/frpc.ini
[Install]
WantedBy=multi-user.target
```

然后就启动frpc，输入`sudo systemctl start frpc`
再打开自启动，输入`sudo systemctl enable frpc`

如果要重启应用，可以这样，`sudo systemctl restart frpc`
如果要停止应用，可以输入，`sudo systemctl stop frpc`
如果要查看应用的日志，可以输入，`sudo systemctl status frpc`
这里是以本地树莓派frpc做例子，远程服务器的frps同理。

先写这么多，后面想到什么在慢慢补充……
如果你对树莓派感兴趣，[可以阅读我的上一篇文章，关于它的硬件部署。](https://purel.in/raspberry-pi-quantum-cloud-lab-in-your-pocket-hardware/)