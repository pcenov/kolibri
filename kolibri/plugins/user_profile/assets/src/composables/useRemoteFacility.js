import client from 'kolibri.client';
import urls from 'kolibri.urls';

function remoteFacilityLoginUser(baseurl, facility_id, username, password) {
  const params = {
    baseurl: baseurl,
    facility: facility_id,
    username: username,
    password: password,
  };

  return client({
    url: urls['kolibri:kolibri.plugins.user_profile:remotefacilityloginuser'](),
    params: params,
  }).then(response => {
    if (response.data.error) {
      return 'error';
    } else {
      const user_info = response.data.find(element => element.username === username);
      return user_info;
    }
  });
}

const remoteFacilityUsers = function(baseurl, facility_id, username) {
  const params = {
    baseurl: baseurl,
    facility: facility_id,
    username: username,
  };
  return client({
    url: urls['kolibri:kolibri.plugins.user_profile:remotefacilityuser'](),
    params: params,
  }).then(response => {
    let users = response.data;
    if (Object.keys(response.data).length === 0) users = [];
    return { users: users };
  });
};
export default remoteFacilityLoginUser;
export { remoteFacilityUsers };
