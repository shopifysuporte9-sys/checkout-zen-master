import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Plus, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import mainProduct from "@/assets/cueca-arabe-kit.jpg";
import extraOffer from "@/assets/cueca-extra-offer.jpg";

interface CheckoutSummaryProps {
  hasExtraOffer: boolean;
  onToggleOffer: (hasOffer: boolean) => void;
}

const basePrice = 49.00;
const extraOfferPrice = 29.00;
const pixDiscount = 0.05; // 5%

export const CheckoutSummary = ({ hasExtraOffer, onToggleOffer }: CheckoutSummaryProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showOffer, setShowOffer] = useState(true);

  const calculateSubtotal = () => {
    return hasExtraOffer ? basePrice + extraOfferPrice : basePrice;
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * pixDiscount;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const handleToggleOffer = () => {
    onToggleOffer(!hasExtraOffer);
    if (!hasExtraOffer) {
      setShowOffer(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Summary Card */}
      <Card className="shadow-medium border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">RESUMO</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed && "rotate-180"
                )}
              />
            </Button>
          </div>
        </CardHeader>

        <CardContent className={cn(
          "space-y-4 transition-all duration-300",
          isCollapsed && "lg:block hidden"
        )}>
          {/* Price Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Produtos</span>
              <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Desconto PIX</span>
              <span className="font-medium text-success">-{formatPrice(calculateDiscount())}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frete</span>
              <span className="font-medium text-success">Grátis</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-primary">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>
          </div>

          {/* Main Product */}
          <Card className="bg-muted/30 border-muted">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={mainProduct}
                  alt="Cueca Árabe Premium Kit Luxo Masculino (5 unidades)"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm leading-tight">
                    Cueca Árabe Premium Kit Luxo Masculino (5 unidades)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Qtd: 1</p>
                  <p className="font-bold text-sm mt-1">{formatPrice(basePrice)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extra Offer Product (if added) */}
          {hasExtraOffer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={extraOffer}
                  alt="5 Cuecas Árabes - Produto adicional"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm leading-tight text-primary">
                    Adicionado: 5 Cuecas Árabes
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Qtd: 1</p>
                  <p className="font-bold text-sm mt-1 text-primary">
                    {formatPrice(extraOfferPrice)}
                  </p>
                </div>
              </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Extra Offer Card */}
      {showOffer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="h-5 w-5 text-warning" />
                <span className="font-bold text-warning">VOCÊ TEM 1 OFERTA!</span>
              </div>
              
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img
                      src={extraOffer}
                      alt="5 Cuecas Árabes - Oferta especial"
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    
                    <div className="flex-1 text-center sm:text-left">
                      <p className="font-medium text-primary text-sm">
                        ADICIONE +5 CUECAS ÁRABES POR
                      </p>
                      <p className="text-sm text-muted-foreground line-through">R$ 49,90</p>
                      <p className="font-bold text-xl text-primary">R$ 29,00</p>
                    </div>
                    
                    <Button
                      onClick={handleToggleOffer}
                      className={cn(
                        "transition-all duration-300 font-semibold",
                        hasExtraOffer ? 
                          "bg-muted hover:bg-muted/80 text-muted-foreground" : 
                          "bg-gradient-primary hover:opacity-90"
                      )}
                    >
                      {hasExtraOffer ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Adicionado
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar oferta
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {hasExtraOffer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success" />
                        <p className="text-sm font-medium text-success">Oferta adicionada!</p>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};