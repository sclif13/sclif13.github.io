---
title: Docker Asterisk WebRTC
author: Sclif
layout: post
date: 2015-09-13T08:41:19+00:00
categories:
  - Заметки
tags:
  - Asterisk
  - Docker
  - linux
  - sip
  - Voip
  - WEBRTC
---

После нескольких часов экспериментов я создал docker <a href="https://github.com/sclif13/docker-asterisk13-webrtc">image</a> на основе Centos 6 и Asterisk 13.5.0. Вышел он довольно увесистый в 1.3 Гб. Собран с поддержкой WebRTC.

Как пользоваться?

Качаем готовый image c <a href="https://hub.docker.com/r/sclif13/docker-asterisk13-webrtc/" target="_blank">hub.docker.com</a> :

```
docker pull sclif13/docker-asterisk13-webrtc
```

Затем необходимо создать docker контейнер:

```
docker run -d -t --name=asterisk -p 5060:5060/udp \
       -p 10000-10200:10000-10200/udp \
       -p 8088:8088 \
       -v /data/asterisk/etc:/etc/asterisk \
       sclif13/docker-asterisk13-webrtc
```

Указываем порты 5060 для SIP, 10000-10200 для RTP, 8088  для webrtc. Так же если необходимо вынести конфиги наружу указываем папку где они будут лежать в вашей системе(/data/asterisk/etc) и в самом docker контейнере (/etc/asterisk)

После того как будет создан и запущен ваш docker контейнер нужно его сконфигурировать и для начала скопировать стандартные конфиги.

```
docker exec  -it asterisk bash
cd /usr/src/asterisk-*
make samples
exit
```

Теперь в вашей папке(/data/asterisk/etc) должны появиться конфиги. Далее гуглим как настроить этот самый WebRTC для Asterisk. Чтобы попасть в консоль самого Asterisk выполняем следующую команду:

```
docker exec  -it asterisk asterisk -rvvvvvvvvvvvvvvvvvvc
```

P.S. Обновил asterisk до 13.14.0

{{< github-button >}}
