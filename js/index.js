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
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['newsfeed'], ['newsfeed']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/stages'], ['pipelines/', '/stages']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/stages/', ''], ['pipelines/', '/stages/', '']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/fields'], ['pipelines/', '/fields']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/fields/', ''], ['pipelines/', '/fields/', '']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['boxes/', ''], ['boxes/', '']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/fields'], ['boxes/', '/fields']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/reminders'], ['boxes/', '/reminders']),
    _templateObject13 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/comments'], ['boxes/', '/comments']),
    _templateObject14 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/meetings'], ['boxes/', '/meetings']),
    _templateObject15 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/files'], ['boxes/', '/files']),
    _templateObject16 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/threads'], ['boxes/', '/threads']),
    _templateObject17 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/newsfeed'], ['boxes/', '/newsfeed']),
    _templateObject18 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/tasks'], ['boxes/', '/tasks']),
    _templateObject19 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/fields/', ''], ['boxes/', '/fields/', '']),
    _templateObject20 = (0, _taggedTemplateLiteral3.default)(['files/', ''], ['files/', '']),
    _templateObject21 = (0, _taggedTemplateLiteral3.default)(['files/', '/contents'], ['files/', '/contents']),
    _templateObject22 = (0, _taggedTemplateLiteral3.default)(['threads/', ''], ['threads/', '']),
    _templateObject23 = (0, _taggedTemplateLiteral3.default)(['tasks/', ''], ['tasks/', '']),
    _templateObject24 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/webhooks'], ['pipelines/', '/webhooks']),
    _templateObject25 = (0, _taggedTemplateLiteral3.default)(['teams/', '/webhooks'], ['teams/', '/webhooks']),
    _templateObject26 = (0, _taggedTemplateLiteral3.default)(['webhooks/', ''], ['webhooks/', '']),
    _templateObject27 = (0, _taggedTemplateLiteral3.default)(['webhooks?pipelineKey=', ''], ['webhooks?pipelineKey=', '']),
    _templateObject28 = (0, _taggedTemplateLiteral3.default)(['webhooks?teamKey=', ''], ['webhooks?teamKey=', '']),
    _templateObject29 = (0, _taggedTemplateLiteral3.default)(['search?query=', ''], ['search?query=', '']);

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
      if (path.match(/tasks|meetings|webhooks/)) prefix = '/api/v2/';

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
  }, {
    key: 'getFeedAll',
    value: function getFeedAll(detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject5) + qs);
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject6, pipeKey));
    }
  }, {
    key: 'getOne',
    value: function getOne(pipeKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject7, pipeKey, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject6, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(pipeKey, key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject7, pipeKey, key));
    }
  }, {
    key: 'update',
    value: function update(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject7, pipeKey, data.key), data);
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject8, pipeKey));
    }
  }, {
    key: 'getOne',
    value: function getOne(pipeKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject9, pipeKey, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject8, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(pipeKey, key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject9, pipeKey, key));
    }
  }, {
    key: 'update',
    value: function update(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject9, pipeKey, data.key), data);
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject10, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject2, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject10, key));
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject10, data.key), data);
    }
  }, {
    key: 'getFields',
    value: function getFields(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject11, key));
    }
  }, {
    key: 'getReminders',
    value: function getReminders(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject12, key));
    }
  }, {
    key: 'getComments',
    value: function getComments(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject13, key));
    }
    // deprecated method

  }, {
    key: 'createComment',
    value: function createComment(key, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject13, key), data);
    }
  }, {
    key: 'postComment',
    value: function postComment(key, message) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject13, key), { message: message });
    }
  }, {
    key: 'getMeetings',
    value: function getMeetings(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject14, key)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'getFiles',
    value: function getFiles(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject15, key));
    }
  }, {
    key: 'getThreads',
    value: function getThreads(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject16, key));
    }
  }, {
    key: 'getFeed',
    value: function getFeed(key, detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject17, key) + qs);
    }
  }, {
    key: 'getTasks',
    value: function getTasks(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject18, key));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject19, boxKey, key));
    }
  }, {
    key: 'update',
    value: function update(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject19, boxKey, data.key), data);
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject20, key));
    }
  }, {
    key: 'getContents',
    value: function getContents(key) {
      return this._c.getNoParse((0, _autoEncodeUri2.default)(_templateObject21, key));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject22, threadKey));
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
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject23, key));
    }
  }, {
    key: 'create',
    value: function create(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject18, boxKey), data);
    }
  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject23, key), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject23, key));
    }
  }]);
  return Tasks;
}();

var Webhooks = function () {
  function Webhooks(s, c) {
    (0, _classCallCheck3.default)(this, Webhooks);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Webhooks, [{
    key: 'getForPipeline',
    value: function getForPipeline(pipelineKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject24, pipelineKey)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'getForTeam',
    value: function getForTeam(teamKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject25, teamKey)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject26, key));
    }
  }, {
    key: 'createForPipeline',
    value: function createForPipeline(pipelineKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject27, pipelineKey), data);
    }
  }, {
    key: 'createForTeam',
    value: function createForTeam(teamKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject28, teamKey), data);
    }
  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject26, key), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject26, key));
    }
  }]);
  return Webhooks;
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
    this.Webhooks = new Webhooks(this, this._c);
  }

  (0, _createClass3.default)(Streak, [{
    key: 'search',
    value: function search(query) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject29, query));
    }
  }]);
  return Streak;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25uSGVscGVyIiwiYXV0aEtleSIsIl9hdXRoS2V5IiwibWV0aG9kIiwicGF0aCIsImhlYWRlcnMiLCJlbmNvZGluZyIsInByZWZpeCIsIm1hdGNoIiwiaG9zdCIsImF1dGgiLCJyZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdHJzIiwib24iLCJjaHVuayIsInB1c2giLCJzdHIiLCJqb2luIiwic3RhdHVzQ29kZSIsIkpTT04iLCJwYXJzZSIsImpzb24iLCJlcnJvck1lc3NhZ2UiLCJlcnJvciIsImVyciIsIkVycm9yIiwiY2h1bmtzIiwiYnVmIiwiQnVmZmVyIiwiY29uY2F0Iiwib3B0cyIsIl9nZXRSZXF1ZXN0T3B0aW9ucyIsInJlcXVlc3QiLCJfcGFyc2VSZXNwb25zZSIsInJlcyIsImVuZCIsInVuZGVmaW5lZCIsIl9wbGFpblJlc3BvbnNlIiwiZGF0YSIsImRzdHIiLCJzdHJpbmdpZnkiLCJzZW5kIiwibGVuZ3RoIiwid3JpdGUiLCJNZSIsInMiLCJjIiwiX3MiLCJfYyIsImdldCIsIlBpcGVsaW5lcyIsIlN0YWdlcyIsIlBpcGVsaW5lU3RhZ2VzIiwiRmllbGRzIiwiUGlwZWxpbmVGaWVsZHMiLCJrZXkiLCJzdGFnZUtleSIsInB1dCIsImRlbGV0ZSIsInBvc3QiLCJkZXRhaWxMZXZlbCIsInFzIiwicGlwZUtleSIsIkJveGVzIiwiQm94RmllbGRzIiwiZ2V0Qm94ZXMiLCJtZXNzYWdlIiwidGhlbiIsInJlc3VsdHMiLCJnZXRGaWVsZHMiLCJib3hLZXkiLCJGaWxlcyIsImdldEZpbGVzIiwiZ2V0Tm9QYXJzZSIsIlRocmVhZHMiLCJnZXRUaHJlYWRzIiwidGhyZWFkS2V5IiwiVGFza3MiLCJnZXRUYXNrcyIsIldlYmhvb2tzIiwicGlwZWxpbmVLZXkiLCJ0ZWFtS2V5IiwiU3RyZWFrIiwicXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFJQSxPQUFKLENBQVksSUFBWixFQUFrQixLQUFLMUIsRUFBdkIsQ0FBZjtBQUNBLFNBQUs2QixLQUFMLEdBQWEsSUFBSUEsS0FBSixDQUFVLElBQVYsRUFBZ0IsS0FBSzdCLEVBQXJCLENBQWI7QUFDQSxTQUFLK0IsUUFBTCxHQUFnQixJQUFJQSxRQUFKLENBQWEsSUFBYixFQUFtQixLQUFLL0IsRUFBeEIsQ0FBaEI7QUFDRDs7OzsyQkFFTW1DLEssRUFBZ0M7QUFDckMsYUFBTyxLQUFLbkMsRUFBTCxDQUFRQyxHQUFSLGlEQUFnQ2tDLEtBQWhDLEVBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuXG5pbXBvcnQgYWV1IGZyb20gJy4vYXV0by1lbmNvZGUtdXJpJztcblxuY2xhc3MgQ29ubkhlbHBlciB7XG4gIF9hdXRoS2V5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoYXV0aEtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYXV0aEtleSA9IGF1dGhLZXk7XG4gIH1cblxuICBfZ2V0UmVxdWVzdE9wdGlvbnMobWV0aG9kOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaGVhZGVyczogT2JqZWN0PXt9LCBlbmNvZGluZzogP3N0cmluZz0ndXRmOCcpOiBPYmplY3Qge1xuICAgIC8vIEJ5IGRlZmF1bHQgd2UgcmVxdWVzdCB0aGUgVjEgb2YgdGhlIEFQSVxuICAgIGxldCBwcmVmaXggPSAnL2FwaS92MS8nO1xuXG4gICAgLy8gSWYgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBpcyBhIFRhc2sgb3IgYSBNZWV0aW5nLCB0aGVuIHVzZSB0aGUgVjIgb2YgdGhlIEFQSVxuICAgIGlmIChwYXRoLm1hdGNoKC90YXNrc3xtZWV0aW5nc3x3ZWJob29rcy8pKSBwcmVmaXggPSAnL2FwaS92Mi8nO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGhvZCwgaGVhZGVycywgZW5jb2RpbmcsXG4gICAgICBob3N0OiAnbWFpbGZvb2dhZS5hcHBzcG90LmNvbScsXG4gICAgICBwYXRoOiBwcmVmaXggKyBwYXRoLFxuICAgICAgYXV0aDogdGhpcy5fYXV0aEtleVxuICAgIH07XG4gIH1cblxuICBfcGFyc2VSZXNwb25zZShyZXNwb25zZTogaHR0cHMuSW5jb21pbmdNZXNzYWdlKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc3Ryczogc3RyaW5nW10gPSBbXTtcbiAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgKGNodW5rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgc3Rycy5wdXNoKGNodW5rKTtcbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzdHIgPSBzdHJzLmpvaW4oJycpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShzdHIpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGpzb247XG4gICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gYFJlc3BvbnNlIGNvZGUgJHtyZXNwb25zZS5zdGF0dXNDb2RlfWA7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICAgICAgICBpZiAoanNvbiAmJiBqc29uLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0ganNvbi5lcnJvcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIC8vIElnbm9yZSBwYXJzZSBlcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0KE9iamVjdC5hc3NpZ24oKG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpOiBPYmplY3QpLCB7XG4gICAgICAgICAgICAgIHN0ciwganNvbixcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVyc1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9wbGFpblJlc3BvbnNlKHJlc3BvbnNlOiBodHRwcy5JbmNvbWluZ01lc3NhZ2UpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjaHVua3M6IEJ1ZmZlcltdID0gW107XG4gICAgICByZXNwb25zZS5vbignZGF0YScsIChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBidWYgPSBCdWZmZXIuY29uY2F0KGNodW5rcyk7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShidWYpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgUmVzcG9uc2UgY29kZSAke3Jlc3BvbnNlLnN0YXR1c0NvZGV9YDtcbiAgICAgICAgICAgIHJlamVjdChPYmplY3QuYXNzaWduKChuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTogT2JqZWN0KSwge1xuICAgICAgICAgICAgICBidWYsXG4gICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnNcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdHRVQnLCBwYXRoKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE5vUGFyc2UocGF0aDogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdHRVQnLCBwYXRoLCB1bmRlZmluZWQsIG51bGwpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wbGFpblJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHV0KHBhdGg6IHN0cmluZywgZGF0YTogT2JqZWN0KTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZHN0ciA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnUFVUJywgcGF0aCArICc/JyArIGRzdHIpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnREVMRVRFJywgcGF0aCk7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BhcnNlUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICBwb3N0KHBhdGg6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2VuZCA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7anNvbjpKU09OLnN0cmluZ2lmeShkYXRhKX0pO1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKCdQT1NUJywgcGF0aCwge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICdDb250ZW50LUxlbmd0aCc6IHNlbmQubGVuZ3RoXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC53cml0ZShzZW5kKTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgTWUge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgndXNlcnMvbWUnKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgU3RhZ2VzOiBQaXBlbGluZVN0YWdlcztcbiAgRmllbGRzOiBQaXBlbGluZUZpZWxkcztcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gICAgdGhpcy5TdGFnZXMgPSBuZXcgUGlwZWxpbmVTdGFnZXMocywgYyk7XG4gICAgdGhpcy5GaWVsZHMgPSBuZXcgUGlwZWxpbmVGaWVsZHMocywgYyk7XG4gIH1cbiAgZ2V0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgncGlwZWxpbmVzJyk7XG4gIH1cbiAgZ2V0T25lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7a2V5fWApO1xuICB9XG4gIGdldEJveGVzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7a2V5fS9ib3hlc2ApO1xuICB9XG4gIGdldEJveGVzSW5TdGFnZSAoa2V5OiBzdHJpbmcsIHN0YWdlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtrZXl9L2JveGVzP3N0YWdlS2V5PSR7c3RhZ2VLZXl9YCk7XG4gIH1cbiAgY3JlYXRlKGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dCgncGlwZWxpbmVzJywgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgcGlwZWxpbmVzLyR7a2V5fWApO1xuICB9XG4gIHVwZGF0ZShkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgcGlwZWxpbmVzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbiAgZ2V0RmVlZChrZXk6IHN0cmluZywgZGV0YWlsTGV2ZWw6ID9zdHJpbmcpIHtcbiAgICBsZXQgcXMgPSAnJztcbiAgICBpZiAoZGV0YWlsTGV2ZWwpIHtcbiAgICAgIHFzICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7ZGV0YWlsTGV2ZWx9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7a2V5fS9uZXdzZmVlZGAgKyBxcyk7XG4gIH1cbiAgZ2V0RmVlZEFsbChkZXRhaWxMZXZlbDogP3N0cmluZykge1xuICAgIGxldCBxcyA9ICcnO1xuICAgIGlmIChkZXRhaWxMZXZlbCkge1xuICAgICAgcXMgKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtkZXRhaWxMZXZlbH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBuZXdzZmVlZGAgKyBxcyk7XG4gIH1cbn1cblxuY2xhc3MgUGlwZWxpbmVTdGFnZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0QWxsKHBpcGVLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlc2ApO1xuICB9XG4gIGdldE9uZShwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZShwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlc2AsIGRhdGEpO1xuICB9XG4gIGRlbGV0ZShwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7a2V5fWApO1xuICB9XG4gIHVwZGF0ZShwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXMvJHtkYXRhLmtleX1gLCBkYXRhKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZUZpZWxkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRBbGwocGlwZUtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzYCk7XG4gIH1cbiAgZ2V0T25lKHBpcGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cbiAgY3JlYXRlKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzYCwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKHBpcGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cbiAgdXBkYXRlKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIEJveGVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIEZpZWxkczogQm94RmllbGRzO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgICB0aGlzLkZpZWxkcyA9IG5ldyBCb3hGaWVsZHMocywgYyk7XG4gIH1cbiAgZ2V0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgnYm94ZXMnKTtcbiAgfVxuICBnZXRGb3JQaXBlbGluZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLlBpcGVsaW5lcy5nZXRCb3hlcyhrZXkpO1xuICB9XG4gIGdldE9uZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZShwaXBlS2V5LCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vYm94ZXNgLCBkYXRhKTtcbiAgfVxuICBkZWxldGUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1IGBib3hlcy8ke2tleX1gKTtcbiAgfVxuICB1cGRhdGUoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYGJveGVzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbiAgZ2V0RmllbGRzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9L2ZpZWxkc2ApO1xuICB9XG4gIGdldFJlbWluZGVycyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9yZW1pbmRlcnNgKTtcbiAgfVxuICBnZXRDb21tZW50cyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9jb21tZW50c2ApO1xuICB9XG4gIC8vIGRlcHJlY2F0ZWQgbWV0aG9kXG4gIGNyZWF0ZUNvbW1lbnQoa2V5OiBzdHJpbmcsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1IGBib3hlcy8ke2tleX0vY29tbWVudHNgLCBkYXRhKTtcbiAgfVxuICBwb3N0Q29tbWVudChrZXk6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldSBgYm94ZXMvJHtrZXl9L2NvbW1lbnRzYCwge21lc3NhZ2V9KTtcbiAgfVxuICBnZXRNZWV0aW5ncyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9tZWV0aW5nc2ApLnRoZW4oZGF0YSA9PiBkYXRhLnJlc3VsdHMpO1xuICB9XG4gIGdldEZpbGVzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9L2ZpbGVzYCk7XG4gIH1cbiAgZ2V0VGhyZWFkcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS90aHJlYWRzYCk7XG4gIH1cbiAgZ2V0RmVlZChrZXk6IHN0cmluZywgZGV0YWlsTGV2ZWw6ID9zdHJpbmcpIHtcbiAgICBsZXQgcXMgPSAnJztcbiAgICBpZiAoZGV0YWlsTGV2ZWwpIHtcbiAgICAgIHFzICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7ZGV0YWlsTGV2ZWx9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9L25ld3NmZWVkYCArIHFzKTtcbiAgfVxuICBnZXRUYXNrcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS90YXNrc2ApO1xuICB9XG59XG5cbmNsYXNzIEJveEZpZWxkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRGb3JCb3goa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRGaWVsZHMoa2V5KTtcbiAgfVxuICBnZXRPbmUoYm94S2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtib3hLZXl9L2ZpZWxkcy8ke2tleX1gKTtcbiAgfVxuICB1cGRhdGUoYm94S2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGBib3hlcy8ke2JveEtleX0vZmllbGRzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbn1cblxuY2xhc3MgRmlsZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0Rm9yQm94KGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3MuQm94ZXMuZ2V0RmlsZXMoa2V5KTtcbiAgfVxuICBnZXRPbmUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBmaWxlcy8ke2tleX1gKTtcbiAgfVxuICBnZXRDb250ZW50cyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldE5vUGFyc2UoYWV1IGBmaWxlcy8ke2tleX0vY29udGVudHNgKTtcbiAgfVxufVxuXG5jbGFzcyBUaHJlYWRzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldEZvckJveChib3hLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldFRocmVhZHMoYm94S2V5KTtcbiAgfVxuICBnZXRPbmUodGhyZWFkS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGB0aHJlYWRzLyR7dGhyZWFkS2V5fWApO1xuICB9XG59XG5cbmNsYXNzIFRhc2tzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldEZvckJveChib3hLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldFRhc2tzKGJveEtleSk7XG4gIH1cbiAgZ2V0T25lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgdGFza3MvJHtrZXl9YCk7XG4gIH1cbiAgY3JlYXRlKGJveEtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgYm94ZXMvJHtib3hLZXl9L3Rhc2tzYCwgZGF0YSk7XG4gIH1cbiAgdXBkYXRlKGtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgdGFza3MvJHtrZXl9YCwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgdGFza3MvJHtrZXl9YCk7XG4gIH1cbn1cblxuY2xhc3MgV2ViaG9va3Mge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0Rm9yUGlwZWxpbmUocGlwZWxpbmVLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke3BpcGVsaW5lS2V5fS93ZWJob29rc2ApLnRoZW4oZGF0YSA9PiBkYXRhLnJlc3VsdHMpO1xuICB9XG4gIGdldEZvclRlYW0odGVhbUtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgdGVhbXMvJHt0ZWFtS2V5fS93ZWJob29rc2ApLnRoZW4oZGF0YSA9PiBkYXRhLnJlc3VsdHMpO1xuICB9XG4gIGdldE9uZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHdlYmhvb2tzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZUZvclBpcGVsaW5lKHBpcGVsaW5lS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGB3ZWJob29rcz9waXBlbGluZUtleT0ke3BpcGVsaW5lS2V5fWAsIGRhdGEpO1xuICB9XG4gIGNyZWF0ZUZvclRlYW0odGVhbUtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgd2ViaG9va3M/dGVhbUtleT0ke3RlYW1LZXl9YCwgZGF0YSk7XG4gIH1cbiAgdXBkYXRlKGtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgd2ViaG9va3MvJHtrZXl9YCwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgd2ViaG9va3MvJHtrZXl9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0cmVhayB7XG4gIF9jOiBDb25uSGVscGVyO1xuICBNZTogTWU7XG4gIFBpcGVsaW5lczogUGlwZWxpbmVzO1xuICBCb3hlczogQm94ZXM7XG4gIEZpbGVzOiBGaWxlcztcbiAgVGhyZWFkczogVGhyZWFkcztcbiAgVGFza3M6IFRhc2tzO1xuICBXZWJob29rczogV2ViaG9va3M7XG5cbiAgY29uc3RydWN0b3IoYXV0aEtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYyA9IG5ldyBDb25uSGVscGVyKGF1dGhLZXkpO1xuICAgIHRoaXMuTWUgPSBuZXcgTWUodGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5QaXBlbGluZXMgPSBuZXcgUGlwZWxpbmVzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuQm94ZXMgPSBuZXcgQm94ZXModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5GaWxlcyA9IG5ldyBGaWxlcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLlRocmVhZHMgPSBuZXcgVGhyZWFkcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLlRhc2tzID0gbmV3IFRhc2tzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuV2ViaG9va3MgPSBuZXcgV2ViaG9va3ModGhpcywgdGhpcy5fYyk7XG4gIH1cblxuICBzZWFyY2gocXVlcnk6IHN0cmluZyk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgc2VhcmNoP3F1ZXJ5PSR7cXVlcnl9YCk7XG4gIH1cbn1cbiJdfQ==