
/*
 * Category name which is displayed on the left side in some settings menus like the audio
 * settings.
 */
ui.UIManager.styles.windowCategoryUIText = {
  "font": {
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_SMALL,
    "smallCaps": true,
    "italic": true,
    "color": [215, 215, 215, 255]
  }
};


/*
 * Title Screen text used for the title screen options like "New Game", etc.
 */

ui.UIManager.styles.titleText = {
  "font": {
    "name": "Times New Roman",
    "size": 45,
    "smallCaps": true,
    "italic": true,
    "color": [255, 255, 255, 255],
    "outline": {
      "color": [0, 0, 0, 255],
      "size": 4
    }
  },
  "anchor": [0.5, 0.5],
  "animations": [
    {
      "event": "onMouseEnter",
      "flow": [
        {
          "type": "zoomTo",
          "zoom": [110, 110],
          "duration": 10,
          "easing": "linear_inout",
          "wait": true
        }
      ]
    }, {
      "event": "onMouseLeave",
      "clear": false,
      "flow": [
        {
          "type": "zoomTo",
          "zoom": [100, 100],
          "duration": 10,
          "easing": "linear_inout"
        }
      ]
    }
  ]
};

ui.UIManager.styles["titleText:hover"] = {
  "font": {
    "name": "Times New Roman",
    "size": 45,
    "smallCaps": true,
    "italic": true,
    "color": [205, 205, 255, 255],
    "outline": {
      "color": [0, 0, 0, 255],
      "size": 4
    }
  }
};

ui.UIManager.styles["titleText:focused"] = {
  "font": {
    "name": "Times New Roman",
    "size": 45,
    "smallCaps": true,
    "italic": true,
    "color": [205, 205, 255, 255],
    "outline": {
      "color": [0, 0, 0, 255],
      "size": 4
    }
  }
};

ui.UIManager.styles.choiceBoxEntry = {
  "opacity": 180
};

ui.UIManager.styles["choiceBoxEntry:enabled"] = {
  "opacity": 255
};

ui.UIManager.styles.messageOptionButton = {
  "image": gs.UIConstants.OPTION_BUTTON_MSG_IMAGE_OFF,
  "opacity": 100
};

ui.UIManager.styles["messageOptionButton:selected"] = {
  "image": gs.UIConstants.OPTION_BUTTON_MSG_IMAGE_ON,
  "opacity": 255
};

ui.UIManager.styles["messageOptionButton:enabled"] = {
  "opacity": 255
};

ui.UIManager.styles.optionButton = {
  "image": gs.UIConstants.OPTION_BUTTON_L_IMAGE_OFF
};

ui.UIManager.styles["optionButton:selected"] = {
  "image": gs.UIConstants.OPTION_BUTTON_L_IMAGE_ON
};

ui.UIManager.styles.sliderTrack = {
  "color": [131, 131, 131, 131]
};

ui.UIManager.styles.sliderKnob = {
  "image": gs.UIConstants.OPTION_BUTTON_L_IMAGE_OFF
};

ui.UIManager.styles["sliderKnob:hover"] = {
  "image": gs.UIConstants.OPTION_BUTTON_L_IMAGE_ON
};

ui.UIManager.styles.galleryImageFrame = {
  "image": "UI/dropshadow.png"
};

ui.UIManager.styles["galleryImageFrame:hover"] = {
  "image": "UI/selection.png"
};

ui.UIManager.styles["galleryImageFrame:selected"] = {
  "image": "UI/selection.png"
};

ui.UIManager.styles.windowFrame = {
  "image": "UI/skin-frame.png"
};

ui.UIManager.styles.windowTilePattern = {
  "image": "UI/skin-tile.png",
  "looping": {
    "vertical": true,
    "horizontal": true
  }
};

ui.UIManager.styles.windowStretchPattern = {
  "image": "UI/skin-stretch.png"
};

ui.UIManager.styles.windowShadow = {
  "image": "UI/dropshadow.png",
  "frameCornerSize": 30,
  "frameThickness": 30,
  "padding": [-16, -16, -16, -16]
};

ui.UIManager.styles.selectableWindowShadow = {
  "image": "UI/dropshadow.png"
};

ui.UIManager.styles["selectableWindowShadow:hover"] = {
  "image": "UI/selection.png"
};

ui.UIManager.styles.buttonText = {
  "alignmentX": "center",
  "alignmentY": "center",
  "font": {
    "name": "Times New Roman",
    "size": 30,
    "smallCaps": true,
    "italic": true,
    "color": [255, 255, 255, 255]
  }
};

ui.UIManager.styles.cgGalleryImage = {};

ui.UIManager.styles["cgGalleryImageFrame"] = {
  "image": "UI/dropshadow.png"
};

ui.UIManager.styles["selectableText"] = {
  "font": {
    "name": "Times New Roman",
    "size": 30,
    "smallCaps": true,
    "italic": true,
    "color": [255, 255, 255, 255]
  }
};

ui.UIManager.styles["selectableText:selected"] = {
  "font": {
    "name": "Times New Roman",
    "size": 30,
    "smallCaps": true,
    "italic": true,
    "color": [205, 205, 255, 255]
  }
};

ui.UIManager.styles["button"] = {};

ui.UIManager.styles["button:focused selectableWindowShadow"] = {
  "image": "UI/selection.png"
};

ui.UIManager.styles["cgGalleryImage:hover cgGalleryImageFrame"] = {
  "image": "UI/selection.png"
};


/*
 * Choice Timer text displayed if "Choice Timer" command is used to show a count-down
 * until the choice-selection is done automatically.
 */

ui.UIManager.styles.choiceTimerText = {
  "font": {
    "name": "Times New Roman",
    "size": 30,
    "smallCaps": true,
    "italic": true,
    "color": [255, 255, 255, 255],
    "border": true
  }
};


/*
 * Regular Size UI text used in all places for normal-size text / labels.
 */

ui.UIManager.styles.regularUIText = {
  "font": {
    "name": "Times New Roman",
    "size": 30,
    "smallCaps": true,
    "italic": true,
    "color": [255, 255, 255, 255]
  },
  "opacity": 100
};

ui.UIManager.styles["regularUIText:enabled"] = {
  "font": {
    "name": "Times New Roman",
    "size": 30,
    "smallCaps": true,
    "italic": true,
    "color": [255, 255, 255, 255]
  },
  "opacity": 255
};


/*
 * Small Size UI text used in all places for small-size text / labels.
 */

ui.UIManager.styles.smallUIText = {
  "font": {
    "name": "Times New Roman",
    "size": 22,
    "smallCaps": true,
    "italic": true,
    "color": [255, 255, 255, 255]
  }
};


/*
 * Small Size text used for save-game slot descriptions.
 */

ui.UIManager.styles.saveGameUIText = {
  "font": {
    "name": "Times New Roman",
    "size": 20,
    "smallCaps": true,
    "italic": true,
    "color": [255, 255, 255, 255]
  }
};


/*
 * Regular message text style for use in backlog, etc.
 */

ui.UIManager.styles.messageText = {
  "font": {
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_MESSAGE,
    "smallCaps": false,
    "italic": true,
    "border": true,
    "borderSize": 4
  }
};


/*
 * Ruby text style.
 * If size-property is not present, the half of the current font-size is used.
 * If color-property is not present, the current font-color is used.
 */

ui.UIManager.styles.rubyText = {
  "font": {
    "name": "Times New Roman",
    "smallCaps": false,
    "italic": true,
    "border": true,
    "borderSize": 4
  }
};


/*
 * Text for ADV game messages.
 */

ui.UIManager.styles.advMessageText = {
  "font": {
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_MESSAGE,
    "smallCaps": false,
    "italic": true,
    "outline": {
      "size": 4,
      "color": [0, 0, 0, 255]
    }
  }
};


/*
 * Text for NVL game messages.
 */

ui.UIManager.styles.nvlMessageText = {
  "font": {
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_MESSAGE,
    "smallCaps": false,
    "italic": true,
    "border": true,
    "borderSize": 4
  }
};


/*
 * Text for custom message areas.
 */

ui.UIManager.styles.customMessageText = {
  "font": {
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_MESSAGE_NAME,
    "smallCaps": false,
    "italic": true,
    "border": true
  }
};


/*
 * Used to display the current character's name.
 */

ui.UIManager.styles.messageBoxNameText = {
  "font": {
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_MESSAGE_NAME,
    "smallCaps": false,
    "italic": true,
    "border": true,
    "borderSize": 4
  }
};


/*
 * Used for number-input entries showing you the current number you have entered so far.
 */

ui.UIManager.styles.numberInputEntryText = {
  "font": {
    "name": "Times New Roman",
    "size": 90,
    "color": [0, 0, 0, 255]
  }
};


/*
 * Used for number-input for each single digit.
 */

ui.UIManager.styles.numberInputDigitText = {
  "font": {
    "name": "Times New Roman",
    "size": 35
  }
};


/*
 * Used for text-input entries showing you the current text you have entered so far.
 */

ui.UIManager.styles.textInputEntryText = {
  "font": {
    "name": "Times New Roman",
    "size": 90,
    "color": [0, 0, 0, 255]
  }
};


/*
 * Used for text-input for each single letter.
 */

ui.UIManager.styles.textInputLetterText = {
  "font": {
    "name": "Times New Roman",
    "size": 25
  }
};


/*
 * Defines the color used for the name-column of the message backlog.
 */

ui.UIManager.styles.backlogNamePanel = {
  "color": [255, 255, 255, 40]
};


/*
 * Defines the color used for the message-column of the message backlog.
 */

ui.UIManager.styles.backlogMessagePanel = {
  "color": [0, 0, 0, 160]
};


/*
 * Defines the font used for the name-column of the message backlog.
 */

ui.UIManager.styles.backlogNameText = {
  "font": {
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_MESSAGE_NAME,
    "smallCaps": false,
    "italic": true,
    "border": true,
    "borderSize": 4
  }
};


/*
 * Defines the color used for sub-areas on a window a category-column,etc.
 */

ui.UIManager.styles["hyperlink"] = {
  "font": {
    "color": [255, 255, 255, 255],
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_MESSAGE,
    "smallCaps": false,
    "italic": true,
    "outline": {
      "size": 4,
      "color": [0, 0, 0, 255]
    }
  }
};

ui.UIManager.styles["hyperlink:hover"] = {
  "font": {
    "color": [200, 200, 255, 255],
    "name": "Times New Roman",
    "size": gs.UIConstants.TEXT_SIZE_MESSAGE,
    "smallCaps": false,
    "italic": true,
    "outline": {
      "size": 4,
      "color": [0, 0, 0, 255]
    }
  }
};


/*
 * Defines the color used for sub-areas on a window a category-column,etc.
 */

ui.UIManager.styles.windowSubPanel = {
  "color": [255, 255, 255, 20]
};


/*
 * Defines the color used for the separator-line to separate a window's title-area from its actual content.
 */

ui.UIManager.styles.windowContentSeparator = {
  "color": [111, 111, 111]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFZQTs7OztBQUlBLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFwQixHQUEyQztFQUN2QyxNQUFBLEVBQVE7SUFDSixNQUFBLEVBQVEsaUJBREo7SUFFSixNQUFBLEVBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUZuQjtJQUdKLFdBQUEsRUFBYSxJQUhUO0lBSUosUUFBQSxFQUFVLElBSk47SUFLSixPQUFBLEVBQVMsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsQ0FMTDtHQUQrQjs7OztBQVUzQzs7OztBQUdBLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQXBCLEdBQWdDO0VBQzVCLE1BQUEsRUFBUTtJQUNKLE1BQUEsRUFBUSxpQkFESjtJQUVKLE1BQUEsRUFBUSxFQUZKO0lBR0osV0FBQSxFQUFhLElBSFQ7SUFJSixRQUFBLEVBQVUsSUFKTjtJQUtKLE9BQUEsRUFBUyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixDQUxMO0lBTUosU0FBQSxFQUFXO01BQUUsT0FBQSxFQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsR0FBVixDQUFYO01BQTJCLE1BQUEsRUFBUSxDQUFuQztLQU5QO0dBRG9CO0VBUzVCLFFBQUEsRUFBVSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBVGtCO0VBVTVCLFlBQUEsRUFBYztJQUNWO01BQ0ksT0FBQSxFQUFTLGNBRGI7TUFFSSxNQUFBLEVBQVE7UUFDSjtVQUFFLE1BQUEsRUFBUSxRQUFWO1VBQW9CLE1BQUEsRUFBUSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQTVCO1VBQXdDLFVBQUEsRUFBWSxFQUFwRDtVQUF3RCxRQUFBLEVBQVUsY0FBbEU7VUFBa0YsTUFBQSxFQUFRLElBQTFGO1NBREk7T0FGWjtLQURVLEVBT1Y7TUFD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Ozs7QUFHQSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFwQixHQUFxQztFQUNqQyxPQUFBLEVBQVMsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsRUFBaEIsQ0FEd0I7Ozs7QUFJckM7Ozs7QUFHQSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxzQkFBcEIsR0FBNkM7RUFDekMsT0FBQSxFQUFTLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBRGdDIiwic291cmNlc0NvbnRlbnQiOlsiIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jICAgU2NyaXB0OiBTdHlsZV9EZWZhdWx0XG4jXG4jICAgJCRDT1BZUklHSFQkJFxuI1xuIyAgIFRoaXMgc2NyaXB0IGRlZmluZXMgYWxsIHN0eWxlLWRlc2NyaXB0b3JzIGZvciB0aGUgZGVmYXVsdC1zdHlsZS4gVG8gY3JlYXRlXG4jICAgYSBuZXcgc3R5bGUsIGp1c3QgYWRkIGEgbmV3IHNjcmlwdCBhZnRlciBcIlN0eWxlX0RlZmF1bHRcIiBzY3JpcHQgYW5kIG92ZXJyaWRlXG4jICAgdGhlIHN0eWxlLWRlc2NyaXB0b3JzIHlvdSBsaWtlIHRvIGNoYW5nZS5cbiNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4jIyNcbiMgQ2F0ZWdvcnkgbmFtZSB3aGljaCBpcyBkaXNwbGF5ZWQgb24gdGhlIGxlZnQgc2lkZSBpbiBzb21lIHNldHRpbmdzIG1lbnVzIGxpa2UgdGhlIGF1ZGlvXG4jIHNldHRpbmdzLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLndpbmRvd0NhdGVnb3J5VUlUZXh0ID0ge1xuICAgIFwiZm9udFwiOiB7XG4gICAgICAgIFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLFxuICAgICAgICBcInNpemVcIjogZ3MuVUlDb25zdGFudHMuVEVYVF9TSVpFX1NNQUxMLFxuICAgICAgICBcInNtYWxsQ2Fwc1wiOiB0cnVlLFxuICAgICAgICBcIml0YWxpY1wiOiB0cnVlLFxuICAgICAgICBcImNvbG9yXCI6IFsyMTUsIDIxNSwgMjE1LCAyNTVdXG4gICAgfVxufVxuXG4jIyNcbiMgVGl0bGUgU2NyZWVuIHRleHQgdXNlZCBmb3IgdGhlIHRpdGxlIHNjcmVlbiBvcHRpb25zIGxpa2UgXCJOZXcgR2FtZVwiLCBldGMuXG4jIyNcbnVpLlVJTWFuYWdlci5zdHlsZXMudGl0bGVUZXh0ID0ge1xuICAgIFwiZm9udFwiOiB7XG4gICAgICAgIFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLFxuICAgICAgICBcInNpemVcIjogNDUsXG4gICAgICAgIFwic21hbGxDYXBzXCI6IHRydWUsXG4gICAgICAgIFwiaXRhbGljXCI6IHRydWUsXG4gICAgICAgIFwiY29sb3JcIjogWzI1NSwgMjU1LCAyNTUsIDI1NV0sXG4gICAgICAgIFwib3V0bGluZVwiOiB7IFwiY29sb3JcIjogWzAsIDAsIDAsIDI1NV0sIFwic2l6ZVwiOiA0IH1cbiAgICB9LFxuICAgIFwiYW5jaG9yXCI6IFswLjUsIDAuNV0sXG4gICAgXCJhbmltYXRpb25zXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcIm9uTW91c2VFbnRlclwiLFxuICAgICAgICAgICAgXCJmbG93XCI6IFtcbiAgICAgICAgICAgICAgICB7IFwidHlwZVwiOiBcInpvb21Ub1wiLCBcInpvb21cIjogWzExMCwgMTEwXSwgXCJkdXJhdGlvblwiOiAxMCwgXCJlYXNpbmdcIjogXCJsaW5lYXJfaW5vdXRcIiwgXCJ3YWl0XCI6IHRydWUgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwib25Nb3VzZUxlYXZlXCIsXG4gICAgICAgICAgICBcImNsZWFyXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmbG93XCI6IFtcbiAgICAgICAgICAgICAgICB7IFwidHlwZVwiOiBcInpvb21Ub1wiLCBcInpvb21cIjogWzEwMCwgMTAwXSwgXCJkdXJhdGlvblwiOiAxMCwgXCJlYXNpbmdcIjogXCJsaW5lYXJfaW5vdXRcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdXG59XG5cbnVpLlVJTWFuYWdlci5zdHlsZXNbXCJ0aXRsZVRleHQ6aG92ZXJcIl0gPSB7XG4gICAgXCJmb250XCI6IHtcbiAgICAgICAgXCJuYW1lXCI6IFwiVGltZXMgTmV3IFJvbWFuXCIsXG4gICAgICAgIFwic2l6ZVwiOiA0NSxcbiAgICAgICAgXCJzbWFsbENhcHNcIjogdHJ1ZSxcbiAgICAgICAgXCJpdGFsaWNcIjogdHJ1ZSxcbiAgICAgICAgXCJjb2xvclwiOiBbMjA1LCAyMDUsIDI1NSwgMjU1XSxcbiAgICAgICAgXCJvdXRsaW5lXCI6IHsgXCJjb2xvclwiOiBbMCwgMCwgMCwgMjU1XSwgXCJzaXplXCI6IDQgfVxuICAgIH1cbn1cbnVpLlVJTWFuYWdlci5zdHlsZXNbXCJ0aXRsZVRleHQ6Zm9jdXNlZFwiXSA9IHtcbiAgICBcImZvbnRcIjoge1xuICAgICAgICBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIixcbiAgICAgICAgXCJzaXplXCI6IDQ1LFxuICAgICAgICBcInNtYWxsQ2Fwc1wiOiB0cnVlLFxuICAgICAgICBcIml0YWxpY1wiOiB0cnVlLFxuICAgICAgICBcImNvbG9yXCI6IFsyMDUsIDIwNSwgMjU1LCAyNTVdLFxuICAgICAgICBcIm91dGxpbmVcIjogeyBcImNvbG9yXCI6IFswLCAwLCAwLCAyNTVdLCBcInNpemVcIjogNCB9XG4gICAgfVxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzLmNob2ljZUJveEVudHJ5ID0ge1xuICAgIFwib3BhY2l0eVwiOiAxODBcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlc1tcImNob2ljZUJveEVudHJ5OmVuYWJsZWRcIl0gPSB7XG4gICAgXCJvcGFjaXR5XCI6IDI1NVxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzLm1lc3NhZ2VPcHRpb25CdXR0b24gPSB7XG4gICAgXCJpbWFnZVwiOiBncy5VSUNvbnN0YW50cy5PUFRJT05fQlVUVE9OX01TR19JTUFHRV9PRkYsXG4gICAgXCJvcGFjaXR5XCI6IDEwMFxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzW1wibWVzc2FnZU9wdGlvbkJ1dHRvbjpzZWxlY3RlZFwiXSA9IHtcbiAgICBcImltYWdlXCI6IGdzLlVJQ29uc3RhbnRzLk9QVElPTl9CVVRUT05fTVNHX0lNQUdFX09OLFxuICAgIFwib3BhY2l0eVwiOiAyNTVcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlc1tcIm1lc3NhZ2VPcHRpb25CdXR0b246ZW5hYmxlZFwiXSA9IHtcbiAgICBcIm9wYWNpdHlcIjogMjU1XG59XG5cbnVpLlVJTWFuYWdlci5zdHlsZXMub3B0aW9uQnV0dG9uID0ge1xuICAgIFwiaW1hZ2VcIjogZ3MuVUlDb25zdGFudHMuT1BUSU9OX0JVVFRPTl9MX0lNQUdFX09GRlxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzW1wib3B0aW9uQnV0dG9uOnNlbGVjdGVkXCJdID0ge1xuICAgIFwiaW1hZ2VcIjogZ3MuVUlDb25zdGFudHMuT1BUSU9OX0JVVFRPTl9MX0lNQUdFX09OXG59XG5cbnVpLlVJTWFuYWdlci5zdHlsZXMuc2xpZGVyVHJhY2sgPSB7XG4gICAgXCJjb2xvclwiOiBbMTMxLCAxMzEsIDEzMSwgMTMxXVxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzLnNsaWRlcktub2IgPSB7XG4gICAgXCJpbWFnZVwiOiBncy5VSUNvbnN0YW50cy5PUFRJT05fQlVUVE9OX0xfSU1BR0VfT0ZGXG59XG5cbnVpLlVJTWFuYWdlci5zdHlsZXNbXCJzbGlkZXJLbm9iOmhvdmVyXCJdID0ge1xuICAgIFwiaW1hZ2VcIjogZ3MuVUlDb25zdGFudHMuT1BUSU9OX0JVVFRPTl9MX0lNQUdFX09OXG59XG5cbnVpLlVJTWFuYWdlci5zdHlsZXMuZ2FsbGVyeUltYWdlRnJhbWUgPSB7XG4gICAgXCJpbWFnZVwiOiBcIlVJL2Ryb3BzaGFkb3cucG5nXCJcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlc1tcImdhbGxlcnlJbWFnZUZyYW1lOmhvdmVyXCJdID0ge1xuICAgIFwiaW1hZ2VcIjogXCJVSS9zZWxlY3Rpb24ucG5nXCJcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlc1tcImdhbGxlcnlJbWFnZUZyYW1lOnNlbGVjdGVkXCJdID0ge1xuICAgIFwiaW1hZ2VcIjogXCJVSS9zZWxlY3Rpb24ucG5nXCJcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlcy53aW5kb3dGcmFtZSA9IHtcbiAgICBcImltYWdlXCI6IFwiVUkvc2tpbi1mcmFtZS5wbmdcIlxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzLndpbmRvd1RpbGVQYXR0ZXJuID0ge1xuICAgIFwiaW1hZ2VcIjogXCJVSS9za2luLXRpbGUucG5nXCIsXG4gICAgXCJsb29waW5nXCI6IHsgXCJ2ZXJ0aWNhbFwiOiB0cnVlLCBcImhvcml6b250YWxcIjogdHJ1ZSB9XG59XG5cbnVpLlVJTWFuYWdlci5zdHlsZXMud2luZG93U3RyZXRjaFBhdHRlcm4gPSB7XG4gICAgXCJpbWFnZVwiOiBcIlVJL3NraW4tc3RyZXRjaC5wbmdcIlxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzLndpbmRvd1NoYWRvdyA9IHtcbiAgICBcImltYWdlXCI6IFwiVUkvZHJvcHNoYWRvdy5wbmdcIixcbiAgICBcImZyYW1lQ29ybmVyU2l6ZVwiOiAzMCxcbiAgICBcImZyYW1lVGhpY2tuZXNzXCI6IDMwLFxuICAgIFwicGFkZGluZ1wiOiBbLTE2LCAtMTYsIC0xNiwgLTE2XSxcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlcy5zZWxlY3RhYmxlV2luZG93U2hhZG93ID0ge1xuICAgIFwiaW1hZ2VcIjogXCJVSS9kcm9wc2hhZG93LnBuZ1wiXG59XG5cblxudWkuVUlNYW5hZ2VyLnN0eWxlc1tcInNlbGVjdGFibGVXaW5kb3dTaGFkb3c6aG92ZXJcIl0gPSB7XG4gICAgXCJpbWFnZVwiOiBcIlVJL3NlbGVjdGlvbi5wbmdcIlxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzLmJ1dHRvblRleHQgPSB7XG4gICAgXCJhbGlnbm1lbnRYXCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbm1lbnRZXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmb250XCI6IHtcbiAgICAgICAgXCJuYW1lXCI6IFwiVGltZXMgTmV3IFJvbWFuXCIsXG4gICAgICAgIFwic2l6ZVwiOiAzMCxcbiAgICAgICAgXCJzbWFsbENhcHNcIjogdHJ1ZSxcbiAgICAgICAgXCJpdGFsaWNcIjogdHJ1ZSxcbiAgICAgICAgXCJjb2xvclwiOiBbMjU1LCAyNTUsIDI1NSwgMjU1XVxuICAgIH1cbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlcy5jZ0dhbGxlcnlJbWFnZSA9IHtcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlc1tcImNnR2FsbGVyeUltYWdlRnJhbWVcIl0gPSB7XG4gICAgXCJpbWFnZVwiOiBcIlVJL2Ryb3BzaGFkb3cucG5nXCJcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlc1tcInNlbGVjdGFibGVUZXh0XCJdID0ge1xuICAgIFwiZm9udFwiOiB7XG4gICAgICAgIFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLFxuICAgICAgICBcInNpemVcIjogMzAsXG4gICAgICAgIFwic21hbGxDYXBzXCI6IHRydWUsXG4gICAgICAgIFwiaXRhbGljXCI6IHRydWUsXG4gICAgICAgIFwiY29sb3JcIjogWzI1NSwgMjU1LCAyNTUsIDI1NV1cbiAgICB9XG59XG5cbnVpLlVJTWFuYWdlci5zdHlsZXNbXCJzZWxlY3RhYmxlVGV4dDpzZWxlY3RlZFwiXSA9IHtcbiAgICBcImZvbnRcIjoge1xuICAgICAgICBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIixcbiAgICAgICAgXCJzaXplXCI6IDMwLFxuICAgICAgICBcInNtYWxsQ2Fwc1wiOiB0cnVlLFxuICAgICAgICBcIml0YWxpY1wiOiB0cnVlLFxuICAgICAgICBcImNvbG9yXCI6IFsyMDUsIDIwNSwgMjU1LCAyNTVdXG4gICAgfVxufVxuXG4jdWkuVUlNYW5hZ2VyLnN0eWxlc1tcImJ1dHRvbjpob3ZlciB3aW5kb3dTaGFkb3dcIl0gPVxuI3tcbiMgICAgXCJpbWFnZVwiOiBcInNlbGVjdGlvblwiXG4jfVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzW1wiYnV0dG9uXCJdID1cbntcbn1cblxudWkuVUlNYW5hZ2VyLnN0eWxlc1tcImJ1dHRvbjpmb2N1c2VkIHNlbGVjdGFibGVXaW5kb3dTaGFkb3dcIl0gPVxue1xuICAgIFwiaW1hZ2VcIjogXCJVSS9zZWxlY3Rpb24ucG5nXCJcbn1cblxuXG5cbnVpLlVJTWFuYWdlci5zdHlsZXNbXCJjZ0dhbGxlcnlJbWFnZTpob3ZlciBjZ0dhbGxlcnlJbWFnZUZyYW1lXCJdID0ge1xuICAgIFwiaW1hZ2VcIjogXCJVSS9zZWxlY3Rpb24ucG5nXCJcbn1cblxuI3VpLlVJTWFuYWdlci5zdHlsZXNbXCJjZ0dhbGxlcnlJbWFnZSBjZ0dhbGxlcnlJbWFnZUZyYW1lXCJdID0ge1xuIyAgICBcImltYWdlXCI6IFwiZHJvcHNoYWRvd1wiXG4jfVxuXG4jdWkuVUlNYW5hZ2VyLnN0eWxlc1tcImNnR2FsbGVyeUltYWdlRnJhbWU6aG92ZXJcIl0gPSB7XG4jICAgIFwiaW1hZ2VcIjogXCJzZWxlY3Rpb25cIlxuI31cblxuI3VpLlVJTWFuYWdlci5zdHlsZXNbXCJjZ0dhbGxlcnlJbWFnZUZyYW1lOnNlbGVjdGVkXCJdID0ge1xuIyAgICBcImltYWdlXCI6IFwic2VsZWN0aW9uXCJcbiN9XG5cbiMjI1xuIyBDaG9pY2UgVGltZXIgdGV4dCBkaXNwbGF5ZWQgaWYgXCJDaG9pY2UgVGltZXJcIiBjb21tYW5kIGlzIHVzZWQgdG8gc2hvdyBhIGNvdW50LWRvd25cbiMgdW50aWwgdGhlIGNob2ljZS1zZWxlY3Rpb24gaXMgZG9uZSBhdXRvbWF0aWNhbGx5LlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLmNob2ljZVRpbWVyVGV4dCA9IHtcbiAgICBcImZvbnRcIjoge1xuICAgICAgICBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIixcbiAgICAgICAgXCJzaXplXCI6IDMwLFxuICAgICAgICBcInNtYWxsQ2Fwc1wiOiB0cnVlLFxuICAgICAgICBcIml0YWxpY1wiOiB0cnVlLFxuICAgICAgICBcImNvbG9yXCI6IFsyNTUsIDI1NSwgMjU1LCAyNTVdLFxuICAgICAgICBcImJvcmRlclwiOiB0cnVlXG4gICAgfVxufVxuXG4jIyNcbiMgUmVndWxhciBTaXplIFVJIHRleHQgdXNlZCBpbiBhbGwgcGxhY2VzIGZvciBub3JtYWwtc2l6ZSB0ZXh0IC8gbGFiZWxzLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLnJlZ3VsYXJVSVRleHQgPSB7XG4gICAgXCJmb250XCI6IHtcbiAgICAgICAgXCJuYW1lXCI6IFwiVGltZXMgTmV3IFJvbWFuXCIsXG4gICAgICAgIFwic2l6ZVwiOiAzMCxcbiAgICAgICAgXCJzbWFsbENhcHNcIjogdHJ1ZSxcbiAgICAgICAgXCJpdGFsaWNcIjogdHJ1ZSxcbiAgICAgICAgXCJjb2xvclwiOiBbMjU1LCAyNTUsIDI1NSwgMjU1XVxuICAgIH0sXG4gICAgXCJvcGFjaXR5XCI6IDEwMFxufVxuXG51aS5VSU1hbmFnZXIuc3R5bGVzW1wicmVndWxhclVJVGV4dDplbmFibGVkXCJdID0ge1xuICAgIFwiZm9udFwiOiB7XG4gICAgICAgIFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLFxuICAgICAgICBcInNpemVcIjogMzAsXG4gICAgICAgIFwic21hbGxDYXBzXCI6IHRydWUsXG4gICAgICAgIFwiaXRhbGljXCI6IHRydWUsXG4gICAgICAgIFwiY29sb3JcIjogWzI1NSwgMjU1LCAyNTUsIDI1NV1cbiAgICB9LFxuICAgIFwib3BhY2l0eVwiOiAyNTVcbn1cblxuXG4jIyNcbiMgU21hbGwgU2l6ZSBVSSB0ZXh0IHVzZWQgaW4gYWxsIHBsYWNlcyBmb3Igc21hbGwtc2l6ZSB0ZXh0IC8gbGFiZWxzLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLnNtYWxsVUlUZXh0ID0ge1xuICAgIFwiZm9udFwiOiB7XG4gICAgICAgIFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLFxuICAgICAgICBcInNpemVcIjogMjIsXG4gICAgICAgIFwic21hbGxDYXBzXCI6IHRydWUsXG4gICAgICAgIFwiaXRhbGljXCI6IHRydWUsXG4gICAgICAgIFwiY29sb3JcIjogWzI1NSwgMjU1LCAyNTUsIDI1NV1cbiAgICB9XG59XG5cbiMjI1xuIyBTbWFsbCBTaXplIHRleHQgdXNlZCBmb3Igc2F2ZS1nYW1lIHNsb3QgZGVzY3JpcHRpb25zLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLnNhdmVHYW1lVUlUZXh0ID0ge1xuICAgIFwiZm9udFwiOiB7XG4gICAgICAgIFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLFxuICAgICAgICBcInNpemVcIjogMjAsXG4gICAgICAgIFwic21hbGxDYXBzXCI6IHRydWUsXG4gICAgICAgIFwiaXRhbGljXCI6IHRydWUsXG4gICAgICAgIFwiY29sb3JcIjogWzI1NSwgMjU1LCAyNTUsIDI1NV1cbiAgICB9XG59XG5cbiMjI1xuIyBSZWd1bGFyIG1lc3NhZ2UgdGV4dCBzdHlsZSBmb3IgdXNlIGluIGJhY2tsb2csIGV0Yy5cbiMjI1xudWkuVUlNYW5hZ2VyLnN0eWxlcy5tZXNzYWdlVGV4dCA9IHtcbiAgICBcImZvbnRcIjogeyBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIiwgXCJzaXplXCI6IGdzLlVJQ29uc3RhbnRzLlRFWFRfU0laRV9NRVNTQUdFLCBcInNtYWxsQ2Fwc1wiOiBmYWxzZSwgXCJpdGFsaWNcIjogdHJ1ZSwgXCJib3JkZXJcIjogdHJ1ZSwgXCJib3JkZXJTaXplXCI6IDQgfVxufVxuXG4jIyNcbiMgUnVieSB0ZXh0IHN0eWxlLlxuIyBJZiBzaXplLXByb3BlcnR5IGlzIG5vdCBwcmVzZW50LCB0aGUgaGFsZiBvZiB0aGUgY3VycmVudCBmb250LXNpemUgaXMgdXNlZC5cbiMgSWYgY29sb3ItcHJvcGVydHkgaXMgbm90IHByZXNlbnQsIHRoZSBjdXJyZW50IGZvbnQtY29sb3IgaXMgdXNlZC5cbiMjI1xudWkuVUlNYW5hZ2VyLnN0eWxlcy5ydWJ5VGV4dCA9IHtcbiAgICBcImZvbnRcIjogeyBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIiwgXCJzbWFsbENhcHNcIjogZmFsc2UsIFwiaXRhbGljXCI6IHRydWUsIFwiYm9yZGVyXCI6IHRydWUsIFwiYm9yZGVyU2l6ZVwiOiA0IH1cbn1cblxuIyMjXG4jIFRleHQgZm9yIEFEViBnYW1lIG1lc3NhZ2VzLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLmFkdk1lc3NhZ2VUZXh0ID0ge1xuICAgIFwiZm9udFwiOiB7IFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLCBcInNpemVcIjogZ3MuVUlDb25zdGFudHMuVEVYVF9TSVpFX01FU1NBR0UsIFwic21hbGxDYXBzXCI6IGZhbHNlLCBcIml0YWxpY1wiOiB0cnVlLCBcIm91dGxpbmVcIjogeyBcInNpemVcIjogNCwgXCJjb2xvclwiOiBbMCwgMCwgMCwgMjU1XSB9IH1cbn1cblxuIyMjXG4jIFRleHQgZm9yIE5WTCBnYW1lIG1lc3NhZ2VzLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLm52bE1lc3NhZ2VUZXh0ID0ge1xuICAgIFwiZm9udFwiOiB7IFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLCBcInNpemVcIjogZ3MuVUlDb25zdGFudHMuVEVYVF9TSVpFX01FU1NBR0UsIFwic21hbGxDYXBzXCI6IGZhbHNlLCBcIml0YWxpY1wiOiB0cnVlLCBcImJvcmRlclwiOiB0cnVlLCBcImJvcmRlclNpemVcIjogNCB9XG59XG5cbiMjI1xuIyBUZXh0IGZvciBjdXN0b20gbWVzc2FnZSBhcmVhcy5cbiMjI1xudWkuVUlNYW5hZ2VyLnN0eWxlcy5jdXN0b21NZXNzYWdlVGV4dCA9IHtcbiAgICBcImZvbnRcIjogeyBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIiwgXCJzaXplXCI6IGdzLlVJQ29uc3RhbnRzLlRFWFRfU0laRV9NRVNTQUdFX05BTUUsIFwic21hbGxDYXBzXCI6IGZhbHNlLCBcIml0YWxpY1wiOiB0cnVlLCBcImJvcmRlclwiOiB0cnVlICB9LFxufVxuIyMjXG4jIFVzZWQgdG8gZGlzcGxheSB0aGUgY3VycmVudCBjaGFyYWN0ZXIncyBuYW1lLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLm1lc3NhZ2VCb3hOYW1lVGV4dCA9IHtcbiAgICBcImZvbnRcIjogeyBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIiwgXCJzaXplXCI6IGdzLlVJQ29uc3RhbnRzLlRFWFRfU0laRV9NRVNTQUdFX05BTUUsIFwic21hbGxDYXBzXCI6IGZhbHNlLCBcIml0YWxpY1wiOiB0cnVlLCBcImJvcmRlclwiOiB0cnVlLCBcImJvcmRlclNpemVcIjogNCB9XG59XG5cbiMjI1xuIyBVc2VkIGZvciBudW1iZXItaW5wdXQgZW50cmllcyBzaG93aW5nIHlvdSB0aGUgY3VycmVudCBudW1iZXIgeW91IGhhdmUgZW50ZXJlZCBzbyBmYXIuXG4jIyNcbnVpLlVJTWFuYWdlci5zdHlsZXMubnVtYmVySW5wdXRFbnRyeVRleHQgPSB7XG4gICAgXCJmb250XCI6IHsgXCJuYW1lXCI6IFwiVGltZXMgTmV3IFJvbWFuXCIsIFwic2l6ZVwiOiA5MCwgXCJjb2xvclwiOiBbMCwgMCwgMCwgMjU1XSB9XG59XG5cbiMjI1xuIyBVc2VkIGZvciBudW1iZXItaW5wdXQgZm9yIGVhY2ggc2luZ2xlIGRpZ2l0LlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLm51bWJlcklucHV0RGlnaXRUZXh0ID0ge1xuICAgIFwiZm9udFwiOiB7IFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLCBcInNpemVcIjogMzUgfVxufVxuXG4jIyNcbiMgVXNlZCBmb3IgdGV4dC1pbnB1dCBlbnRyaWVzIHNob3dpbmcgeW91IHRoZSBjdXJyZW50IHRleHQgeW91IGhhdmUgZW50ZXJlZCBzbyBmYXIuXG4jIyNcbnVpLlVJTWFuYWdlci5zdHlsZXMudGV4dElucHV0RW50cnlUZXh0ID0ge1xuICAgIFwiZm9udFwiOiB7IFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLCBcInNpemVcIjogOTAsIFwiY29sb3JcIjogWzAsIDAsIDAsIDI1NV0gfVxufVxuXG4jIyNcbiMgVXNlZCBmb3IgdGV4dC1pbnB1dCBmb3IgZWFjaCBzaW5nbGUgbGV0dGVyLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLnRleHRJbnB1dExldHRlclRleHQgPSB7XG4gICAgXCJmb250XCI6IHsgXCJuYW1lXCI6IFwiVGltZXMgTmV3IFJvbWFuXCIsIFwic2l6ZVwiOiAyNSB9XG59XG5cbiMjI1xuIyBEZWZpbmVzIHRoZSBjb2xvciB1c2VkIGZvciB0aGUgbmFtZS1jb2x1bW4gb2YgdGhlIG1lc3NhZ2UgYmFja2xvZy5cbiMjI1xudWkuVUlNYW5hZ2VyLnN0eWxlcy5iYWNrbG9nTmFtZVBhbmVsID0ge1xuICAgIFwiY29sb3JcIjogWzI1NSwgMjU1LCAyNTUsIDQwXVxufVxuXG4jIyNcbiMgRGVmaW5lcyB0aGUgY29sb3IgdXNlZCBmb3IgdGhlIG1lc3NhZ2UtY29sdW1uIG9mIHRoZSBtZXNzYWdlIGJhY2tsb2cuXG4jIyNcbnVpLlVJTWFuYWdlci5zdHlsZXMuYmFja2xvZ01lc3NhZ2VQYW5lbCA9IHtcbiAgICBcImNvbG9yXCI6IFswLCAwLCAwLCAxNjBdXG59XG5cbiMjI1xuIyBEZWZpbmVzIHRoZSBmb250IHVzZWQgZm9yIHRoZSBuYW1lLWNvbHVtbiBvZiB0aGUgbWVzc2FnZSBiYWNrbG9nLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLmJhY2tsb2dOYW1lVGV4dCA9IHtcbiAgICBcImZvbnRcIjogeyBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIiwgXCJzaXplXCI6IGdzLlVJQ29uc3RhbnRzLlRFWFRfU0laRV9NRVNTQUdFX05BTUUsIFwic21hbGxDYXBzXCI6IGZhbHNlLCBcIml0YWxpY1wiOiB0cnVlLCBcImJvcmRlclwiOiB0cnVlLCBcImJvcmRlclNpemVcIjogNCB9XG59XG5cbiMjI1xuIyBEZWZpbmVzIHRoZSBjb2xvciB1c2VkIGZvciBzdWItYXJlYXMgb24gYSB3aW5kb3cgYSBjYXRlZ29yeS1jb2x1bW4sZXRjLlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzW1wiaHlwZXJsaW5rXCJdID0ge1xuICAgIFwiZm9udFwiOiB7ICBcImNvbG9yXCI6IFsyNTUsIDI1NSwgMjU1LCAyNTVdLCBcIm5hbWVcIjogXCJUaW1lcyBOZXcgUm9tYW5cIiwgXCJzaXplXCI6IGdzLlVJQ29uc3RhbnRzLlRFWFRfU0laRV9NRVNTQUdFLCBcInNtYWxsQ2Fwc1wiOiBmYWxzZSwgXCJpdGFsaWNcIjogdHJ1ZSwgXCJvdXRsaW5lXCI6IHsgXCJzaXplXCI6IDQsIFwiY29sb3JcIjogWzAsIDAsIDAsIDI1NV0gfSB9XG59XG51aS5VSU1hbmFnZXIuc3R5bGVzW1wiaHlwZXJsaW5rOmhvdmVyXCJdID0ge1xuICAgIFwiZm9udFwiOiB7IFwiY29sb3JcIjogWzIwMCwgMjAwLCAyNTUsIDI1NV0sIFwibmFtZVwiOiBcIlRpbWVzIE5ldyBSb21hblwiLCBcInNpemVcIjogZ3MuVUlDb25zdGFudHMuVEVYVF9TSVpFX01FU1NBR0UsIFwic21hbGxDYXBzXCI6IGZhbHNlLCBcIml0YWxpY1wiOiB0cnVlLCBcIm91dGxpbmVcIjogeyBcInNpemVcIjogNCwgXCJjb2xvclwiOiBbMCwgMCwgMCwgMjU1XSB9IH1cbn1cblxuIyMjXG4jIERlZmluZXMgdGhlIGNvbG9yIHVzZWQgZm9yIHN1Yi1hcmVhcyBvbiBhIHdpbmRvdyBhIGNhdGVnb3J5LWNvbHVtbixldGMuXG4jIyNcbnVpLlVJTWFuYWdlci5zdHlsZXMud2luZG93U3ViUGFuZWwgPSB7XG4gICAgXCJjb2xvclwiOiBbMjU1LCAyNTUsIDI1NSwgMjBdXG59XG5cbiMjI1xuIyBEZWZpbmVzIHRoZSBjb2xvciB1c2VkIGZvciB0aGUgc2VwYXJhdG9yLWxpbmUgdG8gc2VwYXJhdGUgYSB3aW5kb3cncyB0aXRsZS1hcmVhIGZyb20gaXRzIGFjdHVhbCBjb250ZW50LlxuIyMjXG51aS5VSU1hbmFnZXIuc3R5bGVzLndpbmRvd0NvbnRlbnRTZXBhcmF0b3IgPSB7XG4gICAgXCJjb2xvclwiOiBbMTExLCAxMTEsIDExMV1cbn0iXX0=
//# sourceURL=Style_Default_9.js