// message
const data = (res, mess = `Success`) => {
  const result = {
    Owner: 'DASX000',
    status: true,
    message: mess,
    data: res,
  };
  return result;
};

const fail = (status, mess = 'error') => {
  const fail = {
    Owner: 'DASX000',
    status: status,
    message: mess,
  };
  return fail;
};
const invalidKey = () => {
  const fail = {
    Owner: 'DASX000',
    status: false,
    message: 'invalid apikey. Login dahulu untuk mendapatkan apikey!',
  };
  return fail;
};

module.exports = { data, fail, invalidKey };
