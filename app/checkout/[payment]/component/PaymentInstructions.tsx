import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Copy, Info } from "lucide-react";

const PaymentInstructions: React.FC = () => {
  const accountNumber = "52 6032 2488";
  const totalPayment = "IDR 2.872.316";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Instruksi Pembayaran</h2>
        <p className="text-sm text-gray-500 mb-4">
          Selesaikan sebelum Sel, 27 Agt 2024, 18.20 WIB
        </p>

        <h3 className="font-semibold mb-2">Lakukan Transfer ke</h3>
        <div className="flex items-center mb-4">
          <img
            src="/path-to-bca-logo.png"
            alt="BCA Logo"
            className="w-12 h-12 mr-2"
          />
          <div>
            <p className="font-semibold">Bank BCA</p>
            <p className="text-sm">PT. Global Tiket Network</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Input value={accountNumber} readOnly className="bg-gray-100" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(accountNumber)}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <h3 className="font-semibold mb-2">Total Pembayaran</h3>
        <div className="flex justify-between items-center mb-4">
          <Input value={totalPayment} readOnly className="bg-gray-100" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(totalPayment)}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-yellow-100 p-3 rounded-md flex items-start mb-4">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
          <p className="text-sm">
            Transfer sesuai total pembayaran hingga 3 digit terakhir untuk
            kemudahan verifikasi.
          </p>
        </div>

        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <p className="text-sm">
            Setelah pembayaran diverifikasi, e-tiket dan bukti pembayaran akan
            dikirim ke alamat email terdaftar.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">Ganti Metode Pembayaran</Button>
        <Button>Lihat daftar pesanan</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentInstructions;
