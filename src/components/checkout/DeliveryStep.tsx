import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Truck, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckoutData } from "@/pages/Checkout";
import { toast } from "@/hooks/use-toast";

interface DeliveryStepProps {
  data: CheckoutData;
  updateData: (field: keyof CheckoutData, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const DeliveryStep = ({ data, updateData, nextStep, prevStep }: DeliveryStepProps) => {
  const [cepLoading, setCepLoading] = useState(false);
  
  const isValid = data.cep && data.address && data.number && data.neighborhood;

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{0,3})/, '$1-$2').slice(0, 9);
  };

  const handleCEPLookup = async (cep: string) => {
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (cleanCEP.length !== 8) return;
    
    setCepLoading(true);
    
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCEP}`);
      const data = await response.json();
      
      if (data.cep) {
        updateData('address', data.street || '');
        updateData('neighborhood', data.neighborhood || '');
        updateData('city', data.city || '');
        updateData('state', data.state || '');
        
        toast({
          title: "CEP encontrado!",
          description: `${data.city} - ${data.state}`,
        });
      }
    } catch (error) {
      toast({
        title: "CEP não encontrado",
        description: "Verifique o CEP digitado",
        variant: "destructive",
      });
    } finally {
      setCepLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
          2
        </div>
        <h2 className="text-xl font-semibold">Entrega</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cep">CEP *</Label>
          <div className="relative">
            <Input
              id="cep"
              placeholder="00000-000"
              value={data.cep}
              onChange={(e) => {
                const formattedCEP = formatCEP(e.target.value);
                updateData('cep', formattedCEP);
                if (formattedCEP.replace(/\D/g, '').length === 8) {
                  handleCEPLookup(formattedCEP);
                }
              }}
              className="h-12"
            />
            {cepLoading && (
              <Loader2 className="absolute right-3 top-3 h-6 w-6 animate-spin text-muted-foreground" />
            )}
          </div>
          {data.city && data.state && (
            <p className="text-sm text-primary font-medium">
              {data.city} - {data.state}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Endereço *</Label>
          <Input
            id="address"
            placeholder="Rua, Avenida, etc."
            value={data.address}
            onChange={(e) => updateData('address', e.target.value)}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="number">Número *</Label>
            <Input
              id="number"
              placeholder="123"
              value={data.number}
              onChange={(e) => updateData('number', e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              placeholder="Apartamento, Bloco, etc."
              value={data.complement}
              onChange={(e) => updateData('complement', e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro *</Label>
          <Input
            id="neighborhood"
            placeholder="Centro"
            value={data.neighborhood}
            onChange={(e) => updateData('neighborhood', e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      {/* Delivery Option Card */}
      <Card className="border-primary bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-white m-1" />
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="font-semibold">Correios</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-success">Grátis</span>
              <p className="text-sm text-muted-foreground">2 a 5 dias úteis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button
          onClick={prevStep}
          variant="outline"
          className="flex-1 h-12 text-base font-semibold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        
        <Button
          onClick={nextStep}
          disabled={!isValid}
          className="flex-1 h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <span>Continuar</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};