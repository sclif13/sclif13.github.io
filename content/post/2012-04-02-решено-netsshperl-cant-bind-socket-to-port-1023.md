---
title: 'Решено: Net::SSH::Perl Can`t bind socket to port 1023'
author: Sclif
layout: post
date: 2012-04-02T16:42:37+00:00
categories:
  - Code
tags:
  - linux
  - Perl

---
Собрался написать не большой скрипт, который на удаленном сервере через ssh добавляет или удаляет правила iptables.Написал тестовый скрипт.

```
use Net::SSH::Perl;

my $host ="xx.xx.xx.xx";
my $user = "user";
my $pass = "paswd";
my $cmd = "uname -a";
my $ssh = Net::SSH::Perl-&gt;new (
   $host,
   protocol =&gt; 2,
   port =&gt; 22,
   debug =&gt; 1,
   );
$ssh-&gt;login($user,$pass);
my ($stdout, $stderr, $exit) = $ssh-&gt;cmd($cmd);
print "$stdout";
```

Запустил один раз и он отработал нормально и сразу же второй раз. И тут выпала ошибка **Net::SSH Can&#8217;t bind socket to port 1023 Адрес уже используется. **При чем на другом сервере такой проблемы не было с идентичной Ubuntu Server. Переставил несколько раз пакет Net::SSH:Perl и не помогло. Почитав в Интернете я понял в чем проблема. SSH клиент если запускать от root открывает привилегированный порт в моем случае 1023. И не закрывает socket. Соответственно, если надо открыть еще одно соединение, то нужно использовать порты больше 1024. Отключается данная опция в файлах .ssh/ssh\_config и /etc/ssh/ssh\_config параметром **UsePrivilegedPort no**, но почему Net::SSH:Perl файл ssh_config искал в /etc. Пришлось просто еще раз скопировать и туда. И все заработало 🙂

А вот и скрипт управляемый iptables. Запускаем ./script iptables -A INPUT -s 0/0 -j ACCEPT. Когда происходит удаление, то скрипт удаляет все одинаковые правила, пока iptables не выдаст ошибку.

```
#!/usr/bin/perl

use strict;
use warnings;
use Net::SSH::Perl;

my $host = 'xx.xx.xx.xx';
my $pass = 'xxx';
my $user = 'user';
my $x;
my $command;
my ($stdout, $stderr, $exit);

while(@ARGV)
                { $x = shift @ARGV;
                  $command .= " $x";
                }

my $ssh = Net::SSH::Perl-&gt;new($host, protocol =&gt; '2');
$ssh-&gt;login($user, $pass);

if ($command=~m/\-D/) {

        do
                {
                ($stdout, $stderr, $exit) = $ssh-&gt;cmd($command);
                } while(!$stderr);

        }
        else
        {
        $ssh-&gt;cmd($command);
        }

$ssh-&gt;cmd("exit");
```