---
title: 树莓派：安装0.96寸SPI接口SSD1306屏幕
type: post
date: 2020-04-04T05:48:32+00:00
categories: [树梅派]
tags: [树梅派,ssd1306,LCD,SPI,Pi,Python,驱动]
---
![](/images/2020/04/spi-night.jpg)
当这块小屏幕在夜里散发着光芒，你看到它便能回忆起整个部署的过程……
<!--more-->
## 1. 硬件的选配

淘宝搜索ssd1306 spi选一家十块钱左右有眼缘的，为什么选择spi的7针而不是i2c简单的4针呢？因为i2c刷新率只有10fps，而spi高达64-364fps。然后再加1.5元买40根杜邦线，虽然用不了这么多，但是为了以后扩展GPIO接口做备胎，然后apt-get安装Adafruit的1306库，对example代码稍事调整，然后在cmd输入一条python指令成功点亮….

## 2. 连接GPIO排线

ls /dev/spidev* #如果目录为空，可能之前安装过spi屏幕占用了接口，正常应该显示 /dev/spidev0.0 /dev/spidev0.1 查看config.txt文件是否有dtoverlay开头的命令，如果有就加#注释掉。还可以通过lsmod #查看是否开启了spi模块。

![](https://purel.in/wp-content/uploads/2020/04/spi.bmp)把模块的引脚接到树莓派的GPIO上， 需要注意这里要分清GPIO引脚号是BCM编号还是实际编号。GND脚和树莓派的GND连接；VCC接到3.3V脚；D0接到树莓派的SCLK脚（第23号脚），即BCM.11脚；D1接到MOSI脚（第19号脚），即BCM.10；RES接到BCM.17脚，即第11号脚；DC接到BCM.22脚，即第15号脚；CS接到CE0脚（第24号脚）。总之，除了RES和DC是可以任意指定GPIO口，其他引脚是必须和树莓派上的指定脚连接的。

## 3. 安装软件
#### 3.1 安装ssd1306库
```
sudo apt-get install git
git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
cd Adafruit_Python_SSD1306
sudo python setup.py install
```
#### 3.2 创建一个py文件

我希望用这块屏幕显示本机IP地址/CPU内存/磁盘使用情况，用以下代码创建一个文件命名为sys_info.py。

```
import time
import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import subprocess

# Raspberry Pi pin configuration:
RST = 17     # 注意这里填BCM标准的针脚号
# Note the following are only used with SPI:
DC = 22
SPI_PORT = 0
SPI_DEVICE = 0

# 128x64 display with hardware SPI:
disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST, dc=DC, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=8000000))

# Initialize library.
disp.begin()

# Clear display.
disp.clear()
disp.display()

# Create blank image for drawing.
# Make sure to create image with mode '1' for 1-bit color.
width = disp.width
height = disp.height
image = Image.new('1', (width, height))

# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)

# Draw a black filled box to clear the image.
draw.rectangle((0,0,width,height), outline=0, fill=0)

# Draw some shapes.
# First define some constants to allow easy resizing of shapes.
padding = -2
top = padding
bottom = height-padding
# Move left to right keeping track of the current x position for drawing shapes.
x = 0


# Load default font.
font = ImageFont.load_default()

# Alternatively load a TTF font.  Make sure the .ttf font file is in the same directory as the python script!
# Some other nice fonts to try: http://www.dafont.com/bitmap.php
# font = ImageFont.truetype('Minecraftia.ttf', 8)

while True:

    # Draw a black filled box to clear the image.
    draw.rectangle((0,0,width,height), outline=0, fill=0)

    # Shell scripts for system monitoring from here : https://unix.stackexchange.com/questions/119126/command-to-display-memory-usage-disk-usage-and-cpu-load
    cmd = hostname -I | cut -d\' \' -f1
    IP = subprocess.check_output(cmd, shell = True )
    cmd = top -bn1 | grep load | awk '{printf \CPU: %.2f\, $(NF-2)}'
    CPU = subprocess.check_output(cmd, shell = True )
    cmd = free -m | awk 'NR==2{printf \Mem: %s/%sMB %.2f%%\, $3,$2,$3*100/$2 }'
    MemUsage = subprocess.check_output(cmd, shell = True )
    cmd = df -h | awk '$NF==\/\{printf \Disk: %d/%dGB %s\, $3,$2,$5}'
    Disk = subprocess.check_output(cmd, shell = True )
    cmd = vcgencmd measure_temp
    Temp = subprocess.check_output(cmd, shell = True )

  # Return CPU temperature as a character string

    # Write two lines of text.

    draw.text((x, top),       IP:  + str(IP),  font=font, fill=255)
    draw.text((x, top+9),     str(CPU), font=font, fill=255)
    draw.text((x, top+18),    str(MemUsage),  font=font, fill=255)
    draw.text((x, top+27),    str(Disk),  font=font, fill=255)
    draw.text((60, top+9),    str(Temp), font=font, fill=255)

    # Display image.
    disp.image(image)
    disp.display()
	# 设置屏幕刷新间隔秒数，与CPU损耗相关
    time.sleep(5)
```

通过 `python sys_info.py` 运行它，如果提示却什么模块可以直接安装再执行，比如我这边缺了utmp模块，输入 `apt-get install python-utmp` 来进行安装。

再次运行python sys_info.py成功点亮～
这里值得注意的是`time.sleep(5)`参数，起初的demo值默认为`.1`，这意味着每0.1秒就刷新一次屏幕，不管我是否注释掉这一行CPU负载都会迅速提升。所以我的建议值是5秒，这足够我们获取到刷新的信息而不烦躁，并且有效降低树莓派的CPU复杂。

![](/images/2020/04/sys_info.jpg "Processed with VSCO with a8 preset")
## 4. 设置开机启动

进入目录 /lib/systemd/system 创建`sys_info.service`文件

```
[Unit]
Description=sys——info service
After=network.target syslog.target
Wants=network.target
[Service]
Type=simple
启动服务的命令（此处写你的frps的实际安装目录）
ExecStart=python /root/sys_info.py
[Install]
WantedBy=multi-user.target`
```
#### 4.1 启动 sys_info
`sudo systemctl start sys_info`
#### 4.1 设为开机自启动
`sudo systemctl enable sys_info`