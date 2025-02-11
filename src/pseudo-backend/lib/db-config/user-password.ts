export default {
  table: 'user-password',
  index: [
    { name: 'idIdx', prop: 'id', opt: { unique: true } },
    { name: 'userIdIdx', prop: 'userId', opt: { unique: true } },
  ],
};
