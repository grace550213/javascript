"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _operations = _interopRequireDefault(require("../../constants/operations"));

var endpoint = {
  getOperation: function getOperation() {
    return _operations["default"].PNDownloadFileOperation;
  },
  validateParams: function validateParams(_, params) {
    if (!(params === null || params === void 0 ? void 0 : params.channel)) {
      return "channel can't be empty";
    }

    if (!(params === null || params === void 0 ? void 0 : params.name)) {
      return "name can't be empty";
    }

    if (!(params === null || params === void 0 ? void 0 : params.id)) {
      return "id can't be empty";
    }
  },
  getURL: function getURL(_ref, params) {
    var config = _ref.config;
    return "/v1/files/".concat(config.subscribeKey, "/channels/").concat(params.channel, "/files/").concat(params.id, "/").concat(params.name);
  },
  getRequestTimeout: function getRequestTimeout(_ref2) {
    var config = _ref2.config;
    return config.getTransactionTimeout();
  },
  isAuthSupported: function isAuthSupported() {
    return true;
  },
  ignoreBody: function ignoreBody() {
    return true;
  },
  forceBuffered: function forceBuffered() {
    return true;
  },
  getAuthToken: function getAuthToken(_ref3) {
    var tokenManager = _ref3.tokenManager;
    return tokenManager.getToken('fileUpload');
  },
  prepareParams: function prepareParams() {
    return {};
  },
  handleResponse: function () {
    var _handleResponse = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(_ref4, res, params) {
      var _res$response$name;

      var PubNubFile, config, cryptography, body, _params$cipherKey;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              PubNubFile = _ref4.PubNubFile, config = _ref4.config, cryptography = _ref4.cryptography;
              body = res.response.body;

              if (!config.cipherKey) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return cryptography.decrypt((_params$cipherKey = params.cipherKey) !== null && _params$cipherKey !== void 0 ? _params$cipherKey : config.cipherKey, body);

            case 5:
              body = _context.sent;

            case 6:
              return _context.abrupt("return", PubNubFile.create({
                data: body,
                name: (_res$response$name = res.response.name) !== null && _res$response$name !== void 0 ? _res$response$name : params.name,
                mimeType: res.response.type
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handleResponse(_x, _x2, _x3) {
      return _handleResponse.apply(this, arguments);
    }

    return handleResponse;
  }()
};
var _default = endpoint;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=download_file.js.map
