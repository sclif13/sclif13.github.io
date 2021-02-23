---
title: Freeswitch + mod_xml_radius + Netup UTM5
author: Sclif
layout: post
date: 2014-06-28T16:47:56+00:00
categories:
  - Заметки
tags:
  - billing
  - Freeswitch
  - Voip

---
Обратились ко мне с просьбой настроить связку Freeswitch + mod_xml_radius + Netup UTM5. Ну собственно сам процесс.

Про то как устанавливать Freeswitch и Netup UTM5 описано в документации. Скажу только, что Freeswitch установил из пакетов, а  модуль mod_xml_radius скомпилировал из исходников.

Теперь настраиваем mod_xml_radius.

  * Копируем xml\_radius.conf.xml из исходников в папку /etc/freeswitch/autoload\_configs/ и добавляем в файле modules.conf.xml наш модуль mod\_xml\_radius.
  * В файле xml_radius.conf.xml прописываем сервер и ключ доступа NAS.
  * Заменяем словари радиуса идущие в комплекте с модулем на словари идущие с  пакетом **radiusclient-ng** и прописываем пути.
  * В файле **dictionary.sip** имя атрибута** Digest-User-Name** меняем на **Digest-Username**.
  * Для accounting пакетов я добавляем параметр

```
param name="Acct-Session-Id" variable="uuid" format="%s"
```

Все. Создаем услугу и телефон и проверяем. Если что-то не так, смотрим логи.
