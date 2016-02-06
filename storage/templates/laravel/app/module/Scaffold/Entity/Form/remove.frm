{
  "id":"remove",
  "layout": "form",
  "templateOptions": {
    "recover": "read",
    "limit": 1,
    "parameters": [
      "{{primaryKey}}"
    ]
  },
  "fields": [
  ],
  "actions": {
    "delete":{
      "id": "delete",
      "type": "backend",
      "action": "delete",
      "position": {
        "top": 0,
        "bottom": 0
      },
      "className": "btn-primary",
      "classIcon": ""
    },
    "index": {
      "id": "index",
      "type": "frontend",
      "action": "index",
      "position": {
        "top": 1,
        "bottom": 1
      },
      "className": "",
      "classIcon": ""
    }
  }
}
