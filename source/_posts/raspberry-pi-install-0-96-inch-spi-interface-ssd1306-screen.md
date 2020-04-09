---
title: 树莓派：安装0.96寸SPI接口SSD1306屏幕
author: Jacob
type: post
date: 2020-04-04T05:48:32+00:00
url: /raspberry-pi-install-0-96-inch-spi-interface-ssd1306-screen/
featured_image: /wp-content/uploads/2020/04/spi-black-scaled.jpg

---
当这块小屏幕在夜里散发着光芒，你看到它便能回忆起整个部署的过程……
<!--more-->
## 硬件的选配

淘宝搜索ssd1306 spi选一家十块钱左右有眼缘的，为什么选择spi的7针而不是i2c简单的4针呢？因为i2c刷新率只有10fps，而spi高达64-364fps。然后再加1.5元买40根杜邦线，虽然用不了这么多，但是为了以后扩展GPIO接口做备胎，然后apt-get安装Adafruit的1306库，对example代码稍事调整，然后在cmd输入一条python指令成功点亮….

## 连接GPIO排线

ls /dev/spidev* #如果目录为空，可能之前安装过spi屏幕占用了接口，正常应该显示 /dev/spidev0.0  /dev/spidev0.1 查看config.txt文件是否有dtoverlay开头的命令，如果有就加#注释掉。还可以通过lsmod #查看是否开启了spi模块。

<figure class="mdx-lazyload-container" style="">

<div style="padding-top:50%">
</div>

<div class="mdx-img-loading-sp mdui-valign">
  <div>
    <div class="mdui-spinner">
    </div>
  </div>
</div>

<img class="wp-image-3829 lazyload" style="width: 600px;" title="树莓派：安装0.96寸SPI接口SSD1306屏幕" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://purel.in/wp-content/uploads/2020/04/spi.bmp" alt="https://purel.in/wp-content/uploads/2020/04/spi.bmp" data-srcset="https://purel.in/wp-content/uploads/2020/04/spi.bmp 1303w, https://purel.in/wp-content/uploads/2020/04/spi-300x164.bmp 300w, https://purel.in/wp-content/uploads/2020/04/spi-1024x559.bmp 1024w, https://purel.in/wp-content/uploads/2020/04/spi-768x419.bmp 768w" sizes="(max-width: 1303px) 100vw, 1303px" /></figure>把模块的引脚接到树莓派的GPIO上， 需要注意这里要分清GPIO引脚号是BCM编号还是实际编号。GND脚和树莓派的GND连接；VCC接到3.3V脚；D0接到树莓派的SCLK脚（第23号脚），即BCM.11脚；D1接到MOSI脚（第19号脚），即BCM.10；RES接到BCM.17脚，即第11号脚；DC接到BCM.22脚，即第15号脚；CS接到CE0脚（第24号脚）。总之，除了RES和DC是可以任意指定GPIO口，其他引脚是必须和树莓派上的指定脚连接的。

## 安装ssd1306库

`sudo apt-get install git<br />git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git<br />cd Adafruit_Python_SSD1306<br />sudo python setup.py install`

## 创建一个py文件

我希望用这块屏幕显示本机IP地址/CPU内存/磁盘使用情况，用以下代码创建一个文件命名为sys_info.py。

<pre class="wp-block-code"><code># Copyright (c) 2017 Adafruit Industries
# Author: Tony DiCola & James DeVito
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
import time

import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

import subprocess

# Raspberry Pi pin configuration:
RST = 17     # on the PiOLED this pin isnt used
# Note the following are only used with SPI:
DC = 22
SPI_PORT = 0
SPI_DEVICE = 0

# Beaglebone Black pin configuration:
# RST = 'P9_12'
# Note the following are only used with SPI:
# DC = 'P9_15'
# SPI_PORT = 1
# SPI_DEVICE = 0

# 128x32 display with hardware I2C:
#disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST)

# 128x64 display with hardware I2C:
# disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST)

# Note you can change the I2C address by passing an i2c_address parameter like:
# disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST, i2c_address=0x3C)

# Alternatively you can specify an explicit I2C bus number, for example
# with the 128x32 display you would use:
# disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST, i2c_bus=2)

# 128x32 display with hardware SPI:
# disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST, dc=DC, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=8000000))

# 128x64 display with hardware SPI:
disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST, dc=DC, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=8000000))

# Alternatively you can specify a software SPI implementation by providing
# digital GPIO pin numbers for all the required display pins.  For example
# on a Raspberry Pi with the 128x32 display you might use:
# disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST, dc=DC, sclk=18, din=25, cs=22)

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
    cmd = "hostname -I | cut -d\' \' -f1"
    IP = subprocess.check_output(cmd, shell = True )
    cmd = "top -bn1 | grep load | awk '{printf \"CPU: %.2f\", $(NF-2)}'"
    CPU = subprocess.check_output(cmd, shell = True )
    cmd = "free -m | awk 'NR==2{printf \"Mem: %s/%sMB %.2f%%\", $3,$2,$3*100/$2 }'"
    MemUsage = subprocess.check_output(cmd, shell = True )
    cmd = "df -h | awk '$NF==\"/\"{printf \"Disk: %d/%dGB %s\", $3,$2,$5}'"
    Disk = subprocess.check_output(cmd, shell = True )
    cmd = "vcgencmd measure_temp"
    Temp = subprocess.check_output(cmd, shell = True )

  # Return CPU temperature as a character string                                      

    # Write two lines of text.

    draw.text((x, top),       "IP: " + str(IP),  font=font, fill=255)
    draw.text((x, top+9),     str(CPU), font=font, fill=255)
    draw.text((x, top+18),    str(MemUsage),  font=font, fill=255)
    draw.text((x, top+27),    str(Disk),  font=font, fill=255)
    draw.text((60, top+9),    str(Temp), font=font, fill=255)

    # Display image.
    disp.image(image)
    disp.display()
    time.sleep(5)</code></pre>

python sys_info.py #运行它，如果提示却什么模块可以直接安装再执行，比如我这边缺了utmp模块，输入 apt-get install python-utmp 来进行安装。

再次运行python sys_info.py成功点亮～<figure class="wp-block-image size-large"><figure class="mdx-lazyload-container" style="">

<div style="padding-top:50%">
</div>

<div class="mdx-img-loading-sp mdui-valign">
  <div>
    <div class="mdui-spinner">
    </div>
  </div>
</div>

<img class="wp-image-3850 lazyload" title="树莓派：安装0.96寸SPI接口SSD1306屏幕" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://purel.in/wp-content/uploads/2020/04/sys_info-1024x768.jpg" alt="https://purel.in/wp-content/uploads/2020/04/sys_info-1024x768.jpg" data-srcset="https://purel.in/wp-content/uploads/2020/04/sys_info-1024x768.jpg 1024w, https://purel.in/wp-content/uploads/2020/04/sys_info-300x225.jpg 300w, https://purel.in/wp-content/uploads/2020/04/sys_info-768x576.jpg 768w, https://purel.in/wp-content/uploads/2020/04/sys_info-1536x1152.jpg 1536w, https://purel.in/wp-content/uploads/2020/04/sys_info-2048x1536.jpg 2048w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure> <figcaption>Processed with VSCO with a8 preset</figcaption> </figure> 

## 设置开机自启动

进入目录 /lib/systemd/system 创建sys_info.service文件

`[Unit]Description=sys——info service<br />After=network.target syslog.target<br />Wants=network.target<br />[Service]Type=simple<br />启动服务的命令（此处写你的frps的实际安装目录）<br />ExecStart=python /root/sys_info.py<br />[Install]WantedBy=multi-user.target`

启动sys_info  
`sudo systemctl start sys_info`  
再打开开机自启动   
`sudo systemctl enable sys_info`