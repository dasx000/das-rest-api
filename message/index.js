// message
const data = (res, mess = `Success`) => {
  const result = {
    Owner: 'DASX000',
    status: 200,
    message: mess,
    result: res,
  };
  return result;
};

const fail = (status, mess = '') => {
  const fail = {
    Owner: 'DASX000',
    status: status,
    message: mess,
  };
  return fail;
};

module.exports = { data, fail };
