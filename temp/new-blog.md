服务器使用系统：Ubuntu 20.04

远程连接工具：[electerm](https://electerm.html5beta.com/)

Http代理服务器：[nginx](https://www.nginx.cn/doc/general/overview.html)

# 零基础搭建博客平台

## nginx安装
apt-get install nginx 

nginx文件安装完成之后的文件位置：

/usr/sbin/nginx：主程序
/etc/nginx：存放配置文件
/usr/share/nginx：存放静态文件
/var/log/nginx：存放日志

启动命令：service nginx start

nginx.conf:
```
     ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
```




### linux 入门
1. sudo su root 切换成系统用户

2. 输入ls后没有返回任何文件
原因： ls指令不返回以   **.**   开头的隐藏文件，如果要展示隐藏文件，使用`ls -a`

3. 复制粘贴是常用的命令：
复制： `ctrl + shift + C`
粘贴： `shift + insert`

4. [vi/vim](https://blog.csdn.net/cyl101816/article/details/82026678)
写：
-   按「i」切换进入插入模式「insert mode」，按"i"进入插入模式后是从光标当前位置开始输入文件；
-   按「a」进入插入模式后，是从目前光标所在位置的下一个位置开始输入文字；
-   按「o」进入插入模式后，是插入新的一行，从行首开始输入文字。

复制：
-　「yy」：复制光标所在行到缓冲区。
-　「p」：将缓冲区内的字符贴到光标所在位置。注意：所有与"y"有关的复制命令都必须与"p"配合才能完成复制与粘贴功能。

删除
「dd」：删除光标所在行。

回复上一次操作
「u」：如果您误执行一个命令，可以马上按下「u」，回到上一个操作。按多次"u"可以执行多次回复。

退出：
esc: 退出当前模式
: q! (输入q!， 不存盘强制退出vi)
: wq (输入「wq」，存盘并退出vi)

注：若写文件不成功： sudo vi 文件

5. 安装命令
① ./configure         //在解压软件目录内部执行

       相关参数配置，软件安装位置，支持软件设置，软件依赖检查，生成编译对应的工具文件。

       例如--prefix是设置软件的安装位置

② make               //根据configure的配置信息生成“二进制文件”

③ make  install        //把生成的二进制文件复制到系统指定目录

6. 查找已安装软件
-   dpkg -l | grep pcre

7. 本机与服务器传输文件
传输单个文件
scp root@公网ip:服务器文件路径 本地路径

传输整个文件夹
scp -r root@公网ip:服务器文件夹路径 本地路径

8. 递归删除文件夹
rm -rf 目录名字

9. 设置文件夹读写权限 chmod [rwx] [路径]
chmod a+rw file ： a : 所有用户 , + ：增加权限 , rw : 读写
[详细配置](https://www.runoob.com/linux/linux-comm-chmod.html)


# docker 
### ubuntu 安装

1.     在你在一台新主机上安装Docker之前，你需要先设置Docker仓库。
       -      添加Docker官方的GPG key（密钥）
       -      设置仓库（稳定版）
2. 
```
sudo apt-get update // 拉取刚添加的仓库
sudo apt-get install docker-ce docker-ce-cli containerd.io 
```

### 命令
docker container run命令具有自动抓取 image 文件的功能。如果发现本地没有指定的 image 文件，就会从仓库自动抓取。

docker ps : 查看运行的进行
docker image ls : 查看本地所有镜像
docker container stop [name] : 停止名为[]的container
docker run --rm : 停止容器后自动删除容器

