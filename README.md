# open-nestjs-cndoc

打开 NestJs 中文文档

生成单独的 SSH 密钥

```bash
ssh-keygen -t rsa -C "202209166249@alunos.estacio.br" -f ~/.ssh/id_rsa_for_RaeFast
```

config 示例

```bash
Host RaeFast
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_for_RaeFast
```

为仓库设置使用 config 中用户

```bash
git remote set-url origin RaeFast:RaeFast/open-nestjs-cndoc.git
```

配置该仓库的 git 用户配置

```bash
git config user.name "RaeFast"
git config user.email "202209166249@alunos.estacio.br"
```
