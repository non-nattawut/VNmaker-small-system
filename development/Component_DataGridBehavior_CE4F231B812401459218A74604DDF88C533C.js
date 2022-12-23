var Component_DataGridBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component_DataGridBehavior = (function(superClass) {
  var DataSource, DataWrapper;

  extend(Component_DataGridBehavior, superClass);

  DataWrapper = (function() {
    function DataWrapper(data) {
      this.data = data;
      this.viewData = [true, false, false, true, false];
    }

    return DataWrapper;

  })();

  DataSource = (function() {
    function DataSource(source) {
      var i, k, ref;
      this.source = source || [];
      this.length = this.source.length;
      this.wrappedSource = new Array(this.source.length);
      for (i = k = 0, ref = this.wrappedSource.length; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
        this.wrappedSource[i] = null;
      }
    }

    DataSource.prototype.set = function(source) {
      var i, k, ref, results;
      this.source = source || [];
      this.length = this.source.length;
      this.wrappedSource = new Array(this.source.length);
      results = [];
      for (i = k = 0, ref = this.wrappedSource.length; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
        results.push(this.wrappedSource[i] = null);
      }
      return results;
    };

    DataSource.prototype.itemAt = function(index) {
      var item;
      item = this.wrappedSource[index];
      if (!item) {
        item = new DataWrapper(this.source[index]);
        this.wrappedSource[index] = item;
      }
      return item;
    };

    DataSource.prototype.setItemAt = function(index, data) {
      if (this.wrappedSource[index]) {
        this.wrappedSource[index].data = data;
      }
      return this.source[index] = data;
    };

    return DataSource;

  })();

  Component_DataGridBehavior.accessors("dataSource", {
    set: function(v) {
      if (v !== this.dataSource_.source) {
        this.dataSource_.set(v);
        return this.resize();
      }
    },
    get: function() {
      return this.dataSource_;
    }
  });


  /**
  * Called if this object instance is restored from a data-bundle. It can be used
  * re-assign event-handler, anonymous functions, etc.
  * 
  * @method onDataBundleRestore.
  * @param Object data - The data-bundle
  * @param gs.ObjectCodecContext context - The codec-context.
   */

  Component_DataGridBehavior.prototype.onDataBundleRestore = function(data, context) {
    return this.setupEventHandlers();
  };


  /**
  * The data-grid behavior component defines the logic for a data-grid. A data-grid
  * allows to display items from a associated data-source using a specified
  * item-template. Unlike a stack-layout, a data-grid is optimized to display even high amounts of items but they all
  * need to use the same item-template with same size.
  *
  * @module ui
  * @class Component_DataGridBehavior
  * @extends gs.Component_Visual
  * @memberof ui
  * @constructor
  * @params {Object} params - The params-object containing the data-grid settings.
   */

  function Component_DataGridBehavior(params) {
    Component_DataGridBehavior.__super__.constructor.call(this);
    this.params = params || {};

    /**
    * The item-template descriptor used for each item of the data-grid.
    * @property template
    * @type Object
     */
    this.template = this.params.template;

    /**
    * The data-source used for the data-grid. Can be an array or a formula.
    * @property dataSource
    * @type Object[]|string
     */
    this.dataSource_ = null;

    /**
    * Stores the item-objects needed for rendering. They are created from the item-template.
    * @property items
    * @protected
    * @type gs.Object_Base[]
     */
    this.items = this.params.items || [];

    /**
    * Numbers of columns.
    * @property columns
    * @type number
     */
    this.columns = this.params.columns || 1;

    /**
    * Indicates if the data-grid is initialized and ready for rendering.
    * @property initialized
    * @protected
    * @type boolean
     */
    this.initialized = false;

    /**
    * Defines a horizontal and vertical spacing between items.
    * @property spacing
    * @default [0, 10]        
    * @type number[]
     */
    this.spacing = this.params.spacing || [0, 0];
  }


  /**
  * Adds event-handlers for mouse/touch events
  *
  * @method setupEventHandlers
   */

  Component_DataGridBehavior.prototype.setupEventHandlers = function() {
    return gs.GlobalEventManager.on("mouseWheel", (function(_this) {
      return function() {
        var r;
        if (!_this.object.canReceiveInput()) {
          return;
        }
        r = _this.object.dstRect;
        if (Rect.contains(r.x, r.y, r.width, r.height, Input.Mouse.x - _this.object.origin.x, Input.Mouse.y - _this.object.origin.y)) {
          return _this.updateScroll();
        }
      };
    })(this));
  };


  /**
  * Sets up the data-grid.
  *
  * @method setup
   */

  Component_DataGridBehavior.prototype.setup = function() {
    var item;
    if (this.object.dstRect.width === 1) {
      return;
    }
    this.initialized = true;
    if (!this.template.size) {
      item = ui.UIManager.createControlFromDescriptor(this.template.descriptor, this.object);
      item.index = 0;
      item.update();
      this.template.size = [item.dstRect.width, item.dstRect.height];
      item.dispose();
    }
    if (this.params.dataSource.exec) {
      this.dataSource_ = new DataSource(ui.Component_FormulaHandler.fieldValue(this.object, this.params.dataSource) || []);
    } else {
      this.dataSource_ = new DataSource(this.params.dataSource || []);
    }
    this.resize();
    this.setupEventHandlers();
    Component_DataGridBehavior.__super__.setup.call(this);
    return this.object.scrollableHeight = Math.max(0, this.object.contentHeight - this.object.dstRect.height);
  };


  /**
  * Scrolls to the end.
  *
  * @method scrollToEnd
   */

  Component_DataGridBehavior.prototype.scrollToEnd = function() {
    return this.object.scrollOffsetY = this.object.scrollableHeight;
  };


  /**
  * Updates scrolling.
  *
  * @method updateScroll
   */

  Component_DataGridBehavior.prototype.updateScroll = function() {
    this.object.scrollableHeight = Math.max(0, this.object.contentHeight - this.object.dstRect.height);
    if (Input.Mouse.wheel <= -1) {
      this.object.scrollOffsetY = Math.max(this.object.scrollOffsetY - Input.Mouse.wheelSpeed * 0.1, 0);
    }
    if (Input.Mouse.wheel >= 1) {
      this.object.scrollOffsetY = Math.min(this.object.scrollOffsetY - Input.Mouse.wheelSpeed * 0.1, this.object.scrollableHeight);
    }
    return this.object.scrollOffsetY = Math.max(Math.min(this.object.scrollOffsetY, this.object.scrollableHeight), 0);
  };


  /**
  * Resizes the data-grid and creates the necessary display objects from the data-grid template.
  *
  * @method resize
   */

  Component_DataGridBehavior.prototype.resize = function() {
    var height, index, item, itemsX, itemsY, k, l, len, m, ref, ref1, ref2, totalItemsY, width, x, y;
    width = this.object.dstRect.width;
    height = this.object.dstRect.height;
    itemsX = this.columns || 1;
    itemsY = Math.ceil((height - this.spacing[1]) / (this.template.size[1] + this.spacing[1])) + this.columns + 1;
    totalItemsY = Math.ceil(this.dataSource.length / this.columns);
    ref = this.items;
    for (k = 0, len = ref.length; k < len; k++) {
      item = ref[k];
      if (item != null) {
        item.dispose();
      }
    }
    this.items = [];
    for (y = l = 0, ref1 = itemsY; 0 <= ref1 ? l < ref1 : l > ref1; y = 0 <= ref1 ? ++l : --l) {
      for (x = m = 0, ref2 = itemsX; 0 <= ref2 ? m < ref2 : m > ref2; x = 0 <= ref2 ? ++m : --m) {
        index = y * itemsX + x;
        if (index < this.dataSource.length) {
          item = ui.UIManager.createControlFromDescriptor(this.template.descriptor, this.object);
          item.data[0] = this.dataSource.itemAt(index).data;
          item.dstRect.x = this.spacing[0] + x * (this.template.size[0] + this.spacing[0]);
          item.dstRect.y = this.spacing[1] + y * (this.template.size[1] + this.spacing[1]);
          item.dstRect.width = this.template.size[0];
          item.dstRect.height = this.template.size[1];
          item.index = index;
          item.ui.viewData = this.dataSource.itemAt(index).viewData;
          this.items[item.index] = item;
          this.object.addObject(item);
        }
      }
    }
    this.object.scrollableHeight = this.spacing[1] + totalItemsY * (this.template.size[1] + this.spacing[1]) - height;
    this.object.scrollOffsetY = 0;
    return this.object.contentHeight = this.spacing[1] + totalItemsY * (this.template.size[1] + this.spacing[1]);
  };

  Component_DataGridBehavior.prototype.itemAtIndex = function(index) {
    return this.items.first(function(item) {
      return item.index === index;
    });
  };

  Component_DataGridBehavior.prototype.indexForItem = function(item) {
    return item.index;
  };


  /**
  * Updates the data-grid.
  *
  * @method update
   */

  Component_DataGridBehavior.prototype.update = function() {
    var column, i, item, itemIndex, itemsY, j, k, offset, ref, ref1, results, row, scrollOffset;
    Component_DataGridBehavior.__super__.update.call(this);
    if (!this.initialized) {
      this.setup();
    }
    scrollOffset = this.object.scrollOffsetY;
    offset = Math.floor(scrollOffset / (this.template.size[1] + this.spacing[1])) * this.columns;
    i = offset;
    itemIndex = 0;
    itemsY = Math.ceil((this.object.dstRect.height - this.spacing[1]) / (this.template.size[1] + this.spacing[1])) * this.columns + this.columns + 1;
    while (i < Math.min(offset + itemsY, this.dataSource.length)) {
      row = Math.floor(i / this.columns);
      column = i % this.columns;
      item = this.items[itemIndex];
      if (item) {
        item.data[0] = this.dataSource.itemAt(i).data;
        if (this.object.clipRect) {
          item.clipRect = this.object.clipRect;
        }
        item.index = i;
        item.ui.viewData = this.dataSource.itemAt(i).viewData;
        item.dstRect.x = this.spacing[0] + column * (this.template.size[0] + this.spacing[0]);
        item.dstRect.y = this.spacing[1] + (row - (offset / this.columns)) * (this.template.size[1] + this.spacing[1]) + (-scrollOffset % (this.template.size[1] + this.spacing[1]));
        item.visible = true;
        item.update();
        item.update();
        itemIndex++;
      }
      i++;
    }
    results = [];
    for (j = k = ref = itemIndex, ref1 = this.items.length; ref <= ref1 ? k < ref1 : k > ref1; j = ref <= ref1 ? ++k : --k) {
      if (this.items[j]) {
        this.items[j].visible = false;
        results.push(this.items[j].update());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return Component_DataGridBehavior;

})(gs.Component_Visual);

ui.Component_DataGridBehavior = Component_DataGridBehavior;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUEsMEJBQUE7RUFBQTs7O0FBQU07QUFDRixNQUFBOzs7O0VBQU07SUFDVyxxQkFBQyxJQUFEO01BQ1QsSUFBQyxDQUFBLElBQUQsR0FBUTtNQUNSLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FBQyxJQUFELEVBQU0sS0FBTixFQUFVLEtBQVYsRUFBYyxJQUFkLEVBQW1CLEtBQW5CO0lBRkg7Ozs7OztFQUlYO0lBQ1csb0JBQUMsTUFBRDtBQUNULFVBQUE7TUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQUEsSUFBVTtNQUNwQixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxNQUFNLENBQUM7TUFDbEIsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxLQUFBLENBQU0sSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFkO0FBQ3JCLFdBQWtDLG9HQUFsQztRQUFBLElBQUMsQ0FBQSxhQUFjLENBQUEsQ0FBQSxDQUFmLEdBQW9CO0FBQXBCO0lBSlM7O3lCQU1iLEdBQUEsR0FBSyxTQUFDLE1BQUQ7QUFDRCxVQUFBO01BQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxNQUFBLElBQVU7TUFDcEIsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsTUFBTSxDQUFDO01BQ2xCLElBQUMsQ0FBQSxhQUFELEdBQXFCLElBQUEsS0FBQSxDQUFNLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBZDtBQUNyQjtXQUFrQyxvR0FBbEM7cUJBQUEsSUFBQyxDQUFBLGFBQWMsQ0FBQSxDQUFBLENBQWYsR0FBb0I7QUFBcEI7O0lBSkM7O3lCQU1MLE1BQUEsR0FBUSxTQUFDLEtBQUQ7QUFDSixVQUFBO01BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxhQUFjLENBQUEsS0FBQTtNQUN0QixJQUFHLENBQUMsSUFBSjtRQUNJLElBQUEsR0FBVyxJQUFBLFdBQUEsQ0FBWSxJQUFDLENBQUEsTUFB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UyxpSEFBVDtNQUNJLElBQUcsSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQVY7UUFDSSxJQUFDLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQVYsR0FBb0I7cUJBQ3BCLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBVixDQUFBLEdBRko7T0FBQSxNQUFBOzZCQUFBOztBQURKOztFQS9CSTs7OztHQWpPNkIsRUFBRSxDQUFDOztBQXVRNUMsRUFBRSxDQUFDLDBCQUFILEdBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jICAgU2NyaXB0OiBDb21wb25lbnRfRGF0YUdyaWRCZWhhdmlvclxuI1xuIyAgICQkQ09QWVJJR0hUJCRcbiNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuY2xhc3MgQ29tcG9uZW50X0RhdGFHcmlkQmVoYXZpb3IgZXh0ZW5kcyBncy5Db21wb25lbnRfVmlzdWFsXG4gICAgY2xhc3MgRGF0YVdyYXBwZXJcbiAgICAgICAgY29uc3RydWN0b3I6IChkYXRhKSAtPlxuICAgICAgICAgICAgQGRhdGEgPSBkYXRhXG4gICAgICAgICAgICBAdmlld0RhdGEgPSBbeWVzLCBubywgbm8sIHllcywgbm9dXG4gICAgXG4gICAgY2xhc3MgRGF0YVNvdXJjZVxuICAgICAgICBjb25zdHJ1Y3RvcjogKHNvdXJjZSkgLT5cbiAgICAgICAgICAgIEBzb3VyY2UgPSBzb3VyY2UgfHwgW11cbiAgICAgICAgICAgIEBsZW5ndGggPSBAc291cmNlLmxlbmd0aFxuICAgICAgICAgICAgQHdyYXBwZWRTb3VyY2UgPSBuZXcgQXJyYXkoQHNvdXJjZS5sZW5ndGgpXG4gICAgICAgICAgICBAd3JhcHBlZFNvdXJjZVtpXSA9IG51bGwgZm9yIGkgaW4gWzAuLkB3cmFwcGVkU291cmNlLmxlbmd0aF1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgc2V0OiAoc291cmNlKSAtPlxuICAgICAgICAgICAgQHNvdXJjZSA9IHNvdXJjZSB8fCBbXVxuICAgICAgICAgICAgQGxlbmd0aCA9IEBzb3VyY2UubGVuZ3RoXG4gICAgICAgICAgICBAd3JhcHBlZFNvdXJjZSA9IG5ldyBBcnJheShAc291cmNlLmxlbmd0aClcbiAgICAgICAgICAgIEB3cmFwcGVkU291cmNlW2ldID0gbnVsbCBmb3IgaSBpbiBbMC4uQHdyYXBwZWRTb3VyY2UubGVuZ3RoXVxuICAgICAgICAgICAgXG4gICAgICAgIGl0ZW1BdDogKGluZGV4KSAtPlxuICAgICAgICAgICAgaXRlbSA9IEB3cmFwcGVkU291cmNlW2luZGV4XVxuICAgICAgICAgICAgaWYgIWl0ZW1cbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IERhdGFXcmFwcGVyKEBzb3VyY2VbaW5kZXhdKVxuICAgICAgICAgICAgICAgIEB3cmFwcGVkU291cmNlW2luZGV4XSA9IGl0ZW1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgXG4gICAgICAgIHNldEl0ZW1BdDooaW5kZXgsIGRhdGEpIC0+XG4gICAgICAgICAgICBpZiBAd3JhcHBlZFNvdXJjZVtpbmRleF1cbiAgICAgICAgICAgICAgICBAd3JhcHBlZFNvdXJjZVtpbmRleF0uZGF0YSA9IGRhdGFcbiAgICAgICAgICAgIEBzb3VyY2VbaW5kZXhdID0gZGF0YVxuICAgICAgICAgICAgXG4gICAgQGFjY2Vzc29ycyBcImRhdGFTb3VyY2VcIiwgXG4gICAgICAgIHNldDogKHYpIC0+XG4gICAgICAgICAgICBpZiB2ICE9IEBkYXRhU291cmNlXy5zb3VyY2VcbiAgICAgICAgICAgICAgICBAZGF0YVNvdXJjZV8uc2V0KHYpXG4gICAgICAgICAgICAgICAgQHJlc2l6ZSgpXG4gICAgICAgIGdldDogLT4gQGRhdGFTb3VyY2VfXG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIENhbGxlZCBpZiB0aGlzIG9iamVjdCBpbnN0YW5jZSBpcyByZXN0b3JlZCBmcm9tIGEgZGF0YS1idW5kbGUuIEl0IGNhbiBiZSB1c2VkXG4gICAgKiByZS1hc3NpZ24gZXZlbnQtaGFuZGxlciwgYW5vbnltb3VzIGZ1bmN0aW9ucywgZXRjLlxuICAgICogXG4gICAgKiBAbWV0aG9kIG9uRGF0YUJ1bmRsZVJlc3RvcmUuXG4gICAgKiBAcGFyYW0gT2JqZWN0IGRhdGEgLSBUaGUgZGF0YS1idW5kbGVcbiAgICAqIEBwYXJhbSBncy5PYmplY3RDb2RlY0NvbnRleHQgY29udGV4dCAtIFRoZSBjb2RlYy1jb250ZXh0LlxuICAgICMjI1xuICAgIG9uRGF0YUJ1bmRsZVJlc3RvcmU6IChkYXRhLCBjb250ZXh0KSAtPlxuICAgICAgICBAc2V0dXBFdmVudEhhbmRsZXJzKClcbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogVGhlIGRhdGEtZ3JpZCBiZWhhdmlvciBjb21wb25lbnQgZGVmaW5lcyB0aGUgbG9naWMgZm9yIGEgZGF0YS1ncmlkLiBBIGRhdGEtZ3JpZFxuICAgICogYWxsb3dzIHRvIGRpc3BsYXkgaXRlbXMgZnJvbSBhIGFzc29jaWF0ZWQgZGF0YS1zb3VyY2UgdXNpbmcgYSBzcGVjaWZpZWRcbiAgICAqIGl0ZW0tdGVtcGxhdGUuIFVubGlrZSBhIHN0YWNrLWxheW91dCwgYSBkYXRhLWdyaWQgaXMgb3B0aW1pemVkIHRvIGRpc3BsYXkgZXZlbiBoaWdoIGFtb3VudHMgb2YgaXRlbXMgYnV0IHRoZXkgYWxsXG4gICAgKiBuZWVkIHRvIHVzZSB0aGUgc2FtZSBpdGVtLXRlbXBsYXRlIHdpdGggc2FtZSBzaXplLlxuICAgICpcbiAgICAqIEBtb2R1bGUgdWlcbiAgICAqIEBjbGFzcyBDb21wb25lbnRfRGF0YUdyaWRCZWhhdmlvclxuICAgICogQGV4dGVuZHMgZ3MuQ29tcG9uZW50X1Zpc3VhbFxuICAgICogQG1lbWJlcm9mIHVpXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBwYXJhbXMge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtcy1vYmplY3QgY29udGFpbmluZyB0aGUgZGF0YS1ncmlkIHNldHRpbmdzLlxuICAgICMjI1xuICAgIGNvbnN0cnVjdG9yOiAocGFyYW1zKSAtPlxuICAgICAgICBzdXBlcigpXG4gICAgICAgIEBwYXJhbXMgPSBwYXJhbXMgfHwge31cbiAgICAgICAgIyMjKlxuICAgICAgICAqIFRoZSBpdGVtLXRlbXBsYXRlIGRlc2NyaXB0b3IgdXNlZCBmb3IgZWFjaCBpdGVtIG9mIHRoZSBkYXRhLWdyaWQuXG4gICAgICAgICogQHByb3BlcnR5IHRlbXBsYXRlXG4gICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICMjI1xuICAgICAgICBAdGVtcGxhdGUgPSBAcGFyYW1zLnRlbXBsYXRlXG4gICAgICAgIFxuICAgICAgICAjIyMqXG4gICAgICAgICogVGhlIGRhdGEtc291cmNlIHVzZWQgZm9yIHRoZSBkYXRhLWdyaWQuIENhbiBiZSBhbiBhcnJheSBvciBhIGZvcm11bGEuXG4gICAgICAgICogQHByb3BlcnR5IGRhdGFTb3VyY2VcbiAgICAgICAgKiBAdHlwZSBPYmplY3RbXXxzdHJpbmdcbiAgICAgICAgIyMjXG4gICAgICAgIEBkYXRhU291cmNlXyA9IG51bGxcbiAgICAgICAgXG4gICAgICAgICMjIypcbiAgICAgICAgKiBTdG9yZXMgdGhlIGl0ZW0tb2JqZWN0cyBuZWVkZWQgZm9yIHJlbmRlcmluZy4gVGhleSBhcmUgY3JlYXRlZCBmcm9tIHRoZSBpdGVtLXRlbXBsYXRlLlxuICAgICAgICAqIEBwcm9wZXJ0eSBpdGVtc1xuICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgKiBAdHlwZSBncy5PYmplY3RfQmFzZVtdXG4gICAgICAgICMjI1xuICAgICAgICBAaXRlbXMgPSBAcGFyYW1zLml0ZW1zIHx8IFtdXG4gICAgICAgIFxuICAgICAgICAjIyMqXG4gICAgICAgICogTnVtYmVycyBvZiBjb2x1bW5zLlxuICAgICAgICAqIEBwcm9wZXJ0eSBjb2x1bW5zXG4gICAgICAgICogQHR5cGUgbnVtYmVyXG4gICAgICAgICMjI1xuICAgICAgICBAY29sdW1ucyA9IEBwYXJhbXMuY29sdW1ucyB8fCAxXG4gICAgICAgIFxuICAgICAgICAjIyMqXG4gICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSBkYXRhLWdyaWQgaXMgaW5pdGlhbGl6ZWQgYW5kIHJlYWR5IGZvciByZW5kZXJpbmcuXG4gICAgICAgICogQHByb3BlcnR5IGluaXRpYWxpemVkXG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgIyMjXG4gICAgICAgIEBpbml0aWFsaXplZCA9IG5vXG4gICAgICAgIFxuICAgICAgICAjIyMqXG4gICAgICAgICogRGVmaW5lcyBhIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNwYWNpbmcgYmV0d2VlbiBpdGVtcy5cbiAgICAgICAgKiBAcHJvcGVydHkgc3BhY2luZ1xuICAgICAgICAqIEBkZWZhdWx0IFswLCAxMF0gICAgICAgIFxuICAgICAgICAqIEB0eXBlIG51bWJlcltdXG4gICAgICAgICMjI1xuICAgICAgICBAc3BhY2luZyA9IEBwYXJhbXMuc3BhY2luZyB8fCBbMCwgMF1cbiAgICAgXG4gICAgIyMjKlxuICAgICogQWRkcyBldmVudC1oYW5kbGVycyBmb3IgbW91c2UvdG91Y2ggZXZlbnRzXG4gICAgKlxuICAgICogQG1ldGhvZCBzZXR1cEV2ZW50SGFuZGxlcnNcbiAgICAjIyMgXG4gICAgc2V0dXBFdmVudEhhbmRsZXJzOiAtPlxuICAgICAgICBncy5HbG9iYWxFdmVudE1hbmFnZXIub24gXCJtb3VzZVdoZWVsXCIsID0+XG4gICAgICAgICAgICByZXR1cm4gaWYgIUBvYmplY3QuY2FuUmVjZWl2ZUlucHV0KClcbiAgICAgICAgICAgIHIgPSBAb2JqZWN0LmRzdFJlY3RcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgUmVjdC5jb250YWlucyhyLngsIHIueSwgci53aWR0aCwgci5oZWlnaHQsIElucHV0Lk1vdXNlLnggLSBAb2JqZWN0Lm9yaWdpbi54LCBJbnB1dC5Nb3VzZS55IC0gQG9iamVjdC5vcmlnaW4ueSlcbiAgICAgICAgICAgICAgICBAdXBkYXRlU2Nyb2xsKClcbiAgICBcbiAgICAjIyMqXG4gICAgKiBTZXRzIHVwIHRoZSBkYXRhLWdyaWQuXG4gICAgKlxuICAgICogQG1ldGhvZCBzZXR1cFxuICAgICMjIyAgIFxuICAgIHNldHVwOiAtPlxuICAgICAgICBpZiBAb2JqZWN0LmRzdFJlY3Qud2lkdGggPT0gMSB0aGVuIHJldHVyblxuICAgICAgICBAaW5pdGlhbGl6ZWQgPSB5ZXNcblxuICAgICAgICBpZiAhQHRlbXBsYXRlLnNpemVcbiAgICAgICAgICAgIGl0ZW0gPSB1aS5VSU1hbmFnZXIuY3JlYXRlQ29udHJvbEZyb21EZXNjcmlwdG9yKEB0ZW1wbGF0ZS5kZXNjcmlwdG9yLCBAb2JqZWN0KVxuICAgICAgICAgICAgaXRlbS5pbmRleCA9IDBcbiAgICAgICAgICAgIGl0ZW0udXBkYXRlKClcbiAgICAgICAgICAgIEB0ZW1wbGF0ZS5zaXplID0gW2l0ZW0uZHN0UmVjdC53aWR0aCwgaXRlbS5kc3RSZWN0LmhlaWdodF1cbiAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpXG4gICAgICAgICAgICBcbiAgICAgICAgaWYgQHBhcmFtcy5kYXRhU291cmNlLmV4ZWNcbiAgICAgICAgICAgIEBkYXRhU291cmNlXyA9IG5ldyBEYXRhU291cmNlKHVpLkNvbXBvbmVudF9Gb3JtdWxhSGFuZGxlci5maWVsZFZhbHVlKEBvYmplY3QsIEBwYXJhbXMuZGF0YVNvdXJjZSkgfHwgW10pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBkYXRhU291cmNlXyA9IG5ldyBEYXRhU291cmNlKEBwYXJhbXMuZGF0YVNvdXJjZSB8fCBbXSlcbiAgICAgICAgXG4gICAgICAgIEByZXNpemUoKVxuICAgICAgICBcbiAgICAgICAgQHNldHVwRXZlbnRIYW5kbGVycygpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHN1cGVyKClcbiAgICBcbiAgICAgICAgQG9iamVjdC5zY3JvbGxhYmxlSGVpZ2h0ID0gTWF0aC5tYXgoMCwgQG9iamVjdC5jb250ZW50SGVpZ2h0IC0gQG9iamVjdC5kc3RSZWN0LmhlaWdodClcbiAgICAgXG4gICAgXG4gICAgIyMjKlxuICAgICogU2Nyb2xscyB0byB0aGUgZW5kLlxuICAgICpcbiAgICAqIEBtZXRob2Qgc2Nyb2xsVG9FbmRcbiAgICAjIyMgICAgXG4gICAgc2Nyb2xsVG9FbmQ6IC0+XG4gICAgICAgIEBvYmplY3Quc2Nyb2xsT2Zmc2V0WSA9IEBvYmplY3Quc2Nyb2xsYWJsZUhlaWdodFxuICAgICAgICBcbiAgICAjIyMqXG4gICAgKiBVcGRhdGVzIHNjcm9sbGluZy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHVwZGF0ZVNjcm9sbFxuICAgICMjI1xuICAgIHVwZGF0ZVNjcm9sbDogLT5cbiAgICAgICAgQG9iamVjdC5zY3JvbGxhYmxlSGVpZ2h0ID0gTWF0aC5tYXgoMCwgQG9iamVjdC5jb250ZW50SGVpZ2h0IC0gQG9iamVjdC5kc3RSZWN0LmhlaWdodClcbiAgICAgICAgaWYgSW5wdXQuTW91c2Uud2hlZWwgPD0gLTFcbiAgICAgICAgICAgIEBvYmplY3Quc2Nyb2xsT2Zmc2V0WSA9IE1hdGgubWF4KEBvYmplY3Quc2Nyb2xsT2Zmc2V0WSAtIElucHV0Lk1vdXNlLndoZWVsU3BlZWQgKiAwLjEsIDApXG4gICAgICAgICAgIFxuICAgICAgICBpZiBJbnB1dC5Nb3VzZS53aGVlbCA+PSAxXG4gICAgICAgICAgICBAb2JqZWN0LnNjcm9sbE9mZnNldFkgPSBNYXRoLm1pbihAb2JqZWN0LnNjcm9sbE9mZnNldFkgLSBJbnB1dC5Nb3VzZS53aGVlbFNwZWVkICogMC4xLCBAb2JqZWN0LnNjcm9sbGFibGVIZWlnaHQpXG4gICAgICAgICAgICBcbiAgICBcbiAgICAgICAgQG9iamVjdC5zY3JvbGxPZmZzZXRZID0gTWF0aC5tYXgoTWF0aC5taW4oQG9iamVjdC5zY3JvbGxPZmZzZXRZLCBAb2JqZWN0LnNjcm9sbGFibGVIZWlnaHQpLCAwKVxuICAgICAgICAgXG4gICAgIyMjKlxuICAgICogUmVzaXplcyB0aGUgZGF0YS1ncmlkIGFuZCBjcmVhdGVzIHRoZSBuZWNlc3NhcnkgZGlzcGxheSBvYmplY3RzIGZyb20gdGhlIGRhdGEtZ3JpZCB0ZW1wbGF0ZS5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHJlc2l6ZVxuICAgICMjIyAgICAgXG4gICAgcmVzaXplOiAtPlxuICAgICAgICB3aWR0aCA9IEBvYmplY3QuZHN0UmVjdC53aWR0aFxuICAgICAgICBoZWlnaHQgPSBAb2JqZWN0LmRzdFJlY3QuaGVpZ2h0XG4gICAgICAgIFxuICAgICAgICBpdGVtc1ggPSBAY29sdW1ucyB8fCAxXG4gICAgICAgIGl0ZW1zWSA9IE1hdGguY2VpbCgoaGVpZ2h0LUBzcGFjaW5nWzFdKSAvIChAdGVtcGxhdGUuc2l6ZVsxXStAc3BhY2luZ1sxXSkpICsgQGNvbHVtbnMrMVxuICAgICAgICB0b3RhbEl0ZW1zWSA9IE1hdGguY2VpbChAZGF0YVNvdXJjZS5sZW5ndGggLyBAY29sdW1ucylcbiAgICAgICAgXG4gICAgICAgIGl0ZW0/LmRpc3Bvc2UoKSBmb3IgaXRlbSBpbiBAaXRlbXNcbiAgICAgICAgQGl0ZW1zID0gW10gI25ldyBBcnJheShpdGVtc1ggKiBpdGVtc1kpXG4gICAgICAgIFxuICAgICAgICBmb3IgeSBpbiBbMC4uLml0ZW1zWV1cbiAgICAgICAgICAgIGZvciB4IGluIFswLi4uaXRlbXNYXVxuICAgICAgICAgICAgICAgIGluZGV4ICA9IHkgKiBpdGVtc1ggKyB4XG4gICAgICAgICAgICAgICAgaWYgaW5kZXggPCBAZGF0YVNvdXJjZS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHVpLlVJTWFuYWdlci5jcmVhdGVDb250cm9sRnJvbURlc2NyaXB0b3IoQHRlbXBsYXRlLmRlc2NyaXB0b3IsIEBvYmplY3QpXG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kYXRhWzBdID0gQGRhdGFTb3VyY2UuaXRlbUF0KGluZGV4KS5kYXRhICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kc3RSZWN0LnggPSBAc3BhY2luZ1swXSArIHggKiAoQHRlbXBsYXRlLnNpemVbMF0rQHNwYWNpbmdbMF0pXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZHN0UmVjdC55ID0gQHNwYWNpbmdbMV0gKyB5ICogKEB0ZW1wbGF0ZS5zaXplWzFdK0BzcGFjaW5nWzFdKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmRzdFJlY3Qud2lkdGggPSBAdGVtcGxhdGUuc2l6ZVswXVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmRzdFJlY3QuaGVpZ2h0ID0gQHRlbXBsYXRlLnNpemVbMV1cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pbmRleCA9IGluZGV4XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udWkudmlld0RhdGEgPSBAZGF0YVNvdXJjZS5pdGVtQXQoaW5kZXgpLnZpZXdEYXRhXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBAaXRlbXNbaXRlbS5pbmRleF0gPSBpdGVtXG4gICAgICAgICAgICAgICAgICAgIEBvYmplY3QuYWRkT2JqZWN0KGl0ZW0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIEBvYmplY3Quc2Nyb2xsYWJsZUhlaWdodCA9IEBzcGFjaW5nWzFdICsgdG90YWxJdGVtc1kgKiAoQHRlbXBsYXRlLnNpemVbMV0rQHNwYWNpbmdbMV0pIC0gaGVpZ2h0XG4gICAgICAgIEBvYmplY3Quc2Nyb2xsT2Zmc2V0WSA9IDBcbiAgICAgICAgQG9iamVjdC5jb250ZW50SGVpZ2h0ID0gQHNwYWNpbmdbMV0gKyB0b3RhbEl0ZW1zWSAqIChAdGVtcGxhdGUuc2l6ZVsxXStAc3BhY2luZ1sxXSlcblxuICAgIGl0ZW1BdEluZGV4OiAoaW5kZXgpIC0+XG4gICAgICAgIEBpdGVtcy5maXJzdCAoaXRlbSkgLT4gaXRlbS5pbmRleCA9PSBpbmRleFxuICAgICAgICBcbiAgICBpbmRleEZvckl0ZW06IChpdGVtKSAtPiBpdGVtLmluZGV4XG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIFVwZGF0ZXMgdGhlIGRhdGEtZ3JpZC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICMjIyAgXG4gICAgdXBkYXRlOiAtPlxuICAgICAgICBzdXBlcigpXG4gICAgICAgIFxuICAgICAgICBpZiBub3QgQGluaXRpYWxpemVkXG4gICAgICAgICAgICBAc2V0dXAoKVxuICAgICAgICBcbiAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gQG9iamVjdC5zY3JvbGxPZmZzZXRZXG4gICAgICAgIG9mZnNldCA9IE1hdGguZmxvb3IoKHNjcm9sbE9mZnNldCkgLyAoQHRlbXBsYXRlLnNpemVbMV0rQHNwYWNpbmdbMV0pKSAqIEBjb2x1bW5zXG4gICAgICAgIGkgPSBvZmZzZXRcbiAgICAgICAgaXRlbUluZGV4ID0gMFxuICAgICAgICBpdGVtc1kgPSBNYXRoLmNlaWwoKEBvYmplY3QuZHN0UmVjdC5oZWlnaHQtQHNwYWNpbmdbMV0pIC8gIChAdGVtcGxhdGUuc2l6ZVsxXStAc3BhY2luZ1sxXSkpICogQGNvbHVtbnMgKyBAY29sdW1ucysxXG4gICAgICAgIFxuICAgICAgICB3aGlsZSBpIDwgTWF0aC5taW4ob2Zmc2V0K2l0ZW1zWSwgQGRhdGFTb3VyY2UubGVuZ3RoKVxuICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcihpIC8gQGNvbHVtbnMpXG4gICAgICAgICAgICBjb2x1bW4gPSBpICUgQGNvbHVtbnNcbiAgICAgICAgICAgIGl0ZW0gPSBAaXRlbXNbaXRlbUluZGV4XVxuICAgICAgICAgICAgaWYgaXRlbVxuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YVswXSA9IEBkYXRhU291cmNlLml0ZW1BdChpKS5kYXRhXG4gICAgICAgICAgICAgICAgaWYgQG9iamVjdC5jbGlwUmVjdFxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsaXBSZWN0ID0gQG9iamVjdC5jbGlwUmVjdFxuICAgICAgICAgICAgICAgIGl0ZW0uaW5kZXggPSBpXG4gICAgICAgICAgICAgICAgaXRlbS51aS52aWV3RGF0YSA9IEBkYXRhU291cmNlLml0ZW1BdChpKS52aWV3RGF0YVxuICAgICAgICAgICAgICAgIGl0ZW0uZHN0UmVjdC54ID0gQHNwYWNpbmdbMF0gKyBjb2x1bW4gKiAoQHRlbXBsYXRlLnNpemVbMF0rQHNwYWNpbmdbMF0pXG4gICAgICAgICAgICAgICAgaXRlbS5kc3RSZWN0LnkgPSBAc3BhY2luZ1sxXSArIChyb3ctKG9mZnNldC9AY29sdW1ucykpICogKEB0ZW1wbGF0ZS5zaXplWzFdK0BzcGFjaW5nWzFdKSArICgtc2Nyb2xsT2Zmc2V0ICUgKEB0ZW1wbGF0ZS5zaXplWzFdK0BzcGFjaW5nWzFdKSlcbiAgICAgICAgICAgICAgICBpdGVtLnZpc2libGUgPSB5ZXNcbiAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgaXRlbS51cGRhdGUoKVxuICAgICAgICAgICAgICAgIGl0ZW1JbmRleCsrXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgaSsrXG4gICAgICAgIFxuICAgICAgICBmb3IgaiBpbiBbaXRlbUluZGV4Li4uQGl0ZW1zLmxlbmd0aF1cbiAgICAgICAgICAgIGlmIEBpdGVtc1tqXVxuICAgICAgICAgICAgICAgIEBpdGVtc1tqXS52aXNpYmxlID0gbm9cbiAgICAgICAgICAgICAgICBAaXRlbXNbal0udXBkYXRlKClcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbnVpLkNvbXBvbmVudF9EYXRhR3JpZEJlaGF2aW9yID0gQ29tcG9uZW50X0RhdGFHcmlkQmVoYXZpb3IiXX0=
//# sourceURL=Component_DataGridBehavior_182.js