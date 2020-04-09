---
title: 树莓派：装在口袋里的量子云实验室（硬件篇）
author: Jacob
type: post
date: 2020-03-17T07:47:24+00:00
excerpt: 纯粹为了好玩，我花费一周时间用树莓派的板子搭建了一台微型多功能服务器，虽然只有信用卡大小，但是也能科学观看Netflix。
url: /raspberry-pi-quantum-cloud-lab-in-your-pocket-hardware/
featured_image: https://purel.in/wp-content/uploads/2020/03/IMG_2372-2-scaled.jpg
fw_options:
  - 'a:16:{s:12:"quote_author";s:0:"";s:13:"quote_dopinfo";s:0:"";s:12:"quote_avatar";s:0:"";s:13:"overlay_color";s:24:"rgba(124, 90, 194, 0.95)";s:12:"video_oembed";s:0:"";s:12:"audio_oembed";s:23:"https://soundcloud.com/";s:14:"gallery_images";a:0:{}s:17:"single_post_style";s:6:"modern";s:20:"single_post_elements";a:2:{s:9:"customize";s:2:"no";s:3:"yes";a:1:{s:26:"single_post_elements_popup";a:5:{s:20:"single_reaction_show";a:2:{s:4:"show";s:3:"yes";s:3:"yes";a:2:{s:4:"type";s:15:"without-counter";s:6:"design";s:7:"colored";}}s:20:"single_featured_show";s:3:"yes";s:16:"single_meta_show";s:3:"yes";s:17:"single_share_show";s:3:"yes";s:19:"single_related_show";a:2:{s:4:"show";s:3:"yes";s:3:"yes";a:2:{s:4:"meta";s:3:"yes";s:7:"excerpt";s:3:"yes";}}}}}s:24:"general-customize-design";a:2:{s:9:"customize";s:2:"no";s:3:"yes";a:1:{s:30:"general-customize-design-popup";a:6:{s:21:"general-body-bg-color";s:0:"";s:21:"general-body-bg-image";s:0:"";s:24:"general-body-bg-position";s:7:"initial";s:20:"general-body-bg-size";s:7:"initial";s:22:"general-body-bg-repeat";s:7:"initial";s:26:"general-body-bg-attachment";s:7:"initial";}}}s:22:"top-user-panel-options";a:1:{s:4:"show";s:7:"default";}s:22:"top-menu-panel-options";a:1:{s:4:"show";s:7:"default";}s:24:"left-panel-fixed-options";a:1:{s:4:"show";s:7:"default";}s:7:"sidebar";a:0:{}s:26:"header-stunning-visibility";s:7:"default";s:25:"header-stunning-customize";a:1:{s:3:"yes";a:2:{s:33:"header-stunning-customize-content";a:2:{s:9:"customize";s:2:"no";s:3:"yes";a:1:{s:29:"header-stunning-content-popup";a:3:{s:19:"stunning_title_show";a:2:{s:4:"show";s:3:"yes";s:3:"yes";a:1:{s:5:"title";s:0:"";}}s:25:"stunning_breadcrumbs_show";s:3:"yes";s:13:"stunning_text";s:0:"";}}}s:32:"header-stunning-customize-styles";a:2:{s:9:"customize";s:2:"no";s:3:"yes";a:1:{s:28:"header-stunning-styles-popup";a:8:{s:20:"stunning_padding_top";s:5:"125px";s:23:"stunning_padding_bottom";s:5:"125px";s:17:"stunning_bg_color";s:7:"#eeeeee";s:17:"stunning_bg_image";s:4:"none";s:26:"stunning_bg_animate_picker";a:3:{s:19:"stunning_bg_animate";s:3:"yes";s:3:"yes";a:1:{s:24:"stunning_bg_animate_type";s:5:"fixed";}s:2:"no";a:1:{s:17:"stunning_bg_cover";s:2:"no";}}s:21:"stunning_bottom_image";s:0:"";s:19:"stunning_text_color";s:0:"";s:19:"stunning_text_align";s:29:"stunning-header--content-left";}}}}}}'
views:
  - 119

---
<p class="wpwc-reading-time">
  阅读本文大概需要 8 分钟
</p>

纯粹为了好玩，我花费一周时间用树莓派的板子搭建了一台微型多功能服务器，虽然只有信用卡大小，但是也能科学观看Netflix。通过部署Nginx+Php7.3+Mysql与<a href="https://purel.in/%e4%bb%8e%e6%97%a7%e9%87%91%e5%b1%b1%e5%88%b0%e6%96%b0%e5%8a%a0%e5%9d%a1%ef%bc%8c%e6%9c%80%e7%bb%88%e6%88%91%e4%bb%ac%e6%8a%b5%e8%be%be%e9%a6%96%e5%b0%94/" target="_blank" rel="noreferrer noopener" aria-label="上个月放在韩国的Linux公网服务器（在新窗口打开）">上个月放在韩国的Linux公网服务器</a>实现了frp内网穿透，你可以从http://pi.purel.in/dash 来访问这台微型计算机的状态面版，它现在就放在我家的客厅。从某种程度上你可以理解为这两台相隔异国的服务器，穿透网络实现了量子纠缠。

不妨畅想一下未来这台Pi可以做什么，比如成为私有云盘实现资料的存储与分享，或是部署网站并通过公网域名实现访问，它会成为这个全新的物联网世界中一朵无处不在的云，这朵云就是徐老师的实验室，它就在我家客厅或者我的口袋里。我说了我会写一篇超详细的部署日记，现在你看到我实现了我的承诺，鉴于篇幅较长，我会把它暂时分为硬件篇和软件篇两个部分，未来随着磨合与熟悉，或许会有拓展的玩法分享。

我一直在想这样一件事，鉴于网络服务器的成本和存储空间限制，以及家用带宽的不断提升，我是否可以实现网络服务器的本地化部署？即通过域名http://xxx.xxx访问到的是本地的服务器，而非异地的IDC数据中心，这将大大提升服务器的操控、管理、以及安全性。部署在远端的服务器只需要做一个跳板或者镜像，那么我可以花费最低的成本购买足够的流量和带宽，而不用担心它的CPU性能和I/O限制。所以不论是从效率提升还是成本控制来看，我都需要想办法实现这个设想。

## 主机

目前我已经有了部署在韩国甲骨文机房的VM实例，那么接下来我需要一台低功耗且长期开机联网的本地服务器。上一周的某日我正在电报上面闲云野鹤，通过Dig发现了这块神奇的板子“Raspberry Pi”（树莓派）。虽然我的需求本身排除了对性能和功耗要求极高的图形化界面系统，因为我并不是用它来上网冲浪、看视频、打游戏，我只是需要它默默的做一台Server，但是这块小板子的硬件参数还是给了我惊喜。<figure class="wp-block-image size-large"><figure class="mdx-lazyload-container" style="">

<div style="padding-top:50%">
</div>

<div class="mdx-img-loading-sp mdui-valign">
  <div>
    <div class="mdui-spinner">
    </div>
  </div>
</div>

<img class="wp-image-3756 lazyload" title="树莓派：装在口袋里的量子云实验室（硬件篇）" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://purel.in/wp-content/uploads/2020/03/pi-1024x632.png" alt="https://purel.in/wp-content/uploads/2020/03/pi-1024x632.png" data-srcset="https://purel.in/wp-content/uploads/2020/03/pi-1024x632.png 1024w, https://purel.in/wp-content/uploads/2020/03/pi-300x185.png 300w, https://purel.in/wp-content/uploads/2020/03/pi-768x474.png 768w, https://purel.in/wp-content/uploads/2020/03/pi-800x494.png 800w, https://purel.in/wp-content/uploads/2020/03/pi.png 1171w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure></figure> 

Raspberry Pi 4 B 具备1.5Ghz运行的64位四核处理器，最高支持以60fps速度刷新的4K分辨率的双显示屏（下巴跌到地板上），高达4GB RAM（可根据型号选择1GB、2GB、4GB，多多益善所以我选择的是4GB版本），2.4/5.0 Ghz 双频无线LAN（它还可以用无线发射端成为一台软路由），蓝牙5.0/BLE，千兆以太网，USB3.0（这个接口很重要，意味着它完全可以挂载移动硬盘实现超大存储，比如成为私有云盘或家庭多媒体中心），和PoE功能。

其实树莓派最大的卖点是物联网，也就是说通过编程它的GPIO 40-PIN针脚可以实现更多可能性，比如国外大神们就通过它打造了很多有趣好玩的机器人或者模拟器。最近女儿正饶有兴致的学习编程，这快板子未来可以帮到她。

## 屏幕

<div class="wp-block-image">
  <figure class="aligncenter size-large"><figure class="mdx-lazyload-container" style="">
  
  <div style="padding-top:50%">
  </div>
  
  <div class="mdx-img-loading-sp mdui-valign">
    <div>
      <div class="mdui-spinner">
      </div>
    </div>
  </div>
  
  <img class="wp-image-3758 lazyload" title="树莓派：装在口袋里的量子云实验室（硬件篇）" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://purel.in/wp-content/uploads/2020/03/pi3.52.jpg" alt="https://purel.in/wp-content/uploads/2020/03/pi3.52.jpg" data-srcset="https://purel.in/wp-content/uploads/2020/03/pi3.52.jpg 640w, https://purel.in/wp-content/uploads/2020/03/pi3.52-300x225.jpg 300w, https://purel.in/wp-content/uploads/2020/03/pi3.52-320x240.jpg 320w" sizes="(max-width: 640px) 100vw, 640px" /></figure><figcaption>树莓派3.5寸LCD触摸显示屏</figcaption></figure>
</div>

尽管我为它搭配的3.5寸触摸屏幕使它一眼上去很酷，但实际上却用处不大，我未来可能会用一块1寸左右只显示本机IP地址的OLED屏幕代替。因为通过这几天的使用发现，我基本不会去看这块屏幕，一旦通过电视或显示器的连接完成了初次的联网设置，我就可以通过Macbook、iPad Pro、iPhone Pro Max的 VNC（远程桌面）或SSH（远程终端）连接和管理它。如果可以重来一次，我一定不会选则给树莓派配一块LCD屏幕，所以这块屏幕的存在纯粹是为了好看和炫酷……

## 外设

实际上一旦作为服务器开始运行，除了电源外并不需要任何外设，只要有网络就可以连接和管理它。但是一开始还是需要鼠标、键盘、显示器或电视来设置它。基于研究和好奇的精神我也尝试过无头安装，就是离开所有外设让它开机自动连接WIFI从而实现部署，但是发现这样更费劲，除非环境有限，否则不推荐小白尝试。先学会走路在学跑步在任何地方都适用。<figure class="wp-block-image size-large"><figure class="mdx-lazyload-container" style="">

<div style="padding-top:50%">
</div>

<div class="mdx-img-loading-sp mdui-valign">
  <div>
    <div class="mdui-spinner">
    </div>
  </div>
</div>

<img class="wp-image-3762 lazyload" title="树莓派：装在口袋里的量子云实验室（硬件篇）" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://purel.in/wp-content/uploads/2020/03/IMG_2377-1024x768.jpg" alt="https://purel.in/wp-content/uploads/2020/03/IMG_2377-1024x768.jpg" data-srcset="https://purel.in/wp-content/uploads/2020/03/IMG_2377-1024x768.jpg 1024w, https://purel.in/wp-content/uploads/2020/03/IMG_2377-300x225.jpg 300w, https://purel.in/wp-content/uploads/2020/03/IMG_2377-768x576.jpg 768w, https://purel.in/wp-content/uploads/2020/03/IMG_2377-1536x1152.jpg 1536w, https://purel.in/wp-content/uploads/2020/03/IMG_2377-2048x1536.jpg 2048w, https://purel.in/wp-content/uploads/2020/03/IMG_2377-320x240.jpg 320w, https://purel.in/wp-content/uploads/2020/03/IMG_2377-800x600.jpg 800w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure><figcaption>Lofree蓝牙无线键盘 & 希捷移动硬盘1T</figcaption></figure> 

我翻出来一只HP小鼠标和一只吃灰已久的Lofree蓝牙无线键盘，它也可以通过USB连接线来使用。另外1T的希捷移动硬盘同样摆脱了吃灰的命，我准备在后面用它作为Nextcloud私有云盘使用。移动硬盘吃灰的最大原因就是网络带宽的提升，这让人们大多数的数据存储通过云盘就能够实现，所以一块不能联网只能够通过拔插进行存储操作的移动硬盘越来越不受这个时代的待见。

因为Pi的到来，这些老物件突然间焕发了光彩，尽管人们说电子产品买新不买旧，但随着自己年龄的增长，我对这些老物件的爱也是越来越多。

## 散热

<div class="wp-block-image">
  <figure class="aligncenter size-large"><figure class="mdx-lazyload-container" style="">
  
  <div style="padding-top:50%">
  </div>
  
  <div class="mdx-img-loading-sp mdui-valign">
    <div>
      <div class="mdui-spinner">
      </div>
    </div>
  </div>
  
  <img class="wp-image-3771 lazyload" title="树莓派：装在口袋里的量子云实验室（硬件篇）" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://purel.in/wp-content/uploads/2020/03/pi4shan.png" alt="https://purel.in/wp-content/uploads/2020/03/pi4shan.png" data-srcset="https://purel.in/wp-content/uploads/2020/03/pi4shan.png 741w, https://purel.in/wp-content/uploads/2020/03/pi4shan-300x245.png 300w" sizes="(max-width: 741px) 100vw, 741px" /></figure><figcaption>树莓派4散热风扇和风扇支架</figcaption></figure>
</div>

散热非常重要，原本树莓派的板子是自带金属散热片的，可以贴在CPU和内存上，但是我担心加上屏幕和外壳后散热堪忧，于是又装了一个固定在主板上的散热风扇。即便是这样，开机温度也达到了57度，连续播放1080p的视频会提示主板过热。所以如过把它当作桌面工作站使用的话，真的不如使用Macbook或者PC更合适，话又说回来，如果加强硬件散热的话，比如加大风扇和散热芯片，它真的可以全面替代桌面电脑。

## 总结

下面这张照片就是它目前的样子。虽然很折腾，但确实太好玩了，特别在疫情肆虐的特殊时期，这个小东西让我的生活变得十分丰沛。享受整个过程中会忘记时间的流逝，这种体验下来反而收获更多，Just do it。<figure class="wp-block-image size-large"><figure class="mdx-lazyload-container" style="">

<div style="padding-top:50%">
</div>

<div class="mdx-img-loading-sp mdui-valign">
  <div>
    <div class="mdui-spinner">
    </div>
  </div>
</div>

<img class="wp-image-3755 lazyload" title="树莓派：装在口袋里的量子云实验室（硬件篇）" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://purel.in/wp-content/uploads/2020/03/IMG_2372-2-1024x768.jpg" alt="https://purel.in/wp-content/uploads/2020/03/IMG_2372-2-1024x768.jpg" data-srcset="https://purel.in/wp-content/uploads/2020/03/IMG_2372-2-1024x768.jpg 1024w, https://purel.in/wp-content/uploads/2020/03/IMG_2372-2-300x225.jpg 300w, https://purel.in/wp-content/uploads/2020/03/IMG_2372-2-768x576.jpg 768w, https://purel.in/wp-content/uploads/2020/03/IMG_2372-2-1536x1152.jpg 1536w, https://purel.in/wp-content/uploads/2020/03/IMG_2372-2-2048x1536.jpg 2048w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure><figcaption>树莓派4B 徐老师的量子云实验室</figcaption></figure> 

硬件篇大概就是这样子了，接下来是软件篇，因为我是Google、Youtube、Netflix重度使用者，我打造的Pi云也需要能够流畅使用它们，毕竟这个世界上知识搜索方面没有什么可以超过Google的。另外，如果让自己长期置身BAT环境，那么等同于失去和世界的连接。所以软件篇的篇幅会很长，而且涉及大量的计算机术语，假如你不是真的打算像我一样部署一个自己的Pi云的话，真的就不用追了:D。反之，你若崇尚探索的乐趣，那么接下来的干货一定会令你受益。