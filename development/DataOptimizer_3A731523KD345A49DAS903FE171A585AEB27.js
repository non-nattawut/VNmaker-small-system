var DataOptimizer;

DataOptimizer = (function() {

  /**
  * The data optimizer is to optimize data structures coming from data files to
  * make processing faster. One way of optimization for example is to convert
  * regular array to typed arrays.
  *
  * @module gs
  * @class DataOptimizer
  * @memberof gs
  * @static
  * @constructor
   */
  function DataOptimizer() {
    this.labels = {};
    this.labelJumps = {};
  }


  /**
  * Converts the specified number-array to a typed Int16 array.
  *
  * @method arrayToNativeArray
  * @param {Array} array - The array to convert.
  * @return {Int16Array} The typed array.
  * @static
   */

  DataOptimizer.prototype.arrayToNativeArray = function(array) {
    var i, j, length, ref, result;
    result = null;
    length = array.length || Object.keys(array).length;
    if (array != null) {
      if (window.ArrayBuffer != null) {
        result = new ArrayBuffer(length * 2);
        result = new Int16Array(result);
      } else {
        result = new Array(length);
      }
      for (i = j = 0, ref = length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        result[i] = array[i];
      }
    }
    return result;
  };


  /**
  * Creates a typed Int16 array if supported. Otherwise a regular array is created.
  *
  * @method nativeArray16
  * @param {number} size - The size of the array in elements.(Not in bytes).
  * @return {Int16Array} The Int16 array.
  * @static
   */

  DataOptimizer.prototype.nativeArray16 = function(size) {
    var result;
    result = new Array(size);
    return result;
  };


  /**
  * Creates a typed Int8 array if supported. Otherwise a regular array is created.
  *
  * @method nativeArray16
  * @param {number} size - The size of the array in elements.(Not in bytes).
  * @return {Int8Array} The Int8 array.
  * @static
   */

  DataOptimizer.prototype.nativeArray8 = function(size) {
    var result;
    result = new Array(size);
    return result;
  };


  /**
  * Removes a single empty command like a comment.
  *
  * @method removeEmptyCommand
  * @private
  * @param {Object[]} commands - A list of commands.
  * @param {Object} command - The command to optimize.
  * @static
   */

  DataOptimizer.prototype.removeEmptyCommand = function(command, index, commands) {
    var result;
    if (GameManager.inLivePreview) {
      return false;
    }
    result = false;
    switch (commands[index].id) {
      case "gs.Comment":
        commands.splice(index, 1);
        result = true;
        break;
      case "gs.EmptyCommand":
        commands.splice(index, 1);
        result = true;
    }
    return result;
  };


  /**
  * Checks if a common event call can be optimized by inline it. In special cases,
  * such as recursion or parameters, an optimization is no possible.
  *
  * @method optimizeCommonEventCall
  * @private
  * @param {Object[]} commands - A list of commands.
  * @param {number} index - Index of the command in command-list.
  * @param {Object} command - The command to optimize.
  * @return If <b>true</b> the call can be safly inline. Otherwise <b>false</b>
  * @static
   */

  DataOptimizer.prototype.canInlineCommonEventCall = function(command, index, commands, callStack) {
    var c, commonEvent, i, j, len, ref, result;
    result = !(command.params.commonEventId.index != null);
    commonEvent = RecordManager.commonEvents[command.params.commonEventId];
    if (commonEvent != null ? commonEvent.inline : void 0) {
      if (callStack.indexOf(commonEvent) !== -1) {
        result = false;
      } else {
        callStack.push(commonEvent);
        ref = commonEvent.commands;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          c = ref[i];
          if (c.id === "gs.CallCommonEvent") {
            result = this.canInlineCommonEventCall(c, i, commonEvent.commands, callStack);
          }
        }
      }
    }
    return result;
  };


  /**
  * Optimizes a common event call.
  *
  * @method optimizeCommonEventCall
  * @private
  * @param {Object[]} commands - A list of commands.
  * @param {number} index - Index of the command in command-list.
  * @param {Object} command - The command to optimize.
  * @static
   */

  DataOptimizer.prototype.optimizeCommonEventCall = function(command, index, commands) {
    var commonEvent;
    commonEvent = RecordManager.commonEvents[command.params.commonEventId];
    if (commonEvent != null ? commonEvent.inline : void 0) {
      if (this.canInlineCommonEventCall(command, index, commands, [])) {
        commands.splice(index, 1);
        return commands.splice.apply(commands, [index, 0].concat(Object.copy(commonEvent.commands)));
      }
    }
  };


  /**
  * Optimizes the variable-access by replacing the domain-string with the domain-index
  * value at runtime to allow faster domain access using integer numbers instead of strings.
  *
  * @method optimizeVariableAccess
  * @param {Object} data - The data to opimize, e.g. the params-object of a command.
  * @static
   */

  DataOptimizer.prototype.optimizeVariableAccess = function(data) {
    var domainIndex, e, p, ref, ref1, results;
    if (data != null ? data.__optimized : void 0) {
      return;
    }
    if (data != null) {
      data.__optimized = true;
    }
    results = [];
    for (p in data) {
      if (data[p] instanceof Array && !data[p].__optimized) {
        data[p].__optimized = true;
        results.push((function() {
          var j, len, ref, results1;
          ref = data[p];
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            e = ref[j];
            results1.push(this.optimizeVariableAccess(e));
          }
          return results1;
        }).call(this));
      } else if (p === "domain" && data.scope > 0 && (data.index != null)) {
        domainIndex = GameManager.variableStore.domains.indexOf(data[p]);
        results.push(data[p] = domainIndex === -1 ? data[p] : domainIndex);
      } else if (typeof data[p] === "object" && !(data[p] instanceof String || data[p] instanceof Array)) {
        if (!((ref = data[p]) != null ? ref.__optimized : void 0)) {
          this.optimizeVariableAccess(data[p]);
        }
        results.push((ref1 = data[p]) != null ? ref1.__optimized = true : void 0);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /**
  * Optimizes a single sub-message created by {CP} text code. It will split the sub-message into multiple
  * independent ShowMessage commands at {P} text code.
  *
  * @method optimizeSubMessage
  * @private
  * @param {string} message - The sub message.
  * @param {Object} command - The command to optimize.
  * @param {number} index - Index of the command in command-list.
  * @param {Object[]} commands - A list of commands.
  * @return {number} The current command-pointer where add/insert the next command (If necessary).
  * @static
   */

  DataOptimizer.prototype.optimizeSubMessage = function(message, command, index, commands) {
    var i, j, len, messageCommand, subMessage, subMessages;
    subMessages = message.split("{P}");
    for (i = j = 0, len = subMessages.length; j < len; i = ++j) {
      subMessage = subMessages[i];
      messageCommand = Object.flatCopy(command);
      messageCommand.params = Object.flatCopy(messageCommand.params);
      if (i === 0) {
        messageCommand.params.message = subMessage;
      } else {
        messageCommand.params.message = subMessage.replace("\n", "");
      }
      commands.splice(index, 0, messageCommand);
      index++;
    }
    return index;
  };


  /**
  * Optimizes a single ShowMessage command. It will split the command into multiple
  * independent ShowMessage commands at {P} text code for example.
  *
  * @method optimizeShowMessage
  * @private
  * @param {Object} command - The command to optimize.
  * @param {number} index - Index of the command in command-list.
  * @param {Object[]} commands - A list of commands.
  * @return {number} The current command-pointer where add/insert the next command (If necessary).
  * @static
   */

  DataOptimizer.prototype.optimizeShowMessage = function(command, index, commands) {
    var clearCommand, i, j, len, msg, subMessage, subMessages;
    msg = lcs(command.params.message);
    if (msg.contains("{CP}") || msg.contains("{P}")) {
      commands.splice(index, 1);
      subMessages = msg.split("{CP}");
      for (i = j = 0, len = subMessages.length; j < len; i = ++j) {
        subMessage = subMessages[i];
        index = this.optimizeSubMessage(subMessage, command, index, commands);
        if (i < subMessages.length - 1) {
          clearCommand = {
            id: "gs.ClearMessage",
            indent: command.indent,
            params: {
              fieldFlags: {
                duration: 1
              },
              duration: 30,
              waitForCompletion: true
            }
          };
          commands.splice(index, 0, clearCommand);
          index++;
        }
      }
      index--;
    }
    return index;
  };


  /**
  * Optimizes a single command.
  *
  * @method optimizeCommand
  * @private
  * @param {Object[]} commands - A list of commands.
  * @param {number} index - Index of the command in command-list.
  * @param {Object} command - The command to optimize.
  * @static
   */

  DataOptimizer.prototype.optimizeCommand = function(command, index, commands) {
    var ref;
    this.optimizeVariableAccess(command.params);
    switch (command.id) {
      case "gs.ShowMessage":
        index = this.optimizeShowMessage(command, index, commands);
        break;
      case "gs.CallCommonEvent":
        this.optimizeCommonEventCall(command, index, commands);
        break;
      case "gs.Label":
        this.labels[command.params.name] = index;
        if ((ref = this.labelJumps[command.params.name]) != null) {
          ref.forEach(function(c) {
            return c.params.labelIndex = index;
          });
        }
        break;
      case "vn.Choice":
        command.params.action.labelIndex = this.labels[command.params.action.label];
        if (!this.labelJumps[command.params.action.label]) {
          this.labelJumps[command.params.action.label] = [];
        }
        this.labelJumps[command.params.action.label].push(command);
        break;
      case "gs.CheckSwitch":
      case "gs.CheckNumberVariable":
      case "gs.CheckTextVariable":
        command.params.labelIndex = this.labels[command.params.label];
        if (!this.labelJumps[command.params.label]) {
          this.labelJumps[command.params.label] = [];
        }
        this.labelJumps[command.params.label].push(command);
        break;
      case "gs.JumpToLabel":
        command.params.labelIndex = this.labels[command.params.name];
        if (!this.labelJumps[command.params.name]) {
          this.labelJumps[command.params.name] = [];
        }
        this.labelJumps[command.params.name].push(command);
    }
    return index;
  };


  /**
  * Optimizes a list of event/scene commands by removing unnecessary commands like
  * comments or empty commands. It also optimizes label jumps. Adds an <b>optimized</b> to
  * the specified command-list to indicate that the list was already optimized. If <b>optimized</b>
  * property of command-list is set to <b>true</b> this method will return immediately.
  *
  * @method optimizeEventCommands
  * @param {Object[]} commands - A list of commands to optimize.
  * @static
   */

  DataOptimizer.prototype.optimizeEventCommands = function(commands) {
    var i;
    if (commands.optimized) {
      return;
    }
    i = 0;
    this.labels = {};
    this.labelJumps = {};
    if (!$PARAMS.preview) {
      while (i < commands.length) {
        commands[i].indent = commands[i].indent || 0;
        if (this.removeEmptyCommand(commands[i], i, commands)) {
          i--;
        }
        i++;
      }
    }
    i = 0;
    while (i < commands.length) {
      i = this.optimizeCommand(commands[i], i, commands);
      i++;
    }
    return commands.optimized = true;
  };

  return DataOptimizer;

})();

window.DataOptimizer = new DataOptimizer();

gs.DataOptimizer = DataOptimizer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUE7O0FBQU07O0FBQ0Y7Ozs7Ozs7Ozs7O0VBV2EsdUJBQUE7SUFDVCxJQUFDLENBQUEsTUFBRCxHQUFVO0lBQ1YsSUFBQyxDQUFBLFVBQUQsR0FBYztFQUZMOzs7QUFJYjs7Ozs7Ozs7OzBCQVFBLGtCQUFBLEdBQW9CLFNBQUMsS0FBRDtBQUNoQixRQUFBO0lBQUEsTUFBQSxHQUFTO0lBQ1QsTUFBQSxHQUFTLEtBQUssQ0FBQyxNQUFOLElBQWdCLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWixDQUFrQixDQUFDO0lBQzVDLElBQUcsYUFBSDtNQUNJLElBQUcsMEJBQUg7UUFDSSxNQUFBLEdBQWEsSUFBQSxXQUFBLENBQVksTUFBQSxHQUFTLENBQXJCO1FBQ2IsTUFBQSxHQUFhLElBQUEsVUFBQSxDQUFXLE1BQVgsRUFGakI7T0FBQSxNQUFBO1FBSUksTUFBQSxHQUFhLElBQUEsS0FBQSxDQUFNLE1BQU4sRUFKakI7O0FBT0EsV0FBUywrRUFBVDtRQUNJLE1BQU8sQ0FBQSxDQUFBLENBQVAsR0FBWSxLQUFNLENBQUEsQ0FBQTtBQUR0QixPQVJKOztBQVdBLFdBQU87RUFkUzs7O0FBZ0JwQjs7Ozs7Ozs7OzBCQVFBLGFBQUEsR0FBZSxTQUFDLElBQUQ7QUFHWCxRQUFBO0lBQUEsTUFBQSxHQUFhLElBQUEsS0FBQSxDQUFNLElBQU47QUFDYixXQUFPO0VBSkk7OztBQU1mOzs7Ozs7Ozs7MEJBUUEsWUFBQSxHQUFjLFNBQUMsSUFBRDtBQUNWLFFBQUE7SUFBQSxNQUFBLEdBQWEsSUFBQSxLQUFBLENBQU0sSUFBTjtBQUNiLFdBQU87RUFGRzs7O0FBS2Q7Ozs7Ozs7Ozs7MEJBU0Esa0JBQUEsR0FBb0IsU0FBQyxPQUFELEVBQVUsS0FBVixFQUFpQixRQUFqQjtBQUNoQixRQUFBO0lBQUEsSUFBYSxXQUFXLENBQUMsYUFBekI7QUFBQSxhQUFPLE1BQVA7O0lB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QUMsU0FBVCxHQUFxQjtFQWhCRjs7Ozs7O0FBbUIzQixNQUFNLENBQUMsYUFBUCxHQUEyQixJQUFBLGFBQUEsQ0FBQTs7QUFDM0IsRUFBRSxDQUFDLGFBQUgsR0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiNcbiMgICBTY3JpcHQ6IERhdGFPcHRpbWl6ZXJcbiNcbiMgICAkJENPUFlSSUdIVCQkXG4jXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNsYXNzIERhdGFPcHRpbWl6ZXJcbiAgICAjIyMqXG4gICAgKiBUaGUgZGF0YSBvcHRpbWl6ZXIgaXMgdG8gb3B0aW1pemUgZGF0YSBzdHJ1Y3R1cmVzIGNvbWluZyBmcm9tIGRhdGEgZmlsZXMgdG9cbiAgICAqIG1ha2UgcHJvY2Vzc2luZyBmYXN0ZXIuIE9uZSB3YXkgb2Ygb3B0aW1pemF0aW9uIGZvciBleGFtcGxlIGlzIHRvIGNvbnZlcnRcbiAgICAqIHJlZ3VsYXIgYXJyYXkgdG8gdHlwZWQgYXJyYXlzLlxuICAgICpcbiAgICAqIEBtb2R1bGUgZ3NcbiAgICAqIEBjbGFzcyBEYXRhT3B0aW1pemVyXG4gICAgKiBAbWVtYmVyb2YgZ3NcbiAgICAqIEBzdGF0aWNcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICMjI1xuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbGFiZWxzID0ge31cbiAgICAgICAgQGxhYmVsSnVtcHMgPSB7fVxuICAgICAgICBcbiAgICAjIyMqXG4gICAgKiBDb252ZXJ0cyB0aGUgc3BlY2lmaWVkIG51bWJlci1hcnJheSB0byBhIHR5cGVkIEludDE2IGFycmF5LlxuICAgICpcbiAgICAqIEBtZXRob2QgYXJyYXlUb05hdGl2ZUFycmF5XG4gICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBjb252ZXJ0LlxuICAgICogQHJldHVybiB7SW50MTZBcnJheX0gVGhlIHR5cGVkIGFycmF5LlxuICAgICogQHN0YXRpY1xuICAgICMjIyBcbiAgICBhcnJheVRvTmF0aXZlQXJyYXk6IChhcnJheSkgLT5cbiAgICAgICAgcmVzdWx0ID0gbnVsbFxuICAgICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGggfHwgT2JqZWN0LmtleXMoYXJyYXkpLmxlbmd0aFxuICAgICAgICBpZiBhcnJheT9cbiAgICAgICAgICAgIGlmIHdpbmRvdy5BcnJheUJ1ZmZlcj9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgQXJyYXlCdWZmZXIobGVuZ3RoICogMilcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgSW50MTZBcnJheShyZXN1bHQpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aClcbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciBpIGluIFswLi4ubGVuZ3RoXVxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGFycmF5W2ldXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICBcbiAgICAjIyMqXG4gICAgKiBDcmVhdGVzIGEgdHlwZWQgSW50MTYgYXJyYXkgaWYgc3VwcG9ydGVkLiBPdGhlcndpc2UgYSByZWd1bGFyIGFycmF5IGlzIGNyZWF0ZWQuXG4gICAgKlxuICAgICogQG1ldGhvZCBuYXRpdmVBcnJheTE2XG4gICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSAtIFRoZSBzaXplIG9mIHRoZSBhcnJheSBpbiBlbGVtZW50cy4oTm90IGluIGJ5dGVzKS5cbiAgICAqIEByZXR1cm4ge0ludDE2QXJyYXl9IFRoZSBJbnQxNiBhcnJheS5cbiAgICAqIEBzdGF0aWNcbiAgICAjIyMgXG4gICAgbmF0aXZlQXJyYXkxNjogKHNpemUpIC0+XG4gICAgICAgICNyZXN1bHQgPSBuZXcgQXJyYXlCdWZmZXIoc2l6ZSAqIDIpXG4gICAgICAgICNyZXN1bHQgPSBuZXcgSW50MTZBcnJheShyZXN1bHQpXG4gICAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShzaXplKVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgXG4gICAgIyMjKlxuICAgICogQ3JlYXRlcyBhIHR5cGVkIEludDggYXJyYXkgaWYgc3VwcG9ydGVkLiBPdGhlcndpc2UgYSByZWd1bGFyIGFycmF5IGlzIGNyZWF0ZWQuXG4gICAgKlxuICAgICogQG1ldGhvZCBuYXRpdmVBcnJheTE2XG4gICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSAtIFRoZSBzaXplIG9mIHRoZSBhcnJheSBpbiBlbGVtZW50cy4oTm90IGluIGJ5dGVzKS5cbiAgICAqIEByZXR1cm4ge0ludDhBcnJheX0gVGhlIEludDggYXJyYXkuXG4gICAgKiBAc3RhdGljXG4gICAgIyMjICAgICBcbiAgICBuYXRpdmVBcnJheTg6IChzaXplKSAtPlxuICAgICAgICByZXN1bHQgPSBuZXcgQXJyYXkoc2l6ZSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICBcbiAgICAgXG4gICAgIyMjKlxuICAgICogUmVtb3ZlcyBhIHNpbmdsZSBlbXB0eSBjb21tYW5kIGxpa2UgYSBjb21tZW50LlxuICAgICpcbiAgICAqIEBtZXRob2QgcmVtb3ZlRW1wdHlDb21tYW5kXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtPYmplY3RbXX0gY29tbWFuZHMgLSBBIGxpc3Qgb2YgY29tbWFuZHMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gY29tbWFuZCAtIFRoZSBjb21tYW5kIHRvIG9wdGltaXplLlxuICAgICogQHN0YXRpY1xuICAgICMjIyBcbiAgICByZW1vdmVFbXB0eUNvbW1hbmQ6IChjb21tYW5kLCBpbmRleCwgY29tbWFuZHMpIC0+XG4gICAgICAgIHJldHVybiBubyBpZiBHYW1lTWFuYWdlci5pbkxpdmVQcmV2aWV3XG4gICAgICAgIFxuICAgICAgICByZXN1bHQgPSBub1xuICAgICAgICBzd2l0Y2ggY29tbWFuZHNbaW5kZXhdLmlkXG4gICAgICAgICAgICB3aGVuIFwiZ3MuQ29tbWVudFwiXG4gICAgICAgICAgICAgICAgY29tbWFuZHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHllc1xuICAgICAgICAgICAgd2hlbiBcImdzLkVtcHR5Q29tbWFuZFwiXG4gICAgICAgICAgICAgICAgY29tbWFuZHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHllc1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgIFxuICAgICMjIypcbiAgICAqIENoZWNrcyBpZiBhIGNvbW1vbiBldmVudCBjYWxsIGNhbiBiZSBvcHRpbWl6ZWQgYnkgaW5saW5lIGl0LiBJbiBzcGVjaWFsIGNhc2VzLFxuICAgICogc3VjaCBhcyByZWN1cnNpb24gb3IgcGFyYW1ldGVycywgYW4gb3B0aW1pemF0aW9uIGlzIG5vIHBvc3NpYmxlLlxuICAgICpcbiAgICAqIEBtZXRob2Qgb3B0aW1pemVDb21tb25FdmVudENhbGxcbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSBjb21tYW5kcyAtIEEgbGlzdCBvZiBjb21tYW5kcy5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEluZGV4IG9mIHRoZSBjb21tYW5kIGluIGNvbW1hbmQtbGlzdC5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21tYW5kIC0gVGhlIGNvbW1hbmQgdG8gb3B0aW1pemUuXG4gICAgKiBAcmV0dXJuIElmIDxiPnRydWU8L2I+IHRoZSBjYWxsIGNhbiBiZSBzYWZseSBpbmxpbmUuIE90aGVyd2lzZSA8Yj5mYWxzZTwvYj5cbiAgICAqIEBzdGF0aWNcbiAgICAjIyMgICAgXG4gICAgY2FuSW5saW5lQ29tbW9uRXZlbnRDYWxsOiAoY29tbWFuZCwgaW5kZXgsIGNvbW1hbmRzLCBjYWxsU3RhY2spIC0+XG4gICAgICAgIHJlc3VsdCA9ICEoY29tbWFuZC5wYXJhbXMuY29tbW9uRXZlbnRJZC5pbmRleD8pXG4gICAgICAgIGNvbW1vbkV2ZW50ID0gUmVjb3JkTWFuYWdlci5jb21tb25FdmVudHNbY29tbWFuZC5wYXJhbXMuY29tbW9uRXZlbnRJZF1cbiAgICAgICAgaWYgY29tbW9uRXZlbnQ/LmlubGluZVxuICAgICAgICAgICAgaWYgY2FsbFN0YWNrLmluZGV4T2YoY29tbW9uRXZlbnQpICE9IC0xXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsU3RhY2sucHVzaChjb21tb25FdmVudClcbiAgICAgICAgICAgICAgICBmb3IgYywgaSBpbiBjb21tb25FdmVudC5jb21tYW5kc1xuICAgICAgICAgICAgICAgICAgICBpZiBjLmlkID09IFwiZ3MuQ2FsbENvbW1vbkV2ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBjYW5JbmxpbmVDb21tb25FdmVudENhbGwoYywgaSwgY29tbW9uRXZlbnQuY29tbWFuZHMsIGNhbGxTdGFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgIFxuICAgICMjIypcbiAgICAqIE9wdGltaXplcyBhIGNvbW1vbiBldmVudCBjYWxsLlxuICAgICpcbiAgICAqIEBtZXRob2Qgb3B0aW1pemVDb21tb25FdmVudENhbGxcbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSBjb21tYW5kcyAtIEEgbGlzdCBvZiBjb21tYW5kcy5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEluZGV4IG9mIHRoZSBjb21tYW5kIGluIGNvbW1hbmQtbGlzdC5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21tYW5kIC0gVGhlIGNvbW1hbmQgdG8gb3B0aW1pemUuXG4gICAgKiBAc3RhdGljXG4gICAgIyMjIFxuICAgIG9wdGltaXplQ29tbW9uRXZlbnRDYWxsOiAoY29tbWFuZCwgaW5kZXgsIGNvbW1hbmRzKSAtPlxuICAgICAgICBjb21tb25FdmVudCA9IFJlY29yZE1hbmFnZXIuY29tbW9uRXZlbnRzW2NvbW1hbmQucGFyYW1zLmNvbW1vbkV2ZW50SWRdXG4gICAgICAgIGlmIGNvbW1vbkV2ZW50Py5pbmxpbmVcbiAgICAgICAgICAgIGlmIEBjYW5JbmxpbmVDb21tb25FdmVudENhbGwoY29tbWFuZCwgaW5kZXgsIGNvbW1hbmRzLCBbXSlcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgY29tbWFuZHMuc3BsaWNlLmFwcGx5KGNvbW1hbmRzLCBbaW5kZXgsIDBdLmNvbmNhdChPYmplY3QuY29weShjb21tb25FdmVudC5jb21tYW5kcykpKVxuICAgIFxuICAgICMjIypcbiAgICAqIE9wdGltaXplcyB0aGUgdmFyaWFibGUtYWNjZXNzIGJ5IHJlcGxhY2luZyB0aGUgZG9tYWluLXN0cmluZyB3aXRoIHRoZSBkb21haW4taW5kZXhcbiAgICAqIHZhbHVlIGF0IHJ1bnRpbWUgdG8gYWxsb3cgZmFzdGVyIGRvbWFpbiBhY2Nlc3MgdXNpbmcgaW50ZWdlciBudW1iZXJzIGluc3RlYWQgb2Ygc3RyaW5ncy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIG9wdGltaXplVmFyaWFibGVBY2Nlc3NcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgdG8gb3BpbWl6ZSwgZS5nLiB0aGUgcGFyYW1zLW9iamVjdCBvZiBhIGNvbW1hbmQuXG4gICAgKiBAc3RhdGljXG4gICAgIyMjICAgICAgICAgICAgIFxuICAgIG9wdGltaXplVmFyaWFibGVBY2Nlc3M6IChkYXRhKSAtPlxuICAgICAgICByZXR1cm4gaWYgZGF0YT8uX19vcHRpbWl6ZWRcbiAgICAgICAgZGF0YT8uX19vcHRpbWl6ZWQgPSB5ZXMgXG4gICAgICAgIGZvciBwIG9mIGRhdGFcbiAgICAgICAgICAgIGlmIGRhdGFbcF0gaW5zdGFuY2VvZiBBcnJheSBhbmQgIWRhdGFbcF0uX19vcHRpbWl6ZWRcbiAgICAgICAgICAgICAgICBkYXRhW3BdLl9fb3B0aW1pemVkID0geWVzXG4gICAgICAgICAgICAgICAgZm9yIGUgaW4gZGF0YVtwXVxuICAgICAgICAgICAgICAgICAgICBAb3B0aW1pemVWYXJpYWJsZUFjY2VzcyhlKVxuICAgICAgICAgICAgZWxzZSBpZiBwID09IFwiZG9tYWluXCIgYW5kIGRhdGEuc2NvcGUgPiAwIGFuZCBkYXRhLmluZGV4P1xuICAgICAgICAgICAgICAgIGRvbWFpbkluZGV4ID0gR2FtZU1hbmFnZXIudmFyaWFibGVTdG9yZS5kb21haW5zLmluZGV4T2YoZGF0YVtwXSlcbiAgICAgICAgICAgICAgICBkYXRhW3BdID0gaWYgZG9tYWluSW5kZXggPT0gLTEgdGhlbiBkYXRhW3BdIGVsc2UgZG9tYWluSW5kZXhcbiAgICAgICAgICAgIGVsc2UgaWYgdHlwZW9mIGRhdGFbcF0gPT0gXCJvYmplY3RcIiBhbmQgIShkYXRhW3BdIGluc3RhbmNlb2YgU3RyaW5nIHx8IGRhdGFbcF0gaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgICAgICBAb3B0aW1pemVWYXJpYWJsZUFjY2VzcyhkYXRhW3BdKSBpZiBub3QgZGF0YVtwXT8uX19vcHRpbWl6ZWRcbiAgICAgICAgICAgICAgICBkYXRhW3BdPy5fX29wdGltaXplZCA9IHllc1xuICAgICAgIFxuICAgIFxuICAgICMjIypcbiAgICAqIE9wdGltaXplcyBhIHNpbmdsZSBzdWItbWVzc2FnZSBjcmVhdGVkIGJ5IHtDUH0gdGV4dCBjb2RlLiBJdCB3aWxsIHNwbGl0IHRoZSBzdWItbWVzc2FnZSBpbnRvIG11bHRpcGxlXG4gICAgKiBpbmRlcGVuZGVudCBTaG93TWVzc2FnZSBjb21tYW5kcyBhdCB7UH0gdGV4dCBjb2RlLlxuICAgICpcbiAgICAqIEBtZXRob2Qgb3B0aW1pemVTdWJNZXNzYWdlXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgc3ViIG1lc3NhZ2UuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gY29tbWFuZCAtIFRoZSBjb21tYW5kIHRvIG9wdGltaXplLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gSW5kZXggb2YgdGhlIGNvbW1hbmQgaW4gY29tbWFuZC1saXN0LlxuICAgICogQHBhcmFtIHtPYmplY3RbXX0gY29tbWFuZHMgLSBBIGxpc3Qgb2YgY29tbWFuZHMuXG4gICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjdXJyZW50IGNvbW1hbmQtcG9pbnRlciB3aGVyZSBhZGQvaW5zZXJ0IHRoZSBuZXh0IGNvbW1hbmQgKElmIG5lY2Vzc2FyeSkuXG4gICAgKiBAc3RhdGljXG4gICAgIyMjICBcbiAgICBvcHRpbWl6ZVN1Yk1lc3NhZ2U6IChtZXNzYWdlLCBjb21tYW5kLCBpbmRleCwgY29tbWFuZHMpIC0+XG4gICAgICAgIHN1Yk1lc3NhZ2VzID0gbWVzc2FnZS5zcGxpdChcIntQfVwiKVxuICAgICAgICBmb3Igc3ViTWVzc2FnZSwgaSBpbiBzdWJNZXNzYWdlc1xuICAgICAgICAgICAgbWVzc2FnZUNvbW1hbmQgPSBPYmplY3QuZmxhdENvcHkoY29tbWFuZClcbiAgICAgICAgICAgIG1lc3NhZ2VDb21tYW5kLnBhcmFtcyA9IE9iamVjdC5mbGF0Q29weShtZXNzYWdlQ29tbWFuZC5wYXJhbXMpXG4gICAgICAgICAgICBpZiBpID09IDBcbiAgICAgICAgICAgICAgICBtZXNzYWdlQ29tbWFuZC5wYXJhbXMubWVzc2FnZSA9IHN1Yk1lc3NhZ2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBtZXNzYWdlQ29tbWFuZC5wYXJhbXMubWVzc2FnZSA9IHN1Yk1lc3NhZ2UucmVwbGFjZShcIlxcblwiLCBcIlwiKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY29tbWFuZHMuc3BsaWNlKGluZGV4LCAwLCBtZXNzYWdlQ29tbWFuZClcbiAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIE9wdGltaXplcyBhIHNpbmdsZSBTaG93TWVzc2FnZSBjb21tYW5kLiBJdCB3aWxsIHNwbGl0IHRoZSBjb21tYW5kIGludG8gbXVsdGlwbGVcbiAgICAqIGluZGVwZW5kZW50IFNob3dNZXNzYWdlIGNvbW1hbmRzIGF0IHtQfSB0ZXh0IGNvZGUgZm9yIGV4YW1wbGUuXG4gICAgKlxuICAgICogQG1ldGhvZCBvcHRpbWl6ZVNob3dNZXNzYWdlXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtPYmplY3R9IGNvbW1hbmQgLSBUaGUgY29tbWFuZCB0byBvcHRpbWl6ZS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEluZGV4IG9mIHRoZSBjb21tYW5kIGluIGNvbW1hbmQtbGlzdC5cbiAgICAqIEBwYXJhbSB7T2JqZWN0W119IGNvbW1hbmRzIC0gQSBsaXN0IG9mIGNvbW1hbmRzLlxuICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgY3VycmVudCBjb21tYW5kLXBvaW50ZXIgd2hlcmUgYWRkL2luc2VydCB0aGUgbmV4dCBjb21tYW5kIChJZiBuZWNlc3NhcnkpLlxuICAgICogQHN0YXRpY1xuICAgICMjIyAgICAgXG4gICAgb3B0aW1pemVTaG93TWVzc2FnZTogKGNvbW1hbmQsIGluZGV4LCBjb21tYW5kcykgLT4gXG4gICAgICAgIG1zZyA9IGxjcyhjb21tYW5kLnBhcmFtcy5tZXNzYWdlKVxuICAgICAgICBcbiAgICAgICAgaWYgbXNnLmNvbnRhaW5zKFwie0NQfVwiKSBvciBtc2cuY29udGFpbnMoXCJ7UH1cIilcbiAgICAgICAgICAgIGNvbW1hbmRzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgIHN1Yk1lc3NhZ2VzID0gbXNnLnNwbGl0KFwie0NQfVwiKVxuICAgICAgICAgICAgZm9yIHN1Yk1lc3NhZ2UsIGkgaW4gc3ViTWVzc2FnZXNcbiAgICAgICAgICAgICAgICBpbmRleCA9IEBvcHRpbWl6ZVN1Yk1lc3NhZ2Uoc3ViTWVzc2FnZSwgY29tbWFuZCwgaW5kZXgsIGNvbW1hbmRzKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIGkgPCBzdWJNZXNzYWdlcy5sZW5ndGgtMVxuICAgICAgICAgICAgICAgICAgICBjbGVhckNvbW1hbmQgPSB7IGlkOiBcImdzLkNsZWFyTWVzc2FnZVwiLCBpbmRlbnQ6IGNvbW1hbmQuaW5kZW50LCBwYXJhbXM6IHsgZmllbGRGbGFnczogeyBkdXJhdGlvbjogMSB9LCBkdXJhdGlvbjogMzAsIHdhaXRGb3JDb21wbGV0aW9uOiB5ZXMgfSB9XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLnNwbGljZShpbmRleCwgMCwgY2xlYXJDb21tYW5kKVxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaW5kZXgtLVxuICAgICAgICAgICAgICAgIFxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogT3B0aW1pemVzIGEgc2luZ2xlIGNvbW1hbmQuXG4gICAgKlxuICAgICogQG1ldGhvZCBvcHRpbWl6ZUNvbW1hbmRcbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSBjb21tYW5kcyAtIEEgbGlzdCBvZiBjb21tYW5kcy5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEluZGV4IG9mIHRoZSBjb21tYW5kIGluIGNvbW1hbmQtbGlzdC5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21tYW5kIC0gVGhlIGNvbW1hbmQgdG8gb3B0aW1pemUuXG4gICAgKiBAc3RhdGljXG4gICAgIyMjICAgICBcbiAgICBvcHRpbWl6ZUNvbW1hbmQ6IChjb21tYW5kLCBpbmRleCwgY29tbWFuZHMpIC0+XG4gICAgICAgIEBvcHRpbWl6ZVZhcmlhYmxlQWNjZXNzKGNvbW1hbmQucGFyYW1zKVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoIGNvbW1hbmQuaWRcbiAgICAgICAgICAgIHdoZW4gXCJncy5TaG93TWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgaW5kZXggPSBAb3B0aW1pemVTaG93TWVzc2FnZShjb21tYW5kLCBpbmRleCwgY29tbWFuZHMpXG4gICAgICAgICAgICB3aGVuIFwiZ3MuQ2FsbENvbW1vbkV2ZW50XCJcbiAgICAgICAgICAgICAgICBAb3B0aW1pemVDb21tb25FdmVudENhbGwoY29tbWFuZCwgaW5kZXgsIGNvbW1hbmRzKVxuICAgICAgICAgICAgd2hlbiBcImdzLkxhYmVsXCJcbiAgICAgICAgICAgICAgICBAbGFiZWxzW2NvbW1hbmQucGFyYW1zLm5hbWVdID0gaW5kZXhcbiAgICAgICAgICAgICAgICBAbGFiZWxKdW1wc1tjb21tYW5kLnBhcmFtcy5uYW1lXT8uZm9yRWFjaCAoYykgLT4gYy5wYXJhbXMubGFiZWxJbmRleCA9IGluZGV4XG4gICAgICAgICAgICB3aGVuIFwidm4uQ2hvaWNlXCJcbiAgICAgICAgICAgICAgICBjb21tYW5kLnBhcmFtcy5hY3Rpb24ubGFiZWxJbmRleCA9IEBsYWJlbHNbY29tbWFuZC5wYXJhbXMuYWN0aW9uLmxhYmVsXVxuICAgICAgICAgICAgICAgIGlmICFAbGFiZWxKdW1wc1tjb21tYW5kLnBhcmFtcy5hY3Rpb24ubGFiZWxdXG4gICAgICAgICAgICAgICAgICAgIEBsYWJlbEp1bXBzW2NvbW1hbmQucGFyYW1zLmFjdGlvbi5sYWJlbF0gPSBbXVxuICAgICAgICAgICAgICAgIEBsYWJlbEp1bXBzW2NvbW1hbmQucGFyYW1zLmFjdGlvbi5sYWJlbF0ucHVzaChjb21tYW5kKVxuICAgICAgICAgICAgd2hlbiBcImdzLkNoZWNrU3dpdGNoXCIsIFwiZ3MuQ2hlY2tOdW1iZXJWYXJpYWJsZVwiLCBcImdzLkNoZWNrVGV4dFZhcmlhYmxlXCJcbiAgICAgICAgICAgICAgICBjb21tYW5kLnBhcmFtcy5sYWJlbEluZGV4ID0gQGxhYmVsc1tjb21tYW5kLnBhcmFtcy5sYWJlbF1cbiAgICAgICAgICAgICAgICBpZiAhQGxhYmVsSnVtcHNbY29tbWFuZC5wYXJhbXMubGFiZWxdXG4gICAgICAgICAgICAgICAgICAgIEBsYWJlbEp1bXBzW2NvbW1hbmQucGFyYW1zLmxhYmVsXSA9IFtdXG4gICAgICAgICAgICAgICAgQGxhYmVsSnVtcHNbY29tbWFuZC5wYXJhbXMubGFiZWxdLnB1c2goY29tbWFuZClcbiAgICAgICAgICAgICN3aGVuIFwiZ3MuQWRkSG90c3BvdFwiXG4gICAgICAgICAgICAjICAgIGNvbW1hbmQucGFyYW1zLmFjdGlvbnMub25DbGlja1xuICAgICAgICAgICAgd2hlbiBcImdzLkp1bXBUb0xhYmVsXCJcbiAgICAgICAgICAgICAgICBjb21tYW5kLnBhcmFtcy5sYWJlbEluZGV4ID0gQGxhYmVsc1tjb21tYW5kLnBhcmFtcy5uYW1lXVxuICAgICAgICAgICAgICAgIGlmICFAbGFiZWxKdW1wc1tjb21tYW5kLnBhcmFtcy5uYW1lXVxuICAgICAgICAgICAgICAgICAgICBAbGFiZWxKdW1wc1tjb21tYW5kLnBhcmFtcy5uYW1lXSA9IFtdXG4gICAgICAgICAgICAgICAgQGxhYmVsSnVtcHNbY29tbWFuZC5wYXJhbXMubmFtZV0ucHVzaChjb21tYW5kKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIE9wdGltaXplcyBhIGxpc3Qgb2YgZXZlbnQvc2NlbmUgY29tbWFuZHMgYnkgcmVtb3ZpbmcgdW5uZWNlc3NhcnkgY29tbWFuZHMgbGlrZVxuICAgICogY29tbWVudHMgb3IgZW1wdHkgY29tbWFuZHMuIEl0IGFsc28gb3B0aW1pemVzIGxhYmVsIGp1bXBzLiBBZGRzIGFuIDxiPm9wdGltaXplZDwvYj4gdG9cbiAgICAqIHRoZSBzcGVjaWZpZWQgY29tbWFuZC1saXN0IHRvIGluZGljYXRlIHRoYXQgdGhlIGxpc3Qgd2FzIGFscmVhZHkgb3B0aW1pemVkLiBJZiA8Yj5vcHRpbWl6ZWQ8L2I+XG4gICAgKiBwcm9wZXJ0eSBvZiBjb21tYW5kLWxpc3QgaXMgc2V0IHRvIDxiPnRydWU8L2I+IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGltbWVkaWF0ZWx5LlxuICAgICpcbiAgICAqIEBtZXRob2Qgb3B0aW1pemVFdmVudENvbW1hbmRzXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSBjb21tYW5kcyAtIEEgbGlzdCBvZiBjb21tYW5kcyB0byBvcHRpbWl6ZS5cbiAgICAqIEBzdGF0aWNcbiAgICAjIyMgICAgICAgXG4gICAgb3B0aW1pemVFdmVudENvbW1hbmRzOiAoY29tbWFuZHMpIC0+XG4gICAgICAgIHJldHVybiBpZiBjb21tYW5kcy5vcHRpbWl6ZWRcblxuICAgICAgICBpID0gMFxuICAgICAgICBAbGFiZWxzID0ge31cbiAgICAgICAgQGxhYmVsSnVtcHMgPSB7fVxuICAgICAgICBpZiAhJFBBUkFNUy5wcmV2aWV3XG4gICAgICAgICAgICB3aGlsZSBpIDwgY29tbWFuZHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgY29tbWFuZHNbaV0uaW5kZW50ID0gY29tbWFuZHNbaV0uaW5kZW50IHx8IDBcbiAgICAgICAgICAgICAgICBpZiBAcmVtb3ZlRW1wdHlDb21tYW5kKGNvbW1hbmRzW2ldLCBpLCBjb21tYW5kcylcbiAgICAgICAgICAgICAgICAgICAgaS0tXG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlIGkgPCBjb21tYW5kcy5sZW5ndGhcbiAgICAgICAgICAgIGkgPSBAb3B0aW1pemVDb21tYW5kKGNvbW1hbmRzW2ldLCBpLCBjb21tYW5kcylcbiAgICAgICAgICAgIGkrK1xuICAgICAgICBjb21tYW5kcy5vcHRpbWl6ZWQgPSB5ZXNcbiAgICAgICAgXG4gICAgICAgIFxud2luZG93LkRhdGFPcHRpbWl6ZXIgPSBuZXcgRGF0YU9wdGltaXplcigpXG5ncy5EYXRhT3B0aW1pemVyID0gRGF0YU9wdGltaXplciJdfQ==
//# sourceURL=DataOptimizer_0.js