---
title: Wireshark в docker
author: Sclif
layout: post
date: 2015-03-12T18:12:31+00:00
categories:
  - Разное
tags:
  - Docker
  - linux

---
Не давно столкнулся с проблемой установки wireshark 1.12 из исходников на ubuntu desktop 14.04, а точнее был конфликт между библиотеками Xserver. Так как я по большой части использую wireshark для наглядного разбора, а статистику собираю через tcpdump, то решил создать wireshark в docker.

Dockerfile <https://github.com/sclif13/docker-wireshark>

Статья в помощь по запуску <http://habrahabr.ru/post/240509/>