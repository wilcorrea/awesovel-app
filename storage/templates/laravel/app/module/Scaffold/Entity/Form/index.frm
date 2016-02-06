{
  "id": "index",
  "layout": "grid",
  "templateOptions": {
    "recover": "read",
    "limit": 0,
    "options": {
      "className": "col-sm-2"
    },
    "parameters": [],
    "items": {
    }
  },
  "fields": [
  ],
  "actions": {
    "add": {
      "id": "add",
      "action": "add",
      "type": "frontend",
      "position": {
        "top": 0,
        "bottom": 0
      },
      "className": "",
      "classIcon": "glyphicon glyphicon-plus"
    },
    "show": {
      "id": "show",
      "action": "show",
      "type": "frontend",
      "position": {
        "middle": 0
      },
      "conditions": [],
      "className": "",
      "classIcon": "glyphicon glyphicon-search"
    },
    "edit": {
      "id": "edit",
      "action": "edit",
      "type": "frontend",
      "position": {
        "middle": 1
      },
      "conditions": [],
      "className": "",
      "classIcon": "glyphicon glyphicon-edit"
    },
    "remove": {
      "id": "remove",
      "action": "remove",
      "type": "frontend",
      "position": {
        "middle": 2
      },
      "conditions": [],
      "className": "btn-primary",
      "classIcon": "glyphicon glyphicon-trash"
    }
  },
  "events": [
    {
      "before": {
        "module": "",
        "entity": "",
        "operation": "read",
        "parameters": ""
      },
      "after": ""
    }
  ]
}
