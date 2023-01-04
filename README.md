# cookie-race-test

Cookie で race condition が起こるとどうなるかを確認するためのテスト

```bash
npm run serve
```

をしてから `localhost:3000` にアクセス

`localhost:3000/500` は 500ms 待ってからレスポンスを返し、`localhost:3000/1000` は 1000ms 待ってからレスポンスを返す。
それぞれ、key を `hoge`、value を 500, 1000 として Cookie を設定する。

クライアントは、`localhost:3000/1000` にアクセスしてから、250ms 後に `localhost:3000/500` にアクセスする。

したがって、リクエスト順は `localhost:3000/1000` -> `localhost:3000/500`
レスポンス順は `localhost:3000/500` -> `localhost:3000/1000` となる。

## 結果

Chrome, Firefox では Cookie に `hoge=1000` が設定された。したがって、レスポンスの返却順が優先される。
Edge, Vivaldi などでは未確認
