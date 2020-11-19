const { json } = require('body-parser')
const express = require('express')
const line = require('@line/bot-sdk')
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed

const app = express()

app.get('/webhook_rag_cb', (req, res) => {
  //res.json({})
  res.send('rag_cb ok')
})

const config = {
  channelAccessToken: 'lO177el3gGiyLkTaQRVTI1ds0UE+JnH0UHo3YhdTwsw+peD5SbI4F7QUilNeiTjeY3ZikZtvuwzYtnh5VLDVubEvXxRA+T9Hfck/cAcrHMmtIujzMbZU1tnR7tVU/7ZrFgBtoGJO7O0pJRMhcLLatwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '23b27046743fcf3393d3ab5ddca385d8'
}

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result)=>res.json(result))
})

function handleEvent(event) {

  console.log(event);
  if (event.type === 'message' && event.message.type === 'text') {
     // handleMessageEvent(event)
  } else if(event.type === 'follow'){
      greetingMessageEvent(event)
  }else {
      return Promise.resolve(null);
  }
}

function greetingMessageEvent(event) {
  var msg = {
    "type": "flex",
    "altText": "ข้อความที่แสดง",
    "contents":{
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://ragbet.net/images/promotion/proCover.jpg",
        "margin": "none",
        "size": "full",
        "aspectRatio": "20:16",
        "aspectMode": "fit",
        "backgroundColor": "#FFFFFFFF",
        "action": {
          "type": "uri",
          "label": "Action",
          "uri": "https://linecorp.com"
        },
        "offsetBottom": "5px"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "md",
        "action": {
          "type": "uri",
          "label": "Action",
          "uri": "https://linecorp.com"
        },
        "contents": [
          {
            "type": "text",
            "text": "NEW LINE BOT",
            "weight": "bold",
            "size": "xl",
            "contents": []
          },
          {
            "type": "text",
            "text": "ยินดีต้อนรับสู่ระบบอัตโนมัติ",
            "size": "xs",
            "color": "#AAAAAA",
            "wrap": true,
            "offsetBottom": "8px",
            "contents": []
          },
          {
            "type": "separator",
            "margin": "xs",
            "color": "#747474FF"
          },
          {
            "type": "text",
            "text": "ระบบ LINE BOT ตัวใหม่ที่จะมาช่วยคุณเข้าถึงการเล่นเกมส์ได้รวดเร็ว ไม่ว่ายูสเซอร์ใหม่ หรือ เก่าก็สามารถใช้งานได้เพียงแค่ลงทะเบียนไม่กี่ขั้นตอน",
            "weight": "regular",
            "size": "md",
            "margin": "xxl",
            "wrap": true,
            "contents": []
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "spacer",
            "size": "xs"
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "สมัครสมาชิก",
              // "uri": "https://liff.line.me/1655239313-2lZx8oOL"
              "uri": "https://ragbet.net/register"
            },
            "color": "#43C62FFF",
            "style": "primary",
            "offsetBottom": "5px"
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "ติดต่อแอดมิน",
              "uri": "https://line.me/R/ti/p/@773aswbs"
            },
            "color": "#C6C6C6FF",
            "style": "secondary"
          }
        ]
      }
    }
  }

  return client.replyMessage(event.replyToken, msg);
}

app.listen(2563)

