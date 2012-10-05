var data = {
    items: [
        {id: 1, name: "Stockholm", parent: null},
        {id: 2, name: "Norrmalm", parent: 1},
        {id: 3, name: "Vasastan", parent: 1},
        {id: 4, name: "Gamla Stan", parent: 1}
    ]
};

function traverse(node) {
    var tree = [];
    for(i=0; i<data.items.length; i++) {
        var item = data.items[i];
        if (item.parent !== null) {
            var addedParent = findById(tree, item.id)
            if (addedParent !== null) {
                added
            }
            var notAddedParent = findById(data.items, item.id);
        }
    }
}

function findById(array, id) {
    for(i=0; i<array.length; i++) {
        if (array[i].id === id) {
            return array[i];
        }
    }
    return null;
}