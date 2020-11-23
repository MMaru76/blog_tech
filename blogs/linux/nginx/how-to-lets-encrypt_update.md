---
title: 【Linux】 CentOS7 + Nginx + Let’s Encrypt + Update
date: 2020-11-23
# sidebar: true
tags:
  - Nginx
  - Let’s Encrypt
categories:
  - Linux
---

## 1. はじめに

---

Nginx + Let’s Encrypt を使った SSL 証明証の更新手順です｡

- 【m.tabiya.me】 は更新ドメイン

## 2. 更新手順

`certbot renew` を実行する事で更新が可能

```sh
# certbot renew
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/m.tabiya.me.conf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Cert is due for renewal, auto-renewing...
Plugins selected: Authenticator webroot, Installer None
Starting new HTTPS connection (1): acme-v02.api.letsencrypt.org
Renewing an existing certificate
Performing the following challenges:
http-01 challenge for m.tabiya.me
Using the webroot path /var/www/minecraft for all unmatched domains.
Waiting for verification...
Cleaning up challenges

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
new certificate deployed without reload, fullchain is
/etc/letsencrypt/live/m.tabiya.me/fullchain.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Congratulations, all renewals succeeded. The following certs have been renewed:
  /etc/letsencrypt/live/m.tabiya.me/fullchain.pem (success)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
