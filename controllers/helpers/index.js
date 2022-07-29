exports.isOwnerOrAdmin = function (itemOwner, loggedUser) {
    
    if(!loggedUser) return false;
    if(loggedUser.isAdmin) return true;
    if(itemOwner === loggedUser.id) return true;

    return false;
};
