import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CheckoutHeader = () => {
  return (
    <Card className="shadow-soft border-0 bg-checkout-header text-primary-foreground">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="font-script text-3xl font-bold text-primary-foreground tracking-wide">
            Velluto
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-2 text-sm">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          <span className="font-semibold text-primary-foreground">
            PAGAMENTO 100% SEGURO
          </span>
        </div>
      </div>
    </Card>
  );
};