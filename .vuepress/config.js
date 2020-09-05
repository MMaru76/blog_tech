module.exports = {
  "title": "Tabiya Tech",
  "description": "インフラ関連をアウトプット",
  "dest": "public",
  plugins: {
    '@vuepress/google-analytics': {
        ga: 'UA-112084880-15'
    },
    'vuepress-plugin-sitemap': {
    hostname: 'https://tabiya.dev' // ここにサイトのURLを設定する
    },
},
  head: [
    ['link', { rel: 'icon', type: 'image/jpg', href: '/favicon.ico' }],
    ['meta',{ name:"keywords", content:"vuepress, netlify"}],
    ['meta',{ name:"og:title", content:"Tabiya Tech"}],
    ['meta',{ name:"og:description", content:"インフラ関連をアウトプット"}],
    ['meta',{ name:"og:type", content:"website"}],
    ['meta',{ name:"og:url", content:"https://tabiya.dev/"}],
    ['meta',{ name:"twitter:card", content:"summary_large_image"}],
    ['meta',{ name:"twitter:site", content:"@M_Maru76"}],
    ['meta',{ name:"og:image", content:"https://i.gyazo.com/b50249f536d4cfac7f8a015804b440d8.png"}],
  ],
  // "head": [
  //   [
  //     "link",
  //     {
  //       "rel": "icon",
  //       "href": "/favicon.ico"
  //     }
  //   ],
  //   [
  //     "meta",
  //     {
  //       "name": "viewport",
  //       "content": "width=device-width,initial-scale=1,user-scalable=no"
  //     }
  //   ]
  // ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      // {
      //   "text": "Editing",
      //   "icon": "reco-edit",
      //   "items": [
      //     {
      //       "text": "vuepress-reco",
      //       "link": "/docs/theme-reco/"
      //     },
      //     {
      //       "text": "other",
      //       "link": "/blogs/oreo/"
      //     }
      //   ]
      // },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/MMaru76",
            "icon": "reco-github"
          },
          {
            "text": "Twitter",
            "link": "https://twitter.com/M_Maru76",
            "icon": "reco-twitter"
          },
          {
            "text": "Blog",
            "link": "https://tabiya.jp/",
            "icon": "reco-blog"
          },
          {
            "text": "Qiita",
            "link": "https://qiita.com/MMaru76",
            "icon": "reco-qiita"
          }
        ]
      }
    ],
    // "sidebar": {
    //   "/docs/theme-reco/": [
    //     "",
    //     "theme",
    //     "plugin",
    //     "api"
    //   ],
    //   "/blogs/oreo/": [
    //     "",
    //     "oreo",
    //     "guide",
    //     "api"
    //   ]
    // },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    // "friendLink": [
      // {
      //   "title": "午后南杂",
      //   "desc": "Enjoy when you can, and endure when you must.",
      //   "email": "1156743527@qq.com",
      //   "link": "https://www.recoluan.com"
      // },
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
    // ],
    // "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Maruchan",
    "authorAvatar": "https://avatars3.githubusercontent.com/u/20497766?s=460&v=4",
    // "record": "x",
    "startYear": "2020"
  },
  "markdown": {
    "lineNumbers": true
  }
}