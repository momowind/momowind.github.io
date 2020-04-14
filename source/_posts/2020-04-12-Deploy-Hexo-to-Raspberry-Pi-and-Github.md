---
title: Hexo同步部署到树莓派与Github
date: 2020-04-12 12:01:50
categories: [网站]
tags: [树梅派,Hexo,Github,Purel.in]
---
![](/images/2020/04/hexopi.jpg)
这篇文章记录了我是如何实现通过一个指令将树莓派生成的文章发布到互联网，以及即便换了电脑也可以一键拉取Github上全部Hexo的备份，快速完成本地Hexo部署。
<!--more-->
## 1. 安装Git
### 1.1 将Git部署到树莓派
VPS服务器请注意设置防火墙相关端口开放，树莓派则建议安装ufw解决一切防火墙端口问题造成的坑。
首先通过指令`apt install git`安装Git和Node.js，如果是CentOS服务器需要把apt换成yum，我这里主要以树莓派的Debian环境来记录整个部署过程。

### 1.2 全局修改Github用户名
在树莓派终端输入下列命令修改全局用户名（注意将引号内替换为个人帐号）：
```
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```
然后查看是否已经全局修改用户名：
`git config --list`
返回显示下面信息就是正确了
```
user.name=你的用户名
user.email=你的邮箱
```
安装NodeJS
```
curl --silent --location https://rpm.nodesource.com/setup_13.x | bash -
```
添加git用户
```
adduser git 
chmod 740 /etc/sudoers 
nano /etc/sudoers 
```
找到以下内容 
```
## Allow root to run any commands anywhere 
root ALL=(ALL) ALL 
```
在下面添加一行 
`git ALL=(ALL) ALL`
保存退出并改回权限
`chmod 400 /etc/sudoers`
设置 git 用户密码
`sudo passwd git`
切换至git用户，创建 ~/.ssh 文件夹和 ~/.ssh/authorized_keys 文件，并赋予相应的权限
```
su git 
mkdir ~/.ssh 
nano ~/.ssh/authorized_keys 
```
设置SSH Key要回到Mac/PC本机终端内执行：ssh-keygen -t rsa -C "邮箱地址”，根据提示输入密码等完成设置。查看公开密钥：cat ~/.ssh/id_rsa.pub复制显示的内容。将公钥复制粘贴到
```
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```
在Mac Git Bash 中测试
`ssh -v git@ip地址 # 服务器外网地址`

测试后如果不需要密码则成功！

如果是树莓派本机从root部署到git，需要注意切换用户来生成和保存密钥。指令和上面一样，在root用户和默认目录下生成ssh并保存至git默认目录即可。

## 2. 部署Nginx环境
如果还想部署多个网站或者安装lnmp环境，建议使用OneInStack来一键部署。若是单纯为了Hexo，只安装Nginx就足够了，轻量化的部署可以有效减少树莓派的负载。
### 2.1 安装
`apt install nginx`
### 2.2 启动
```
systemctl start nginx # 启动
systemctl enable nginx # 开机启动
```
输入服务器外网地址出现nginx信息表示启动成功。
### 2.3 配置
```
nano /etc/nginx/nginx.conf
```

修改内容 server 下
server_name 如有域名可以改为自己的;
location / {
  root /usr/share/nginx/html/blog; # 此处增加为"/blog",root指向博客所在目录
  ...
}
修改内容头部`user  nginx;`更改为`user  root;`
保存退出后执行：
```
sudo mkdir -p /usr/share/nginx/html/blog
sudo chown -R git:git /usr/share/nginx/html/blog
```

## 3. 部署Git库
### 3.1 在派初始化一个git裸库
切换到git用户，然后切换到git用户目录，接着初始化裸库：
```
su git
cd ~
git init --bare blog.git
```
### 3.2 新建post-receive文件
`nano ~/blog.git/hooks/post-receive`
然后在该文件中输入以下内容：
```
#！/bin/sh
git --work-tree=/data/wwwroot/blog --git-dir=/home/git/blog.git checkout -f
```
### 3.3 备选方案
```
#!/bin/bash
GIT_REPO=/home/git/blog.git
TMP_GIT_CLONE=/tmp/blog
PUBLIC_WWW=/data/wwwroot/blog
rm -rf ${TMP_GIT_CLONE}
git clone $GIT_REPO $TMP_GIT_CLONE
rm -rf ${PUBLIC_WWW}/*
cp -rf ${TMP_GIT_CLONE}/* ${PUBLIC_WWW}
```
### 3.4 赋予权限
以上两种二选一，保存退出之后再输入以下代码，赋予该文件可执行权限:
```
chmod +x ~/blog.git/hooks/post-receive
chown git:git -R /data/wwwroot/blog
```
## 4. 同时部署多平台设置
编辑blog/_config.yml设置repo源，pi是树莓派的git库，它被指向部署到我们刚刚设置的nginx网站目录，使之可以被访问。
```
  repo: 
    pi: git@VPS_IP:/home/git/blog.git
    github: https://github.com/yourname/yourname.github.io
  branch: master
  message:
```
## 5. 发布或调试Hexo博客
`hexo clean && hexo g`
清除并生成新的Hexo网站
`hexo clean && hexo g -d`
清除、生成新的网站并发布到Git或服务器
通过以上指令发布后打开vps的网址就能看到新的hexo博客啦，也可以通过`hexo s`在浏览器打开`localhost:4000`进行本地调试Hexo。
## 6. 安装和卸载Hexo插件
### 6.1 安装插件
```
npm install hexo-deployer-git --save #安装git部署
npm install --save hexo-admin #安装后台发布
npm install hexo-generator-feed --save #安装rss生成
npm install hexo-generator-sitemap --save #安装sitemap
npm i -S hexo-generator-search hexo-generator-json-content #搜索依赖包
npm i -S hexo-renderer-stylus #安装stylus渲染器
npm i -S hexo-helper-qrcode #qr二维码插件
npm i -S hexo-related-popular-posts #安装相关文章插件
npm i hexo-offline --save #加载加速插件
npm install hexo-lazyload-image --save #图片懒加载
npm install hexo-baidu-url-submit --save #百度实时提交
```
### 6.2 卸载插件
`npm list`查看已安装的插件列表
`npm uninstall <插件名>` #卸载哞个插件
进入node_modules/目录删除对应的插件文件
`rm -rf <插件名>` #删除插件目录
清除cache缓存
`npm cache clean -f`
至此插件干干净净的卸载完毕

## 7. 备份整个Hexo
### 7.1 在Github新建分支
在master下新建分支名为hexo，setting-branch下修改default源为hexo，然后
git clone到本地，在MacOS下 Command+Shift+. 查看隐藏文件，删除该目录下.git外所有文件，树莓派则在文件夹点击右键显示隐藏文件。

新建或修改.gitignore用来忽略一些不需要的文件
```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```
### 7.2 PUSH到Github
```
git add .
git commit -m “注释”
git push
```
### 7.3 Git的常用指令
add、commit、push命令，简单的代码提交流程
`git status` 查看工作区代码相对于暂存区的差别
`git add . `将当前目录下修改的所有代码从工作区添加到暂存区 . 代表当前目录
`git commit -m ‘注释’ `将缓存区内容添加到本地仓库
`git push origin master `将本地版本库推送到远程服务器，
origin是远程主机，master表示是远程服务器上的master分支，分支名是可以修改的
### 7.4 一键发布博客并完整备份
现在Github有两个分支，一个是master用于存放Hexo生成的public文件，上文我们新建的hexo分支用于存放Hexo的完整备份。
#### 7.4.1 发布博客指令
`hexo clean && hexo g -d`
#### 7.4.2 备份完整的Hexo
同步Hexo完整备份到Github分支hexo
`git add . && git commit –m "注释" && git push`
## 8. 升级nodejs的方法
更新升级node版本的方法如下：
### 8.1 查看当前node版本
`node –v`
### 8.2 安装n模块
`npm install -g n`
### 8.3 升级到指定版本/最新版本
该步骤可能需要花费一些时间。升级之前，可以执行`n ls`查看可升级的版本，如：`n 6.9.1`
或者你也可以告诉管理器，安装最新的稳定版本
`n stable`
### 8.4 检查升级是否成功
`node -v`
如果得到的版本信息不正确，可能需要重启机器。
### 8.5 常见问题
如果遇到npm指令出现错误比如`Error: Cannot find module 'semver'`
重新安装最新版本即可：
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
apt-get update
apt-get install nodejs
```
之后检查它们是否被正确部署
```
node -v
nodes -v
npm -v
```
全部正确输出则代表安装正确。
然后重新安装Hexo
`npm install -g hexo-cli`