// import from components
import { createSlice } from '@reduxjs/toolkit';
var LoadStatus;
(function (LoadStatus) {
    LoadStatus["IDLE"] = "idle";
    LoadStatus["LOADING"] = "loading";
    LoadStatus["SUCCEEDED"] = "succeeded";
    LoadStatus["FAILED"] = "failed";
})(LoadStatus || (LoadStatus = {}));
// init state
var initialState = {
    list: [],
    status: LoadStatus.IDLE,
    error: null,
};
// create users slice
var usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addNewUser: function (state, action) { },
    },
});
// export action creators
export var addNewUser = usersSlice.actions.addNewUser;
// export reducer
export default usersSlice.reducer;
//# sourceMappingURL=usersSlice.js.map