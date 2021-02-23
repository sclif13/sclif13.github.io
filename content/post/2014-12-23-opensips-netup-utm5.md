---
title: Opensips + Netup UTM5
author: Sclif
layout: post
date: 2014-12-22T20:57:23+00:00
categories:
  - Заметки
tags:
  - billing
  - opensips
  - radius
  - Voip

---
В преддверии нового 2015 года решил поделиться своим опытом и опытом моего коллеги Евгения.

Уже давно у меня были попытки связать Kamailio/Opensips с различными биллингами с помощью протокола Radius. Стандартные модули позволяют это сделать, но не могут прочитать ответ от radius сервера, потому как требуют ответ в формате SIP-AVP. И вот начиная с версии 1.6 в opensips появился модуль
<a href="http://opensips.org/html/docs/modules/1.11.x/aaa_radius.html" target="_blank">aaa_radius</a>. Сложность использования данного модуля в том, что нам необходимо самим настроить radius пакет Access-Request.

И так приступим собственно к настройке. Я установил последнюю версию opensips 1.11.3 из репозитория и radiusclient-ng. Необходимые переменные почерпнул в <a href="http://www.opensips.org/Documentation/Script-CoreVar" target="_blank">документации</a> opensips.
```
#### Radius
loadmodule "auth.so"
modparam("auth", "disable_nonce_check", 1)

loadmodule "aaa_radius.so"

modparam("aaa_radius","radius_config", "/etc/radiusclient-ng/radiusclient.conf")
modparam("aaa_radius","fetch_all_values", 1)
modparam("aaa_radius","sets","auth_register = (User-Name = $fU,
                                               Digest-Response = $auth.resp,
                                               Digest-Realm = $ar,
                                               Digest-Nonce = $an,
                                               Digest-User-Name = $au,
                                               Digest-Uri = $adu,
                                               Digest-Method  = $avp(method),
                                               Digest-Qop = $auth.qop,
                                               Digest-CNonce = $auth.cnonce,
                                               Digest-Nonce-Count = $auth.nc)")


modparam("aaa_radius","sets","radius-reply = (h323-credit-amount = $avp(amount),
                                              h323-credit-time = $avp(credit-time),
                                              h323-currency = $avp(currency),
                                              h323-return-code = $avp(return-code))")

modparam("aaa_radius","sets","auth_invite = (User-Name = $fU,
                                             h323-conf-id=$ci,
                                             Called-Station-Id = $rU,
                                             Calling-Station-Id = $fU,
                                             Digest-Response = $auth.resp,
                                             Digest-Realm = $ar,
                                             Digest-Nonce = $an,
                                             Digest-User-Name = $au,
                                             Digest-Uri = $adu,
                                             Digest-Method  = $avp(method),
                                             Digest-Qop = $auth.qop,
                                             Digest-CNonce = $auth.cnonce,
                                             Digest-Nonce-Count = $auth.nc)")
```

Для Digest-Method не нашлась переменная, поэтому будем указывать её явно. Для метода REGISTER используем настройки auth_register и radius-reply

```
if (is_method("REGISTER"))
    {
        if($adu != NULL) {
            $avp(method) = "REGISTER";
            radius_send_auth("auth_register","radius-reply");
            switch ($rc) {
                case 1:
                    xlog("authentication ok \n");
                    xlog("$avp(credit-time)");
                    xlog("$avp(return-code)");
                    xlog("$var(amount)");
                    break;
                case -1:
                    xlog("error during authentication\n");
                    sl_send_reply("503", "Service Unavailable");
                    break;
                case -2:
                    xlog("authentication denied \n");
                    sl_send_reply("401", "Unauthorized");
                    break;
            }
        } else {
            www_challenge("", "1");
            exit;
            };

        if (   0 ) setflag(TCP_PERSISTENT);
        if (!save("location"))
            sl_reply_error();

        exit;
    }
```

Для метода INVITE используем настройки auth_invite и radius-reply

```
route[relay] {

    if (is_method("INVITE") && !has_totag()) {
        if($adu != NULL) {
            $avp(method) = "INVITE";
            radius_send_auth("auth_invite","radius-reply");
            switch ($rc) {
                case 1:
                    xlog("authentication ok \n");
                    xlog("$avp(credit-time)");
                    xlog("$avp(return-code)");
                    xlog("$avp(amount)");
                    break;
                case -1:
                    xlog("error during authentication\n");
                    sl_send_reply("503", "Service Unavailable");
                    break;
                case -2:
                    xlog("authentication denied \n");
                    sl_send_reply("401", "Unauthorized");
                    break;
            }
        } else {
            proxy_challenge("", "1");
            exit;
            };


    }
```

При настройке возникли трудности с словарями radiusclient-ng, которые могут возникнуть у вас.

```
Dec 21 02:13:10 /usr/sbin/opensips[13231]: ERROR:aaa_radius:init_radius_handle: attribute not found Cisco:h323-return-code
Dec 21 02:13:10 /usr/sbin/opensips[13231]: ERROR:aaa_radius:send_auth_fixup: invalid radius handle
Dec 21 02:13:10 /usr/sbin/opensips[13231]: ERROR:core:fix_actions: fixing failed (code=-1) at cfg line 297
Dec 21 02:13:10 /usr/sbin/opensips[13231]: ERROR:core:main: failed to fix configuration with err code -1
```

По ссылке <a href="https://github.com/sclif13/opensips-utm5" target="_blank">https://github.com/sclif13/opensips-utm5</a> вы найдете полный пример.