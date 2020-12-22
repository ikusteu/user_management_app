var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// import from components
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios';
import { processUserForApi, processUsersFromApi, processUserFromApi, } from '../../lib/functions';
// init state
var initialState = {
    list: [],
    error: null,
    endOfList: false,
    pageToFetch: 1,
    eligibleId: 0,
    addSuccessful: false,
};
// create thunk for user fetching
export var fetchUsers = createAsyncThunk('users/fetchUsers', function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var res, users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.get("https://reqres.in/api/users?delay=1&page=" + page)];
            case 1:
                res = _a.sent();
                users = processUsersFromApi(res.data.data);
                return [2 /*return*/, users];
            case 2:
                err_1 = _a.sent();
                // eslint-disable-next-line no-console
                console.error(err_1);
                return [2 /*return*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create thunk for new user adding
export var requestAdd = createAsyncThunk('users/requestAdd', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user, res, err_2, errorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = processUserForApi(data);
                return [4 /*yield*/, axios.post('https://reqres.in/api/users', __assign({}, user))
                    // if successful process user back to match UserInterface
                ];
            case 1:
                res = _a.sent();
                // if successful process user back to match UserInterface
                user = processUserFromApi(res.data);
                return [2 /*return*/, user
                    // if error, catch before it gets serialized
                ];
            case 2:
                err_2 = _a.sent();
                errorMessage = err_2.response.data.error;
                // throw validation response for thunk rejected handling
                throw errorMessage;
            case 3: return [2 /*return*/];
        }
    });
}); });
// create users slice
var usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        initAdd: function (state) {
            state.addSuccessful = false;
        },
    },
    extraReducers: function (build) {
        build.addCase(fetchUsers.fulfilled, function (state, action) {
            if (action.payload) {
                // unwrap users from payload
                var users = action.payload;
                // get number of users loaded
                var numUsers = users.length;
                if (numUsers !== 0) {
                    // get the id of last user on the list and save +1 as first eligible id for new users
                    state.eligibleId = users[numUsers - 1].id + 1;
                    // concat user array to list in state
                    state.list = state.list.concat(users);
                    // save number of next page to fetch
                    state.pageToFetch++;
                }
                else {
                    // if no more users set end of list to stop fetching
                    state.endOfList = true;
                }
            }
        });
        build.addCase(requestAdd.fulfilled, function (state, action) {
            if (action.payload) {
                // unwrap user from payload
                var user = action.payload;
                // update eligible id based on new info
                state.eligibleId = user.id + 1;
                // set update success
                state.addSuccessful = true;
                // push user to users state list
                state.list.push(user);
            }
        });
    },
});
// export selectors
export var getUserList = function (state) {
    return state.users.list;
};
export var getEndOfList = function (state) {
    return state.users.endOfList;
};
export var getPageToFetch = function (state) {
    return state.users.pageToFetch;
};
export var getEligibleId = function (state) {
    return state.users.eligibleId;
};
export var getAddStatus = function (state) {
    return state.users.addSuccessful;
};
export var getUserById = function (state, id) { return state.users.list.find(function (user) { return user.id === id; }); };
// export action creators
export var initAdd = usersSlice.actions.initAdd;
// export reducer
export default usersSlice.reducer;
//# sourceMappingURL=usersSlice.js.map