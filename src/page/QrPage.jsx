import { QRCodeCanvas } from "qrcode.react";

const QRPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <QRCodeCanvas
          value="https://genzteam.netlify.app/register" // This should point to your registration form URL
          size={200}
          level="H"
          fgColor="#000000"
        />
      </div>
    </div>
  );
};

export default QRPage;