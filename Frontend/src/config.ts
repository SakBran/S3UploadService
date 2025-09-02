const envConfig = {
  baseUrl: import.meta.env.VITE_BASE_URL ?? 'https://localhost:8000/api/',
  imageUrl: import.meta.env.VITE_IMAGE_URL ?? 'https://localhost:8000/Image/',
  qrUrl: import.meta.env.VITE_QR_URL ?? 'https://uatapi.ecomreg.gov.mm/QR/',
};
export default envConfig;
