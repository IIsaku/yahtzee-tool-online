app.filter('enumerate', function () {
    return function (input, propertyName) {
        if (propertyName == undefined) {
            return '';
        } 
        let result = '';
        input.forEach(element => {
            result = result + element[propertyName] + ', ';
        });
        return result.slice(0, -2);
    };
});
