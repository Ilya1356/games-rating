const fs = require("fs").promises;

async function makeRatingFile(path, array) {
    const ratingFile = await fs.readFile(path, 'utf8');
    const ratingArray = JSON.parse(ratingFile);

    array.forEach((item) => {
        if (!ratingArray.find((el) => el.id === item.id)) {
            let obj = {
                id: item.id,
                title: item.title,
                image: item.image,
                link: item.link,
                description: item.description,
                rating: 0,
            };
            ratingArray.push(obj);
        }
    });

    fs.writeFile(path, JSON.stringify(ratingArray), () => {
        console.log('Файл записан!');
    });
};

module.exports = makeRatingFile;