ui.UiFactory.layouts.settingsGeneral = {
  "type": "ui.FreeLayout",
  "frame": [0, 0, Graphics.width, Graphics.height],
  "preload": {
    graphics: [
      {
        folder: $(function() {
          return $dataFields.database.system.menuBackground.folderPath || "Graphics/Pictures";
        }),
        name: $(function() {
          return $dataFields.database.system.menuBackground.name || 'UI/bg-generic.png';
        })
      }
    ]
  },
  "controls": [
    {
      "type": "ui.Image",
      "imageFolder": function() {
        return $dataFields.database.system.menuBackground.folderPath || "Graphics/Pictures";
      },
      "image": function() {
        return $dataFields.database.system.menuBackground.name || 'UI/bg-generic.png';
      },
      "frame": [0, 0, Graphics.width, Graphics.height]
    }, {
      "type": "ui.BackButton",
      "frame": [Graphics.width - 170, Graphics.height - 65, 150, 45]
    }, {
      "type": "ui.TitledWindow",
      "frame": [gs.UIConstants.LAYOUT_SETTINGS_WINDOW_X, 0, gs.UIConstants.LAYOUT_SETTINGS_WINDOW_W, Graphics.height - 70],
      "params": {
        "title": {
          "lcId": "4D3EC62F007AF64B0C68E8081C003D041370",
          "defaultText": "General Settings"
        }
      }
    }, {
      "type": "ui.VerticalScrollView",
      "id": "settingsScrollView",
      "frame": [gs.UIConstants.LAYOUT_SETTINGS_WINDOW_X, 45, gs.UIConstants.LAYOUT_SETTINGS_WINDOW_W, Graphics.height - 45 - 10 - 70],
      "params": {
        "dataField": 1,
        "template": {
          "type": "ui.StackLayout",
          "orientation": "vertical",
          "sizeToFit": true,
          "controls": [
            {
              "type": "ui.SettingsOptionSet",
              "params": {
                "label": {
                  "lcId": "2BB9D02557CFE84BAE8B7401501783BA6FBF",
                  "defaultText": "Display Mode"
                },
                "write": $(function(v) {
                  return $dataFields.settings.fullScreen = v;
                }),
                "read": $(function() {
                  return $dataFields.settings.fullScreen;
                }),
                "group": "displayMode",
                "onLabel": {
                  "lcId": "06C8957A5B6A0949DD28B96486586E93FCD4",
                  "defaultText": "Fullscreen"
                },
                "offLabel": {
                  "lcId": "C5BB4D477FDFE54D2B5A0473BEC61239C219",
                  "defaultText": "Windowed"
                },
                "onAction": {
                  "name": "enterFullScreen",
                  "params": {}
                },
                "offAction": {
                  "name": "leaveFullScreen",
                  "params": {}
                }
              }
            }, {
              "type": "ui.SettingsOptionSet",
              "params": {
                "label": {
                  "lcId": "1C7C50BC434287404B392232B960C5701039",
                  "defaultText": "Screen Adjustment"
                },
                "write": $(function(v) {
                  return $dataFields.settings.aspectRatio = v;
                }),
                "read": $(function() {
                  return $dataFields.settings.aspectRatio;
                }),
                "group": "screenAdjust",
                "onLabel": {
                  "lcId": "33B51B1130853144E4888263A53B022C4ADB",
                  "defaultText": "Stretch"
                },
                "offLabel": {
                  "lcId": "A583EEF38BB725426A6AB8965DCCDDED2982",
                  "defaultText": "Ratio"
                },
                "onAction": {
                  "name": "adjustAspectRatio",
                  "params": true
                },
                "offAction": {
                  "name": "adjustAspectRatio",
                  "params": false
                }
              }
            }, {
              "type": "ui.SettingsOptionSet",
              "params": {
                "label": {
                  "lcId": "4F0DB69F055E3742208BE803F70C506572A3",
                  "defaultText": "Confirmation"
                },
                "onLabel": {
                  "lcId": "DB87E66F8299B549E56B2F048040DA406BCC",
                  "defaultText": "On"
                },
                "offLabel": {
                  "lcId": "2D23328A3B4F80462E7AB2F8CD3996B20665",
                  "defaultText": "Off"
                },
                "group": "confirmation",
                "write": $(function(v) {
                  return $dataFields.settings.confirmation = v;
                }),
                "read": $(function() {
                  return $dataFields.settings.confirmation;
                })
              }
            }
          ]
        }
      }
    }, {
      "type": "ui.ConfirmationButton",
      "frame": [gs.UIConstants.LAYOUT_SETTINGS_WINDOW_X, Graphics.height - 60, 300, 45],
      "params": {
        "confirmationMessage": {
          "lcId": "92D58F0C1B58A94ADF791B81E9479CF2A27D",
          "defaultText": "Do you really want to reset global data?"
        },
        "text": {
          "lcId": "4272A0BC5880A64DA49AEBD4D60905347726",
          "defaultText": "Reset Global Data"
        },
        "acceptActions": [
          {
            "name": "resetGlobalData",
            "params": {
              "name": "titleLayout"
            }
          }, {
            "name": "disposeControl",
            "params": $(function() {
              return 'confirmationDialog';
            })
          }
        ],
        "rejectActions": [
          {
            "name": "disposeControl",
            "params": $(function() {
              return 'confirmationDialog';
            })
          }
        ]
      }
    }
  ]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQXJCLEdBQXVDO0VBQ25DLE1BQUEsRUFBUSxlQUQyQjtFQUVuQyxPQUFBLEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLFFBQVEsQ0FBQyxLQUFoQixFQUF1QixRQUFRLENBQUMsTUFBaEMsQ0FGMEI7RUFHbkMsU0FBQSxFQUFXO0lBQUUsUUFBQSxFQUFVO01BQUM7UUFBQSxNQUFBLEVBQVMsQ0FBQSxDQUFFLFNBQUE7aUJBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQTNDLElBQXVEO1FBQTFELENBQUYsQ0FBVDtRQUEyRixJQUFBLEVBQU0sQ0FBQSxDQUFFLFNBQUE7aUJBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQTNDLElBQW1EO1FBQXRELENBQUYsQ0FBakc7T0FBRDtLQUFaO0dBSHdCO0VBSW5DLFVBQUEsRUFBWTtJQUNSO01BQ0ksTUFBQSxFQUFRLFVBRFo7TUFFSSxhQUFBLEVBQWdCLFNBQUE7ZUFBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBM0MsSUFBeUQ7TUFBNUQsQ0FGcEI7TUFHSSxPQUFBLEVBQVMsU0FBQTtlQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUEzQyxJQUFtRDtNQUF0RCxDQUhiO01BSUksT0FBQSxFQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxRQUFRLENBQUMsS0FBaEIsRUFBdUIsUUFBUSxDQUFDLE1BQWhDLENBSmI7S0FEUSxFQU9SO01BQ0ksTUFBQSxFQUFRLGVBRFo7TUFFSSxPQUFBLEVBQVMsQ0FBQyxRQUFRLENBQUMsS0FBVCxHQUFpQixHQUFsQixFQUF1QixRQUFRLENBQUMsTUFBVCxHQUFrQixF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LFFBQUEsRUFBVSxDQUFBLENBQUUsU0FBQTtxQkFBRztZQUFILENBQUYsQ0FBcEM7V0FBRDtTQUpYO09BSGQ7S0FsSFE7R0FKdUIiLCJzb3VyY2VzQ29udGVudCI6WyJ1aS5VaUZhY3RvcnkubGF5b3V0cy5zZXR0aW5nc0dlbmVyYWwgPSB7XG4gICAgXCJ0eXBlXCI6IFwidWkuRnJlZUxheW91dFwiLFxuICAgIFwiZnJhbWVcIjogWzAsIDAsIEdyYXBoaWNzLndpZHRoLCBHcmFwaGljcy5oZWlnaHRdLFxuICAgIFwicHJlbG9hZFwiOiB7IGdyYXBoaWNzOiBbZm9sZGVyOiAoJCAtPiAkZGF0YUZpZWxkcy5kYXRhYmFzZS5zeXN0ZW0ubWVudUJhY2tncm91bmQuZm9sZGVyUGF0aHx8XCJHcmFwaGljcy9QaWN0dXJlc1wiKSwgbmFtZTogJCAtPiAkZGF0YUZpZWxkcy5kYXRhYmFzZS5zeXN0ZW0ubWVudUJhY2tncm91bmQubmFtZSBvciAnVUkvYmctZ2VuZXJpYy5wbmcnXSB9LFxuICAgIFwiY29udHJvbHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJ1aS5JbWFnZVwiLFxuICAgICAgICAgICAgXCJpbWFnZUZvbGRlclwiOiAgLT4gJGRhdGFGaWVsZHMuZGF0YWJhc2Uuc3lzdGVtLm1lbnVCYWNrZ3JvdW5kLmZvbGRlclBhdGggfHwgXCJHcmFwaGljcy9QaWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJpbWFnZVwiOiAtPiAkZGF0YUZpZWxkcy5kYXRhYmFzZS5zeXN0ZW0ubWVudUJhY2tncm91bmQubmFtZSBvciAnVUkvYmctZ2VuZXJpYy5wbmcnXG4gICAgICAgICAgICBcImZyYW1lXCI6IFswLCAwLCBHcmFwaGljcy53aWR0aCwgR3JhcGhpY3MuaGVpZ2h0XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJ1aS5CYWNrQnV0dG9uXCIsXG4gICAgICAgICAgICBcImZyYW1lXCI6IFtHcmFwaGljcy53aWR0aCAtIDE3MCwgR3JhcGhpY3MuaGVpZ2h0IC0gNjUsIDE1MCwgNDVdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLlRpdGxlZFdpbmRvd1wiLFxuICAgICAgICAgICAgXCJmcmFtZVwiOiBbXG4gICAgICAgICAgICAgICAgZ3MuVUlDb25zdGFudHMuTEFZT1VUX1NFVFRJTkdTX1dJTkRPV19YLCBcbiAgICAgICAgICAgICAgICAwLCBcbiAgICAgICAgICAgICAgICBncy5VSUNvbnN0YW50cy5MQVlPVVRfU0VUVElOR1NfV0lORE9XX1csIFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzLmhlaWdodCAtIDcwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJwYXJhbXNcIjogeyBcInRpdGxlXCI6IHsgXCJsY0lkXCI6IFwiNEQzRUM2MkYwMDdBRjY0QjBDNjhFODA4MUMwMDNEMDQxMzcwXCIsIFwiZGVmYXVsdFRleHRcIjogXCJHZW5lcmFsIFNldHRpbmdzXCIgfSB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLlZlcnRpY2FsU2Nyb2xsVmlld1wiLFxuICAgICAgICAgICAgXCJpZFwiOiBcInNldHRpbmdzU2Nyb2xsVmlld1wiLFxuICAgICAgICAgICAgXCJmcmFtZVwiOiBbXG4gICAgICAgICAgICAgICAgZ3MuVUlDb25zdGFudHMuTEFZT1VUX1NFVFRJTkdTX1dJTkRPV19YLCBcbiAgICAgICAgICAgICAgICA0NSwgXG4gICAgICAgICAgICAgICAgZ3MuVUlDb25zdGFudHMuTEFZT1VUX1NFVFRJTkdTX1dJTkRPV19XLCBcbiAgICAgICAgICAgICAgICBHcmFwaGljcy5oZWlnaHQgLSA0NSAtIDEwIC0gNzBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcInBhcmFtc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJkYXRhRmllbGRcIjogMSxcbiAgICAgICAgICAgICAgICBcInRlbXBsYXRlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJvcmllbnRhdGlvblwiOiBcInZlcnRpY2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic2l6ZVRvRml0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFwiY29udHJvbHNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aS5TZXR0aW5nc09wdGlvblNldFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtc1wiOiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxjSWRcIjogXCIyQkI5RDAyNTU3Q0ZFODRCQUU4Qjc0MDE1MDE3ODNCQTZGQkZcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlZmF1bHRUZXh0XCI6IFwiRGlzcGxheSBNb2RlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndyaXRlXCI6ICQgKHYpIC0+ICRkYXRhRmllbGRzLnNldHRpbmdzLmZ1bGxTY3JlZW4gPSB2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVhZFwiOiAkIC0+ICRkYXRhRmllbGRzLnNldHRpbmdzLmZ1bGxTY3JlZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJncm91cFwiOiBcImRpc3BsYXlNb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25MYWJlbFwiOiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsY0lkXCI6IFwiMDZDODk1N0E1QjZBMDk0OUREMjhCOTY0ODY1ODZFOTNGQ0Q0XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0VGV4dFwiOiBcIkZ1bGxzY3JlZW5cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib2ZmTGFiZWxcIjogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGNJZFwiOiBcIkM1QkI0RDQ3N0ZERkU1NEQyQjVBMDQ3M0JFQzYxMjM5QzIxOVwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdFRleHRcIjogXCJXaW5kb3dlZFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQWN0aW9uXCI6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJlbnRlckZ1bGxTY3JlZW5cIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtc1wiOiB7fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib2ZmQWN0aW9uXCI6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJsZWF2ZUZ1bGxTY3JlZW5cIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtc1wiOiB7fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuU2V0dGluZ3NPcHRpb25TZXRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbXNcIjogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsY0lkXCI6IFwiMUM3QzUwQkM0MzQyODc0MDRCMzkyMjMyQjk2MEM1NzAxMDM5XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0VGV4dFwiOiBcIlNjcmVlbiBBZGp1c3RtZW50XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndyaXRlXCI6ICQgKHYpIC0+ICRkYXRhRmllbGRzLnNldHRpbmdzLmFzcGVjdFJhdGlvID0gdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlYWRcIjogJCAtPiAkZGF0YUZpZWxkcy5zZXR0aW5ncy5hc3BlY3RSYXRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdyb3VwXCI6IFwic2NyZWVuQWRqdXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25MYWJlbFwiOiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsY0lkXCI6IFwiMzNCNTFCMTEzMDg1MzE0NEU0ODg4MjYzQTUzQjAyMkM0QURCXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0VGV4dFwiOiBcIlN0cmV0Y2hcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib2ZmTGFiZWxcIjogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGNJZFwiOiBcIkE1ODNFRUYzOEJCNzI1NDI2QTZBQjg5NjVEQ0NEREVEMjk4MlwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdFRleHRcIjogXCJSYXRpb1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQWN0aW9uXCI6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJhZGp1c3RBc3BlY3RSYXRpb1wiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1zXCI6IHRydWUgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9mZkFjdGlvblwiOiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiYWRqdXN0QXNwZWN0UmF0aW9cIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtc1wiOiBmYWxzZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuU2V0dGluZ3NPcHRpb25TZXRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbXNcIjogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiB7IFwibGNJZFwiOiBcIjRGMERCNjlGMDU1RTM3NDIyMDhCRTgwM0Y3MEM1MDY1NzJBM1wiLCBcImRlZmF1bHRUZXh0XCI6IFwiQ29uZmlybWF0aW9uXCIgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25MYWJlbFwiOiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsY0lkXCI6IFwiREI4N0U2NkY4Mjk5QjU0OUU1NkIyRjA0ODA0MERBNDA2QkNDXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0VGV4dFwiOiBcIk9uXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9mZkxhYmVsXCI6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxjSWRcIjogXCIyRDIzMzI4QTNCNEY4MDQ2MkU3QUIyRjhDRDM5OTZCMjA2NjVcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlZmF1bHRUZXh0XCI6IFwiT2ZmXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdyb3VwXCI6IFwiY29uZmlybWF0aW9uXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndyaXRlXCI6ICQgKHYpIC0+ICRkYXRhRmllbGRzLnNldHRpbmdzLmNvbmZpcm1hdGlvbiA9IHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWFkXCI6ICQgLT4gJGRhdGFGaWVsZHMuc2V0dGluZ3MuY29uZmlybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuQ29uZmlybWF0aW9uQnV0dG9uXCIsXG4gICAgICAgICAgICBcImZyYW1lXCI6IFtncy5VSUNvbnN0YW50cy5MQVlPVVRfU0VUVElOR1NfV0lORE9XX1gsIEdyYXBoaWNzLmhlaWdodCAtIDYwLCAzMDAsIDQ1XSxcbiAgICAgICAgICAgIFwicGFyYW1zXCI6IHsgXG4gICAgICAgICAgICAgICAgXCJjb25maXJtYXRpb25NZXNzYWdlXCI6IHsgXCJsY0lkXCI6IFwiOTJENThGMEMxQjU4QTk0QURGNzkxQjgxRTk0NzlDRjJBMjdEXCIsIFwiZGVmYXVsdFRleHRcIjogXCJEbyB5b3UgcmVhbGx5IHdhbnQgdG8gcmVzZXQgZ2xvYmFsIGRhdGE/XCIgfSwgXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IHsgXCJsY0lkXCI6IFwiNDI3MkEwQkM1ODgwQTY0REE0OUFFQkQ0RDYwOTA1MzQ3NzI2XCIsIFwiZGVmYXVsdFRleHRcIjogXCJSZXNldCBHbG9iYWwgRGF0YVwiIH0sIFxuICAgICAgICAgICAgICAgIFwiYWNjZXB0QWN0aW9uc1wiOiBbeyBcIm5hbWVcIjogXCJyZXNldEdsb2JhbERhdGFcIiwgXCJwYXJhbXNcIjogeyBcIm5hbWVcIjogXCJ0aXRsZUxheW91dFwiIH0gfSwge1wibmFtZVwiOlwiZGlzcG9zZUNvbnRyb2xcIixcInBhcmFtc1wiOigkIC0+ICdjb25maXJtYXRpb25EaWFsb2cnKX1dLCBcbiAgICAgICAgICAgICAgICBcInJlamVjdEFjdGlvbnNcIjogW3sgXCJuYW1lXCI6XCJkaXNwb3NlQ29udHJvbFwiLFwicGFyYW1zXCI6KCQgLT4gJ2NvbmZpcm1hdGlvbkRpYWxvZycpfV0gfVxuICAgICAgICB9ICBcbiAgICBdXG59Il19
//# sourceURL=Layout_SettingsGeneral_121.js