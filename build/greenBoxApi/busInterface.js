'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMinimumIdpForUser = exports.createUser = exports.getRequestList = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

let getRequestList = exports.getRequestList = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (userId) {

    let [error, requestList] = yield _interface_lib.idpInterface.getRequests(userId);
    if (error) throw error;
    for (var key in requestList) {
      let list = requestList[key];
      for (var i in list) {
        let { userAddress, requestID, rpAddress, requestText } = list[i];
        //rename key
        list[i] = {
          userAddress: userAddress,
          requestId: requestID,
          rpAddress: rpAddress,
          data: requestText
        };
      }
    }
    return requestList;
  });

  return function getRequestList(_x) {
    return _ref.apply(this, arguments);
  };
})();

let createUser = exports.createUser = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (id, namespace = 'cid') {
    return _interface_lib.idpInterface.createUser(namespace, id);
  });

  return function createUser(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

let setMinimumIdpForUser = exports.setMinimumIdpForUser = (() => {
  var _ref3 = (0, _asyncToGenerator3.default)(function* (id, namespace = 'cid', newValue = 1) {
    let userAddress = yield _interface_lib.idpInterface.findUserAddress(namespace, id);
    try {
      yield _interface_lib.idpInterface.setMinimumIdpForUser(userAddress, newValue);
      return true;
    } catch (error) {
      console.log("Can not set min approve:", error);
      return false;
    }
  });

  return function setMinimumIdpForUser(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

//HARD CODED USER
let hardInit = (() => {
  var _ref4 = (0, _asyncToGenerator3.default)(function* () {
    console.log('createUser', (yield createUser('1100023145268')));
    setMinimumIdpForUser('1100023145268', 'cid', process.env.MIN_APPROVE);
  });

  return function hardInit() {
    return _ref4.apply(this, arguments);
  };
})();

exports.approve = approve;
exports.deny = deny;
exports.listen = listen;

var _interface_lib = require('verde-ethereum/build/lib/interface_lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function approve(data) {
  //check if requestId is for userId
  _interface_lib.idpInterface.addIdpResponse((0, _extends3.default)({
    code: 0
  }, data));
}

function deny(data) {
  //check if requestId is for userId
  _interface_lib.idpInterface.addIdpResponse((0, _extends3.default)({
    code: 1
  }, data));
}

function listen(handleRequest) {
  _interface_lib.idpInterface.watchRequestEvent(function (error, eventObject) {
    if (error) throw error;
    var { userAddress, requestID, rpAddress, requestText } = eventObject;
    handleRequest({
      userAddress: userAddress,
      requestId: requestID,
      rpAddress: rpAddress,
      data: requestText
    });
  });
}

const busInterface = {
  approve,
  deny,
  listen,
  getRequestList,
  createUser
};

exports.default = busInterface;


hardInit();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmVlbkJveEFwaS9idXNJbnRlcmZhY2UuanMiXSwibmFtZXMiOlsidXNlcklkIiwiZXJyb3IiLCJyZXF1ZXN0TGlzdCIsImdldFJlcXVlc3RzIiwia2V5IiwibGlzdCIsImkiLCJ1c2VyQWRkcmVzcyIsInJlcXVlc3RJRCIsInJwQWRkcmVzcyIsInJlcXVlc3RUZXh0IiwicmVxdWVzdElkIiwiZGF0YSIsImdldFJlcXVlc3RMaXN0IiwiaWQiLCJuYW1lc3BhY2UiLCJjcmVhdGVVc2VyIiwibmV3VmFsdWUiLCJmaW5kVXNlckFkZHJlc3MiLCJzZXRNaW5pbXVtSWRwRm9yVXNlciIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwiZW52IiwiTUlOX0FQUFJPVkUiLCJoYXJkSW5pdCIsImFwcHJvdmUiLCJkZW55IiwibGlzdGVuIiwiYWRkSWRwUmVzcG9uc2UiLCJjb2RlIiwiaGFuZGxlUmVxdWVzdCIsIndhdGNoUmVxdWVzdEV2ZW50IiwiZXZlbnRPYmplY3QiLCJidXNJbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7NkNBa0JPLFdBQThCQSxNQUE5QixFQUFzQzs7QUFFM0MsUUFBSSxDQUFDQyxLQUFELEVBQVFDLFdBQVIsSUFBdUIsTUFBTSw0QkFBYUMsV0FBYixDQUF5QkgsTUFBekIsQ0FBakM7QUFDQSxRQUFHQyxLQUFILEVBQVUsTUFBTUEsS0FBTjtBQUNWLFNBQUksSUFBSUcsR0FBUixJQUFlRixXQUFmLEVBQTRCO0FBQzFCLFVBQUlHLE9BQU9ILFlBQVlFLEdBQVosQ0FBWDtBQUNBLFdBQUksSUFBSUUsQ0FBUixJQUFhRCxJQUFiLEVBQW1CO0FBQ2pCLFlBQUksRUFBRUUsV0FBRixFQUFlQyxTQUFmLEVBQTBCQyxTQUExQixFQUFxQ0MsV0FBckMsS0FBcURMLEtBQUtDLENBQUwsQ0FBekQ7QUFDQTtBQUNBRCxhQUFLQyxDQUFMLElBQVU7QUFDUkMsdUJBQWFBLFdBREw7QUFFUkkscUJBQVdILFNBRkg7QUFHUkMscUJBQVdBLFNBSEg7QUFJUkcsZ0JBQU1GO0FBSkUsU0FBVjtBQU1EO0FBQ0Y7QUFDRCxXQUFPUixXQUFQO0FBRUQsRzs7a0JBbkJxQlcsYzs7Ozs7OzhDQWtDZixXQUEwQkMsRUFBMUIsRUFBNkJDLFlBQVksS0FBekMsRUFBZ0Q7QUFDckQsV0FBTyw0QkFBYUMsVUFBYixDQUF3QkQsU0FBeEIsRUFBa0NELEVBQWxDLENBQVA7QUFDRCxHOztrQkFGcUJFLFU7Ozs7Ozs4Q0FJZixXQUFvQ0YsRUFBcEMsRUFBd0NDLFlBQVksS0FBcEQsRUFBNERFLFdBQVcsQ0FBdkUsRUFBMEU7QUFDL0UsUUFBSVYsY0FBYyxNQUFNLDRCQUFhVyxlQUFiLENBQTZCSCxTQUE3QixFQUF1Q0QsRUFBdkMsQ0FBeEI7QUFDQSxRQUFJO0FBQ0YsWUFBTSw0QkFBYUssb0JBQWIsQ0FBa0NaLFdBQWxDLEVBQStDVSxRQUEvQyxDQUFOO0FBQ0EsYUFBTyxJQUFQO0FBQ0QsS0FIRCxDQUlBLE9BQU1oQixLQUFOLEVBQWE7QUFDWG1CLGNBQVFDLEdBQVIsQ0FBWSwwQkFBWixFQUF1Q3BCLEtBQXZDO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHOztrQkFWcUJrQixvQjs7Ozs7QUFzQnRCOzs4Q0FDQSxhQUEwQjtBQUN4QkMsWUFBUUMsR0FBUixDQUFZLFlBQVosR0FBeUIsTUFBTUwsV0FBVyxlQUFYLENBQS9CO0FBQ0FHLHlCQUFxQixlQUFyQixFQUFxQyxLQUFyQyxFQUE0Q0csUUFBUUMsR0FBUixDQUFZQyxXQUF4RDtBQUNELEc7O2tCQUhjQyxROzs7OztRQTdFQ0MsTyxHQUFBQSxPO1FBUUFDLEksR0FBQUEsSTtRQTZCQUMsTSxHQUFBQSxNOztBQXZDaEI7Ozs7QUFFTyxTQUFTRixPQUFULENBQWlCZCxJQUFqQixFQUF1QjtBQUM1QjtBQUNBLDhCQUFhaUIsY0FBYjtBQUNFQyxVQUFNO0FBRFIsS0FFS2xCLElBRkw7QUFJRDs7QUFFTSxTQUFTZSxJQUFULENBQWNmLElBQWQsRUFBb0I7QUFDekI7QUFDQSw4QkFBYWlCLGNBQWI7QUFDRUMsVUFBTTtBQURSLEtBRUtsQixJQUZMO0FBSUQ7O0FBdUJNLFNBQVNnQixNQUFULENBQWdCRyxhQUFoQixFQUErQjtBQUNwQyw4QkFBYUMsaUJBQWIsQ0FBK0IsVUFBUy9CLEtBQVQsRUFBZWdDLFdBQWYsRUFBNEI7QUFDekQsUUFBR2hDLEtBQUgsRUFBVSxNQUFNQSxLQUFOO0FBQ1YsUUFBSSxFQUFFTSxXQUFGLEVBQWVDLFNBQWYsRUFBMEJDLFNBQTFCLEVBQXFDQyxXQUFyQyxLQUFxRHVCLFdBQXpEO0FBQ0FGLGtCQUFjO0FBQ1p4QixtQkFBYUEsV0FERDtBQUVaSSxpQkFBV0gsU0FGQztBQUdaQyxpQkFBV0EsU0FIQztBQUlaRyxZQUFNRjtBQUpNLEtBQWQ7QUFNRCxHQVREO0FBVUQ7O0FBa0JELE1BQU13QixlQUFlO0FBQ25CUixTQURtQjtBQUVuQkMsTUFGbUI7QUFHbkJDLFFBSG1CO0FBSW5CZixnQkFKbUI7QUFLbkJHO0FBTG1CLENBQXJCOztrQkFRZWtCLFk7OztBQVFmVCIsImZpbGUiOiJidXNJbnRlcmZhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpZHBJbnRlcmZhY2UgfSBmcm9tICd2ZXJkZS1ldGhlcmV1bS9idWlsZC9saWIvaW50ZXJmYWNlX2xpYic7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHByb3ZlKGRhdGEpIHtcbiAgLy9jaGVjayBpZiByZXF1ZXN0SWQgaXMgZm9yIHVzZXJJZFxuICBpZHBJbnRlcmZhY2UuYWRkSWRwUmVzcG9uc2Uoe1xuICAgIGNvZGU6IDAsXG4gICAgLi4uZGF0YVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbnkoZGF0YSkge1xuICAvL2NoZWNrIGlmIHJlcXVlc3RJZCBpcyBmb3IgdXNlcklkXG4gIGlkcEludGVyZmFjZS5hZGRJZHBSZXNwb25zZSh7XG4gICAgY29kZTogMSxcbiAgICAuLi5kYXRhXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmVxdWVzdExpc3QodXNlcklkKSB7XG5cbiAgbGV0IFtlcnJvciwgcmVxdWVzdExpc3RdID0gYXdhaXQgaWRwSW50ZXJmYWNlLmdldFJlcXVlc3RzKHVzZXJJZCk7XG4gIGlmKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgZm9yKHZhciBrZXkgaW4gcmVxdWVzdExpc3QpIHtcbiAgICBsZXQgbGlzdCA9IHJlcXVlc3RMaXN0W2tleV07XG4gICAgZm9yKHZhciBpIGluIGxpc3QpIHtcbiAgICAgIGxldCB7IHVzZXJBZGRyZXNzLCByZXF1ZXN0SUQsIHJwQWRkcmVzcywgcmVxdWVzdFRleHQgfSA9IGxpc3RbaV07XG4gICAgICAvL3JlbmFtZSBrZXlcbiAgICAgIGxpc3RbaV0gPSB7XG4gICAgICAgIHVzZXJBZGRyZXNzOiB1c2VyQWRkcmVzcyxcbiAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SUQsXG4gICAgICAgIHJwQWRkcmVzczogcnBBZGRyZXNzLFxuICAgICAgICBkYXRhOiByZXF1ZXN0VGV4dFxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVxdWVzdExpc3Q7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlbihoYW5kbGVSZXF1ZXN0KSB7XG4gIGlkcEludGVyZmFjZS53YXRjaFJlcXVlc3RFdmVudChmdW5jdGlvbihlcnJvcixldmVudE9iamVjdCkge1xuICAgIGlmKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICB2YXIgeyB1c2VyQWRkcmVzcywgcmVxdWVzdElELCBycEFkZHJlc3MsIHJlcXVlc3RUZXh0IH0gPSBldmVudE9iamVjdDtcbiAgICBoYW5kbGVSZXF1ZXN0KHtcbiAgICAgIHVzZXJBZGRyZXNzOiB1c2VyQWRkcmVzcyxcbiAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElELFxuICAgICAgcnBBZGRyZXNzOiBycEFkZHJlc3MsXG4gICAgICBkYXRhOiByZXF1ZXN0VGV4dFxuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVVzZXIoaWQsbmFtZXNwYWNlID0gJ2NpZCcpIHtcbiAgcmV0dXJuIGlkcEludGVyZmFjZS5jcmVhdGVVc2VyKG5hbWVzcGFjZSxpZCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRNaW5pbXVtSWRwRm9yVXNlcihpZCAsbmFtZXNwYWNlID0gJ2NpZCcgLCBuZXdWYWx1ZSA9IDEpIHtcbiAgbGV0IHVzZXJBZGRyZXNzID0gYXdhaXQgaWRwSW50ZXJmYWNlLmZpbmRVc2VyQWRkcmVzcyhuYW1lc3BhY2UsaWQpO1xuICB0cnkge1xuICAgIGF3YWl0IGlkcEludGVyZmFjZS5zZXRNaW5pbXVtSWRwRm9yVXNlcih1c2VyQWRkcmVzcywgbmV3VmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNhdGNoKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJDYW4gbm90IHNldCBtaW4gYXBwcm92ZTpcIixlcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuY29uc3QgYnVzSW50ZXJmYWNlID0ge1xuICBhcHByb3ZlLFxuICBkZW55LFxuICBsaXN0ZW4sXG4gIGdldFJlcXVlc3RMaXN0LFxuICBjcmVhdGVVc2VyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidXNJbnRlcmZhY2U7IFxuXG4vL0hBUkQgQ09ERUQgVVNFUlxuYXN5bmMgZnVuY3Rpb24gaGFyZEluaXQoKSB7XG4gIGNvbnNvbGUubG9nKCdjcmVhdGVVc2VyJyxhd2FpdCBjcmVhdGVVc2VyKCcxMTAwMDIzMTQ1MjY4JykpO1xuICBzZXRNaW5pbXVtSWRwRm9yVXNlcignMTEwMDAyMzE0NTI2OCcsJ2NpZCcsIHByb2Nlc3MuZW52Lk1JTl9BUFBST1ZFICk7XG59XG5cbmhhcmRJbml0KCk7XG4iXX0=