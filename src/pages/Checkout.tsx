import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { StepIndicator } from "@/components/checkout/StepIndicator";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { IdentificationStep } from "@/components/checkout/IdentificationStep";
import { DeliveryStep } from "@/components/checkout/DeliveryStep";
import { PaymentStep } from "@/components/checkout/PaymentStep";

export interface CheckoutData {
  // Identification
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  
  // Delivery
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  
  // Pricing
  hasExtraOffer: boolean;
}

const initialData: CheckoutData = {
  fullName: "",
  email: "",
  phone: "",
  cpf: "",
  cep: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  hasExtraOffer: false,
};

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = (field: keyof CheckoutData, value: string | boolean) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinalize = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const redirectUrl = checkoutData.hasExtraOffer 
      ? 'pixcuecaoferta.html' 
      : 'pixcueca.html';
    
    toast({
      title: "Pedido finalizado com sucesso!",
      description: "Redirecionando para o pagamento...",
      variant: "default",
    });
    
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-checkout-bg">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <CheckoutHeader />
        
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Steps */}
          <div className="lg:col-span-2 space-y-6">
            <StepIndicator currentStep={currentStep} />
            
            <Card className="shadow-medium border-0">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <IdentificationStep
                      key="identification"
                      data={checkoutData}
                      updateData={updateData}
                      nextStep={nextStep}
                    />
                  )}
                  
                  {currentStep === 2 && (
                    <DeliveryStep
                      key="delivery"
                      data={checkoutData}
                      updateData={updateData}
                      nextStep={nextStep}
                      prevStep={prevStep}
                    />
                  )}
                  
                  {currentStep === 3 && (
                    <PaymentStep
                      key="payment"
                      data={checkoutData}
                      updateData={updateData}
                      onFinalize={handleFinalize}
                      isLoading={isLoading}
                    />
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CheckoutSummary
              hasExtraOffer={checkoutData.hasExtraOffer}
              onToggleOffer={(hasOffer) => updateData('hasExtraOffer', hasOffer)}
            />
          </div>
        </main>

        {/* Security Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 text-primary" />
            <span className="font-medium">Pagamento 100% Seguro</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Checkout;
