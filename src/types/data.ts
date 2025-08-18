export type AdminType = {
  _id: string;
  userPermissions: AdminPermissionType;
  fullname: string;
  phone: string;
  email: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  ntfToken: string;
  createdAt: Date;
};

export type AdminPermissionType = {
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

export type ArtisanType = {
  _id: string;
  userPermissions: ArtisanPermissionType;
  country: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  resetCount: number;
  verificationCount: number;
  sendCodeTo: null;
  email: string;
  fullname: string;
  phone: string;
  ntfToken: string;
  createdAt: string;
  companyName: string;
  firstname: string;
  lastname: string;
};

export type ArtisanPermissionType = {
  login: boolean;
};

export type CustomerType = {
  _id: string;
  userPermissions: CustomerPermissionType;
  country: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  resetCount: number;
  verificationCount: number;
  sendCodeTo: string;
  email: string;
  fullname: string;
  phone: string;
  ntfToken: string;
  createdAt: string;
  firstname: string;
  lastname: string;
  verificationCode: string;
  verificationExpires: string;
  resetExpires: string;
};

export type CustomerPermissionType = {
  login: boolean;
};

export type TicketType = {
  _id: string;
  liveChat: boolean;
  status: 'open' | 'closed';
  files: string[];
  uid: string;
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  comment: string;
  role: string;
  userId: string;
  attendingStaff: {
    _id: string;
    fullname: string;
    phone: string;
    email: string;
  };
  createdAt: string;
};

export type TicketResponseType = {
  _id: string;
  files: string[];
  uid: string;
  ticketId: string;
  attendingStaff: string;
  createdAt: string;
  userId: string;
  fullname: string;
  role: string;
  comment: string;
};

export type NotificationType = {
  _id: string;
  userId: string;
  isRead: boolean;
  category: string;
  identifier: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type ArtisanCategoryType = {
  services: string[];
  _id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  description: string;
};

export type ArtisanBusinessHoursType = {
  _id: string;
  artisan: string;
  friday: {
    openTime: string;
    closeTime: string;
  };
  monday: {
    openTime: string;
    closeTime: string;
  };
  saturday: {
    openTime: string;
    closeTime: string;
  };
  sunday: {
    openTime: string;
    closeTime: string;
  };
  thursday: {
    openTime: string;
    closeTime: string;
  };
  tuesday: {
    openTime: string;
    closeTime: string;
  };
  wednesday: {
    openTime: string;
    closeTime: string;
  };
};

export type ArtisanRatingType = {
  _id: string;
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  totalRatingsCount: number;
  totalRatingsValue: number;
  rating: number;
  createdAt: string;
  artisan: string;
  updatedAt: string;
};

export type ArtisanViewType = {
  _id: string;
  artisan: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  views: number;
};

export type AppointmentType = {
  _id: string;
  location: {
    type: string;
    coordinates: number[];
  };
  status: string;
  artisanViewed: boolean;
  artisanCompleted: boolean;
  userCompleted: boolean;
  artisanCancelled: boolean;
  userCancelled: boolean;
  isInDispute: boolean;
  rescheduled: number;
  userId: string;
  address: string;
  duration: number;
  notes: string;
  artisan: {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
    companyName: string;
  };
  date: string;
  createdAt: string;
  updatedAt: string;
  userCompletedAt: string;
};

export type DisputeType = {
  _id: string;
  status: 'open' | 'closed';
  user: {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
  };
  firstname: string;
  role: string;
  model: string;
  artisan: {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
    companyName: string;
  };
  createdBy: string;
  booking: string;
  createdAt: string;
};

export type DisputeResponseType = {
  _id: string;
  files: string[];
  booking: string;
  disputeId: string;
  createdAt: string;
  user: {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
  };
  firstname: string;
  role: string;
  comment: string;
  model: string;
};
