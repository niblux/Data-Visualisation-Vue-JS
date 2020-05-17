var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const countAndFormat = arr => {
    let result = {};
    arr.forEach(function (x) {
        result[x] = (result[x] || 0) + 1;
    });

    const keyValue = Object.entries(result);
    console.log('keyValue', keyValue);

    return keyValue.map(item => {
        return { ID, name: item[0], count: item[1], edit: false };
    });
};

export const formatData = (arr) => {
    const fruits = countAndFormat(arr.map(i => i.preferences.fruit));
    fruits.type = "fruit";
    const pets = countAndFormat(arr.map(i => i.preferences.pet));
    pets.type = "pet";
    const eyeColors = countAndFormat(arr.map(i => i.eyeColor));
    eyeColors.type = "eyeColor";

    let chartData = [
        {
            fruits,
            pets,
            eyeColors
        }
    ];
    return chartData;
}

