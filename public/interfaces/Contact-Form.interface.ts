export interface ContactUsFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactUsResponse {
  data: ContactUsFormData;
  message: string;
  success: boolean;
}
