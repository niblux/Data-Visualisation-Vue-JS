var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const countAndFormat = arr => {
    let result = {};
    arr.forEach(function (x) {
        result[x] = (result[x] || 0) + 1;
    });

    const keyValue = Object.entries(result);
    return keyValue.map(item => {
        return { id: ID(), name: item[0], count: item[1], edit: false };
    });
};

export const formatData = (arr) => {
    const fruits = countAndFormat(arr.map(i => i.preferences.fruit)).map(fruit => {
        fruit.type = 'fruits'
        return fruit;
    });

    fruits.category = 'fruits';

    const pets = countAndFormat(arr.map(i => i.preferences.pet)).map(pet => {
        pet.type = 'pets';
        return pet;
    });

    pets.category = 'pets';

    const eyeColors = countAndFormat(arr.map(i => i.eyeColor)).map(eyeColor => {
        eyeColor.type = 'eyeColors';
        return eyeColor;
    });

    eyeColors.category = 'eyeColors';

    let chartData = [fruits, pets, eyeColors];
    return chartData;
}

