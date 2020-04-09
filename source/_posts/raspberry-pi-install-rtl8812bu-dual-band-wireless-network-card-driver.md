---
title: 树莓派：安装rtl8812bu双频无线网卡驱动
author: Jacob
type: post
date: 2020-04-04T05:49:36+00:00
excerpt: 突发奇想，可不可以将Pi作为一个无线中继，转发5G的WIFI信号并共享给所有连接到它的设备呢？说干就干吧
url: /raspberry-pi-install-rtl8812bu-dual-band-wireless-network-card-driver/
featured_image: /wp-content/uploads/2020/04/ac1200-scaled-e1586058682319.jpg
mdx_styles:
  - def
mdx_styles_hex:
  - def
mdx_styles_act:
  - def
mdx_styles_act_hex:
  - def
mdx_post_style:
  - def
views:
  - 18
draft: false
---

突发奇想，可不可以将Pi作为一个无线中继，转发5G的WIFI信号并共享给所有连接到它的设备呢？说干就干吧，第一步先从搭配硬件环境开始。树莓派本身是千兆以太网口，以及5G/2.4G双频WIFI无线网卡，但是要让它彻底作为无线中继，那个前兆以太网口就不用了，取而代之的是需要另一块无线WIFI，为了使网络带宽最大化被利用起来，我需要一款双频的无线网卡。<figure class="mdx-lazyload-container" style="">

<div style="padding-top:50%">
</div>

<div class="mdx-img-loading-sp mdui-valign">
  <div>
    <div class="mdui-spinner">
    </div>
  </div>
</div>

<img class="wp-image-3825 lazyload" style="width: 600px;" title="树莓派：安装rtl8812bu双频无线网卡驱动" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/wp-content/uploads/2020/04/ac1200m.jpg" alt="/wp-content/uploads/2020/04/ac1200m.jpg" data-srcset="/wp-content/uploads/2020/04/ac1200m.jpg 837w, /uploads/2020/04/ac1200m-300x300.jpg 300w, /wp-content/uploads/2020/04/ac1200m-150x150.jpg 150w, /wp-content/uploads/2020/04/ac1200m-768x768.jpg 768w" sizes="(max-width: 837px) 100vw, 837px" /></figure> 

在淘宝看了很久，最终选择了一款超级迷你款的rtl8812bu芯片作为双频发射端，客服说是出口外贸的商品，这款和ASUS的AC53很像，功能上基本一致，但是增加了USB3.0接口，这样能让5G的WIFI网速最大限度跑起来，目前大部分5G无线网卡还都是USB2.0接口，并且个头比较大插在Pi上面很突兀，这也是经常被我们忽略的部分。

理论上所有rtl8812bu芯片都可以在树莓派或者linux上安装驱动，但我还是废了一些周折，因为之前rpi-update升级了kernel内核，于是初次安装rtl8812bu驱动无法正常工作，现在写一下正确安装方法。

首先卸载之前安装无法工作的驱动版本

`ls /lib/modules/*/build -la #查看所有已经建立的驱动模块<br>dkms uninstall -m rtl88x2bu -v 5.6.1 #卸载驱动模块`

`<em>rpi-update #升级内核到最新版，也可以跳过</em><br>rpi-source #构建正在运行的最新内核的源代码，<strong>这一步很重要</strong>`

开始安装rtl8812bu驱动

`git clone <a href="https://github.com/cilynx/rtl88x2bu">https://github.com/cilynx/rtl88x2bu</a> #下载驱动，通过proxychains指令走代理下载会更快，<a href="https://purel.in/raspberry-pi-quantum-cloud-lab-in-your-pocket-software/" target="_blank" rel="noreferrer noopener">可以参照我前面的文章来设置代理。</a>`

以下是驱动作者给出在树莓派的安装步骤

<pre class="wp-block-preformatted"><code># Update all packages per normal
sudo apt update
sudo apt upgrade

# Install prereqs
sudo apt install git dnsmasq hostapd bc build-essential dkms raspberrypi-kernel-headers

# Reboot just in case there were any kernel updates
sudo reboot

# Pull down the driver source
git clone https://github.com/cilynx/rtl88x2bu
cd rtl88x2bu/

# Configure for RasPi
sed -i 's/I386_PC = y/I386_PC = n/' Makefile
sed -i 's/ARM_RPI = n/ARM_RPI = y/' Makefile

# DKMS as above
VER=$(sed -n 's/\PACKAGE_VERSION="\(.*\)"/\1/p' dkms.conf)
sudo rsync -rvhP ./ /usr/src/rtl88x2bu-${VER}
sudo dkms add -m rtl88x2bu -v ${VER}
sudo dkms build -m rtl88x2bu -v ${VER} # Takes ~3-minutes on a 3B+
sudo dkms install -m rtl88x2bu -v ${VER}

# Plug in your adapter then confirm your new interface name
ip addr</code></pre>

最后敲入lsmod看到88x2bu，完美。  
至此，我的rtl88x2bu无线双频网卡已经可以使用了～