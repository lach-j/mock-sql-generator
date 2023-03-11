const { faker } = require("@faker-js/faker");


const tables = [
    {
        name: "[Address]",
        rowCount: 100,
        cols: [
            {
                name: "AddressLine1",
                value: faker.address.streetAddress
            },
            {
                name: "AddressLine2",
                value: faker.address.secondaryAddress,
                nullPercent: 0.8
            },
            {
                name: "City",
                value: faker.address.city
            },
            {
                name: "[State]",
                value: faker.address.state
            },            {
                name: "Country",
                value: faker.address.country
            },
            {
                name: "PostalCode",
                value: faker.address.zipCode
            }
        ]
    },
    {
        name: "Hotel",
        rowCount: 5,
        cols: [
            {
                name: "[Name]",
                value: faker.company.name
            },
            {
                name: "AddressId",
                value: () => faker.random.numeric(2),
                skipQuotes: true
            },
            {
                name: "PhNo",
                value: faker.phone.number
            },
            {
                name: "[Description]",
                value: () => faker.random.words(Math.floor(Math.random() * 100))
            }
        ]
    }
]


for (let table of tables) {
    console.log(`\n-- Insert data into ${table.name} table`);

    for (let i = 0; i < table.rowCount; i++) {

        const vals = table.cols.map(col => {
            if ((col.nullPercent ?? 1 < 1) && Math.random() < col.nullPercent)
                    return 'null'

            const val = col.value();

            if (col.skipQuotes)
                return val;

            return `'${val.replace("'", "''")}'`;
        }).join(', ');

        console.log(
            `INSERT INTO ${table.name} (${table.cols.map(c => c.name).join(", ")}) VALUES (${vals})`
          );
    }
}