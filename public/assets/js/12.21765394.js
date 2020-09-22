(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{492:function(s,a,t){"use strict";t.r(a);var e=t(4),r=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"_1-1-lamp-とは"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-lamp-とは"}},[s._v("#")]),s._v(" 1.1. LAMP とは")]),s._v(" "),t("blockquote",[t("p",[s._v("LAMPとは、OSであるLinux、WebサーバであるApache HTTP Server、データベースであるMySQL、スクリプト言語であるPerl、PHP、Pythonを総称した頭文字から成る造語である。動的なウェブコンテンツを含むウェブサイトの構築に適した、オープンソースのソフトウェア群である。")]),s._v(" "),t("p",[s._v("参照元 : "),t("a",{attrs:{href:"https://ja.wikipedia.org/wiki/LAMP_(%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%83%90%E3%83%B3%E3%83%89%E3%83%AB)",target:"_blank",rel:"noopener noreferrer"}},[s._v("LAMP(ソフトウェアバンドル)"),t("OutboundLink")],1)])]),s._v(" "),t("h2",{attrs:{id:"_1-2-apache-編"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-apache-編"}},[s._v("#")]),s._v(" 1.2. Apache 編")]),s._v(" "),t("h3",{attrs:{id:"_1-2-1-インストール"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-1-インストール"}},[s._v("#")]),s._v(" 1.2.1. インストール")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# yum -y install httpd")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_1-2-2-サービスの起動"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-2-サービスの起動"}},[s._v("#")]),s._v(" 1.2.2. サービスの起動")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# systemctl start httpd")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_1-2-3-自動起動のon"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-3-自動起動のon"}},[s._v("#")]),s._v(" 1.2.3. 自動起動のON")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# systemctl enable httpd")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_1-2-4-自動起動が有効か確認"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-4-自動起動が有効か確認"}},[s._v("#")]),s._v(" 1.2.4. 自動起動が有効か確認")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# systemctl is-enabled httpd")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"_1-2-5-configファイルのチェック"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-5-configファイルのチェック"}},[s._v("#")]),s._v(" 1.2.5. configファイルのチェック")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# httpd -t")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Syntax OK\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"_1-2-6-configファイルのバックアップ取得"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-6-configファイルのバックアップ取得"}},[s._v("#")]),s._v(" 1.2.6. configファイルのバックアップ取得")]),s._v(" "),t("ul",[t("li",[s._v("日付付きでバックアップ")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("# cp /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf.`date +%Y%m%d_%H-%M-%S`\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ul",[t("li",[s._v("バックアップ結果")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ll /etc/httpd/conf/")]),s._v("\ntotal "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("40")]),s._v("\n-rw-r--r-- "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11910")]),s._v(" May  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":01 httpd.conf\n-rw-r--r-- "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11910")]),s._v(" May "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(":17 httpd.conf.20200525_14-17-25\n-rw-r--r-- "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("13064")]),s._v(" May  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":03 magic\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h2",{attrs:{id:"_1-3-mariaddb-編"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-mariaddb-編"}},[s._v("#")]),s._v(" 1.3. MariadDB 編")]),s._v(" "),t("h3",{attrs:{id:"_1-3-1-インストール"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-1-インストール"}},[s._v("#")]),s._v(" 1.3.1. インストール")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# yum install -y mariadb-server")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_1-3-2-サービスの起動"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-2-サービスの起動"}},[s._v("#")]),s._v(" 1.3.2. サービスの起動")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# systemctl start mariadb")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_1-3-3-自動起動のon"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-3-自動起動のon"}},[s._v("#")]),s._v(" 1.3.3. 自動起動のON")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# systemctl enable mariadb")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_1-3-4-自動起動が有効か確認"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-4-自動起動が有効か確認"}},[s._v("#")]),s._v(" 1.3.4. 自動起動が有効か確認")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# systemctl is-enabled mariadb")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"_1-3-5-セキュリティ設定"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-5-セキュリティ設定"}},[s._v("#")]),s._v(" 1.3.5. セキュリティ設定")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# mysql_secure_installation")]),s._v("\n~~~\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Set root password? "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Y/n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" y\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Remove anonymous users? "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Y/n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Disallow root login remotely? "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Y/n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Remove "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v(" database and access to it? "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Y/n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" n\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Reload privilege tables now? "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Y/n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n~~~\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Thanks "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" using MariaDB"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("h2",{attrs:{id:"_1-4-amazon-linux-extras-編"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-amazon-linux-extras-編"}},[s._v("#")]),s._v(" 1.4. Amazon Linux Extras 編")]),s._v(" "),t("h3",{attrs:{id:"_1-4-1-リポジトリの確認"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-1-リポジトリの確認"}},[s._v("#")]),s._v(" 1.4.1. リポジトリの確認")]),s._v(" "),t("ul",[t("li",[s._v("取得したいパッケージを grep する")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('# amazon-linux-extras | grep "パッケージ名"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" 沢山出力されるの割愛\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"_1-4-2-php-のインストール"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-2-php-のインストール"}},[s._v("#")]),s._v(" 1.4.2. PHP のインストール")]),s._v(" "),t("ul",[t("li",[s._v("php7.2.0と拡張モジュールをインストール")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# amazon-linux-extras install -y php7.2 lamp-mariadb10.2-php7.2")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_1-4-3-php-バージョンの確認"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-3-php-バージョンの確認"}},[s._v("#")]),s._v(" 1.4.3. PHP バージョンの確認")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# php -v")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" PHP "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7.2")]),s._v(".30 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cli"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("built: May  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2020")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v(":04:45"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" NTS "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Copyright "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1997")]),s._v("-2018 The PHP Group\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Zend Engine v3.2.0, Copyright "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1998")]),s._v("-2018 Zend Technologies\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h2",{attrs:{id:"_1-5-linux-編"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-linux-編"}},[s._v("#")]),s._v(" 1.5. Linux 編")]),s._v(" "),t("h3",{attrs:{id:"_1-5-1-グループ追加"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-1-グループ追加"}},[s._v("#")]),s._v(" 1.5.1. グループ追加")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# sudo usermod -a -G apache ec2-user")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_1-5-2-所有権の変更"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-2-所有権の変更"}},[s._v("#")]),s._v(" 1.5.2. 所有権の変更")]),s._v(" "),t("blockquote",[t("p",[s._v("後日､説明を追記致します･･･")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# chmod 2775 /var/www/")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("↓ 実行前\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ls -alF /var/www/")]),s._v("\ntotal "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\ndrwxr-xr-x  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" ec2-user apache  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("33")]),s._v(" May "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(":10 ./\ndrwxr-xr-x "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),s._v(" root     root   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("280")]),s._v(" May "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(":10 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/\ndrwxr-xr-x  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" ec2-user apache   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v(" May  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":04 cgi-bin/\ndrwxr-xr-x  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" ec2-user apache   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v(" May  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":04 html/\n\n↓実行後\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ls -alF /var/www/")]),s._v("\ntotal "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\ndrwxrwsr-x  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" ec2-user apache  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("33")]),s._v(" May "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(":10 ./\ndrwxr-xr-x "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),s._v(" root     root   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("280")]),s._v(" May "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(":10 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/\ndrwxr-xr-x  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" ec2-user apache   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v(" May  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":04 cgi-bin/\ndrwxr-xr-x  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" ec2-user apache   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v(" May  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(":04 html/\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br")])]),t("h3",{attrs:{id:"_1-5-3-パーミッションの変更"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-3-パーミッションの変更"}},[s._v("#")]),s._v(" 1.5.3. パーミッションの変更")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# find /var/www -type d -exec sudo chmod 2775 {} \\;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# find /var/www -type f -exec sudo chmod 0664 {} \\;")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("index.php ファイルの配置")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vim /var/www/html/index.php")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("html"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("body"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n    Hello World."),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("br"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("?php "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'oreo'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" ?"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("/body"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("/html"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h2",{attrs:{id:"_1-6-webページ-動作確認"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-webページ-動作確認"}},[s._v("#")]),s._v(" 1.6. Webページ 動作確認")]),s._v(" "),t("p",[s._v("任意のWeb ブラウザを起動し､デフォルトページにアクセスをすると動作確認する事が出来ます｡")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://gyazo.com/30b25c8608ae3a85358b36e53c3b39cb",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://i.gyazo.com/30b25c8608ae3a85358b36e53c3b39cb.png",alt:"Image from Gyazo"}}),t("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=r.exports}}]);