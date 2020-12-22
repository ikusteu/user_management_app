// import from packages
import React from 'react';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
// import from slices
import { getUserById, getEndOfList } from './usersSlice';
// component function
var SingleUserPage = function (_a) {
    var match = _a.match;
    // get user id from react router
    var userId = parseInt(match.params.id);
    var fetching = !useSelector(getEndOfList); // in case user not fetched, display progress
    // map to redux store
    // eslint-disable-next-line react-redux/useSelector-prefer-selectors
    var user = useSelector(function (state) {
        return getUserById(state, userId);
    });
    return (React.createElement(Paper, { style: { width: '100%', height: '80vh' }, elevation: 3 }, userId));
};
export default SingleUserPage;
//# sourceMappingURL=SingleUserPage.js.map