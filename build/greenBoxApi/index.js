'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _busInterface = require('./busInterface');

var _busInterface2 = _interopRequireDefault(_busInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*function handleRequest({ userAddress, requestId, rpAddress, data }) {
  console.log(
    'Received new request for userAddress:',
    userAddress,
    'with requestId:',
    requestId,
    'from rpAddress:',
    rpAddress,
    'with data:',
    data
  );
  //fetch real time? emit web socket?
}

//===== listen to Bus =====
busInterface.listen(handleRequest);*/

exports.default = _busInterface2.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmVlbkJveEFwaS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVzSW50ZXJmYWNlIGZyb20gJy4vYnVzSW50ZXJmYWNlJztcblxuLypmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KHsgdXNlckFkZHJlc3MsIHJlcXVlc3RJZCwgcnBBZGRyZXNzLCBkYXRhIH0pIHtcbiAgY29uc29sZS5sb2coXG4gICAgJ1JlY2VpdmVkIG5ldyByZXF1ZXN0IGZvciB1c2VyQWRkcmVzczonLFxuICAgIHVzZXJBZGRyZXNzLFxuICAgICd3aXRoIHJlcXVlc3RJZDonLFxuICAgIHJlcXVlc3RJZCxcbiAgICAnZnJvbSBycEFkZHJlc3M6JyxcbiAgICBycEFkZHJlc3MsXG4gICAgJ3dpdGggZGF0YTonLFxuICAgIGRhdGFcbiAgKTtcbiAgLy9mZXRjaCByZWFsIHRpbWU/IGVtaXQgd2ViIHNvY2tldD9cbn1cblxuLy89PT09PSBsaXN0ZW4gdG8gQnVzID09PT09XG5idXNJbnRlcmZhY2UubGlzdGVuKGhhbmRsZVJlcXVlc3QpOyovXG5cbmV4cG9ydCBkZWZhdWx0IGJ1c0ludGVyZmFjZVxuIl19