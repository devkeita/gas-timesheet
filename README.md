# Slack勤怠管理用Bot

### 使用例

![ss1](images/ss1.png "ss1")

#### 出勤

- おはようございます => 現在時刻で出勤
- 今日は11時に出勤しました => 今日の11時に出勤
- 昨日は11時に出勤しました => 昨日の11時に出勤
- 7月30日は11時に出勤しました => 7/30の11時に出勤

#### 退勤

- お疲れ様でした => 現在時刻で退勤
- 今日は18時に退勤しました => 今日の18時に退勤
- 昨日は１８時に退勤しました => 昨日の18時に退勤
- 7月３０日は18時に退勤しました => 7/30の18時に退勤

#### 休憩

- 今日は休憩なしでした => 今日の休憩をなしにする
- 今日は2時間休憩しました => 今日の休憩を2時間にする

## セットアップ

### git clone
```
git clone https://github.com/devkeita/kintai-bot.git

cd kintai-bot
```

### パッケージをインストール
パッケージをインストール
```
yarn install
```

### .envファイルを作成
プロジェクトフォルダー直下に`.env.sample`をコピーした`.env`ファイルを作成
```
cp .env.sample .env
```

### Slack Appの設定

#### Slack Appを作成する
- [SlackApp](https://api.slack.com/apps)にアクセスする

- `Create　New App`ボタンを押して作成する

  ![ss2](images/ss2.png "ss2")
 
  - `App Name`は好きな名前をつける
  - `Development Slack Workspace`は使用するWorkSpaceを選択

    ![ss3](images/ss3.png "ss3")
  
- `Basic Information > App Credentials`の`Verification Token`を`.env`にコピペ

  ![ss4](images/ss4.png "ss4")

#### Incoming Webhooksを設定
- `Features > Incoming Webhooks`を選択してActivate

  ![ss5](images/ss5.png "ss5")

- `Add New Webhook to Workspace`ボタンを押して勤怠管理用のチャンネルを選択

  ![ss6](images/ss6.png "ss6")

- `Webhook URL`を`.env`ファイルにコピペ

  ![ss7](images/ss7.png "ss7")

#### Oauthを設定
- `Features > OAuth & Permissions`に移動
- `Bot User OAuth Access Token`を`.env`ファイルにコピペ

  ![ss8](images/ss8.png "ss8")
  
- 以下のような警告が出るが一旦無視する

  ![ss15](images/ss15.png "ss15")

#### Scopeを設定
- `Features > OAuth & Permissions`に移動
- `Scopes`の`Bot Token Scopes`の`Add an OAuth Scope`ボタンを押す
- `users:read`権限を追加する

  ![ss9](images/ss9.png "ss9")

#### Channel Idを設定
- Workspaceの勤怠管理用のチャンネルを選択する
- URLの`https://app.slack.com/client/aaaaaaa/xxxxxxxxxxx`xxxxxxxxxxxの部分を`.env`ファイルにコピペ

  ![ss10](images/ss10.png "ss10")

  ※赤色の部分

### GASの設定

#### claspを使ってgoogleにログイン

```
yarn clasp login
```
ブラウザが開くので使用するアカウントを選択していろいろな権限を許可する

#### google apps scriptのプロジェクトを作成

```
yarn clasp create
```

- `Create which script?`に対して`standalone`を選択

#### .clasp.jsonを設定
`.clasp.json`に以下のように`rootDir`を追加
```
{
  "scriptId": "<your_script_id>",
  "rootDir": "dist"
}
```

#### スプレッドシートIDを設定
- [GASサイト](https://script.google.com/home)にアクセス
- `Kinta-bot`のプロジェクトを開く

  ![ss11](images/ss11.png "ss11")

- `ファイル > プロジェクトのプロパティ > スクリプトプロパティ`に移動して`行を追加`ボタンを押す
  - `name`を`SheetID`、`値`を`スプレッドシートのID`に設定する
  
    ![ss12](images/ss12.png "ss12")

### deploy
```
yarn deploy
```

### GASで公開設定

- GASで　`公開 > Webアプリケーションとして導入`　で公開する

  ![ss13](images/ss13.png "ss13")
  
- `承認を許可する`というダイアログが出るので許可をする

  ![ss16](images/ss16.png "ss16")

- URLをコピーしておく

  ![ss14](images/ss14.png "ss14")

### Slack Event Subscriptionsの設定

#### 有効化する

- [SlackApp](https://api.slack.com/apps)の作成したAppに移動
- `Features > Event Subscriptions`に移動してActivate

  ![ss17](images/ss17.png "ss17")

- `Request URL`にGASで公開したURLをコピペ

- `Verified`になる

  ![ss18](images/ss18.png "ss18")

#### `Subscribe to events on behalf of users`を設定
- `Subscribe to events on behalf of users`を押す

  ![ss19](images/ss19.png "ss19")

- `Add Workspace Event`ボタンを押す

  ![ss20](images/ss20.png "ss20")

- `message:channels`を追加して`save changes`ボタンを押す

### Slack Appを再インストールする

- `Settings > Install App`に移動する

- `Reinstall App`ボタンを押して再インストール

  ![ss21](images/ss21.png "ss21")

### 完了
