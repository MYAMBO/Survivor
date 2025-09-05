const PERMISSIONS = {
    CREATE: 1,
    READ:   2,
    UPDATE: 4,
    DELETE: 8
};

exports.CreateOnly = function(){
    return 1;
}

exports.ReadOnly = function() {
    return 2;
}

exports.UpdateOnly = function() {
    return 4;
}

exports.DeleteOnly = function() {
    return 8;
}

exports.CRrights = function() {
    return 3;
}

exports.CUrights = function() {
    return 5;
}

exports.CDrights = function() {
    return 9;
}

exports.RUrights = function () {
    return 6;
}

exports.UDrights = function () {
    return 12;
}

exports.RDrights = function () {
    return 10;
}

exports.CRUrights = function() {
    return 7;
}

exports.CRDrights = function() {
    return 11;
}

exports.CUDrights = function() {
    return 13;
}

exports.RUDrights = function () {
    return 14;
}

exports.CRUDrights = function() {
    return 15;
}

exports.ContainCreate = function(val) {
    return (val & PERMISSIONS.CREATE) !== 0;
};

exports.ContainRead = function(val) {
    return (val & PERMISSIONS.READ) !== 0;
};

exports.ContainUpdate = function(val) {
    return (val & PERMISSIONS.UPDATE) !== 0;
};

exports.ContainDelete = function(val) {
    return (val & PERMISSIONS.DELETE) !== 0;
};

module.exports = exports