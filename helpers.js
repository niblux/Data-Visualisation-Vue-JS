export const countValues = arr => {
    let result = {};
    arr.forEach(function (x) {
        result[x] = (result[x] || 0) + 1;
    });
    return result;
};

export const formatData = (arr) => {
    const fruits = countValues(arr.map(i => i.preferences.fruit));
    fruits.type = "fruit";
    const pets = countValues(arr.map(i => i.preferences.pet));
    pets.type = "pet";
    const eyeColors = countValues(arr.map(i => i.eyeColor));
    eyeColors.type = "eyeColor";

    let chartData = [
        {
            fruits,
            pets,
            eyeColors
        }
    ]

    return chartData;
}

