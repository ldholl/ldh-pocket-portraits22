const { User } = require(`../models`);

const userData = [
    {
        username: 'Jonathicke',
        email: 'lipatajonathan274@gmail.com',
        password: 'password123'
    },
    {
        username: 'ldholl',
        email: 'ldholl@email.com',
        password: 'password123'
    },
    {
        username: 'tmunkhb',
        email: 'tmunkhb@email.com',
        password: 'password123'
    }
]

const seedUser = async () => {
    for (const u of userData) {
        await User.create(u)
    }
}

module.exports = seedUser;