import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import logoVelluto from "@/assets/logo-velluto.png";

export const CheckoutHeader = () => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-3">
        <img 
          src={logoVelluto} 
          alt="Velluto Logo" 
          className="h-12 w-auto"
        />
      </div>
      
      <div className="hidden sm:flex items-center space-x-2 text-sm">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <span className="font-semibold text-primary">
          PAGAMENTO 100% SEGURO
        </span>
      </div>
    </div>
  );
};