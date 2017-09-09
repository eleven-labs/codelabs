/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const v4 = require('uuid').v4;

module.exports = () => ({
  courses: [...Array(5)].map((value, index) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      uuid: v4(),
      title: faker.hacker.phrase(),
      description: faker.hacker.phrase(),
      permalink: faker.lorem.slug(),
      date: Date.parse(faker.date.recent(index + 2)),
      author: {
        name: `${firstName} ${lastName}`,
        username: faker.internet.userName(firstName, lastName),
      },
    };
  }),
});
