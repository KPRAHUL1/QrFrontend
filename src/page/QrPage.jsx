import { QRCodeCanvas } from "qrcode.react";

const QRPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <QRCodeCanvas
          value="https://kgdkbzz7-5173.inc1.devtunnels.ms/register" // This should point to your registration form URL
          size={200}
          level="H"
          fgColor="#000000"
        />
      </div>
    </div>
  );
};

export default QRPage;