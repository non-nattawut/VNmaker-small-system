// Generated by CoffeeScript 1.12.7

/**
* Different types of animation looping.
*
* @module gs
* @class AnimationLoopType
* @memberof gs
* @static
* @final
 */

(function() {
  var AnimationLoopType, Component_PathAnimation,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AnimationLoopType = (function() {
    function AnimationLoopType() {}

    AnimationLoopType.initialize = function() {

      /**
      * No looping.
      * @property NONE
      * @static
      * @final
       */
      this.NONE = 0;

      /**
      * Regular looping. If the end of an animation is reached it will start
      * from the beginning.
      * @property NORMAL
      * @static
      * @final
       */
      this.NORMAL = 1;

      /**
      * Reverse looping. If the end of an animation is reached it will be
      * reversed an goes now from end to start.
      * @property REVERSE
      * @static
      * @final
       */
      return this.REVERSE = 2;
    };

    return AnimationLoopType;

  })();

  AnimationLoopType.initialize();

  gs.AnimationLoopType = AnimationLoopType;

  Component_PathAnimation = (function(superClass) {
    extend(Component_PathAnimation, superClass);


    /**
    * Executes a path-animation on a game-object. A path-animation moves the
    * game-object along a path of quadratic bezier-curves.
    *
    * @module gs
    * @class Component_PathAnimation
    * @extends gs.Component_Animation
    * @memberof gs
    * @constructor
     */

    function Component_PathAnimation(data) {
      Component_PathAnimation.__super__.constructor.apply(this, arguments);
      this.path = (data != null ? data.path : void 0) || null;
      this.easing = new gs.Easing(null, data != null ? data.easing : void 0);
      this.startPosition = (data != null ? data.startPosition : void 0) || null;
      this.loopType = (data != null ? data.loopType : void 0) || 0;
      this.animationType = 0;
      this.effects = (data != null ? data.effects : void 0) || [];
      this.effect = null;
    }


    /**
    * Serializes the path-animation into a data-bundle.
    *
    * @method toDataBundle
     */

    Component_PathAnimation.prototype.toDataBundle = function() {
      return {
        path: this.path,
        easing: this.easing,
        startPosition: this.startPosition,
        loopType: this.loopType
      };
    };


    /**
    * Skips the animation. That is used to skip an animation if the user
    * wants to skip very fast through a visual novel scene.
    *
    * @method skip
     */

    Component_PathAnimation.prototype.skip = function() {
      if (this.loopType === 0 && this.easing.duration > 1) {
        this.easing.duration = 1;
        return this.easing.time = 0;
      }
    };


    /**
    * Calculates a certain point on a specified bezier-curve.
    *
    * @method quadraticBezierPoint
    * @protected
    * @param {number} startPt - The start-point of the bezier-curve.
    * @param {number} controlPt - The control-point of the bezier-curve.
    * @param {number} endPt - The end-point of the bezier-curve.
    * @param {number} percent - The percentage (0.0 - 1.0). A percentage of
    * 0.0 returns the <b>startPt</b> and 1.0 returns the <b>endPt</b> while
    * 0.5 return the point at the middle of the bezier-curve.
     */

    Component_PathAnimation.prototype.quadraticBezierPoint = function(startPt, controlPt, endPt, percent) {
      var x, y;
      x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x;
      y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y;
      return {
        x: x,
        y: y
      };
    };


    /**
    * Updates the path-animation.
    *
    * @method update
     */

    Component_PathAnimation.prototype.update = function() {
      var current, curve, effect, i, j, k, len, len1, len2, point, ref, ref1, ref2, value;
      Component_PathAnimation.__super__.update.apply(this, arguments);
      if (!this.easing.isRunning) {
        return;
      }
      this.easing.updateValue();
      value = this.easing.value;
      point = this.path.curveLength / 100 * value;
      ref = this.path.curveLengths;
      for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
        len = ref[i];
        if (point <= len.len + len.offset) {
          current = {
            percent: (point - len.offset) / len.len,
            path: this.path.data[i]
          };
          break;
        }
      }
      curve = current.path;
      point = this.quadraticBezierPoint(curve.pt1, curve.cpt, curve.pt2, current.percent);
      switch (this.animationType) {
        case 0:
          this.object.dstRect.x = Math.round(point.x - this.path.data[0].pt1.x + this.startPosition.x);
          this.object.dstRect.y = Math.round(point.y - this.path.data[0].pt1.y + this.startPosition.y);
          break;
        case 2:
          this.object.visual.scroll.x = Math.round(point.x - this.path.data[0].pt1.x + this.startPosition.x);
          this.object.visual.scroll.y = Math.round(point.y - this.path.data[0].pt1.y + this.startPosition.y);
      }
      ref1 = this.effects;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        effect = ref1[k];
        if ((!this.effect || (this.effect !== effect && ((ref2 = this.effect) != null ? ref2.time : void 0) <= effect.time)) && this.easing.time >= effect.time) {
          this.effect = effect;
          AudioManager.playSound(this.effect.sound);
        }
      }
      if (!this.easing.isRunning) {
        switch (this.loopType) {
          case 0:
            return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
          case 1:
            this.easing.startValue(0, 100, this.easing.duration);
            this.startPosition.x = this.object.dstRect.x;
            return this.startPosition.y = this.object.dstRect.y;
          case 2:
            this.effect = null;
            return this.easing.startValue(this.easing.value, 100 - this.easing.value * 2, this.easing.duration);
        }
      }
    };


    /**
    * Starts the path-animation. Scrolls the game object along the path.
    *
    * @method scrollPath
    * @param {Object} path The path to follow.
    * @param {gs.AnimationLoopType} loopType The loop-Type.
    * @param {number} duration The duration in frames.
    * @param {Object} easingType The easing-type.
    * @param {function} [callback] An optional callback called if blending is finished.
     */

    Component_PathAnimation.prototype.scroll = function(path, loopType, duration, easingType, effects, callback) {
      this.start(path, loopType, duration, easingType, callback);
      return this.animationType = 2;
    };


    /**
    * Starts the path-animation.
    *
    * @method movePath
    * @param {Object} path The path to follow.
    * @param {gs.AnimationLoopType} loopType The loop-Type.
    * @param {number} duration The duration in frames.
    * @param {Object} easingType The easing-type.
    * @param {function} [callback] An optional callback called if blending is finished.
     */

    Component_PathAnimation.prototype.start = function(path, loopType, duration, easingType, effects, callback) {
      var curve, j, l, len1, length, lengths, point, ref, x, y;
      this.effects = effects || [];
      this.effect = null;
      this.callback = callback;
      this.loopType = loopType;
      this.path = {
        data: path || [],
        curveLength: null,
        curveLengths: null
      };
      this.easing.type = easingType || gs.Easings.EASE_LINEAR[gs.EasingTypes.EASE_IN];
      this.easing.startValue(0, 100, duration);
      this.startPosition = {
        x: this.object.dstRect.x,
        y: this.object.dstRect.y
      };
      if (this.path.data.length === 0) {
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      } else if (duration === 0 || this.isInstantSkip()) {
        point = this.path.data.last().pt2;
        this.object.dstRect.x = Math.round(point.x - this.path.data[0].pt1.x + this.startPosition.x);
        this.object.dstRect.y = Math.round(point.y - this.path.data[0].pt1.y + this.startPosition.y);
        return typeof this.callback === "function" ? this.callback(this.object, this) : void 0;
      } else if (this.path.curveLength == null) {
        length = 0;
        lengths = [];
        ref = this.path.data;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          curve = ref[j];
          x = (curve.cpt.x - curve.pt1.x) + (curve.pt2.x - curve.cpt.x);
          y = (curve.cpt.y - curve.pt1.y) + (curve.pt2.y - curve.cpt.y);
          l = Math.round(Math.sqrt(x * x + y * y));
          lengths.push({
            len: l,
            offset: length
          });
          length += l;
        }
        this.path.curveLength = length;
        return this.path.curveLengths = lengths;
      }
    };

    return Component_PathAnimation;

  })(gs.Component_Animation);

  gs.Component_PathAnimation = Component_PathAnimation;

}).call(this);
