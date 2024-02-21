import xss from "xss"

const data = [
    {
        id: 1,
        name: '<script>Joe</script>',
        description: 'hhhofggfohp'
    },
    {
        id: 2,
        name: 'Doe',
        description: '<script>hEFDSJKF kfdskhjlfdhlkj idsfglkkljdfhljkdfg</script>'
    },
]

const newData = data.map(item => {
    const newItem = {};
    for(const [key, value] of Object.entries(item)) {
        newItem[xss(key)] = xss(value);
    }
    return newItem;
});

console.log(newData);