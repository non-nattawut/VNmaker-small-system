var Component_PanelBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component_PanelBehavior = (function(superClass) {
  extend(Component_PanelBehavior, superClass);


  /**
  * Called if this object instance is restored from a data-bundle. It can be used
  * re-assign event-handler, anonymous functions, etc.
  * 
  * @method onDataBundleRestore.
  * @param Object data - The data-bundle
  * @param gs.ObjectCodecContext context - The codec-context.
   */

  Component_PanelBehavior.prototype.onDataBundleRestore = function(data, context) {
    return this.setupEventHandlers();
  };


  /**
  * A panel-component gives a game-object the same capabilities like
  * a visual object but has no graphical representation. So a panel has
  * a position and a size.<br>
  * <br>
  * It can be used to make invisible hotspot-areas or modal-blocking areas for
  * example.
  *
  * @module gs
  * @class Component_PanelBehavior
  * @extends gs.Component_Visual
  * @memberof gs
  * @constructor
   */

  function Component_PanelBehavior() {}


  /**
  * Adds event-handlers for mouse/touch events
  *
  * @method setupEventHandlers
   */

  Component_PanelBehavior.prototype.setupEventHandlers = function() {
    if (this.object.modal) {
      gs.GlobalEventManager.on("mouseUp", ((function(_this) {
        return function(e) {
          if (!_this.object.canReceiveInput()) {
            return;
          }
          if (_this.object.modal) {
            return e.breakChain = true;
          }
        };
      })(this)), null, this.object);
      gs.GlobalEventManager.on("mouseDown", ((function(_this) {
        return function(e) {
          if (!_this.object.canReceiveInput()) {
            return;
          }
          if (_this.object.modal) {
            return e.breakChain = true;
          }
        };
      })(this)), null, this.object);
      return gs.GlobalEventManager.on("mouseMoved", ((function(_this) {
        return function(e) {
          if (!_this.object.canReceiveInput()) {
            return;
          }
          if (_this.object.modal) {
            return e.breakChain = true;
          }
        };
      })(this)), null, this.object);
    }
  };


  /**
  * Initializes the panel component.
  *
  * @method setup
   */

  Component_PanelBehavior.prototype.setup = function() {
    return this.setupEventHandlers();
  };


  /**
  * Disposes the component.
  *
  * @method dispose
   */

  Component_PanelBehavior.prototype.dispose = function() {
    Component_PanelBehavior.__super__.dispose.apply(this, arguments);
    gs.GlobalEventManager.offByOwner("mouseUp", this.object);
    gs.GlobalEventManager.offByOwner("mouseDown", this.object);
    return gs.GlobalEventManager.offByOwner("mouseMoved", this.object);
  };

  return Component_PanelBehavior;

})(gs.Component_Visual);

gs.Component_PanelBehavior = Component_PanelBehavior;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUEsdUJBQUE7RUFBQTs7O0FBQU07Ozs7QUFDRjs7Ozs7Ozs7O29DQVFBLG1CQUFBLEdBQXFCLFNBQUMsSUFBRCxFQUFPLE9BQVA7V0FDakIsSUFBQyxDQUFBLGtCQUFELENBQUE7RUFEaUI7OztBQUdyQjs7Ozs7Ozs7Ozs7Ozs7O0VBY2EsaUNBQUEsR0FBQTs7O0FBR2I7Ozs7OztvQ0FLQSxrQkFBQSxHQUFvQixTQUFBO0lBQ2hCLElBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFYO01BQ0ksRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQXRCLENBQXlCLFNBQXpCLEVBQW9DLENBQUMsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLENBQUQ7VUFDakMsSUFBVSxDQUFDLEtBQUMsQ0FBQSxNQUFNLENBQUMsZUFBUixDQUFBLENBQVg7QUFBQSxtQkFBQTs7VUFDQSxJQUFHLEtBQUMsQ0FBQSxNQUFNLENBQUMsS0FBWDttQkFBc0IsQ0FBQyxDQUFDLFVBQUYsR0FBZSxLQUFyQzs7UUFGaUM7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUQsQ0FBcEMsRUFHRyxJQUhILEVBR1MsSUFBQyxDQUFBLE1BSFY7TUFJQSxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBdEIsQ0FBeUIsV0FBekIsRUFBc0MsQ0FBQyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsQ0FBRDtVQUNuQyxJQUFVLENBQUMsS0FBQyxDQUFBLE1BQU0sQ0FBQyxlQUFSLENBQUEsQ0FBWDtBQUFBLG1CQUFBOztVQUNBLElBQUcsS0FBQyxDQUFBLE1BQU0sQ0FBQyxLQUFYO21CQUFzQixDQUFDLENBQUMsVUFBRixHQUFlLEtBQXJDOztRQUZtQztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBRCxDQUF0QyxFQUdHLElBSEgsRUFHUyxJQUFDLENBQUEsTUFIVjthQUlBLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUF0QixDQUF5QixZQUF6QixFQUF1QyxDQUFDLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxDQUFEO1VBQ3BDLElBQVUsQ0FBQyxLQUFDLENBQUEsTUFBTSxDQUFDLGVBQVIsQ0FBQSxDQUFYO0FBQUEsbUJBQUE7O1VBQ0EsSUFBRyxLQUFDLENBQUEsTUFBTSxDQUFDLEtBQVg7bUJBQXNCLENBQUMsQ0FBQyxVQUFGLEdBQWUsS0FBckM7O1FBRm9DO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFELENBQXZDLEVBR0csSUFISCxFQUdTLElBQUMsQ0FBQSxNQUhWLEVBVEo7O0VBRGdCOzs7QUFlcEI7Ozs7OztvQ0FLQSxLQUFBLEdBQU8sU0FBQTtXQUNILElBQUMsQ0FBQSxrQkFBRCxDQUFBO0VBREc7OztBQUdQOzs7Ozs7b0NBS0EsT0FBQSxHQUFTLFNBQUE7SUFDTCxzREFBQSxTQUFBO0lBRUEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFVBQXRCLENBQWlDLFNBQWpDLEVBQTRDLElBQUMsQ0FBQSxNQUE3QztJQUNBLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxVQUF0QixDQUFpQyxXQUFqQyxFQUE4QyxJQUFDLENBQUEsTUFBL0M7V0FDQSxFQUFFLENBQUMsa0JBQWtCLENBQUMsVUFBdEIsQ0FBaUMsWUFBakMsRUFBK0MsSUFBQyxDQUFBLE1BQWhEO0VBTEs7Ozs7R0E5RHlCLEVBQUUsQ0FBQzs7QUFxRXpDLEVBQUUsQ0FBQyx1QkFBSCxHQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuI1xuIyAgIFNjcmlwdDogQ29tcG9uZW50X1BhbmVsQmVoYXZpb3JcbiNcbiMgICAkJENPUFlSSUdIVCQkXG4jXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNsYXNzIENvbXBvbmVudF9QYW5lbEJlaGF2aW9yIGV4dGVuZHMgZ3MuQ29tcG9uZW50X1Zpc3VhbFxuICAgICMjIypcbiAgICAqIENhbGxlZCBpZiB0aGlzIG9iamVjdCBpbnN0YW5jZSBpcyByZXN0b3JlZCBmcm9tIGEgZGF0YS1idW5kbGUuIEl0IGNhbiBiZSB1c2VkXG4gICAgKiByZS1hc3NpZ24gZXZlbnQtaGFuZGxlciwgYW5vbnltb3VzIGZ1bmN0aW9ucywgZXRjLlxuICAgICogXG4gICAgKiBAbWV0aG9kIG9uRGF0YUJ1bmRsZVJlc3RvcmUuXG4gICAgKiBAcGFyYW0gT2JqZWN0IGRhdGEgLSBUaGUgZGF0YS1idW5kbGVcbiAgICAqIEBwYXJhbSBncy5PYmplY3RDb2RlY0NvbnRleHQgY29udGV4dCAtIFRoZSBjb2RlYy1jb250ZXh0LlxuICAgICMjI1xuICAgIG9uRGF0YUJ1bmRsZVJlc3RvcmU6IChkYXRhLCBjb250ZXh0KSAtPlxuICAgICAgICBAc2V0dXBFdmVudEhhbmRsZXJzKClcbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogQSBwYW5lbC1jb21wb25lbnQgZ2l2ZXMgYSBnYW1lLW9iamVjdCB0aGUgc2FtZSBjYXBhYmlsaXRpZXMgbGlrZVxuICAgICogYSB2aXN1YWwgb2JqZWN0IGJ1dCBoYXMgbm8gZ3JhcGhpY2FsIHJlcHJlc2VudGF0aW9uLiBTbyBhIHBhbmVsIGhhc1xuICAgICogYSBwb3NpdGlvbiBhbmQgYSBzaXplLjxicj5cbiAgICAqIDxicj5cbiAgICAqIEl0IGNhbiBiZSB1c2VkIHRvIG1ha2UgaW52aXNpYmxlIGhvdHNwb3QtYXJlYXMgb3IgbW9kYWwtYmxvY2tpbmcgYXJlYXMgZm9yXG4gICAgKiBleGFtcGxlLlxuICAgICpcbiAgICAqIEBtb2R1bGUgZ3NcbiAgICAqIEBjbGFzcyBDb21wb25lbnRfUGFuZWxCZWhhdmlvclxuICAgICogQGV4dGVuZHMgZ3MuQ29tcG9uZW50X1Zpc3VhbFxuICAgICogQG1lbWJlcm9mIGdzXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAjIyNcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIEFkZHMgZXZlbnQtaGFuZGxlcnMgZm9yIG1vdXNlL3RvdWNoIGV2ZW50c1xuICAgICpcbiAgICAqIEBtZXRob2Qgc2V0dXBFdmVudEhhbmRsZXJzXG4gICAgIyMjIFxuICAgIHNldHVwRXZlbnRIYW5kbGVyczogLT5cbiAgICAgICAgaWYgQG9iamVjdC5tb2RhbFxuICAgICAgICAgICAgZ3MuR2xvYmFsRXZlbnRNYW5hZ2VyLm9uIFwibW91c2VVcFwiLCAoKGUpID0+IFxuICAgICAgICAgICAgICAgIHJldHVybiBpZiAhQG9iamVjdC5jYW5SZWNlaXZlSW5wdXQoKVxuICAgICAgICAgICAgICAgIGlmIEBvYmplY3QubW9kYWwgdGhlbiBlLmJyZWFrQ2hhaW4gPSB5ZXNcbiAgICAgICAgICAgICksIG51bGwsIEBvYmplY3RcbiAgICAgICAgICAgIGdzLkdsb2JhbEV2ZW50TWFuYWdlci5vbiBcIm1vdXNlRG93blwiLCAoKGUpID0+IFxuICAgICAgICAgICAgICAgIHJldHVybiBpZiAhQG9iamVjdC5jYW5SZWNlaXZlSW5wdXQoKVxuICAgICAgICAgICAgICAgIGlmIEBvYmplY3QubW9kYWwgdGhlbiBlLmJyZWFrQ2hhaW4gPSB5ZXNcbiAgICAgICAgICAgICksIG51bGwsIEBvYmplY3RcbiAgICAgICAgICAgIGdzLkdsb2JhbEV2ZW50TWFuYWdlci5vbiBcIm1vdXNlTW92ZWRcIiwgKChlKSA9PlxuICAgICAgICAgICAgICAgIHJldHVybiBpZiAhQG9iamVjdC5jYW5SZWNlaXZlSW5wdXQoKVxuICAgICAgICAgICAgICAgIGlmIEBvYmplY3QubW9kYWwgdGhlbiBlLmJyZWFrQ2hhaW4gPSB5ZXNcbiAgICAgICAgICAgICksIG51bGwsIEBvYmplY3RcbiAgICAgICAgICAgIFxuICAgICMjIypcbiAgICAqIEluaXRpYWxpemVzIHRoZSBwYW5lbCBjb21wb25lbnQuXG4gICAgKlxuICAgICogQG1ldGhvZCBzZXR1cFxuICAgICMjI1xuICAgIHNldHVwOiAtPlxuICAgICAgICBAc2V0dXBFdmVudEhhbmRsZXJzKClcbiAgICAgXG4gICAgIyMjKlxuICAgICogRGlzcG9zZXMgdGhlIGNvbXBvbmVudC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGRpc3Bvc2VcbiAgICAjIyNcbiAgICBkaXNwb3NlOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBcbiAgICAgICAgZ3MuR2xvYmFsRXZlbnRNYW5hZ2VyLm9mZkJ5T3duZXIoXCJtb3VzZVVwXCIsIEBvYmplY3QpXG4gICAgICAgIGdzLkdsb2JhbEV2ZW50TWFuYWdlci5vZmZCeU93bmVyKFwibW91c2VEb3duXCIsIEBvYmplY3QpXG4gICAgICAgIGdzLkdsb2JhbEV2ZW50TWFuYWdlci5vZmZCeU93bmVyKFwibW91c2VNb3ZlZFwiLCBAb2JqZWN0KVxuICAgICAgICBcbmdzLkNvbXBvbmVudF9QYW5lbEJlaGF2aW9yID0gQ29tcG9uZW50X1BhbmVsQmVoYXZpb3IiXX0=
//# sourceURL=Component_PanelBehavior_169.js