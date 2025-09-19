import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CheckoutHeader = () => {
  return (
    <Card className="shadow-soft border-0 bg-checkout-header">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-24 bg-gradient-primary rounded-md flex items-center justify-center text-white font-bold text-sm">
            STEADFAST
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">
            PAGAMENTO 100% SEGURO
          </span>
        </div>
      </div>
    </Card>
  );
};