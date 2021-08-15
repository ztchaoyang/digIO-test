const rewire = require('rewire');

const app = rewire('../controller/logController');

const find3MostFrequent = app.__get__('find3MostFrequent');
const findUniqueElements = app.__get__('findUniqueElements');

describe('Find 3 most frequent strings', () => {
    const expected = ["7", "1", "3" ];
    test('Find 3 most frequent strings with differenct frequencey in exact order', () => {
        const arr = ["1", "2", "3", "1", "6", "7", "5", "1", "3", "7", "7", "7"];
    
        const result = find3MostFrequent(arr);
        expect(result).toEqual(expected);
    
    });
    test('Find 3 most frequent strings with same frequencey that does not in exact order', () => {
        const arr = ["1", "2", "3", "1", "6", "7", "5", "1", "3", "7", "7"];
    
        const result = find3MostFrequent(arr);
        expect(result.sort()).toEqual(expected.sort());
    
    });
  });

test('Find unique elements of an array', async () => {
    const arr = ["1", "2", "3", "1", "6", "7", "5", "1", "3", "7", "7", "7"];

    const result = await findUniqueElements(arr);

    expect(result).toEqual(["1","2","3","6","7","5"]);
});
