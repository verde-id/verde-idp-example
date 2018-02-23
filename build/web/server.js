'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket2 = require('socket.io');

var _socket3 = _interopRequireDefault(_socket2);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _greenBoxApi = require('../greenBoxApi');

var _greenBoxApi2 = _interopRequireDefault(_greenBoxApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', function (reason, p) {
  console.error('Unhandled Rejection:', p, '\nreason:', reason.stack || reason);
});
// import morgan from 'morgan';

const WEB_SERVER_PORT = process.env.SERVER_PORT || 8181;

const app = (0, _express2.default)();

app.use('/', _express2.default.static(_path2.default.join(__dirname, '../../web_files')));

app.use(_bodyParser2.default.urlencoded({ extended: false, limit: '2mb' }));
app.use(_bodyParser2.default.json({ limit: '2mb' }));

// app.use(morgan('combined'));

app.get('/home/:userId', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../../web_files/index.html'));
});

app.get('/getRequestList/:userId', (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (req, res) {
    try {
      res.send((yield _greenBoxApi2.default.getRequestList(req.params.userId)));
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

app.post('/approve/', function (req, res) {
  _greenBoxApi2.default.approve(req.body);
  res.send('Success\n');
});

app.post('/deny/', function (req, res) {
  _greenBoxApi2.default.deny(req.body);
  res.send('Success\n');
});

app.post('/createUser/', (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (req, res) {
    let result = yield _greenBoxApi2.default.createUser(req.body.id);
    res.send(result);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

const server = _http2.default.createServer(app);

const ws = (0, _socket3.default)(server);
let socket;

ws.on('connection', function (_socket) {
  socket = _socket;
});

_greenBoxApi2.default.listen(function (data) {
  if (socket) socket.emit('fetch');
});

server.listen(WEB_SERVER_PORT);

console.log(`IDP Web Server is running. Listening to port ${WEB_SERVER_PORT}`);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvc2VydmVyLmpzIl0sIm5hbWVzIjpbInByb2Nlc3MiLCJvbiIsInJlYXNvbiIsInAiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsIldFQl9TRVJWRVJfUE9SVCIsImVudiIsIlNFUlZFUl9QT1JUIiwiYXBwIiwidXNlIiwic3RhdGljIiwiam9pbiIsIl9fZGlybmFtZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImxpbWl0IiwianNvbiIsImdldCIsInJlcSIsInJlcyIsInNlbmRGaWxlIiwic2VuZCIsImdldFJlcXVlc3RMaXN0IiwicGFyYW1zIiwidXNlcklkIiwic3RhdHVzIiwiZW5kIiwicG9zdCIsImFwcHJvdmUiLCJib2R5IiwiZGVueSIsInJlc3VsdCIsImNyZWF0ZVVzZXIiLCJpZCIsInNlcnZlciIsImNyZWF0ZVNlcnZlciIsIndzIiwic29ja2V0IiwiX3NvY2tldCIsImxpc3RlbiIsImRhdGEiLCJlbWl0IiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBR0E7Ozs7OztBQUVBQSxRQUFRQyxFQUFSLENBQVcsb0JBQVgsRUFBaUMsVUFBU0MsTUFBVCxFQUFpQkMsQ0FBakIsRUFBb0I7QUFDbkRDLFVBQVFDLEtBQVIsQ0FBYyxzQkFBZCxFQUFzQ0YsQ0FBdEMsRUFBeUMsV0FBekMsRUFBc0RELE9BQU9JLEtBQVAsSUFBZ0JKLE1BQXRFO0FBQ0QsQ0FGRDtBQUpBOztBQVFBLE1BQU1LLGtCQUFrQlAsUUFBUVEsR0FBUixDQUFZQyxXQUFaLElBQTJCLElBQW5EOztBQUVBLE1BQU1DLE1BQU0sd0JBQVo7O0FBRUFBLElBQUlDLEdBQUosQ0FBUSxHQUFSLEVBQWEsa0JBQVFDLE1BQVIsQ0FBZSxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsaUJBQXJCLENBQWYsQ0FBYjs7QUFFQUosSUFBSUMsR0FBSixDQUFRLHFCQUFXSSxVQUFYLENBQXNCLEVBQUVDLFVBQVUsS0FBWixFQUFtQkMsT0FBTyxLQUExQixFQUF0QixDQUFSO0FBQ0FQLElBQUlDLEdBQUosQ0FBUSxxQkFBV08sSUFBWCxDQUFnQixFQUFFRCxPQUFPLEtBQVQsRUFBaEIsQ0FBUjs7QUFFQTs7QUFFQVAsSUFBSVMsR0FBSixDQUFRLGVBQVIsRUFBeUIsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFDckNBLE1BQUlDLFFBQUosQ0FBYSxlQUFLVCxJQUFMLENBQVVDLFNBQVYsRUFBcUIsNEJBQXJCLENBQWI7QUFDRCxDQUZEOztBQUlBSixJQUFJUyxHQUFKLENBQVEseUJBQVI7QUFBQSw2Q0FBa0MsV0FBZUMsR0FBZixFQUFtQkMsR0FBbkIsRUFBd0I7QUFDeEQsUUFBSTtBQUNGQSxVQUFJRSxJQUFKLEVBQVMsTUFBTSxzQkFBWUMsY0FBWixDQUEyQkosSUFBSUssTUFBSixDQUFXQyxNQUF0QyxDQUFmO0FBQ0QsS0FGRCxDQUdBLE9BQU1yQixLQUFOLEVBQWE7QUFDWEQsY0FBUUMsS0FBUixDQUFjQSxLQUFkO0FBQ0FnQixVQUFJTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsR0FBaEI7QUFDRDtBQUNGLEdBUkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVUFsQixJQUFJbUIsSUFBSixDQUFTLFdBQVQsRUFBc0IsVUFBU1QsR0FBVCxFQUFhQyxHQUFiLEVBQWtCO0FBQ3RDLHdCQUFZUyxPQUFaLENBQW9CVixJQUFJVyxJQUF4QjtBQUNBVixNQUFJRSxJQUFKLENBQVMsV0FBVDtBQUNELENBSEQ7O0FBS0FiLElBQUltQixJQUFKLENBQVMsUUFBVCxFQUFtQixVQUFTVCxHQUFULEVBQWFDLEdBQWIsRUFBa0I7QUFDbkMsd0JBQVlXLElBQVosQ0FBaUJaLElBQUlXLElBQXJCO0FBQ0FWLE1BQUlFLElBQUosQ0FBUyxXQUFUO0FBQ0QsQ0FIRDs7QUFLQWIsSUFBSW1CLElBQUosQ0FBUyxjQUFUO0FBQUEsOENBQXlCLFdBQWVULEdBQWYsRUFBbUJDLEdBQW5CLEVBQXdCO0FBQy9DLFFBQUlZLFNBQVMsTUFBTSxzQkFBWUMsVUFBWixDQUF1QmQsSUFBSVcsSUFBSixDQUFTSSxFQUFoQyxDQUFuQjtBQUNBZCxRQUFJRSxJQUFKLENBQVNVLE1BQVQ7QUFDRCxHQUhEOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtBLE1BQU1HLFNBQVMsZUFBS0MsWUFBTCxDQUFrQjNCLEdBQWxCLENBQWY7O0FBRUEsTUFBTTRCLEtBQUssc0JBQUdGLE1BQUgsQ0FBWDtBQUNBLElBQUlHLE1BQUo7O0FBRUFELEdBQUdyQyxFQUFILENBQU0sWUFBTixFQUFvQixVQUFTdUMsT0FBVCxFQUFpQjtBQUNuQ0QsV0FBU0MsT0FBVDtBQUNELENBRkQ7O0FBSUEsc0JBQVlDLE1BQVosQ0FBbUIsVUFBU0MsSUFBVCxFQUFlO0FBQ2hDLE1BQUdILE1BQUgsRUFBV0EsT0FBT0ksSUFBUCxDQUFZLE9BQVo7QUFDWixDQUZEOztBQUlBUCxPQUFPSyxNQUFQLENBQWNsQyxlQUFkOztBQUVBSCxRQUFRd0MsR0FBUixDQUFhLGdEQUErQ3JDLGVBQWdCLEVBQTVFIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvJztcblxuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbi8vIGltcG9ydCBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcblxuaW1wb3J0IEdyZWVuQm94QVBJIGZyb20gJy4uL2dyZWVuQm94QXBpJztcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgZnVuY3Rpb24ocmVhc29uLCBwKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBSZWplY3Rpb246JywgcCwgJ1xcbnJlYXNvbjonLCByZWFzb24uc3RhY2sgfHwgcmVhc29uKTtcbn0pO1xuXG5jb25zdCBXRUJfU0VSVkVSX1BPUlQgPSBwcm9jZXNzLmVudi5TRVJWRVJfUE9SVCB8fCA4MTgxO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoJy8nLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vd2ViX2ZpbGVzJykpKTtcblxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UsIGxpbWl0OiAnMm1iJyB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiAnMm1iJyB9KSk7XG5cbi8vIGFwcC51c2UobW9yZ2FuKCdjb21iaW5lZCcpKTtcblxuYXBwLmdldCgnL2hvbWUvOnVzZXJJZCcsIChyZXEsIHJlcykgPT4ge1xuICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL3dlYl9maWxlcy9pbmRleC5odG1sJykpO1xufSk7XG5cbmFwcC5nZXQoJy9nZXRSZXF1ZXN0TGlzdC86dXNlcklkJyxhc3luYyBmdW5jdGlvbihyZXEscmVzKSB7XG4gIHRyeSB7XG4gICAgcmVzLnNlbmQoYXdhaXQgR3JlZW5Cb3hBUEkuZ2V0UmVxdWVzdExpc3QocmVxLnBhcmFtcy51c2VySWQpKTtcbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcbiAgfVxufSk7XG5cbmFwcC5wb3N0KCcvYXBwcm92ZS8nLCBmdW5jdGlvbihyZXEscmVzKSB7XG4gIEdyZWVuQm94QVBJLmFwcHJvdmUocmVxLmJvZHkpXG4gIHJlcy5zZW5kKCdTdWNjZXNzXFxuJyk7XG59KTtcblxuYXBwLnBvc3QoJy9kZW55LycsIGZ1bmN0aW9uKHJlcSxyZXMpIHtcbiAgR3JlZW5Cb3hBUEkuZGVueShyZXEuYm9keSlcbiAgcmVzLnNlbmQoJ1N1Y2Nlc3NcXG4nKTtcbn0pO1xuXG5hcHAucG9zdCgnL2NyZWF0ZVVzZXIvJywgYXN5bmMgZnVuY3Rpb24ocmVxLHJlcykge1xuICBsZXQgcmVzdWx0ID0gYXdhaXQgR3JlZW5Cb3hBUEkuY3JlYXRlVXNlcihyZXEuYm9keS5pZCk7XG4gIHJlcy5zZW5kKHJlc3VsdCk7XG59KTtcblxuY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcblxuY29uc3Qgd3MgPSBpbyhzZXJ2ZXIpO1xubGV0IHNvY2tldDtcblxud3Mub24oJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbihfc29ja2V0KXtcbiAgc29ja2V0ID0gX3NvY2tldDtcbn0pO1xuXG5HcmVlbkJveEFQSS5saXN0ZW4oZnVuY3Rpb24oZGF0YSkge1xuICBpZihzb2NrZXQpIHNvY2tldC5lbWl0KCdmZXRjaCcpO1xufSk7XG5cbnNlcnZlci5saXN0ZW4oV0VCX1NFUlZFUl9QT1JUKTtcblxuY29uc29sZS5sb2coYElEUCBXZWIgU2VydmVyIGlzIHJ1bm5pbmcuIExpc3RlbmluZyB0byBwb3J0ICR7V0VCX1NFUlZFUl9QT1JUfWApO1xuIl19