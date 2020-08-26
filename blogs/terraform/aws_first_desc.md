---
title: 【Terraform】基本的なコマンドの使い方編
description: Terraform コマンド操作手順
date: 2020-08-26
# sidebar: true
sidebar: "auto"
tags:
  - AWS
  - コマンド使い方
categories:
  - Terraform
---

## 1. VPC を参考にコマンド解説

[GitHub : maruchan76/tabiya_terraform](https://github.com/maruchan76/tabiya_terraform/blob/master/tabiya_tech/vpc.tf)

### 1.1. サンプル文

- `touch vpc.tf` で下記をペースト

```hcl
# tabiya_vpc は このリソースの名称
resource "aws_vpc" "tabiya_vpc" {

    # ネットワークの範囲を設定
    cidr_block  = "10.0.0.0/16"

    # タグを設定
    tags = {
        # Name は VPC の名前
        Name    = "TabiyaVpc"
        # 任意のタグ項目と値
        Dev     = "Dev-tag"
    }
}
```

### 1.2. 【init】事前準備

- `init` コマンドで､カレントディレクトリ内で Terraform を実行出来るようにする｡

```sh
$ terrform init

Initializing the backend...

Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v3.3.0...
- Installed hashicorp/aws v3.3.0 (signed by HashiCorp)

The following providers do not have any version constraints in configuration,
so the latest version was installed.

To prevent automatic upgrades to new major versions that may contain breaking
changes, we recommend adding version constraints in a required_providers block
in your configuration, with the constraint strings suggested below.

* hashicorp/aws: version = "~> 3.3.0"

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

- 実行前
  - [![Image from Gyazo](https://i.gyazo.com/f6c6de5d6a8e968f30988ad2a80bf6ea.png)](https://gyazo.com/f6c6de5d6a8e968f30988ad2a80bf6ea)

- 実行後
  - [![Image from Gyazo](https://i.gyazo.com/796e0359b0ec5eb4eab77a7abc570876.png)](https://gyazo.com/796e0359b0ec5eb4eab77a7abc570876)

### 1.3. 【plan】ソースコードの動作確認

- `plan` コマンドで､実行内容を事前に確認する事が出来る｡
  - コードの実行テストを必ず実行しましょう｡

```sh
$ terraform plan

Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_vpc.tabiya_vpc will be created
  + resource "aws_vpc" "tabiya_vpc" {
      + arn                              = (known after apply)
      + assign_generated_ipv6_cidr_block = false
      + cidr_block                       = "10.0.0.0/16"
      + default_network_acl_id           = (known after apply)
      + default_route_table_id           = (known after apply)
      + default_security_group_id        = (known after apply)
      + dhcp_options_id                  = (known after apply)
      + enable_classiclink               = (known after apply)
      + enable_classiclink_dns_support   = (known after apply)
      + enable_dns_hostnames             = (known after apply)
      + enable_dns_support               = true
      + id                               = (known after apply)
      + instance_tenancy                 = "default"
      + ipv6_association_id              = (known after apply)
      + ipv6_cidr_block                  = (known after apply)
      + main_route_table_id              = (known after apply)
      + owner_id                         = (known after apply)
      + tags                             = {
          + "Dev"  = "Dev-tag"
          + "Name" = "TabiyaVpc"
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

### 1.4. 【apply】実行

::: tip
必ず `terraform plan` を実行しよう
:::

- `apply` コマンドで､ソースコードに記述した内容通りに実行をしてくれる｡
  - 途中で【Enter a value】と対話を求められますが､【yes】と入力して構築を開始してくれる｡

```sh
$ terraform apply

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_vpc.tabiya_vpc will be created
  + resource "aws_vpc" "tabiya_vpc" {
      + arn                              = (known after apply)
      + assign_generated_ipv6_cidr_block = false
      + cidr_block                       = "10.0.0.0/16"
      + default_network_acl_id           = (known after apply)
      + default_route_table_id           = (known after apply)
      + default_security_group_id        = (known after apply)
      + dhcp_options_id                  = (known after apply)
      + enable_classiclink               = (known after apply)
      + enable_classiclink_dns_support   = (known after apply)
      + enable_dns_hostnames             = (known after apply)
      + enable_dns_support               = true
      + id                               = (known after apply)
      + instance_tenancy                 = "default"
      + ipv6_association_id              = (known after apply)
      + ipv6_cidr_block                  = (known after apply)
      + main_route_table_id              = (known after apply)
      + owner_id                         = (known after apply)
      + tags                             = {
          + "Dev"  = "Dev-tag"
          + "Name" = "TabiyaVpc"
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_vpc.tabiya_vpc: Creating...
aws_vpc.tabiya_vpc: Creation complete after 3s [id=vpc-XXXXXXXXc5da]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

【Apply complete! Resources: 1 added】と表示されたら､実際にAWSコンソール側にて確認をしてみよう｡

[![Image from Gyazo](https://i.gyazo.com/57cf86a6aca8122bd05926e25f86581a.png)](https://gyazo.com/57cf86a6aca8122bd05926e25f86581a)

### 1.5. 【state list】リソース名の一覧確認

- `state list` コマンドで構築したリソース名の確認出来る｡

```sh
$ terraform state list

aws_vpc.tabiya_vpc
```

### 1.6. 【state show】リソースの設定値確認

- `state show リソース名` コマンドで該当リソースの設定値を確認出来る｡

```sh
$ terraform state show aws_vpc.tabiya_vpc

# aws_vpc.tabiya_vpc:
resource "aws_vpc" "tabiya_vpc" {
    arn                              = "arn:aws:ec2:ap-northeast-1:アカウントID:vpc/vpc-ID"
    assign_generated_ipv6_cidr_block = false
    cidr_block                       = "10.0.0.0/16"
    default_network_acl_id           = "acl-"
    default_route_table_id           = "rtb-"
    default_security_group_id        = "sg-"
    dhcp_options_id                  = "dopt-"
    enable_classiclink               = false
    enable_classiclink_dns_support   = false
    enable_dns_hostnames             = false
    enable_dns_support               = true
    id                               = "vpc-"
    instance_tenancy                 = "default"
    main_route_table_id              = "rtb-"
    owner_id                         = "アカウントID"
    tags                             = {
        "Dev"  = "Dev-tag"
        "Name" = "TabiyaVpc"
    }
}
```

### 1.7. 【plan -destroy】削除対象一覧の確認

- `plan -destroy` コマンドで削除対象を確認出来る｡

```sh
$ terraform plan -destroy

Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

aws_vpc.tabiya_vpc: Refreshing state... [id=vpc-]

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  - destroy

Terraform will perform the following actions:

  # aws_vpc.tabiya_vpc will be destroyed
  - resource "aws_vpc" "tabiya_vpc" {
      - arn                              = "arn:aws:ec2:ap-northeast-1::vpc/vpc-" -> null
      - assign_generated_ipv6_cidr_block = false -> null
      - cidr_block                       = "10.0.0.0/16" -> null
      - default_network_acl_id           = "acl-" -> null
      - default_route_table_id           = "rtb-" -> null
      - default_security_group_id        = "sg-" -> null
      - dhcp_options_id                  = "dopt-" -> null
      - enable_classiclink               = false -> null
      - enable_classiclink_dns_support   = false -> null
      - enable_dns_hostnames             = false -> null
      - enable_dns_support               = true -> null
      - id                               = "vpc-" -> null
      - instance_tenancy                 = "default" -> null
      - main_route_table_id              = "rtb-" -> null
      - owner_id                         = "" -> null
      - tags                             = {
          - "Dev"  = "Dev-tag"
          - "Name" = "TabiyaVpc"
        } -> null
    }

Plan: 0 to add, 0 to change, 1 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

### 1.8. 【destroy】リソースの削除

- `destory` コマンドで作成したリソースの削除が出来る｡
  - 途中で【Enter a value】と対話を求められますが､【yes】と入力して削除を開始してくれる｡

```sh
aws_vpc.tabiya_vpc: Refreshing state... [id=vpc-0bc58360acdd8c5da]

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  - destroy

Terraform will perform the following actions:

  # aws_vpc.tabiya_vpc will be destroyed
  - resource "aws_vpc" "tabiya_vpc" {
      - arn                              = "arn:aws:ec2:ap-northeast-1::vpc/vpc-" -> null
      - assign_generated_ipv6_cidr_block = false -> null
      - cidr_block                       = "10.0.0.0/16" -> null
      - default_network_acl_id           = "acl-" -> null
      - default_route_table_id           = "rtb-" -> null
      - default_security_group_id        = "sg-" -> null
      - dhcp_options_id                  = "dopt-" -> null
      - enable_classiclink               = false -> null
      - enable_classiclink_dns_support   = false -> null
      - enable_dns_hostnames             = false -> null
      - enable_dns_support               = true -> null
      - id                               = "vpc-" -> null
      - instance_tenancy                 = "default" -> null
      - main_route_table_id              = "rtb-" -> null
      - owner_id                         = "" -> null
      - tags                             = {
          - "Dev"  = "Dev-tag"
          - "Name" = "TabiyaVpc"
        } -> null
    }

Plan: 0 to add, 0 to change, 1 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes

aws_vpc.tabiya_vpc: Destroying... [id=vpc-0bc58360acdd8c5da]
aws_vpc.tabiya_vpc: Destruction complete after 1s

Destroy complete! Resources: 1 destroyed.
```

【Destroy complete! Resources: 1 destroyed.】と表示されたら､実際にAWSコンソール側にて確認すると､リソースが無くなっていることが確認できます｡

### 1.9. 【-target】特定のリソースだけを操作

```sh
$ terraform plan -target=aws_vpc.tabiya_vpc
$ terraform apply -target=aws_vpc.tabiya_vpc
$ terraform state list
=> aws_vpc.tabiya_vpc
$ terraform state show aws_vpc.tabiya_vpc
```