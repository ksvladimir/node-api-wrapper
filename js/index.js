'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Streak = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['pipelines/', ''], ['pipelines/', '']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/boxes'], ['pipelines/', '/boxes']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/boxes?stageKey=', ''], ['pipelines/', '/boxes?stageKey=', '']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/newsfeed'], ['pipelines/', '/newsfeed']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/stages'], ['pipelines/', '/stages']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/stages/', ''], ['pipelines/', '/stages/', '']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/fields'], ['pipelines/', '/fields']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/fields/', ''], ['pipelines/', '/fields/', '']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['boxes/', ''], ['boxes/', '']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/fields'], ['boxes/', '/fields']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/reminders'], ['boxes/', '/reminders']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/comments'], ['boxes/', '/comments']),
    _templateObject13 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/meetings'], ['boxes/', '/meetings']),
    _templateObject14 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/files'], ['boxes/', '/files']),
    _templateObject15 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/threads'], ['boxes/', '/threads']),
    _templateObject16 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/newsfeed'], ['boxes/', '/newsfeed']),
    _templateObject17 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/tasks'], ['boxes/', '/tasks']),
    _templateObject18 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/fields/', ''], ['boxes/', '/fields/', '']),
    _templateObject19 = (0, _taggedTemplateLiteral3.default)(['files/', ''], ['files/', '']),
    _templateObject20 = (0, _taggedTemplateLiteral3.default)(['files/', '/contents'], ['files/', '/contents']),
    _templateObject21 = (0, _taggedTemplateLiteral3.default)(['threads/', ''], ['threads/', '']),
    _templateObject22 = (0, _taggedTemplateLiteral3.default)(['tasks/', ''], ['tasks/', '']),
    _templateObject23 = (0, _taggedTemplateLiteral3.default)(['search?query=', ''], ['search?query=', '']);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _autoEncodeUri = require('./auto-encode-uri');

var _autoEncodeUri2 = _interopRequireDefault(_autoEncodeUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnHelper = function () {
  function ConnHelper(authKey) {
    (0, _classCallCheck3.default)(this, ConnHelper);

    this._authKey = authKey;
  }

  (0, _createClass3.default)(ConnHelper, [{
    key: '_getRequestOptions',
    value: function _getRequestOptions(method, path) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'utf8';

      // By default we request the V1 of the API
      var prefix = '/api/v1/';

      // If the requested resource is a Task or a Meeting, then use the V2 of the API
      if (path.indexOf('tasks') > -1 || path.indexOf('meetings') > -1) prefix = '/api/v2/';

      return {
        method: method, headers: headers, encoding: encoding,
        host: 'mailfoogae.appspot.com',
        path: prefix + path,
        auth: this._authKey
      };
    }
  }, {
    key: '_parseResponse',
    value: function _parseResponse(response) {
      return new _promise2.default(function (resolve, reject) {
        var strs = [];
        response.on('data', function (chunk) {
          strs.push(chunk);
        });
        response.on('end', function () {
          try {
            var str = strs.join('');
            if (response.statusCode === 200) {
              resolve(JSON.parse(str));
            } else {
              var json = void 0;
              var errorMessage = 'Response code ' + response.statusCode;
              try {
                json = JSON.parse(str);
                if (json && json.error) {
                  errorMessage = json.error;
                }
              } catch (err) {
                // Ignore parse error
              }
              reject((0, _assign2.default)(new Error(errorMessage), {
                str: str, json: json,
                statusCode: response.statusCode,
                headers: response.headers
              }));
            }
          } catch (err) {
            reject(err);
          }
        });
        response.on('error', reject);
      });
    }
  }, {
    key: '_plainResponse',
    value: function _plainResponse(response) {
      return new _promise2.default(function (resolve, reject) {
        var chunks = [];
        response.on('data', function (chunk) {
          chunks.push(chunk);
        });
        response.on('end', function () {
          try {
            var buf = Buffer.concat(chunks);
            if (response.statusCode === 200) {
              resolve(buf);
            } else {
              var errorMessage = 'Response code ' + response.statusCode;
              reject((0, _assign2.default)(new Error(errorMessage), {
                buf: buf,
                statusCode: response.statusCode,
                headers: response.headers
              }));
            }
          } catch (err) {
            reject(err);
          }
        });
        response.on('error', reject);
      });
    }
  }, {
    key: 'get',
    value: function get(path) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this._getRequestOptions('GET', path);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'getNoParse',
    value: function getNoParse(path) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this2._getRequestOptions('GET', path, undefined, null);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this2._plainResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'put',
    value: function put(path, data) {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        var dstr = _querystring2.default.stringify(data);
        var opts = _this3._getRequestOptions('PUT', path + '?' + dstr);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this3._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'delete',
    value: function _delete(path) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this4._getRequestOptions('DELETE', path);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this4._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'post',
    value: function post(path, data) {
      var _this5 = this;

      return new _promise2.default(function (resolve, reject) {
        var send = _querystring2.default.stringify({ json: (0, _stringify2.default)(data) });
        var opts = _this5._getRequestOptions('POST', path, {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': send.length
        });
        var request = _https2.default.request(opts, function (res) {
          resolve(_this5._parseResponse(res));
        });
        request.write(send);
        request.on('error', reject);
        request.end();
      });
    }
  }]);
  return ConnHelper;
}();

var Me = function () {
  function Me(s, c) {
    (0, _classCallCheck3.default)(this, Me);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Me, [{
    key: 'get',
    value: function get() {
      return this._c.get('users/me');
    }
  }]);
  return Me;
}();

var Pipelines = function () {
  function Pipelines(s, c) {
    (0, _classCallCheck3.default)(this, Pipelines);

    this._s = s;
    this._c = c;
    this.Stages = new PipelineStages(s, c);
    this.Fields = new PipelineFields(s, c);
  }

  (0, _createClass3.default)(Pipelines, [{
    key: 'getAll',
    value: function getAll() {
      return this._c.get('pipelines');
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject, key));
    }
  }, {
    key: 'getBoxes',
    value: function getBoxes(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject2, key));
    }
  }, {
    key: 'getBoxesInStage',
    value: function getBoxesInStage(key, stageKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject3, key, stageKey));
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this._c.put('pipelines', data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject, key));
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject, data.key), data);
    }
  }, {
    key: 'getFeed',
    value: function getFeed(key, detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject4, key) + qs);
    }
  }]);
  return Pipelines;
}();

var PipelineStages = function () {
  function PipelineStages(s, c) {
    (0, _classCallCheck3.default)(this, PipelineStages);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(PipelineStages, [{
    key: 'getAll',
    value: function getAll(pipeKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject5, pipeKey));
    }
  }, {
    key: 'getOne',
    value: function getOne(pipeKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject6, pipeKey, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject5, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(pipeKey, key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject6, pipeKey, key));
    }
  }, {
    key: 'update',
    value: function update(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject6, pipeKey, data.key), data);
    }
  }]);
  return PipelineStages;
}();

var PipelineFields = function () {
  function PipelineFields(s, c) {
    (0, _classCallCheck3.default)(this, PipelineFields);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(PipelineFields, [{
    key: 'getAll',
    value: function getAll(pipeKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject7, pipeKey));
    }
  }, {
    key: 'getOne',
    value: function getOne(pipeKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject8, pipeKey, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject7, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(pipeKey, key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject8, pipeKey, key));
    }
  }, {
    key: 'update',
    value: function update(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject8, pipeKey, data.key), data);
    }
  }]);
  return PipelineFields;
}();

var Boxes = function () {
  function Boxes(s, c) {
    (0, _classCallCheck3.default)(this, Boxes);

    this._s = s;
    this._c = c;
    this.Fields = new BoxFields(s, c);
  }

  (0, _createClass3.default)(Boxes, [{
    key: 'getAll',
    value: function getAll() {
      return this._c.get('boxes');
    }
  }, {
    key: 'getForPipeline',
    value: function getForPipeline(key) {
      return this._s.Pipelines.getBoxes(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject9, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject2, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject9, key));
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject9, data.key), data);
    }
  }, {
    key: 'getFields',
    value: function getFields(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject10, key));
    }
  }, {
    key: 'getReminders',
    value: function getReminders(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject11, key));
    }
  }, {
    key: 'getComments',
    value: function getComments(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject12, key));
    }
    // deprecated method

  }, {
    key: 'createComment',
    value: function createComment(key, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject12, key), data);
    }
  }, {
    key: 'postComment',
    value: function postComment(key, message) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject12, key), { message: message });
    }
  }, {
    key: 'getMeetings',
    value: function getMeetings(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject13, key)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'getFiles',
    value: function getFiles(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject14, key));
    }
  }, {
    key: 'getThreads',
    value: function getThreads(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject15, key));
    }
  }, {
    key: 'getFeed',
    value: function getFeed(key, detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject16, key) + qs);
    }
  }, {
    key: 'getTasks',
    value: function getTasks(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject17, key));
    }
  }]);
  return Boxes;
}();

var BoxFields = function () {
  function BoxFields(s, c) {
    (0, _classCallCheck3.default)(this, BoxFields);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(BoxFields, [{
    key: 'getForBox',
    value: function getForBox(key) {
      return this._s.Boxes.getFields(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(boxKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject18, boxKey, key));
    }
  }, {
    key: 'update',
    value: function update(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject18, boxKey, data.key), data);
    }
  }]);
  return BoxFields;
}();

var Files = function () {
  function Files(s, c) {
    (0, _classCallCheck3.default)(this, Files);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Files, [{
    key: 'getForBox',
    value: function getForBox(key) {
      return this._s.Boxes.getFiles(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject19, key));
    }
  }, {
    key: 'getContents',
    value: function getContents(key) {
      return this._c.getNoParse((0, _autoEncodeUri2.default)(_templateObject20, key));
    }
  }]);
  return Files;
}();

var Threads = function () {
  function Threads(s, c) {
    (0, _classCallCheck3.default)(this, Threads);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Threads, [{
    key: 'getForBox',
    value: function getForBox(boxKey) {
      return this._s.Boxes.getThreads(boxKey);
    }
  }, {
    key: 'getOne',
    value: function getOne(threadKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject21, threadKey));
    }
  }]);
  return Threads;
}();

var Tasks = function () {
  function Tasks(s, c) {
    (0, _classCallCheck3.default)(this, Tasks);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Tasks, [{
    key: 'getForBox',
    value: function getForBox(boxKey) {
      return this._s.Boxes.getTasks(boxKey);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject22, key));
    }
  }, {
    key: 'create',
    value: function create(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject17, boxKey), data);
    }
  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject22, key), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject22, key));
    }
  }]);
  return Tasks;
}();

var Streak = exports.Streak = function () {
  function Streak(authKey) {
    (0, _classCallCheck3.default)(this, Streak);

    this._c = new ConnHelper(authKey);
    this.Me = new Me(this, this._c);
    this.Pipelines = new Pipelines(this, this._c);
    this.Boxes = new Boxes(this, this._c);
    this.Files = new Files(this, this._c);
    this.Threads = new Threads(this, this._c);
    this.Tasks = new Tasks(this, this._c);
  }

  (0, _createClass3.default)(Streak, [{
    key: 'search',
    value: function search(query) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject23, query));
    }
  }]);
  return Streak;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25uSGVscGVyIiwiYXV0aEtleSIsIl9hdXRoS2V5IiwibWV0aG9kIiwicGF0aCIsImhlYWRlcnMiLCJlbmNvZGluZyIsInByZWZpeCIsImluZGV4T2YiLCJob3N0IiwiYXV0aCIsInJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0cnMiLCJvbiIsImNodW5rIiwicHVzaCIsInN0ciIsImpvaW4iLCJzdGF0dXNDb2RlIiwiSlNPTiIsInBhcnNlIiwianNvbiIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiZXJyIiwiRXJyb3IiLCJjaHVua3MiLCJidWYiLCJCdWZmZXIiLCJjb25jYXQiLCJvcHRzIiwiX2dldFJlcXVlc3RPcHRpb25zIiwicmVxdWVzdCIsIl9wYXJzZVJlc3BvbnNlIiwicmVzIiwiZW5kIiwidW5kZWZpbmVkIiwiX3BsYWluUmVzcG9uc2UiLCJkYXRhIiwiZHN0ciIsInN0cmluZ2lmeSIsInNlbmQiLCJsZW5ndGgiLCJ3cml0ZSIsIk1lIiwicyIsImMiLCJfcyIsIl9jIiwiZ2V0IiwiUGlwZWxpbmVzIiwiU3RhZ2VzIiwiUGlwZWxpbmVTdGFnZXMiLCJGaWVsZHMiLCJQaXBlbGluZUZpZWxkcyIsImtleSIsInN0YWdlS2V5IiwicHV0IiwiZGVsZXRlIiwicG9zdCIsImRldGFpbExldmVsIiwicXMiLCJwaXBlS2V5IiwiQm94ZXMiLCJCb3hGaWVsZHMiLCJnZXRCb3hlcyIsIm1lc3NhZ2UiLCJ0aGVuIiwicmVzdWx0cyIsImdldEZpZWxkcyIsImJveEtleSIsIkZpbGVzIiwiZ2V0RmlsZXMiLCJnZXROb1BhcnNlIiwiVGhyZWFkcyIsImdldFRocmVhZHMiLCJ0aHJlYWRLZXkiLCJUYXNrcyIsImdldFRhc2tzIiwiU3RyZWFrIiwicXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNB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Z0IsS0FBSzdCLEVBQXJCLENBQWI7QUFDRDs7OzsyQkFFTWdDLEssRUFBZ0M7QUFDckMsYUFBTyxLQUFLaEMsRUFBTCxDQUFRQyxHQUFSLGlEQUFnQytCLEtBQWhDLEVBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuXG5pbXBvcnQgYWV1IGZyb20gJy4vYXV0by1lbmNvZGUtdXJpJztcblxuY2xhc3MgQ29ubkhlbHBlciB7XG4gIF9hdXRoS2V5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoYXV0aEtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYXV0aEtleSA9IGF1dGhLZXk7XG4gIH1cblxuICBfZ2V0UmVxdWVzdE9wdGlvbnMobWV0aG9kOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaGVhZGVyczogT2JqZWN0PXt9LCBlbmNvZGluZzogP3N0cmluZz0ndXRmOCcpOiBPYmplY3Qge1xuICAgIC8vIEJ5IGRlZmF1bHQgd2UgcmVxdWVzdCB0aGUgVjEgb2YgdGhlIEFQSVxuICAgIGxldCBwcmVmaXggPSAnL2FwaS92MS8nO1xuXG4gICAgLy8gSWYgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBpcyBhIFRhc2sgb3IgYSBNZWV0aW5nLCB0aGVuIHVzZSB0aGUgVjIgb2YgdGhlIEFQSVxuICAgIGlmIChwYXRoLmluZGV4T2YoJ3Rhc2tzJykgPiAtMSB8fCBwYXRoLmluZGV4T2YoJ21lZXRpbmdzJykgPiAtMSkgcHJlZml4ID0gJy9hcGkvdjIvJztcblxuICAgIHJldHVybiB7XG4gICAgICBtZXRob2QsIGhlYWRlcnMsIGVuY29kaW5nLFxuICAgICAgaG9zdDogJ21haWxmb29nYWUuYXBwc3BvdC5jb20nLFxuICAgICAgcGF0aDogcHJlZml4ICsgcGF0aCxcbiAgICAgIGF1dGg6IHRoaXMuX2F1dGhLZXlcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUmVzcG9uc2UocmVzcG9uc2U6IGh0dHBzLkluY29taW5nTWVzc2FnZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHN0cnM6IHN0cmluZ1tdID0gW107XG4gICAgICByZXNwb25zZS5vbignZGF0YScsIChjaHVuazogc3RyaW5nKSA9PiB7XG4gICAgICAgIHN0cnMucHVzaChjaHVuayk7XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3RyID0gc3Rycy5qb2luKCcnKTtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2Uoc3RyKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBqc29uO1xuICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGBSZXNwb25zZSBjb2RlICR7cmVzcG9uc2Uuc3RhdHVzQ29kZX1gO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2Uoc3RyKTtcbiAgICAgICAgICAgICAgaWYgKGpzb24gJiYganNvbi5lcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGpzb24uZXJyb3I7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAvLyBJZ25vcmUgcGFyc2UgZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdChPYmplY3QuYXNzaWduKChuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTogT2JqZWN0KSwge1xuICAgICAgICAgICAgICBzdHIsIGpzb24sXG4gICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnNcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICBfcGxhaW5SZXNwb25zZShyZXNwb25zZTogaHR0cHMuSW5jb21pbmdNZXNzYWdlKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFtdO1xuICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgYnVmID0gQnVmZmVyLmNvbmNhdChjaHVua3MpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoYnVmKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFJlc3BvbnNlIGNvZGUgJHtyZXNwb25zZS5zdGF0dXNDb2RlfWA7XG4gICAgICAgICAgICByZWplY3QoT2JqZWN0LmFzc2lnbigobmV3IEVycm9yKGVycm9yTWVzc2FnZSk6IE9iamVjdCksIHtcbiAgICAgICAgICAgICAgYnVmLFxuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZXJyb3InLCByZWplY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KHBhdGg6IHN0cmluZyk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnR0VUJywgcGF0aCk7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BhcnNlUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXROb1BhcnNlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnR0VUJywgcGF0aCwgdW5kZWZpbmVkLCBudWxsKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGxhaW5SZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1dChwYXRoOiBzdHJpbmcsIGRhdGE6IE9iamVjdCk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGRzdHIgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ1BVVCcsIHBhdGggKyAnPycgKyBkc3RyKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ0RFTEVURScsIHBhdGgpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcG9zdChwYXRoOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHNlbmQgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe2pzb246SlNPTi5zdHJpbmdpZnkoZGF0YSl9KTtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnUE9TVCcsIHBhdGgsIHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgICAnQ29udGVudC1MZW5ndGgnOiBzZW5kLmxlbmd0aFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BhcnNlUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qud3JpdGUoc2VuZCk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIE1lIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoJ3VzZXJzL21lJyk7XG4gIH1cbn1cblxuY2xhc3MgUGlwZWxpbmVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIFN0YWdlczogUGlwZWxpbmVTdGFnZXM7XG4gIEZpZWxkczogUGlwZWxpbmVGaWVsZHM7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICAgIHRoaXMuU3RhZ2VzID0gbmV3IFBpcGVsaW5lU3RhZ2VzKHMsIGMpO1xuICAgIHRoaXMuRmllbGRzID0gbmV3IFBpcGVsaW5lRmllbGRzKHMsIGMpO1xuICB9XG4gIGdldEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoJ3BpcGVsaW5lcycpO1xuICB9XG4gIGdldE9uZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke2tleX1gKTtcbiAgfVxuICBnZXRCb3hlcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke2tleX0vYm94ZXNgKTtcbiAgfVxuICBnZXRCb3hlc0luU3RhZ2UgKGtleTogc3RyaW5nLCBzdGFnZUtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7a2V5fS9ib3hlcz9zdGFnZUtleT0ke3N0YWdlS2V5fWApO1xuICB9XG4gIGNyZWF0ZShkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoJ3BpcGVsaW5lcycsIGRhdGEpO1xuICB9XG4gIGRlbGV0ZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXUgYHBpcGVsaW5lcy8ke2tleX1gKTtcbiAgfVxuICB1cGRhdGUoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHBpcGVsaW5lcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG4gIGdldEZlZWQoa2V5OiBzdHJpbmcsIGRldGFpbExldmVsOiA/c3RyaW5nKSB7XG4gICAgbGV0IHFzID0gJyc7XG4gICAgaWYgKGRldGFpbExldmVsKSB7XG4gICAgICBxcyArPSAnPycgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe2RldGFpbExldmVsfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke2tleX0vbmV3c2ZlZWRgICsgcXMpO1xuICB9XG59XG5cbmNsYXNzIFBpcGVsaW5lU3RhZ2VzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldEFsbChwaXBlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXNgKTtcbiAgfVxuICBnZXRPbmUocGlwZUtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlcy8ke2tleX1gKTtcbiAgfVxuICBjcmVhdGUocGlwZUtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXNgLCBkYXRhKTtcbiAgfVxuICBkZWxldGUocGlwZUtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlcy8ke2tleX1gKTtcbiAgfVxuICB1cGRhdGUocGlwZUtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbn1cblxuY2xhc3MgUGlwZWxpbmVGaWVsZHMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0QWxsKHBpcGVLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkc2ApO1xuICB9XG4gIGdldE9uZShwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZShwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkc2AsIGRhdGEpO1xuICB9XG4gIGRlbGV0ZShwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzLyR7a2V5fWApO1xuICB9XG4gIHVwZGF0ZShwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtkYXRhLmtleX1gLCBkYXRhKTtcbiAgfVxufVxuXG5jbGFzcyBCb3hlcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBGaWVsZHM6IEJveEZpZWxkcztcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gICAgdGhpcy5GaWVsZHMgPSBuZXcgQm94RmllbGRzKHMsIGMpO1xuICB9XG4gIGdldEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoJ2JveGVzJyk7XG4gIH1cbiAgZ2V0Rm9yUGlwZWxpbmUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5QaXBlbGluZXMuZ2V0Qm94ZXMoa2V5KTtcbiAgfVxuICBnZXRPbmUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX1gKTtcbiAgfVxuICBjcmVhdGUocGlwZUtleSwgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L2JveGVzYCwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgYm94ZXMvJHtrZXl9YCk7XG4gIH1cbiAgdXBkYXRlKGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGBib3hlcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG4gIGdldEZpZWxkcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9maWVsZHNgKTtcbiAgfVxuICBnZXRSZW1pbmRlcnMoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX0vcmVtaW5kZXJzYCk7XG4gIH1cbiAgZ2V0Q29tbWVudHMoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX0vY29tbWVudHNgKTtcbiAgfVxuICAvLyBkZXByZWNhdGVkIG1ldGhvZFxuICBjcmVhdGVDb21tZW50KGtleTogc3RyaW5nLCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldSBgYm94ZXMvJHtrZXl9L2NvbW1lbnRzYCwgZGF0YSk7XG4gIH1cbiAgcG9zdENvbW1lbnQoa2V5OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dChhZXUgYGJveGVzLyR7a2V5fS9jb21tZW50c2AsIHttZXNzYWdlfSk7XG4gIH1cbiAgZ2V0TWVldGluZ3Moa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX0vbWVldGluZ3NgKS50aGVuKGRhdGEgPT4gZGF0YS5yZXN1bHRzKTtcbiAgfVxuICBnZXRGaWxlcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9maWxlc2ApO1xuICB9XG4gIGdldFRocmVhZHMoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX0vdGhyZWFkc2ApO1xuICB9XG4gIGdldEZlZWQoa2V5OiBzdHJpbmcsIGRldGFpbExldmVsOiA/c3RyaW5nKSB7XG4gICAgbGV0IHFzID0gJyc7XG4gICAgaWYgKGRldGFpbExldmVsKSB7XG4gICAgICBxcyArPSAnPycgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe2RldGFpbExldmVsfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9uZXdzZmVlZGAgKyBxcyk7XG4gIH1cbiAgZ2V0VGFza3Moa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX0vdGFza3NgKTtcbiAgfVxufVxuXG5jbGFzcyBCb3hGaWVsZHMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0Rm9yQm94KGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3MuQm94ZXMuZ2V0RmllbGRzKGtleSk7XG4gIH1cbiAgZ2V0T25lKGJveEtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7Ym94S2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cbiAgdXBkYXRlKGJveEtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgYm94ZXMvJHtib3hLZXl9L2ZpZWxkcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIEZpbGVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldEZvckJveChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldEZpbGVzKGtleSk7XG4gIH1cbiAgZ2V0T25lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgZmlsZXMvJHtrZXl9YCk7XG4gIH1cbiAgZ2V0Q29udGVudHMoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXROb1BhcnNlKGFldSBgZmlsZXMvJHtrZXl9L2NvbnRlbnRzYCk7XG4gIH1cbn1cblxuY2xhc3MgVGhyZWFkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRGb3JCb3goYm94S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRUaHJlYWRzKGJveEtleSk7XG4gIH1cbiAgZ2V0T25lKHRocmVhZEtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgdGhyZWFkcy8ke3RocmVhZEtleX1gKTtcbiAgfVxufVxuXG5jbGFzcyBUYXNrcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRGb3JCb3goYm94S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRUYXNrcyhib3hLZXkpO1xuICB9XG4gIGdldE9uZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHRhc2tzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZShib3hLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYGJveGVzLyR7Ym94S2V5fS90YXNrc2AsIGRhdGEpO1xuICB9XG4gIHVwZGF0ZShrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHRhc2tzLyR7a2V5fWAsIGRhdGEpO1xuICB9XG4gIGRlbGV0ZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXUgYHRhc2tzLyR7a2V5fWApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJlYWsge1xuICBfYzogQ29ubkhlbHBlcjtcbiAgTWU6IE1lO1xuICBQaXBlbGluZXM6IFBpcGVsaW5lcztcbiAgQm94ZXM6IEJveGVzO1xuICBGaWxlczogRmlsZXM7XG4gIFRocmVhZHM6IFRocmVhZHM7XG4gIFRhc2tzOiBUYXNrcztcblxuICBjb25zdHJ1Y3RvcihhdXRoS2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jID0gbmV3IENvbm5IZWxwZXIoYXV0aEtleSk7XG4gICAgdGhpcy5NZSA9IG5ldyBNZSh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLlBpcGVsaW5lcyA9IG5ldyBQaXBlbGluZXModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5Cb3hlcyA9IG5ldyBCb3hlcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLkZpbGVzID0gbmV3IEZpbGVzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuVGhyZWFkcyA9IG5ldyBUaHJlYWRzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuVGFza3MgPSBuZXcgVGFza3ModGhpcywgdGhpcy5fYyk7XG4gIH1cblxuICBzZWFyY2gocXVlcnk6IHN0cmluZyk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgc2VhcmNoP3F1ZXJ5PSR7cXVlcnl9YCk7XG4gIH1cbn1cbiJdfQ==