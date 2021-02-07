(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{513:function(s,a,t){"use strict";t.r(a);var e=t(4),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"_1-はじめに"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-はじめに"}},[s._v("#")]),s._v(" 1. はじめに")]),s._v(" "),t("p",[s._v("｢Minecraft サーバーを全力で楽して運用をする!!!｣モットーに､様々なスキルを身に着けています｡")]),s._v(" "),t("p",[s._v("当初は､Google Domainで全て完結させようと思っていましたが､思ったより手こずったので､AWS Route53 で実現させました｡")]),s._v(" "),t("h3",{attrs:{id:"_1-1-前提"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-前提"}},[s._v("#")]),s._v(" 1.1. 前提")]),s._v(" "),t("ul",[t("li",[s._v("CentOS Stream/CentOS 8")]),s._v(" "),t("li",[t("a",{attrs:{href:"https://tabiya.dev/blogs/aws/compute/amazon-linux2-cli.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("AWS CLI 2"),t("OutboundLink")],1),s._v(" "),t("ul",[t("li",[t("code",[s._v("aws-cli/2.1.24 Python/3.7.3 Linux/4.18.0-269.el8.x86_64 exe/x86_64.centos.8 prompt/off")])])])]),s._v(" "),t("li",[s._v("ルーターがぶっ壊れて再起動が入っても､レコードの自動更新をしてほしい\n"),t("ul",[t("li",[s._v("(弊家はルーターの再起動が入るとグローバルIPが強制的に変わる)")])])]),s._v(" "),t("li",[s._v("Route53にホストゾーンにドメインを登録済み")])]),s._v(" "),t("h2",{attrs:{id:"_2-シェルスクリプトファイルの準備"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-シェルスクリプトファイルの準備"}},[s._v("#")]),s._v(" 2. シェルスクリプトファイルの準備")]),s._v(" "),t("p",[s._v("ここでは､ユーザー配下の "),t("code",[s._v("work")]),s._v(" というディレクトリに実行ファイルを置いていますが､任意の所に置いてください｡")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" work "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /home/UserName/work/route53.sh\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DOMAIN_NAME")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ドメイン名を記述"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IP_ADDRESS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -s inet-ip.info"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("HOSTED_ZONE_ID")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ZONE-IDを入力"')]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BATCH_JSON")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'{\n  "Changes": [\n    { "Action": "UPSERT",\n      "ResourceRecordSet": {\n        "Name": "\'')]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${DOMAIN_NAME}")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'",\n        "Type": "A",\n        "TTL" : 300,\n        "ResourceRecords": [\n          { "Value": "\'')]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${IP_ADDRESS}")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'\" }\n        ]\n      }\n    }\n  ]\n}'")]),s._v("\n\naws route53 change-resource-record-sets --hosted-zone-id "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${HOSTED_ZONE_ID}")]),s._v(" --change-batch "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${BATCH_JSON}")]),s._v('"')]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br")])]),t("h2",{attrs:{id:"_3-systemd-サービスユニットの準備"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-systemd-サービスユニットの準備"}},[s._v("#")]),s._v(" 3. Systemd/サービスユニットの準備")]),s._v(" "),t("ul",[t("li",[s._v("ファイルの場所")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/systemd/system/route53_set.service\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Unit"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Description")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Route53 Set And TimeLoop\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("After")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("network-online.target\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Service"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ExecStart")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" /bin/bash /home/UserName/work/route53.sh\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("WorkingDirectory")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/home/UserName/work\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Type")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("oneshot\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("User")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("UserName\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Group")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("UserName\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Install"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("WantedBy")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("multi-user.target\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br")])]),t("h2",{attrs:{id:"_4-systemd-タイマーユニットの準備"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-systemd-タイマーユニットの準備"}},[s._v("#")]),s._v(" 4. Systemd/タイマーユニットの準備")]),s._v(" "),t("ul",[t("li",[s._v("ファイルの場所")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/systemd/system/route53_set.timer\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("毎時40分に実施する場合は､"),t("code",[s._v("OnCalendar=*-*-* *:40:00")]),s._v(" と記述")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Unit"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Description")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("Route53 And TimeLoop\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Timer"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("OnCalendar")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("*-*-* *:40:00\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Unit")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("route53_set.service\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Install"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("WantedBy")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("multi-user.target\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("h2",{attrs:{id:"_5-最後に"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-最後に"}},[s._v("#")]),s._v(" 5. 最後に")]),s._v(" "),t("p",[t("code",[s._v("cron")]),s._v(" で書けばもっと楽に出来たのでは?!っというのは､内緒です｡")])])}),[],!1,null,null,null);a.default=n.exports}}]);