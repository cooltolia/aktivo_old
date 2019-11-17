(function() {
    var objectTable = $('.object-table__table');
    if (objectTable.length === 0) return;

    console.log(objectTable.parent().width())

    if (objectTable.width() > objectTable.parent().width()) {
        new SimpleBar(objectTable.parent()[0], {
          autoHide: false
        });
    }
})();