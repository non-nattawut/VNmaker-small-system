ui.UiFactory.customTypes["ui.MessageBox"] = {
  "type": "ui.FreeLayout",
  "controls": [
    {
      "type": "ui.Panel",
      "color": [0, 0, 0, 255],
      "frame": [0, "100% - 220", "100%", 2],
      "zIndex": 5000
    }, {
      "type": "ui.Panel",
      "color": [0, 0, 0, 128],
      "frame": [0, "100% - 220", "100%", 220],
      "zIndex": 5000
    }, {
      "type": "ui.MessageBoxMenu",
      "params": {
        "messageBox": $(function() {
          return $messageBox;
        })
      },
      "order": 81000,
      "frame": [0, "100% - 270"]
    }, {
      "type": "ui.Text",
      "updateBehavior": "continuous",
      "text": "",
      "style": "messageBoxNameText",
      "formulas": [
        $(function() {
          return o.text = $dataFields.scene.currentCharacter.name;
        }), $(function() {
          if (this.onTextChange($dataFields.scene.currentCharacter.name)) {
            return o.font.color.setFromObject($dataFields.scene.currentCharacter.textColor || Color.WHITE);
          }
        })
      ],
      "zIndex": 5005,
      "sizeToFit": true,
      "frame": [148, "100% - 210", 128, 30]
    }
  ]
};

ui.UiFactory.customTypes["ui.CustomGameMessage"] = {
  "type": "ui.FreeLayout",
  "controls": [
    {
      "type": "ui.Message",
      "zIndex": 10000,
      "id": function() {
        return p.id + "_message";
      },
      "style": "customMessageText",
      "frame": [0, 0, "100%", "100%"]
    }, {
      "type": "ui.Image",
      "formulas": [
        $(function() {
          return o.dstRect.x = o.parent.controls[0].message.caretPosition.x;
        }), $(function() {
          return o.dstRect.y = o.parent.controls[0].message.caretPosition.y - 20;
        }), $(function() {
          return o.visible = o.parent.controls[0].visible && (o.parent.controls[0].message.isRunning || o.parent.controls[0].message.isWaiting);
        })
      ],
      "animations": [
        {
          "event": "onAlways",
          "flow": [
            {
              "type": "playAnimation",
              "repeat": false,
              "animationId": "40133382KC7B4A4C97S81F0E7D539A513261"
            }
          ]
        }
      ],
      "image": "UI/message_caret.png",
      "zIndex": 10000,
      "frame": [0, 0, 0, 0]
    }
  ]
};

ui.UiFactory.customTypes["ui.GameMessage"] = {
  "type": "ui.FreeLayout",
  "sizeToFit": true,
  "controls": [
    {
      "type": "ui.Message",
      "zIndex": 10000,
      "id": function() {
        return p.id + "_message";
      },
      "frame": [0, 10, Graphics.width - 136 - 220, 200],
      "style": "advMessageText"
    }, {
      "type": "ui.Image",
      "formulas": [
        $(function() {
          return o.dstRect.x = o.parent.controls[0].message.caretPosition.x;
        }), $(function() {
          return o.dstRect.y = o.parent.controls[0].message.caretPosition.y - 10;
        }), $(function() {
          return o.visible = o.parent.controls[0].visible && (o.parent.controls[0].message.isRunning || o.parent.controls[0].message.isWaiting);
        })
      ],
      "animations": [
        {
          "event": "onAlways",
          "flow": [
            {
              "type": "playAnimation",
              "repeat": false,
              "animationId": "40133382KC7B4A4C97S81F0E7D539A513261"
            }
          ]
        }
      ],
      "image": "UI/message_caret.png",
      "zIndex": 10000,
      "frame": [0, 0]
    }
  ]
};

ui.UiFactory.customTypes["ui.GameMessageNVL"] = {
  "type": "ui.FreeLayout",
  "sizeToFit": true,
  "controls": [
    {
      "type": "ui.Message",
      "zIndex": 10000,
      "id": function() {
        return p.id + "_message";
      },
      "style": "nvlMessageText",
      "frame": [Graphics.width / 100 * 12.5 + 8, 8, Graphics.width / 100 * 75 - 16, Graphics.height - 16]
    }
  ]
};

ui.UiFactory.customTypes["ui.MessageBoxNVL"] = {
  "type": "ui.FreeLayout",
  "sizeToFit": true,
  "controls": [
    {
      "type": "ui.MessageBoxMenu",
      "params": {
        "messageBox": $(function() {
          return $nvlMessageBox;
        })
      },
      "order": 81000,
      "frame": [0, Graphics.height - 270]
    }, {
      "type": "ui.Window",
      "params": {
        "backgroundOpacity": 128
      },
      "frame": [Graphics.width / 100 * 12.5, 0, Graphics.width / 100 * 75, Graphics.height],
      "zIndex": 4999
    }
  ]
};

ui.UiFactory.customTypes["ui.MessageMenu"] = {
  "type": "ui.FreeLayout",
  "sizeToFit": true,
  "controls": [
    {
      "type": "ui.MessageBoxMenu",
      "params": {
        "messageBox": $(function() {
          return $messageMenu;
        })
      },
      "order": 81000,
      "frame": [0, Graphics.height - 270]
    }
  ]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBWSxDQUFBLGVBQUEsQ0FBekIsR0FBNEM7RUFDeEMsTUFBQSxFQUFRLGVBRGdDO0VBRXhDLFVBQUEsRUFBWTtJQUNSO01BQ0csTUFBQSxFQUFRLFVBRFg7TUFFRyxPQUFBLEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxHQUFWLENBRlo7TUFHRyxPQUFBLEVBQVMsQ0FBQyxDQUFELEVBQUksWUFBSixFQUFrQixNQUFsQixFQUEwQixDQUExQixDQUhaO01BSUcsUUFBQSxFQUFVLElBSmI7S0FEUSxFQU9SO01BQ0csTUFBQSxFQUFRLFVBRFg7TUFFRyxPQUFBLEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxHQUFWLENBRlo7TUFHRyxPQUFBLEVBQVMsQ0FBQyxDQUFELEVBQUksWUFBSixFQUFrQixNQUFsQixFQUEwQixHQUExQixDQUhaO01BSUcsUUFBQSxFQUFVLElBSmI7S0FQUSxFQWFSO01BQ0ksTUFBQSxFQUFRLG1CQURaO01BRUksUUFBQSxFQUFVO1FBQUUsWUFBQSxFQUFlLENBQUEsQ0FBRSxTQUFBO2lCQUFHO1FBQUgsQ0FBRixDQUFqQjtPQUZkO01BR0ksT0FBQSxFQUFTLEtBSGI7TUFJSSxPQUFBLEVBQVMsQ0FBQyxDQUFELEVBQUksWUFBSixDQUpiO0tBYlEsRUFtQlI7TUFDSSxNQUFBLEVBQVEsU0FEWjtNQUVJLGdCQUFBLEVBQWtCLFlBRnRCO01BR0ksTUFBQSxFQUFRLEVBSFo7TUFJSSxPQUFBLEVBQVMsb0JBSmI7TUFLSSxVQUFBLEVBQVk7UUFDUixDQUFBLENBQUUsU0FBQTtpQkFBRyxDQUFDLENBQUMsSUFBRixHQUFTLFdBQVcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFBL0MsQ0FBRixDQURRLEVBRVIsQ0FBQSxDQUFFLFNBQUE7VUFB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QUFDLFNBQVMsQ0FBQyxXQUFZLENBQUEsZ0JBQUEsQ0FBekIsR0FBNkM7RUFDekMsTUFBQSxFQUFRLGVBRGlDO0VBRXpDLFdBQUEsRUFBYSxJQUY0QjtFQUd6QyxVQUFBLEVBQVk7SUFDUjtNQUNJLE1BQUEsRUFBUSxtQkFEWjtNQUVJLFFBQUEsRUFBVTtRQUFFLFlBQUEsRUFBZSxDQUFBLENBQUUsU0FBQTtpQkFBRztRQUFILENBQUYsQ0FBakI7T0FGZDtNQUdJLE9BQUEsRUFBUyxLQUhiO01BSUksT0FBQSxFQUFTLENBQUMsQ0FBRCxFQUFJLFFBQVEsQ0FBQyxNQUFULEdBQWtCLEdBQXRCLENBSmI7S0FEUTtHQUg2QiIsInNvdXJjZXNDb250ZW50IjpbInVpLlVpRmFjdG9yeS5jdXN0b21UeXBlc1tcInVpLk1lc3NhZ2VCb3hcIl0gPSB7XG4gICAgXCJ0eXBlXCI6IFwidWkuRnJlZUxheW91dFwiLFxuICAgIFwiY29udHJvbHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgIFwidHlwZVwiOiBcInVpLlBhbmVsXCIsXG4gICAgICAgICAgIFwiY29sb3JcIjogWzAsIDAsIDAsIDI1NV0sXG4gICAgICAgICAgIFwiZnJhbWVcIjogWzAsIFwiMTAwJSAtIDIyMFwiLCBcIjEwMCVcIiwgMl0sXG4gICAgICAgICAgIFwiekluZGV4XCI6IDUwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICBcInR5cGVcIjogXCJ1aS5QYW5lbFwiLFxuICAgICAgICAgICBcImNvbG9yXCI6IFswLCAwLCAwLCAxMjhdLFxuICAgICAgICAgICBcImZyYW1lXCI6IFswLCBcIjEwMCUgLSAyMjBcIiwgXCIxMDAlXCIsIDIyMF0sXG4gICAgICAgICAgIFwiekluZGV4XCI6IDUwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuTWVzc2FnZUJveE1lbnVcIixcbiAgICAgICAgICAgIFwicGFyYW1zXCI6IHsgXCJtZXNzYWdlQm94XCI6ICgkIC0+ICRtZXNzYWdlQm94KSB9LFxuICAgICAgICAgICAgXCJvcmRlclwiOiA4MTAwMCxcbiAgICAgICAgICAgIFwiZnJhbWVcIjogWzAsIFwiMTAwJSAtIDI3MFwiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJ1aS5UZXh0XCIsXG4gICAgICAgICAgICBcInVwZGF0ZUJlaGF2aW9yXCI6IFwiY29udGludW91c1wiLFxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwiXCIsXG4gICAgICAgICAgICBcInN0eWxlXCI6IFwibWVzc2FnZUJveE5hbWVUZXh0XCIsICBcbiAgICAgICAgICAgIFwiZm9ybXVsYXNcIjogW1xuICAgICAgICAgICAgICAgICQgLT4gby50ZXh0ID0gJGRhdGFGaWVsZHMuc2NlbmUuY3VycmVudENoYXJhY3Rlci5uYW1lXG4gICAgICAgICAgICAgICAgJCAtPiBpZiBAb25UZXh0Q2hhbmdlICRkYXRhRmllbGRzLnNjZW5lLmN1cnJlbnRDaGFyYWN0ZXIubmFtZSB0aGVuIG8uZm9udC5jb2xvci5zZXRGcm9tT2JqZWN0ICRkYXRhRmllbGRzLnNjZW5lLmN1cnJlbnRDaGFyYWN0ZXIudGV4dENvbG9yIG9yIENvbG9yLldISVRFXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJ6SW5kZXhcIjogNTAwNSxcbiAgICAgICAgICAgIFwic2l6ZVRvRml0XCI6IHRydWUsXG4gICAgICAgICAgICBcImZyYW1lXCI6IFsxNDgsIFwiMTAwJSAtIDIxMFwiLCAxMjgsIDMwXVxuICAgICAgICB9XG4gICAgXVxufVxuXG51aS5VaUZhY3RvcnkuY3VzdG9tVHlwZXNbXCJ1aS5DdXN0b21HYW1lTWVzc2FnZVwiXSA9IHtcbiAgICBcInR5cGVcIjogXCJ1aS5GcmVlTGF5b3V0XCIsXG4gICAgXCJjb250cm9sc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLk1lc3NhZ2VcIixcbiAgICAgICAgICAgIFwiekluZGV4XCI6IDEwMDAwLFxuICAgICAgICAgICAgXCJpZFwiOiAtPiBwLmlkICsgXCJfbWVzc2FnZVwiLFxuICAgICAgICAgICAgXCJzdHlsZVwiOiBcImN1c3RvbU1lc3NhZ2VUZXh0XCIsXG4gICAgICAgICAgICBcImZyYW1lXCI6IFswLCAwLCBcIjEwMCVcIiwgXCIxMDAlXCJdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLkltYWdlXCIsXG4gICAgICAgICAgICBcImZvcm11bGFzXCI6IFtcbiAgICAgICAgICAgICAgICAkIC0+IG8uZHN0UmVjdC54ID0gby5wYXJlbnQuY29udHJvbHNbMF0ubWVzc2FnZS5jYXJldFBvc2l0aW9uLnhcbiAgICAgICAgICAgICAgICAkIC0+IG8uZHN0UmVjdC55ID0gby5wYXJlbnQuY29udHJvbHNbMF0ubWVzc2FnZS5jYXJldFBvc2l0aW9uLnkgLSAyMFxuICAgICAgICAgICAgICAgICQgLT4gby52aXNpYmxlID0gby5wYXJlbnQuY29udHJvbHNbMF0udmlzaWJsZSBhbmQgKG8ucGFyZW50LmNvbnRyb2xzWzBdLm1lc3NhZ2UuaXNSdW5uaW5nIG9yIG8ucGFyZW50LmNvbnRyb2xzWzBdLm1lc3NhZ2UuaXNXYWl0aW5nKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiYW5pbWF0aW9uc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwib25BbHdheXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmbG93XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJ0eXBlXCI6IFwicGxheUFuaW1hdGlvblwiLCBcInJlcGVhdFwiOiBmYWxzZSwgXCJhbmltYXRpb25JZFwiOiBcIjQwMTMzMzgyS0M3QjRBNEM5N1M4MUYwRTdENTM5QTUxMzI2MVwiIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImltYWdlXCI6IFwiVUkvbWVzc2FnZV9jYXJldC5wbmdcIixcbiAgICAgICAgICAgIFwiekluZGV4XCI6IDEwMDAwLFxuICAgICAgICAgICAgXCJmcmFtZVwiOiBbMCwgMCwgMCwgMF1cbiAgICAgICAgfVxuICAgIF1cbn1cblxudWkuVWlGYWN0b3J5LmN1c3RvbVR5cGVzW1widWkuR2FtZU1lc3NhZ2VcIl0gPSB7XG4gICAgXCJ0eXBlXCI6IFwidWkuRnJlZUxheW91dFwiLFxuICAgIFwic2l6ZVRvRml0XCI6IHRydWUsXG4gICAgXCJjb250cm9sc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLk1lc3NhZ2VcIixcbiAgICAgICAgICAgIFwiekluZGV4XCI6IDEwMDAwLFxuICAgICAgICAgICAgXCJpZFwiOiAtPiBwLmlkICsgXCJfbWVzc2FnZVwiLFxuICAgICAgICAgICAgXCJmcmFtZVwiOiBbMCwgMTAsIEdyYXBoaWNzLndpZHRoIC0gMTM2IC0gMjIwLCAyMDBdLFxuICAgICAgICAgICAgXCJzdHlsZVwiOiBcImFkdk1lc3NhZ2VUZXh0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuSW1hZ2VcIixcbiAgICAgICAgICAgIFwiZm9ybXVsYXNcIjogW1xuICAgICAgICAgICAgICAgICQgLT4gby5kc3RSZWN0LnggPSBvLnBhcmVudC5jb250cm9sc1swXS5tZXNzYWdlLmNhcmV0UG9zaXRpb24ueFxuICAgICAgICAgICAgICAgICQgLT4gby5kc3RSZWN0LnkgPSBvLnBhcmVudC5jb250cm9sc1swXS5tZXNzYWdlLmNhcmV0UG9zaXRpb24ueSAtIDEwXG4gICAgICAgICAgICAgICAgJCAtPiBvLnZpc2libGUgPSBvLnBhcmVudC5jb250cm9sc1swXS52aXNpYmxlIGFuZCAoby5wYXJlbnQuY29udHJvbHNbMF0ubWVzc2FnZS5pc1J1bm5pbmcgb3Igby5wYXJlbnQuY29udHJvbHNbMF0ubWVzc2FnZS5pc1dhaXRpbmcpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJhbmltYXRpb25zXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJvbkFsd2F5c1wiLFxuICAgICAgICAgICAgICAgICAgICBcImZsb3dcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBcInR5cGVcIjogXCJwbGF5QW5pbWF0aW9uXCIsIFwicmVwZWF0XCI6IGZhbHNlLCBcImFuaW1hdGlvbklkXCI6IFwiNDAxMzMzODJLQzdCNEE0Qzk3UzgxRjBFN0Q1MzlBNTEzMjYxXCIgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJVSS9tZXNzYWdlX2NhcmV0LnBuZ1wiLFxuICAgICAgICAgICAgXCJ6SW5kZXhcIjogMTAwMDAsXG4gICAgICAgICAgICBcImZyYW1lXCI6IFswLCAwXVxuICAgICAgICB9XG4gICAgXVxufVxuXG51aS5VaUZhY3RvcnkuY3VzdG9tVHlwZXNbXCJ1aS5HYW1lTWVzc2FnZU5WTFwiXSA9IHtcbiAgICBcInR5cGVcIjogXCJ1aS5GcmVlTGF5b3V0XCIsXG4gICAgXCJzaXplVG9GaXRcIjogdHJ1ZSxcbiAgICBcImNvbnRyb2xzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuTWVzc2FnZVwiLFxuICAgICAgICAgICAgXCJ6SW5kZXhcIjogMTAwMDAsXG4gICAgICAgICAgICBcImlkXCI6IC0+IHAuaWQgKyBcIl9tZXNzYWdlXCIsXG4gICAgICAgICAgICBcInN0eWxlXCI6IFwibnZsTWVzc2FnZVRleHRcIixcbiAgICAgICAgICAgIFwiZnJhbWVcIjogW0dyYXBoaWNzLndpZHRoIC8gMTAwICogMTIuNSArIDgsIDgsIEdyYXBoaWNzLndpZHRoIC8gMTAwICogNzUgLSAxNiwgR3JhcGhpY3MuaGVpZ2h0IC0gMTZdXG4gICAgICAgIH1cbiAgICBdXG59XG5cbnVpLlVpRmFjdG9yeS5jdXN0b21UeXBlc1tcInVpLk1lc3NhZ2VCb3hOVkxcIl0gPSB7XG4gICAgXCJ0eXBlXCI6IFwidWkuRnJlZUxheW91dFwiLFxuICAgIFwic2l6ZVRvRml0XCI6IHRydWUsXG4gICAgXCJjb250cm9sc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLk1lc3NhZ2VCb3hNZW51XCIsXG4gICAgICAgICAgICBcInBhcmFtc1wiOiB7IFwibWVzc2FnZUJveFwiOiAoJCAtPiAkbnZsTWVzc2FnZUJveCkgfSxcbiAgICAgICAgICAgIFwib3JkZXJcIjogODEwMDAsXG4gICAgICAgICAgICBcImZyYW1lXCI6IFswLCBHcmFwaGljcy5oZWlnaHQgLSAyNzBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLldpbmRvd1wiLFxuICAgICAgICAgICAgXCJwYXJhbXNcIjogeyBcImJhY2tncm91bmRPcGFjaXR5XCI6IDEyOFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZnJhbWVcIjogW0dyYXBoaWNzLndpZHRoIC8gMTAwICogMTIuNSwgMCwgR3JhcGhpY3Mud2lkdGggLyAxMDAgKiA3NSwgR3JhcGhpY3MuaGVpZ2h0XVxuICAgICAgICAgICAgXCJ6SW5kZXhcIjogNDk5OVxuICAgICAgICB9XG4gICAgXVxufVxuXG51aS5VaUZhY3RvcnkuY3VzdG9tVHlwZXNbXCJ1aS5NZXNzYWdlTWVudVwiXSA9IHtcbiAgICBcInR5cGVcIjogXCJ1aS5GcmVlTGF5b3V0XCIsXG4gICAgXCJzaXplVG9GaXRcIjogdHJ1ZSxcbiAgICBcImNvbnRyb2xzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuTWVzc2FnZUJveE1lbnVcIixcbiAgICAgICAgICAgIFwicGFyYW1zXCI6IHsgXCJtZXNzYWdlQm94XCI6ICgkIC0+ICRtZXNzYWdlTWVudSkgfSxcbiAgICAgICAgICAgIFwib3JkZXJcIjogODEwMDAsXG4gICAgICAgICAgICBcImZyYW1lXCI6IFswLCBHcmFwaGljcy5oZWlnaHQgLSAyNzBdXG4gICAgICAgIH1cbiAgICBdXG59XG5cbiJdfQ==
//# sourceURL=Template_MessageBox_16.js