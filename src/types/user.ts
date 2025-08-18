export type UserType = {
  token: string;
  _id: string;
  userPermissions: {
    login: boolean;
    userRead: boolean;
    approveArtisans: boolean;
    adminRead: boolean;
    orderRead: boolean;
    deactivateUser: boolean;
    deactivateAdmin: boolean;
    createArtisanCategories: boolean;
    createPlans: boolean;
    createGeneralData: boolean;
  };
  role: string;
  isVerified: boolean;
  isActive: boolean;
  fullname: string;
  phone: string;
  ntfToken: string;
  email: string;
  createdAt: string;
  photoUrl?: string;
  notificationSettings?: {
    emailNotify: boolean;
    newAdmin: boolean;
    newArtisan: boolean;
    newBooking: boolean;
    newUser: boolean;
    pushNotification: boolean;
  };
};

export type UncertainObjectType = {
  [key: string]: any;
};
