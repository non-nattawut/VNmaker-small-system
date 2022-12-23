var Component_Handler,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component_Handler = (function(superClass) {
  extend(Component_Handler, superClass);


  /**
  * The base class for all handler-components. A handler-component is
  * used to handle condition- or event-based processes of a In-Game UI
  * object like executing bindings or triggering actions.
  *
  * A handler is only executed if all assigned conditions and events are
  * true.
  *
  * @module ui
  * @class Component_Handler
  * @extends gs.Component
  * @memberof ui
  * @constructor
   */

  function Component_Handler() {

    /**
    * @property mouseEntered
    * @type boolean
    * @protected
     */
    this.mouseEntered = false;

    /**
    * @property mouseLeaved
    * @type boolean
    * @protected
     */
    this.mouseLeaved = true;
  }


  /**
  * Checks if the condition is <b>true</b> for the specified game object.
  *
  * @method checkCondition
  * @param {gs.Object_Base} object The game object.
  * @param {Object} condition The condition-object.
  * @return {boolean} If <b>true</b> the condition is true. Otherwise <b>false</b>.
  * @static
   */

  Component_Handler.checkCondition = function(object, condition) {
    var result;
    result = false;
    if (condition.equalTo != null) {
      result = ui.Component_FormulaHandler.fieldValue(object, condition.field) === ui.Component_FormulaHandler.fieldValue(object, condition.equalTo);
    } else if (condition.greaterThan != null) {
      result = ui.Component_FormulaHandler.fieldValue(object, condition.field) > ui.Component_FormulaHandler.fieldValue(object, condition.greaterThan);
    } else if (condition.lessThan != null) {
      result = ui.Component_FormulaHandler.fieldValue(object, condition.field) < ui.Component_FormulaHandler.fieldValue(object, condition.lessThan);
    } else if (condition.notEqualTo != null) {
      result = ui.Component_FormulaHandler.fieldValue(object, condition.field) !== ui.Component_FormulaHandler.fieldValue(object, condition.notEqualTo);
    }
    return result;
  };


  /**
  * Checks if the specified condition is <b>true</b>.
  *
  * @method checkCondition
  * @param {Object} condition The condition-object.
  * @return {boolean} If <b>true</b> the condition is true. Otherwise <b>false</b>.
   */

  Component_Handler.prototype.checkCondition = function(condition) {
    return ui.Component_Handler.checkCondition(this.object, condition);
  };


  /**
  * Checks if the specified conditions are <b>true</b>.
  *
  * @method checkConditions
  * @param {Object[]} conditions An array of condition-objects.
  * @return {boolean} If <b>true</b> all conditions are true. Otherwise <b>false</b>.
   */

  Component_Handler.prototype.checkConditions = function(conditions) {
    var condition, i, len, result;
    result = true;
    for (i = 0, len = conditions.length; i < len; i++) {
      condition = conditions[i];
      if (!this.checkCondition(condition)) {
        result = false;
        break;
      }
    }
    return result;
  };


  /**
  * Checks if the specified event is true.
  *
  * @method checkEvent
  * @param {Object} event The event to check for.
  * @param {Object} [binding=null] binding An optional binding-object necessary for some event-types.
  * @return {boolean} If <b>true</b> the event is true. Otherwise <b>false</b>.
   */

  Component_Handler.prototype.checkEvent = function(event, binding) {
    var entered, leaved, ref, ref1, result, value;
    result = false;
    if (event === "onAlways") {
      result = true;
    } else if (event === "onAction") {
      result = this.object.canReceiveInput() && Input.Mouse.buttons[Input.Mouse.LEFT] === 2 && this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y);
    } else if (event === "onCancel") {
      result = this.object.canReceiveInput() && Input.Mouse.buttons[Input.Mouse.RIGHT] === 2 && this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y);
    } else if (event === "onAccept") {
      result = this.object.canReceiveInput() && Input.release(Input.KEY_RETURN) || (Input.Mouse.buttons[Input.Mouse.LEFT] === 2 && this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y));
    } else if (event === "onDragEnter") {
      entered = this.object.canReceiveInput() && ((ref = this.object.dragDrop) != null ? ref.isDragging : void 0) && this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y);
      result = !this.mouseEntered && entered;
      this.mouseEntered = entered;
    } else if (event === "onDragLeave") {
      leaved = this.object.canReceiveInput() && ((ref1 = this.object.dragDrop) != null ? ref1.isDragging : void 0) && !this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y);
      result = !this.mouseLeaved && leaved;
      this.mouseLeaved = leaved;
    } else if (event === "onMouseEnter") {
      entered = this.object.canReceiveInput() && this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y);
      result = !this.mouseEntered && entered;
      this.mouseEntered = entered;
    } else if (event === "onMouseLeave") {
      leaved = this.object.canReceiveInput() && !this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y);
      result = !this.mouseLeaved && leaved;
      this.mouseLeaved = leaved;
    } else if (event === "onMouseHover") {
      result = this.object.canReceiveInput() && this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y);
    } else if (event === "onMouseClick") {
      result = this.object.canReceiveInput() && Input.Mouse.buttons[Input.Mouse.LEFT] === 2 && this.object.dstRect.contains(Input.Mouse.x - this.object.origin.x, Input.Mouse.y - this.object.origin.y);
    } else if (event.onChange != null) {
      value = this.resolveFieldPath(event.onChange);
      if (value != null) {
        value = value.get(this.object);
        if (binding[event.onChange] !== value) {
          binding[event.onChange] = value;
          result = true;
        }
      } else {
        result = true;
      }
    }
    return result;
  };


  /**
  * Checks if all events and conditions defined for the handler
  * are true. If that check returns <b>true</b> the handler must be
  * executed.
  *
  * @method checkObject
  * @param {Object} object The game object to check.
  * @return {boolean} If <b>true</b> the handler must be executed. Otherwise <b>false</b>.
   */

  Component_Handler.prototype.checkObject = function(object) {
    var event, execute, i, len, ref;
    execute = true;
    if (object.event != null) {
      object.events = [object.event];
      delete object.event;
    }
    if (object.condition != null) {
      object.conditions = [object.condition];
      delete object.condition;
    }
    if (object.events != null) {
      ref = object.events;
      for (i = 0, len = ref.length; i < len; i++) {
        event = ref[i];
        execute = this.checkEvent(event, object);
        if (execute) {
          break;
        }
      }
    }
    if ((object.conditions != null) && execute) {
      execute = this.checkConditions(object.conditions);
    }
    return execute;
  };

  return Component_Handler;

})(gs.Component);

ui.Component_Handler = Component_Handler;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUEsaUJBQUE7RUFBQTs7O0FBQU07Ozs7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0VBY2EsMkJBQUE7O0FBQ1Q7Ozs7O0lBS0EsSUFBQyxDQUFBLFlBQUQsR0FBZ0I7O0FBRWhCOzs7OztJQUtBLElBQUMsQ0FBQSxXQUFELEdBQWU7RUFiTjs7O0FBZWI7Ozs7Ozs7Ozs7RUFTQSxpQkFBQyxDQUFBLGNBQUQsR0FBaUIsU0FBQyxNQUFELEVBQVMsU0FBVDtBQUNiLFFBQUE7SUFBQSxNQUFBLEdBQVM7SUFFVCxJQUFHLHlCQUFIO01BQ0ksTUFBQSxHQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUE1QixDQUF1QyxNQUF2QyxFQUErQyxTQUFTLENBQUMsS0FBekQsQ0FBQSxLQUFtRSxFQUFFLENBQUMsd0JBQXdCLENBQUMsVUFBNUIsQ0FBdUMsTUFBdkMsRUFBK0MsU0FBUyxDQUFDLE9BQXpELEVBRGhGO0tBQUEsTUFFSyxJQUFHLDZCQUFIO01BQ0QsTUFBQSxHQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUE1QixDQUF1QyxNQUF2QyxFQUErQyxTQUFTLENBQUMsS0FBekQsQ0FBQSxHQUFrRSxFQUFFLENBQUMsd0JBQXdCLENBQUMsVUFBNUIsQ0FBdUMsTUFBdkMsRUFBK0MsU0FBUyxDQUFDLFdBQXpELEVBRDFFO0tBQUEsTUFFQSxJQUFHLDBCQUFIO01BQ0QsTUFBQSxHQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUE1QixDQUF1QyxNQUF2QyxFQUErQyxTQUFTLENBQUMsS0FBekQsQ0FBQSxHQUFrRSxFQUFFLENBQUMsd0JBQXdCLENBQUMsVUFBNUIsQ0FBdUMsTUFBdkMsRUFBK0MsU0FBUyxDQUFDLFFBQXpELEVBRDFFO0tBQUEsTUFFQSxJQUFHLDRCQUFIO01BQ0QsTUFBQSxHQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUE1QixDQUF1QyxN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QUM7O0FBZ0tuQyxFQUFFLENBQUMsaUJBQUgsR0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiNcbiMgICBTY3JpcHQ6IENvbXBvbmVudF9GcmVlTGF5b3V0QmVoYXZpb3JcbiNcbiMgICAkJENPUFlSSUdIVCQkXG4jXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNsYXNzIENvbXBvbmVudF9IYW5kbGVyIGV4dGVuZHMgZ3MuQ29tcG9uZW50XG4gICAgIyMjKlxuICAgICogVGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBoYW5kbGVyLWNvbXBvbmVudHMuIEEgaGFuZGxlci1jb21wb25lbnQgaXNcbiAgICAqIHVzZWQgdG8gaGFuZGxlIGNvbmRpdGlvbi0gb3IgZXZlbnQtYmFzZWQgcHJvY2Vzc2VzIG9mIGEgSW4tR2FtZSBVSVxuICAgICogb2JqZWN0IGxpa2UgZXhlY3V0aW5nIGJpbmRpbmdzIG9yIHRyaWdnZXJpbmcgYWN0aW9ucy5cbiAgICAqXG4gICAgKiBBIGhhbmRsZXIgaXMgb25seSBleGVjdXRlZCBpZiBhbGwgYXNzaWduZWQgY29uZGl0aW9ucyBhbmQgZXZlbnRzIGFyZVxuICAgICogdHJ1ZS5cbiAgICAqXG4gICAgKiBAbW9kdWxlIHVpXG4gICAgKiBAY2xhc3MgQ29tcG9uZW50X0hhbmRsZXJcbiAgICAqIEBleHRlbmRzIGdzLkNvbXBvbmVudFxuICAgICogQG1lbWJlcm9mIHVpXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAjIyNcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIEBwcm9wZXJ0eSBtb3VzZUVudGVyZWRcbiAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQG1vdXNlRW50ZXJlZCA9IG5vXG4gICAgICAgIFxuICAgICAgICAjIyMqXG4gICAgICAgICogQHByb3BlcnR5IG1vdXNlTGVhdmVkXG4gICAgICAgICogQHR5cGUgYm9vbGVhblxuICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgIyMjXG4gICAgICAgIEBtb3VzZUxlYXZlZCA9IHllc1xuICAgICBcbiAgICAjIyMqXG4gICAgKiBDaGVja3MgaWYgdGhlIGNvbmRpdGlvbiBpcyA8Yj50cnVlPC9iPiBmb3IgdGhlIHNwZWNpZmllZCBnYW1lIG9iamVjdC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGNoZWNrQ29uZGl0aW9uXG4gICAgKiBAcGFyYW0ge2dzLk9iamVjdF9CYXNlfSBvYmplY3QgVGhlIGdhbWUgb2JqZWN0LlxuICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmRpdGlvbiBUaGUgY29uZGl0aW9uLW9iamVjdC5cbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IElmIDxiPnRydWU8L2I+IHRoZSBjb25kaXRpb24gaXMgdHJ1ZS4gT3RoZXJ3aXNlIDxiPmZhbHNlPC9iPi5cbiAgICAqIEBzdGF0aWNcbiAgICAjIyMgICBcbiAgICBAY2hlY2tDb25kaXRpb246IChvYmplY3QsIGNvbmRpdGlvbikgLT5cbiAgICAgICAgcmVzdWx0ID0gbm9cbiAgICAgICAgXG4gICAgICAgIGlmIGNvbmRpdGlvbi5lcXVhbFRvP1xuICAgICAgICAgICAgcmVzdWx0ID0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUob2JqZWN0LCBjb25kaXRpb24uZmllbGQpID09IHVpLkNvbXBvbmVudF9Gb3JtdWxhSGFuZGxlci5maWVsZFZhbHVlKG9iamVjdCwgY29uZGl0aW9uLmVxdWFsVG8pXG4gICAgICAgIGVsc2UgaWYgY29uZGl0aW9uLmdyZWF0ZXJUaGFuP1xuICAgICAgICAgICAgcmVzdWx0ID0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUob2JqZWN0LCBjb25kaXRpb24uZmllbGQpID4gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUob2JqZWN0LCBjb25kaXRpb24uZ3JlYXRlclRoYW4pXG4gICAgICAgIGVsc2UgaWYgY29uZGl0aW9uLmxlc3NUaGFuP1xuICAgICAgICAgICAgcmVzdWx0ID0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUob2JqZWN0LCBjb25kaXRpb24uZmllbGQpIDwgdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUob2JqZWN0LCBjb25kaXRpb24ubGVzc1RoYW4pXG4gICAgICAgIGVsc2UgaWYgY29uZGl0aW9uLm5vdEVxdWFsVG8/XG4gICAgICAgICAgICByZXN1bHQgPSB1aS5Db21wb25lbnRfRm9ybXVsYUhhbmRsZXIuZmllbGRWYWx1ZShvYmplY3QsIGNvbmRpdGlvbi5maWVsZCkgIT0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUob2JqZWN0LCBjb25kaXRpb24ubm90RXF1YWxUbylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgXG4gICAgIyMjKlxuICAgICogQ2hlY2tzIGlmIHRoZSBzcGVjaWZpZWQgY29uZGl0aW9uIGlzIDxiPnRydWU8L2I+LlxuICAgICpcbiAgICAqIEBtZXRob2QgY2hlY2tDb25kaXRpb25cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25kaXRpb24gVGhlIGNvbmRpdGlvbi1vYmplY3QuXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSBJZiA8Yj50cnVlPC9iPiB0aGUgY29uZGl0aW9uIGlzIHRydWUuIE90aGVyd2lzZSA8Yj5mYWxzZTwvYj4uXG4gICAgIyMjICAgICBcbiAgICBjaGVja0NvbmRpdGlvbjogKGNvbmRpdGlvbikgLT4gdWkuQ29tcG9uZW50X0hhbmRsZXIuY2hlY2tDb25kaXRpb24oQG9iamVjdCwgY29uZGl0aW9uKVxuICAgIFxuICAgICMjIypcbiAgICAqIENoZWNrcyBpZiB0aGUgc3BlY2lmaWVkIGNvbmRpdGlvbnMgYXJlIDxiPnRydWU8L2I+LlxuICAgICpcbiAgICAqIEBtZXRob2QgY2hlY2tDb25kaXRpb25zXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSBjb25kaXRpb25zIEFuIGFycmF5IG9mIGNvbmRpdGlvbi1vYmplY3RzLlxuICAgICogQHJldHVybiB7Ym9vbGVhbn0gSWYgPGI+dHJ1ZTwvYj4gYWxsIGNvbmRpdGlvbnMgYXJlIHRydWUuIE90aGVyd2lzZSA8Yj5mYWxzZTwvYj4uXG4gICAgIyMjXG4gICAgY2hlY2tDb25kaXRpb25zOiAoY29uZGl0aW9ucykgLT5cbiAgICAgICAgcmVzdWx0ID0geWVzXG4gICAgICAgIGZvciBjb25kaXRpb24gaW4gY29uZGl0aW9uc1xuICAgICAgICAgICAgaWYgbm90IEBjaGVja0NvbmRpdGlvbihjb25kaXRpb24pXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIENoZWNrcyBpZiB0aGUgc3BlY2lmaWVkIGV2ZW50IGlzIHRydWUuXG4gICAgKlxuICAgICogQG1ldGhvZCBjaGVja0V2ZW50XG4gICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgVGhlIGV2ZW50IHRvIGNoZWNrIGZvci5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbYmluZGluZz1udWxsXSBiaW5kaW5nIEFuIG9wdGlvbmFsIGJpbmRpbmctb2JqZWN0IG5lY2Vzc2FyeSBmb3Igc29tZSBldmVudC10eXBlcy5cbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IElmIDxiPnRydWU8L2I+IHRoZSBldmVudCBpcyB0cnVlLiBPdGhlcndpc2UgPGI+ZmFsc2U8L2I+LlxuICAgICMjIyAgXG4gICAgY2hlY2tFdmVudDogKGV2ZW50LCBiaW5kaW5nKSAtPlxuICAgICAgICByZXN1bHQgPSBub1xuICAgICAgICBcbiAgICAgICAgI2lmIGV2ZW50ID09IFwib25Jbml0aWFsaXplXCIgYW5kICFTY2VuZU1hbmFnZXIuc2NlbmUucHJlcGFyaW5nXG4gICAgICAgICMgICAgcmVzdWx0ID0gIUBpbml0aWFsaXplRXZlbnRFbWl0dGVkXG4gICAgICAgICMgICAgQGluaXRpYWxpemVFdmVudEVtaXR0ZWQgPSB5ZXNcbiAgICAgICAgaWYgZXZlbnQgPT0gXCJvbkFsd2F5c1wiXG4gICAgICAgICAgICByZXN1bHQgPSB5ZXNcbiAgICAgICAgZWxzZSBpZiBldmVudCA9PSBcIm9uQWN0aW9uXCJcbiAgICAgICAgICAgIHJlc3VsdCA9IEBvYmplY3QuY2FuUmVjZWl2ZUlucHV0KCkgJiYgSW5wdXQuTW91c2UuYnV0dG9uc1tJbnB1dC5Nb3VzZS5MRUZUXSA9PSAyIGFuZCBAb2JqZWN0LmRzdFJlY3QuY29udGFpbnMoSW5wdXQuTW91c2UueCAtIEBvYmplY3Qub3JpZ2luLngsIElucHV0Lk1vdXNlLnkgLSBAb2JqZWN0Lm9yaWdpbi55KSBcbiAgICAgICAgZWxzZSBpZiBldmVudCA9PSBcIm9uQ2FuY2VsXCJcbiAgICAgICAgICAgIHJlc3VsdCA9IEBvYmplY3QuY2FuUmVjZWl2ZUlucHV0KCkgJiYgSW5wdXQuTW91c2UuYnV0dG9uc1tJbnB1dC5Nb3VzZS5SSUdIVF0gPT0gMiBhbmQgQG9iamVjdC5kc3RSZWN0LmNvbnRhaW5zKElucHV0Lk1vdXNlLnggLSBAb2JqZWN0Lm9yaWdpbi54LCBJbnB1dC5Nb3VzZS55IC0gQG9iamVjdC5vcmlnaW4ueSkgICAgIFxuICAgICAgICBlbHNlIGlmIGV2ZW50ID09IFwib25BY2NlcHRcIlxuICAgICAgICAgICAgcmVzdWx0ID0gQG9iamVjdC5jYW5SZWNlaXZlSW5wdXQoKSAmJiBJbnB1dC5yZWxlYXNlKElucHV0LktFWV9SRVRVUk4pIG9yIChJbnB1dC5Nb3VzZS5idXR0b25zW0lucHV0Lk1vdXNlLkxFRlRdID09IDIgYW5kIEBvYmplY3QuZHN0UmVjdC5jb250YWlucyhJbnB1dC5Nb3VzZS54IC0gQG9iamVjdC5vcmlnaW4ueCwgSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnkpKSAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGV2ZW50ID09IFwib25EcmFnRW50ZXJcIiAgICBcbiAgICAgICAgICAgIGVudGVyZWQgPSBAb2JqZWN0LmNhblJlY2VpdmVJbnB1dCgpICYmIEBvYmplY3QuZHJhZ0Ryb3A/LmlzRHJhZ2dpbmcgYW5kIEBvYmplY3QuZHN0UmVjdC5jb250YWlucyhJbnB1dC5Nb3VzZS54IC0gQG9iamVjdC5vcmlnaW4ueCwgSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnkpXG4gICAgICAgICAgICByZXN1bHQgPSAhQG1vdXNlRW50ZXJlZCBhbmQgZW50ZXJlZFxuICAgICAgICAgICAgQG1vdXNlRW50ZXJlZCA9IGVudGVyZWRcbiAgICAgICAgZWxzZSBpZiBldmVudCA9PSBcIm9uRHJhZ0xlYXZlXCJcbiAgICAgICAgICAgIGxlYXZlZCA9IEBvYmplY3QuY2FuUmVjZWl2ZUlucHV0KCkgJiYgQG9iamVjdC5kcmFnRHJvcD8uaXNEcmFnZ2luZyBhbmQgIUBvYmplY3QuZHN0UmVjdC5jb250YWlucyhJbnB1dC5Nb3VzZS54IC0gQG9iamVjdC5vcmlnaW4ueCwgSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnkpXG4gICAgICAgICAgICByZXN1bHQgPSAhQG1vdXNlTGVhdmVkIGFuZCBsZWF2ZWRcbiAgICAgICAgICAgIEBtb3VzZUxlYXZlZCA9IGxlYXZlZFxuICAgICAgICBlbHNlIGlmIGV2ZW50ID09IFwib25Nb3VzZUVudGVyXCJcbiAgICAgICAgICAgIGVudGVyZWQgPSBAb2JqZWN0LmNhblJlY2VpdmVJbnB1dCgpICYmIEBvYmplY3QuZHN0UmVjdC5jb250YWlucyhJbnB1dC5Nb3VzZS54IC0gQG9iamVjdC5vcmlnaW4ueCwgSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnkpXG4gICAgICAgICAgICByZXN1bHQgPSAhQG1vdXNlRW50ZXJlZCBhbmQgZW50ZXJlZFxuICAgICAgICAgICAgQG1vdXNlRW50ZXJlZCA9IGVudGVyZWRcbiAgICAgICAgZWxzZSBpZiBldmVudCA9PSBcIm9uTW91c2VMZWF2ZVwiXG4gICAgICAgICAgICBsZWF2ZWQgPSBAb2JqZWN0LmNhblJlY2VpdmVJbnB1dCgpICYmICFAb2JqZWN0LmRzdFJlY3QuY29udGFpbnMoSW5wdXQuTW91c2UueCAtIEBvYmplY3Qub3JpZ2luLngsIElucHV0Lk1vdXNlLnkgLSBAb2JqZWN0Lm9yaWdpbi55KVxuICAgICAgICAgICAgcmVzdWx0ID0gIUBtb3VzZUxlYXZlZCBhbmQgbGVhdmVkXG4gICAgICAgICAgICBAbW91c2VMZWF2ZWQgPSBsZWF2ZWRcbiAgICAgICAgZWxzZSBpZiBldmVudCA9PSBcIm9uTW91c2VIb3ZlclwiXG4gICAgICAgICAgICByZXN1bHQgPSBAb2JqZWN0LmNhblJlY2VpdmVJbnB1dCgpICYmIEBvYmplY3QuZHN0UmVjdC5jb250YWlucyhJbnB1dC5Nb3VzZS54IC0gQG9iamVjdC5vcmlnaW4ueCwgSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnkpXG4gICAgICAgIGVsc2UgaWYgZXZlbnQgPT0gXCJvbk1vdXNlQ2xpY2tcIlxuICAgICAgICAgICAgcmVzdWx0ID0gQG9iamVjdC5jYW5SZWNlaXZlSW5wdXQoKSAmJiBJbnB1dC5Nb3VzZS5idXR0b25zW0lucHV0Lk1vdXNlLkxFRlRdID09IDIgYW5kIEBvYmplY3QuZHN0UmVjdC5jb250YWlucyhJbnB1dC5Nb3VzZS54IC0gQG9iamVjdC5vcmlnaW4ueCwgSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnkpXG4gICAgICAgIGVsc2UgaWYgZXZlbnQub25DaGFuZ2U/XG4gICAgICAgICAgICB2YWx1ZSA9IEByZXNvbHZlRmllbGRQYXRoKGV2ZW50Lm9uQ2hhbmdlKVxuICAgICAgICAgICAgaWYgdmFsdWU/IFxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuZ2V0KEBvYmplY3QpXG4gICAgICAgICAgICAgICAgaWYgYmluZGluZ1tldmVudC5vbkNoYW5nZV0gIT0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ1tldmVudC5vbkNoYW5nZV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB5ZXNcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5ZXNcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgIFxuICAgICMjIypcbiAgICAqIENoZWNrcyBpZiBhbGwgZXZlbnRzIGFuZCBjb25kaXRpb25zIGRlZmluZWQgZm9yIHRoZSBoYW5kbGVyXG4gICAgKiBhcmUgdHJ1ZS4gSWYgdGhhdCBjaGVjayByZXR1cm5zIDxiPnRydWU8L2I+IHRoZSBoYW5kbGVyIG11c3QgYmVcbiAgICAqIGV4ZWN1dGVkLlxuICAgICpcbiAgICAqIEBtZXRob2QgY2hlY2tPYmplY3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGdhbWUgb2JqZWN0IHRvIGNoZWNrLlxuICAgICogQHJldHVybiB7Ym9vbGVhbn0gSWYgPGI+dHJ1ZTwvYj4gdGhlIGhhbmRsZXIgbXVzdCBiZSBleGVjdXRlZC4gT3RoZXJ3aXNlIDxiPmZhbHNlPC9iPi5cbiAgICAjIyMgICAgIFxuICAgIGNoZWNrT2JqZWN0OiAob2JqZWN0KSAtPlxuICAgICAgICBleGVjdXRlID0geWVzXG4gICAgICAgICAgICBcbiAgICAgICAgaWYgb2JqZWN0LmV2ZW50P1xuICAgICAgICAgICAgb2JqZWN0LmV2ZW50cyA9IFtvYmplY3QuZXZlbnRdXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LmV2ZW50XG4gICAgICAgIGlmIG9iamVjdC5jb25kaXRpb24/XG4gICAgICAgICAgICBvYmplY3QuY29uZGl0aW9ucyA9IFtvYmplY3QuY29uZGl0aW9uXVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC5jb25kaXRpb25cbiAgICAgICAgaWYgb2JqZWN0LmV2ZW50cz9cbiAgICAgICAgICAgIGZvciBldmVudCBpbiBvYmplY3QuZXZlbnRzXG4gICAgICAgICAgICAgICAgZXhlY3V0ZSA9IEBjaGVja0V2ZW50KGV2ZW50LCBvYmplY3QpXG4gICAgICAgICAgICAgICAgaWYgZXhlY3V0ZSB0aGVuIGJyZWFrXG4gICAgICAgIGlmIG9iamVjdC5jb25kaXRpb25zPyBhbmQgZXhlY3V0ZVxuICAgICAgICAgICAgZXhlY3V0ZSA9IEBjaGVja0NvbmRpdGlvbnMob2JqZWN0LmNvbmRpdGlvbnMpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXhlY3V0ZVxuXG51aS5Db21wb25lbnRfSGFuZGxlciA9IENvbXBvbmVudF9IYW5kbGVyIl19
//# sourceURL=Component_Handler_110.js