import { motion } from "framer-motion";
import { CreditCard, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckoutData } from "@/pages/Checkout";
import cuecaProduto from "@/assets/cueca-produto.jpg";

interface PaymentStepProps {
  data: CheckoutData;
  updateData: (field: keyof CheckoutData, value: boolean) => void;
  onFinalize: () => void;
  isLoading: boolean;
}

const basePrice = 49.00;
const extraOfferPrice = 29.00;
const pixDiscount = 0.05; // 5%

export const PaymentStep = ({ data, updateData, onFinalize, isLoading }: PaymentStepProps) => {
  const calculateTotal = () => {
    let total = basePrice;
    if (data.hasExtraOffer) {
      total += extraOfferPrice;
    }
    return total - (total * pixDiscount);
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
          3
        </div>
        <h2 className="text-xl font-semibold">Pagamento</h2>
      </div>

      <p className="text-muted-foreground">Escolha uma forma de pagamento</p>

      {/* PIX Payment Option */}
      <Card className="border-2 border-primary bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-white m-1" />
              </div>
              <span className="font-semibold text-lg">PIX</span>
            </div>
            <Badge className="bg-success hover:bg-success text-success-foreground text-xs px-2 py-1">
              5% DE DESCONTO
            </Badge>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              A confirmação do pagamento é realizada em poucos minutos. 
              Utilize o aplicativo do seu banco para pagar.
            </p>
            <p className="font-semibold">
              Valor no PIX: <span className="text-primary text-lg">
                R$ {calculateTotal().toFixed(2).replace('.', ',')}
              </span>
            </p>
          </div>

          {/* Order Bump inside PIX */}
          <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-warning">🔥 VOCÊ TEM 1 OFERTA!</span>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={cuecaProduto}
                alt="5 Cuecas Árabes Adicionais"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="text-left">
                <p className="font-medium text-sm">
                  ADICIONE +5 CUECAS ÁRABES POR
                </p>
                <p className="text-xs text-muted-foreground line-through">R$ 49,90</p>
                <p className="font-bold text-primary">R$ 29,00</p>
                <p className="text-xs text-muted-foreground">Economize R$20 no segundo Kit!</p>
              </div>
            </div>
            
            <Button
              onClick={() => updateData('hasExtraOffer', !data.hasExtraOffer)}
              className={data.hasExtraOffer 
                ? "w-full bg-success hover:bg-success/90 text-success-foreground" 
                : "w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              }
            >
              {data.hasExtraOffer ? "✓ Adicionado" : "+ Adicionar oferta"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Finalize Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={onFinalize}
          disabled={isLoading}
          className="w-full h-14 text-lg font-bold bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Finalizar Compra
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};