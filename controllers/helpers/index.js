exports.isOwnerOrAdmin = function (itemOwner, loggedUser) {
  // Si je ne suis pas loggé, je ne peux pas être propriétaire, ni admin
  if (!loggedUser) return false;
  //  Si je suis admin : ok
  if (loggedUser.isAdmin) return true;
  // Si je ne suis pas admin, mais quand meme propriétaire : ok
  if (itemOwner === loggedUser.id) return true;

  // Sinon : pas ok
  return false;
};
