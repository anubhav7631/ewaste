export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SCHEDULED' | 'COMPLETED';

export interface WasteRequest {
  id?: number;
  userId?: number;
  userName?: string;
  userEmail?: string;
  deviceType: string;
  deviceDescription?: string;
  quantity: number;
  imageUrl?: string;
  pickupAddress: string;
  preferredDate?: string;
  scheduledDate?: string;
  status?: RequestStatus;
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StatusUpdateRequest {
  status: RequestStatus;
  scheduledDate?: string;
  adminNotes?: string;
}
