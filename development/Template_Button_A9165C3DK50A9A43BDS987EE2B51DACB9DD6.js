ui.UiFactory.customTypes["ui.Button"] = {
  "type": "ui.FreeLayout",
  "style": "button",
  "controls": [
    {
      "type": "ui.SelectableWindow",
      "frame": [0, 0, "100%", "100%"],
      "margin": [0, 0, 0, 30],
      "inheritProperties": true,
      "params": {
        "actions": function() {
          return p.actions;
        },
        "action": function() {
          if (!p.actions) {
            return Object.mixin({
              "sound": $dataFields.database.system.menuSelectSound
            }, p.action);
          } else {
            return null;
          }
        },
        "sound": function() {
          return p.sound;
        }
      },
      "zIndex": 4999
    }, {
      "type": "ui.Text",
      "executeFieldFormulas": true,
      "inheritProperties": true,
      "sizeToFit": true,
      "style": "buttonText",
      "frame": [0, 0],
      "text": function() {
        return p.text;
      },
      "zIndex": 5100
    }
  ]
};

ui.UiFactory.customTypes["ui.BackButton"] = {
  "type": "ui.Button",
  "params": {
    "text": function() {
      return (typeof p !== "undefined" && p !== null ? p.text : void 0) || {
        lcId: "B0FD4BF121D9E44E7589CDD35869F86F2227",
        defaultText: "Back"
      };
    },
    "actions": [
      {
        "sound": (function() {
          return $dataFields.database.system.menuSelectSound;
        }),
        "event": "onMouseClick",
        "name": "saveSettings"
      }, {
        "event": "onMouseClick",
        "name": "previousLayout"
      }
    ],
    "sound": function() {
      return $dataFields.database.system.menuCancelSound;
    }
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBWSxDQUFBLFdBQUEsQ0FBekIsR0FBd0M7RUFDcEMsTUFBQSxFQUFRLGVBRDRCO0VBRXBDLE9BQUEsRUFBUyxRQUYyQjtFQUdwQyxVQUFBLEVBQVc7SUFDUDtNQUNJLE1BQUEsRUFBUSxxQkFEWjtNQUVJLE9BQUEsRUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sTUFBUCxFQUFlLE1BQWYsQ0FGYjtNQUdJLFFBQUEsRUFBVSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLEVBQVYsQ0FIZDtNQUlJLG1CQUFBLEVBQXFCLElBSnpCO01BS0ksUUFBQSxFQUFVO1FBQ04sU0FBQSxFQUFXLFNBQUE7aUJBQUcsQ0FBQyxDQUFDO1FBQUwsQ0FETDtRQUVOLFFBQUEsRUFBVSxTQUFBO1VBQUcsSUFBRyxDQUFDLENBQUMsQ0FBQyxPQUFOO21CQUFtQixNQUFNLENBQUMsS0FBUCxDQUFhO2NBQUUsT0FBQSxFQUFTLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQXZDO2FBQWIsRUFBdUUsQ0FBQyxDQUFDLE1BQXpFLEVBQW5CO1dBQUEsTUFBQTttQkFBeUcsS0FBekc7O1FBQUgsQ0FGSjtRQUdOLE9BQUEsRUFBUyxTQUFBO2lCQUFHLENBQUMsQ0FBQztRQUFMLENBSEg7T0FMZDtNQVVJLFFBQUEsRUFBVSxJQVZkO0tBRE8sRUFhUDtNQUNJLE1BQUEsRUFBUSxTQURaO01BRUksc0JBQUEsRUFBd0IsSUFGNUI7TUFHSSxtQkFBQSxFQUFxQixJQUh6QjtNQUlJLFdBQUEsRUFBYSxJQUpqQjtNQUtJLE9BQUEsRUFBUyxZQUxiO01BTUksT0FBQSxFQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FOYjtNQU9JLE1BQUEsRUFBUSxTQUFBO2VBQUcsQ0FBQyxDQUFDO01BQUwsQ0FQWjtNQVFJLFFBQUEsRUFBVSxJQVJkO0tBYk87R0FIeUI7OztBQThCeEMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFZLENBQUEsZUFBQSxDQUF6QixHQUE0QztFQUN4QyxNQUFBLEVBQVEsV0FEZ0M7RUFFeEMsUUFBQSxFQUFVO0lBQ04sTUFBQSxFQUFRLFNBQUE7dURBQUcsQ0FBQyxDQUFFLGNBQUgsSUFBVztRQUFFLElBQUEsRUFBTSxzQ0FBUjtRQUFnRCxXQUFBLEVBQWEsTUFBN0Q7O0lBQWQsQ0FERjtJQUVOLFNBQUEsRUFBVztNQUFDO1FBQUUsT0FBQSxFQUFTLENBQUMsU0FBQTtpQkFBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUEvQixDQUFELENBQVg7UUFBNkQsT0FBQSxFQUFTLGNBQXRFO1FBQXNGLE1BQUEsRUFBUSxjQUE5RjtPQUFELEVBQWlIO1FBQUUsT0FBQSxFQUFTLGNBQVg7UUFBMkIsTUFBQSxFQUFRLGdCQUFuQztPQUFqSDtLQUZMO0lBR04sT0FBQSxFQUFTLFNBQUE7YUFBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUEvQixDQUhIO0dBRjhCIiwic291cmNlc0NvbnRlbnQiOlsidWkuVWlGYWN0b3J5LmN1c3RvbVR5cGVzW1widWkuQnV0dG9uXCJdID0ge1xuICAgIFwidHlwZVwiOiBcInVpLkZyZWVMYXlvdXRcIixcbiAgICBcInN0eWxlXCI6IFwiYnV0dG9uXCIsXG4gICAgXCJjb250cm9sc1wiOltcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuU2VsZWN0YWJsZVdpbmRvd1wiLFxuICAgICAgICAgICAgXCJmcmFtZVwiOiBbMCwgMCwgXCIxMDAlXCIsIFwiMTAwJVwiXSxcbiAgICAgICAgICAgIFwibWFyZ2luXCI6IFswLCAwLCAwLCAzMF0sXG4gICAgICAgICAgICBcImluaGVyaXRQcm9wZXJ0aWVzXCI6IHRydWUsXG4gICAgICAgICAgICBcInBhcmFtc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IC0+IHAuYWN0aW9ucywgXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjogLT4gaWYgIXAuYWN0aW9ucyB0aGVuIE9iamVjdC5taXhpbih7IFwic291bmRcIjogJGRhdGFGaWVsZHMuZGF0YWJhc2Uuc3lzdGVtLm1lbnVTZWxlY3RTb3VuZCB9LCBwLmFjdGlvbikgZWxzZSBudWxsLCBcbiAgICAgICAgICAgICAgICBcInNvdW5kXCI6IC0+IHAuc291bmRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInpJbmRleFwiOiA0OTk5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLlRleHRcIixcbiAgICAgICAgICAgIFwiZXhlY3V0ZUZpZWxkRm9ybXVsYXNcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaW5oZXJpdFByb3BlcnRpZXNcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic2l6ZVRvRml0XCI6IHRydWUsXG4gICAgICAgICAgICBcInN0eWxlXCI6IFwiYnV0dG9uVGV4dFwiLFxuICAgICAgICAgICAgXCJmcmFtZVwiOiBbMCwgMF0sXG4gICAgICAgICAgICBcInRleHRcIjogLT4gcC50ZXh0LFxuICAgICAgICAgICAgXCJ6SW5kZXhcIjogNTEwMFxuICAgICAgICB9XG4gICAgXVxufVxuXG5cbnVpLlVpRmFjdG9yeS5jdXN0b21UeXBlc1tcInVpLkJhY2tCdXR0b25cIl0gPSB7XG4gICAgXCJ0eXBlXCI6IFwidWkuQnV0dG9uXCIsXG4gICAgXCJwYXJhbXNcIjogeyBcbiAgICAgICAgXCJ0ZXh0XCI6IC0+IHA/LnRleHQgb3IgeyBsY0lkOiBcIkIwRkQ0QkYxMjFEOUU0NEU3NTg5Q0REMzU4NjlGODZGMjIyN1wiLCBkZWZhdWx0VGV4dDogXCJCYWNrXCIgfSwgXG4gICAgICAgIFwiYWN0aW9uc1wiOiBbeyBcInNvdW5kXCI6ICgtPiAkZGF0YUZpZWxkcy5kYXRhYmFzZS5zeXN0ZW0ubWVudVNlbGVjdFNvdW5kKSwgXCJldmVudFwiOiBcIm9uTW91c2VDbGlja1wiLCBcIm5hbWVcIjogXCJzYXZlU2V0dGluZ3NcIiB9LCB7IFwiZXZlbnRcIjogXCJvbk1vdXNlQ2xpY2tcIiwgXCJuYW1lXCI6IFwicHJldmlvdXNMYXlvdXRcIiB9XSwgXG4gICAgICAgIFwic291bmRcIjogLT4gJGRhdGFGaWVsZHMuZGF0YWJhc2Uuc3lzdGVtLm1lbnVDYW5jZWxTb3VuZCB9XG59XG5cblxuIl19
//# sourceURL=Template_Button_166.js