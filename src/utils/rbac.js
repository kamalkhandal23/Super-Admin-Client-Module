const permissions = [
    "CLIENT_VIEW",
    "CLIENT_CREATE",
    "CLIENT_EDIT"
  ];
  
  export const can = (permission) => {
    return permissions.includes(permission);
  };
  